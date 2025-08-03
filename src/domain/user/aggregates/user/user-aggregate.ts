import {
  IdValueObject,
  NotFoundError,
  UnauthorizedError,
} from "@/domain/shared";
import {
  type IUserRepository,
  type UserEmailEntity,
  type UserPhoneEntity,
  UserAggregateModel,
  IDPUserIdValueObject,
  type UserTypeEntity,
  type UpdateUserDTO,
  type UpdateUserAdminDTO,
  type InviteEntity,
  type UserTypeEntityModel,
  type InviteEntityModel,
  UserEmailDTO,
} from "@/domain/user";
import crypto from "crypto";

export class UserAggregate {
  constructor(
    protected readonly emailEntity: UserEmailEntity,
    protected readonly phoneEntity: UserPhoneEntity,
    protected readonly userTypeEntity: UserTypeEntity,
    protected readonly invite: InviteEntity,
    protected readonly repository: IUserRepository
  ) {}

  private async userExists(userId: number): Promise<void> {
    const userIdOrError = IdValueObject.create(userId);

    const userExists = await this.repository.getUserById(userIdOrError);

    if (!userExists) throw new UnauthorizedError("Esse usuário não existe");
  }

  private async updatePhones(
    userId: number,
    phones: Array<{ phoneId: number; phone: string; type: string }>
  ): Promise<void> {
    await this.userExists(userId);

    for (const phone of phones) {
      await this.phoneEntity.update({
        phoneId: phone.phoneId,
        userId,
        phone: phone.phone,
        telegram: false,
        whatsapp: false,
        type: phone.type,
      });
    }
  }

  private async updateEmail(
    userId: number,
    newEmail: UserEmailDTO
  ): Promise<void> {
    await this.userExists(userId);
    await this.emailEntity.update({
      emailId: newEmail.emailId,
      userId: newEmail.userId,
      email: newEmail.email,
      type: newEmail.type
    });
  }

  async getUsersByIDPUserIdOfAdmin(
    idpUserId: string,
    limit?: number,
    offset?: number
  ): Promise<{
    limit: number;
    offset: number;
    total: number;
    data: UserAggregateModel[];
  }> {
    const idpUserIdOrError = IDPUserIdValueObject.create(idpUserId);

    const user = await this.repository.getUserByIDPUserId(idpUserIdOrError);

    if (!user)
      throw new NotFoundError(
        "Usuário que está tentando consultador os usuário de uma compania não existe"
      );

    if (!user.admin)
      throw new UnauthorizedError(
        "Só usuário administradores podem consultar usuários de sua compania"
      );

    const totalUser = await this.repository.getUsersTotalByCompanyId(
      user.companyId
    );

    const users = await this.repository.getUsersByIDPUserIdOfAdmin(
      idpUserIdOrError,
      limit,
      offset
    );

    return {
      limit,
      offset,
      total: totalUser,
      data: users,
    };
  }

  async getUserByIDPUserId(idpUserId: string): Promise<UserAggregateModel> {
    const idpUserIdOrError = IDPUserIdValueObject.create(idpUserId);

    return await this.repository.getUserByIDPUserId(idpUserIdOrError);
  }

  async getUserIdByIDPUserId(idpUserId: string): Promise<IdValueObject> {
    const idpUserIdOrError = IDPUserIdValueObject.create(idpUserId);

    return await this.repository.getUserIdByIDPUserId(idpUserIdOrError);
  }

  async updateUser({
    idpUserId,
    name,
    surname,
    phones,
  }: UpdateUserDTO): Promise<UserAggregateModel> {
    const idpUserIdOrError = IDPUserIdValueObject.create(idpUserId);

    const user = await this.repository.getUserByIDPUserId(idpUserIdOrError);

    if (!user) throw new NotFoundError("Usuário não existe");

    const userAggregateEntityModelOrError = UserAggregateModel.create({
      userId: user.userId.value,
      idpUserId: user.idpUserId.value,
      companyId: user.companyId.value,
      name,
      surname,
      cpf: null,
      userTypeId: user.userTypeId.value,
      admin: user.admin,
      active: user.active,
      createdAt: user.createdAt,
    });

    await this.updatePhones(user.userId.value, phones);

    return await this.repository.update(userAggregateEntityModelOrError);
  }

  async updateUserByAdmin({
    idpUserId,
    userIdToBeUpdated,
    name,
    surname,
    email,
    userTypeId,
    phones,
    admin,
    active,
  }: UpdateUserAdminDTO): Promise<UserAggregateModel> {
    let newEmail: UserEmailDTO;

    const idpUserIdOrError = IDPUserIdValueObject.create(idpUserId);

    const userExists = await this.repository.getUserByIDPUserId(
      idpUserIdOrError
    );

    if (!userExists)
      throw new NotFoundError(
        "O usuário administrador que iria atualizar o usuário não existe"
      );

    if (!userExists.admin)
      throw new UnauthorizedError("O usuário não é um administrador");

    const userIdToBeUpdatedOrError = IdValueObject.create(userIdToBeUpdated);

    const userToBeUpdated = await this.repository.getUserById(
      userIdToBeUpdatedOrError
    );

    if (!userToBeUpdated) throw new NotFoundError("Usuário não existe");

    if(userToBeUpdated.email.email.value !== email){
      const emailExists = await this.emailEntity.getEmailByEmail(email)
      if (emailExists) throw new NotFoundError('Email já existente')

      newEmail = {
        email: email,
        emailId: userToBeUpdated.email.emailId.value,
        type: userToBeUpdated.email.type.value,
        userId: userToBeUpdated.userId.value,
      }

      await this.updateEmail(userIdToBeUpdated, newEmail);
    }

    const userAggregateEntityModelOrError = UserAggregateModel.create({
      userId: userIdToBeUpdated,
      idpUserId: userToBeUpdated.idpUserId.value,
      companyId: userToBeUpdated.companyId.value,
      name,
      surname,
      cpf: null,
      userTypeId,
      admin,
      active,
      createdAt: userToBeUpdated.createdAt,
    });

    await this.updatePhones(userIdToBeUpdated, phones);

    return await this.repository.update(userAggregateEntityModelOrError);
  }

