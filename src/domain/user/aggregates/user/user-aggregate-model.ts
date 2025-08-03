import { type IEntityModel, IdValueObject } from "@/domain/shared";
import {
  CPFValueObject,
  IDPUserIdValueObject,
  NameValueObject,
  UserEmailEntityModel,
  UserPhoneEntityModel,
} from "@/domain/user";
import { type UserDTO } from "./dtos";

export class UserAggregateModel implements IEntityModel<UserDTO> {
  private constructor(
    public readonly userId: IdValueObject,
    public readonly idpUserId: IDPUserIdValueObject,
    public readonly name: NameValueObject,
    public readonly surname: NameValueObject,
    public readonly userTypeId: IdValueObject,
    public readonly admin: boolean,
    public readonly companyId: IdValueObject,
    public readonly active: boolean,
    public readonly createdAt: Date,
    public readonly email?: UserEmailEntityModel,
    public readonly phones?: UserPhoneEntityModel[],
    public readonly cpf?: CPFValueObject,
    public readonly lastLoginAt?: Date,
  ) {}

  static create({
    userId,
    idpUserId,
    companyId,
    name,
    surname,
    cpf,
    userTypeId,
    admin,
    active,
    createdAt,
    email,
    phones,
    lastLoginAt
  }: UserDTO): UserAggregateModel {
    const userIdOrError = IdValueObject.create(userId);
    const idpUserIdOrError = IDPUserIdValueObject.create(idpUserId);
    const companyIdOrError = IdValueObject.create(companyId);
    const nameOrError = NameValueObject.create(name);
    const surnameOrError = NameValueObject.create(surname);
    const userTypeIdOrError = IdValueObject.create(userTypeId);
    const emailEntityOrError = email
      ? UserEmailEntityModel.create({
          emailId: email.emailId,
          userId: email.userId,
          email: email.email,
          type: email.type,
        })
      : null;

    const phoneEntitiesOrError = phones
      ? phones.map((phone) =>
          UserPhoneEntityModel.create({
            phoneId: phone.phoneId,
            userId: phone.userId,
            phone: phone.phone,
            whatsapp: phone.whatsapp,
            telegram: phone.telegram,
            type: phone.type,
          })
        )
      : null;

    const cpfOrError = cpf ? CPFValueObject.create(cpf) : null;

    return new UserAggregateModel(
      userIdOrError,
      idpUserIdOrError,
      nameOrError,
      surnameOrError,
      userTypeIdOrError,
      admin,
      companyIdOrError,
      active,
      createdAt,
      emailEntityOrError,
      phoneEntitiesOrError,
      cpfOrError,
      lastLoginAt
    );
  }

  getValues(): UserDTO {
    return {
      userId: this.userId.value,
      idpUserId: this.idpUserId.value,
      name: this.name.value,
      surname: this.surname.value,
      userTypeId: this.userTypeId.value,
      admin: this.admin,
      companyId: this.companyId.value,
      active: this.active,
      createdAt: this.createdAt,
      email: this.email ? this.email.getValues() : null,
      phones: this.phones
        ? this.phones.map((phone) => phone.getValues())
        : null,
      cpf: this.cpf ? this.cpf.value : null,
      lastLoginAt: this.lastLoginAt ? this.lastLoginAt : null
    };
  }
}
