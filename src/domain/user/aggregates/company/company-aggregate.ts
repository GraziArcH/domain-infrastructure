import { planFacade } from "@archoffice/domain-sales";
import {
  DomainError,
  IdValueObject,
  NotFoundError,
  UnauthorizedError,
} from "@/domain/shared";
import {
  type ICompanyRepository,
  type IUserRepository,
  CompanyAggregateModel,
  UserAggregateModel,
  type AgentTypeEntity,
  type UserEmailEntity,
  type UserPhoneEntity,
  type UserAggregate,
  type AgentTypeEntityModel,
} from "@/domain/user";
import {
  type CreateCompanyDTO,
  type CreateSimpleUserDTO,
  type CreateUserDTO,
} from "./company-dtos";
import { type AccountEntityModel } from "@archoffice/domain-sales/domain/plan";

export class CompanyAggregate {
  constructor(
    protected readonly userAggregate: UserAggregate,
    protected readonly companyRepository: ICompanyRepository,
    protected readonly userRepository: IUserRepository,
    protected readonly agentTypeEntity: AgentTypeEntity,
    protected readonly userEmailEntity: UserEmailEntity,
    protected readonly userPhoneEntity: UserPhoneEntity
  ) {}

  private async getMaximumNumberOfPlanUsers(
    companyId: number
  ): Promise<number> {
    const planTypeOrError = await planFacade.getPlanTypeByCompanyId(companyId);

    if (planTypeOrError instanceof Error) throw planTypeOrError;

    if (!planTypeOrError)
      throw new DomainError("Essa compania não tem um plano");

    return planTypeOrError.numberOfUsers.value;
  }

  private async createAccount(companyId: number): Promise<AccountEntityModel> {
    const createAccountOrError = await planFacade.createAccount(companyId);

    if (createAccountOrError instanceof Error) throw createAccountOrError;

    return createAccountOrError;
  }

  private async companyExists(
    companyId: IdValueObject
  ): Promise<CompanyAggregateModel> {
    const companyExists = await this.companyRepository.getCompanyById(
      companyId
    );

    if (!companyExists) throw new DomainError("Companhia não existe");

    return companyExists;
  }

  private async createUserWithPhones({
    idpUserId,
    companyId,
    name,
    surname,
    cpf,
    userTypeId,
    email,
    phones,
    admin,
    active,
  }: CreateUserDTO): Promise<UserAggregateModel> {
    const userAggregateEntityModelOrError = UserAggregateModel.create({
      userId: 1,
      idpUserId,
      companyId,
      name,
      surname,
      cpf,
      userTypeId,
      admin,
      active,
      createdAt: new Date(),
    });

    let userExists = null;

    if (userAggregateEntityModelOrError.cpf)
      userExists = await this.userRepository.getUserByCPF(
        userAggregateEntityModelOrError.cpf
      );

    if (userExists) throw new DomainError("Esse usuário já existe");

    const userOrError = await this.userRepository.create(
      userAggregateEntityModelOrError
    );

    await this.userEmailEntity.create({
      userId: userOrError.userId.value,
      email,
      type: "comercial",
    });

    for (const phone of phones) {
      await this.userPhoneEntity.create({
        userId: userOrError.userId.value,
        phone: phone.phone,
        telegram: false,
        whatsapp: false,
        type: phone.type,
      });
    }

    return userOrError;
  }

  async create({
    agentTypeId,
    companyName,
    companyLegalName,
    companyUrl,
    cnpj,
    idpUserId,
    name,
    surname,
    cpf,
    userTypeId,
    email,
    phones,
  }: CreateCompanyDTO): Promise<CompanyAggregateModel> {
    const agentTypeExists = await this.agentTypeEntity.getById(agentTypeId);

    if (!agentTypeExists)
      throw new NotFoundError("Esse tipo de agente não existe");

    const companyAggregateModel = CompanyAggregateModel.create({
      companyId: 1,
      agentTypeId,
      companyName,
      companyLegalName,
      companyUrl,
      cnpj,
      active: false,
    });

    const company = await this.companyRepository.create(companyAggregateModel);

    await this.createUserWithPhones({
      idpUserId,
      companyId: company.companyId.value,
      name,
      surname,
      cpf,
      userTypeId,
      admin: true,
      active: false,
      email,
      phones,
    });

    await this.createAccount(company.companyId.value);

    return company;
  }

  async createSimpleUserWithPhones(
    dto: CreateSimpleUserDTO
  ): Promise<UserAggregateModel> {
    const companyIdOrError = IdValueObject.create(dto.companyId);

    // const maximumNumberOfPlanUsersOrError = await this.getMaximumNumberOfPlanUsers(dto.companyId)

    // const companyUsers = await this.userRepository.getUsersByIDPUserIdOfAdmin(companyIdOrError)

    // if (companyUsers.length >= maximumNumberOfPlanUsersOrError) throw new UnauthorizedError('Essa compania já atingiu o número máximos de usuários')

    await this.companyExists(companyIdOrError);

    return this.createUserWithPhones({
      ...dto,
      admin: false,
    });
  }

  async getById(companyId: number): Promise<CompanyAggregateModel> {
    const companyIdOrError = IdValueObject.create(companyId);

    return this.companyRepository.getCompanyById(companyIdOrError);
  }

  async getAll(): Promise<CompanyAggregateModel[]> {
    return this.companyRepository.getAll();
  }

  async getAgentTypes(): Promise<AgentTypeEntityModel[]> {
    return this.agentTypeEntity.get();
  }

  async activateCompany(idpUserId: string): Promise<CompanyAggregateModel> {
    return this.companyRepository.activateCompany(idpUserId);
  }

  async deactivateCompany(idpUserId: string): Promise<CompanyAggregateModel> {
    return this.companyRepository.deactivateCompany(idpUserId);
  }

  async getAllIdpUserIdsByCompanyId(companyId: string): Promise<string[]> {
    return this.companyRepository.getAllIdpUserIdsByCompanyId(companyId);
  }
}