  async delete(idpUserId: string): Promise<UserAggregateModel> {
    const userIdOrError = IDPUserIdValueObject.create(idpUserId);

    const userExists = await this.repository.getUserByIDPUserId(userIdOrError);

    if (!userExists) throw new NotFoundError("Esse usuário não existe");

    if (userExists.admin)
      throw new UnauthorizedError(
        "Um usuário administrador não pode ser apagado"
      );

    return await this.repository.delete(userIdOrError);
  }

  async deleteByUserId(userId: number): Promise<UserAggregateModel> {
    const userIdOrError = IdValueObject.create(userId);

    const userExists = await this.repository.getUserById(userIdOrError);

    if (!userExists) throw new NotFoundError("Esse usuário não existe");

    if (userExists.admin)
      throw new UnauthorizedError(
        "Um usuário administrador não pode ser apagado"
      );

    return await this.repository.deleteByUserId(userIdOrError);
  }

  async activateUser(
    idpUserIdToBeActivated: string,
    idpUserIdOfAdmin: string
  ): Promise<UserAggregateModel> {
    const userIdOrError = IDPUserIdValueObject.create(idpUserIdToBeActivated);
    const adminIdOrError = IDPUserIdValueObject.create(idpUserIdOfAdmin);

    const userExists = await this.repository.getUserByIDPUserId(userIdOrError);
    if (!userExists) throw new NotFoundError("Esse usuário não existe");

    const adminExists = await this.repository.getUserByIDPUserId(
      adminIdOrError
    );

    if (!adminExists) throw new NotFoundError("Administrador não encontrado.");

    return await this.repository.activateUser(userIdOrError, adminIdOrError);
  }

  async deactivateUser(
    idpUserIdToBeDeactivated: string,
    idpUserIdOfAdmin: string
  ): Promise<UserAggregateModel> {
    const userIdOrError = IDPUserIdValueObject.create(idpUserIdToBeDeactivated);
    const adminIdOrError = IDPUserIdValueObject.create(idpUserIdOfAdmin);

    const userExists = await this.repository.getUserByIDPUserId(userIdOrError);
    if (!userExists) throw new NotFoundError("Esse usuário não existe");

    const adminExists = await this.repository.getUserByIDPUserId(
      adminIdOrError
    );
    if (!adminExists) throw new NotFoundError("Administrador não encontrado.");

    return await this.repository.deactivateUser(userIdOrError, adminIdOrError);
  }

  async getUserTypes(): Promise<UserTypeEntityModel[]> {
    return await this.userTypeEntity.getAll();
  }

  async createInvite(
    userAdminId: string,
    email: string
  ): Promise<InviteEntityModel> {
    const userAdminIdOrError = IDPUserIdValueObject.create(userAdminId);
    const userExists = await this.repository.getUserByIDPUserId(
      userAdminIdOrError
    );

    if (!userExists)
      throw new NotFoundError(
        "O usuário administrador que está tentando adicionar o usuário não existe"
      );

    if (!userExists.admin)
      throw new UnauthorizedError(
        "O usuário tem que ser um administrador para adicionar um novo usuário"
      );

    const timeoutInDate = new Date();
    timeoutInDate.setMinutes(timeoutInDate.getMinutes() + 60 * 3);

    return await this.invite.create({
      companyId: userExists.companyId.value,
      hash: crypto.randomBytes(3).toString("hex").toUpperCase(),
      used: false,
      userAdminId: userExists.userId.value,
      expirationsDate: timeoutInDate,
      email,
    });
  }

  async getInviteByHash(
    hash: string,
    email: string
  ): Promise<InviteEntityModel> {
    const invite = await this.invite.getInviteByHash(hash);

    if (!invite) throw new UnauthorizedError("Token inválido");

    if (invite.email.value !== email)
      throw new UnauthorizedError("Email inválido");

    if (new Date() > invite.expirationsDate)
      throw new UnauthorizedError("Token inválido");

    return invite;
  }

  async invalidateInvitation(hash: string): Promise<InviteEntityModel> {
    return await this.invite.invalidateInvitation(hash);
  }

  async updateUserLastLogin(idpUserId: string): Promise<boolean> {
    const idpUserIdOrError = IDPUserIdValueObject.create(idpUserId);
    
    const userExists = await this.repository.getUserByIDPUserId(idpUserIdOrError);
    
    if (!userExists) throw new NotFoundError("Usuário não existe");
    
    return await this.repository.updateLastLoginAt(idpUserIdOrError);
  }
}
