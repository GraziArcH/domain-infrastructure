import { type IUnitOfWork } from '@/application/framework'
import {
  type AgentTypeEntity,
  CompanyAggregate,
  type CreateCompanyDTO,
  type CreateSimpleUserDTO,
  type ICompanyRepository,
  type IUserRepository,
  type UserAggregate,
  type UserEmailEntity,
  type UserPhoneEntity,
  type CompanyAggregateModel,
  type UserAggregateModel
} from '@/domain/user'

export class CompanyFacade extends CompanyAggregate {
  constructor(
    protected readonly companyAggregatte: CompanyAggregate,
    protected readonly userAggregate: UserAggregate,
    protected readonly companyRepository: ICompanyRepository,
    protected readonly userRepository: IUserRepository,
    protected readonly agentTypeEntity: AgentTypeEntity,
    protected readonly userEmailEntity: UserEmailEntity,
    protected readonly userPhoneEntity: UserPhoneEntity,
    private readonly unitOfWork: IUnitOfWork
  ) {
    super(
      userAggregate,
      companyRepository,
      userRepository,
      agentTypeEntity,
      userEmailEntity,
      userPhoneEntity
    )
  }

  async create(dto: CreateCompanyDTO): Promise<CompanyAggregateModel> {
    try {
      await this.unitOfWork.start()

      const companyOrError = await this.companyAggregatte.create(dto)

      if (companyOrError instanceof Error) {
        await this.unitOfWork.rollback()
        return companyOrError
      }

      await this.unitOfWork.commit()

      return companyOrError
    } catch (e) {
      await this.unitOfWork.rollback()
      throw e
    }
  }

  async createSimpleUserWithPhones(dto: CreateSimpleUserDTO): Promise<UserAggregateModel> {
    try {
      await this.unitOfWork.start()

      const companyOrError = await this.companyAggregatte.createSimpleUserWithPhones(dto)

      if (companyOrError instanceof Error) {
        await this.unitOfWork.rollback()
        return companyOrError
      }

      await this.unitOfWork.commit()

      return companyOrError
    } catch (e) {
      await this.unitOfWork.rollback()
      throw e
    }
  }

  async getCompanyById(companyId: number): Promise<CompanyAggregateModel> {
    return this.companyAggregatte.getById(companyId)
  }
}
