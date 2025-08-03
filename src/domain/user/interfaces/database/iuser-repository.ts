import { type IdValueObject } from "@/domain/shared";
import {
  type UserAggregateModel,
  type CPFValueObject,
  type IDPUserIdValueObject,
} from "@/domain/user";

export interface IUserRepository {
  create: (user: UserAggregateModel) => Promise<UserAggregateModel>;

  update: (user: UserAggregateModel) => Promise<UserAggregateModel>;

  getUserByCPF: (cpf: CPFValueObject) => Promise<UserAggregateModel | null>;

  getUsersTotalByCompanyId: (
    companyId: IdValueObject
  ) => Promise<number | null>;

  getUsersByIDPUserIdOfAdmin: (
    idpUserIdOfAdmin: IDPUserIdValueObject,
    limit?: number,
    offset?: number
  ) => Promise<UserAggregateModel[]>;

  getUserById: (userId: IdValueObject) => Promise<UserAggregateModel | null>;

  getUserByIDPUserId: (
    idpUserId: IDPUserIdValueObject
  ) => Promise<UserAggregateModel | null>;

  getUserIdByIDPUserId: (
    idpUserId: IDPUserIdValueObject
  ) => Promise<IdValueObject | null>;

  delete: (userId: IDPUserIdValueObject) => Promise<UserAggregateModel>;

  deleteByUserId: (user: IdValueObject) => Promise<UserAggregateModel>;

  activateUser: (
    idpUserId: IDPUserIdValueObject,
    idpUserIdAdmin: IDPUserIdValueObject
  ) => Promise<UserAggregateModel>;
  deactivateUser: (
    idpUserId: IDPUserIdValueObject,
    idpUserIdAdmin: IDPUserIdValueObject
  ) => Promise<UserAggregateModel>;
  updateLastLoginAt: (
    idpUserId: IDPUserIdValueObject
  ) => Promise<boolean>;
}
