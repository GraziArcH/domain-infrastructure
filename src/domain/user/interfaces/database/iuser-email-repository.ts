import { type IdValueObject } from '@/domain/shared'
import { type UserEmailEntityModel, type EmailValueObject } from '@/domain/user'

export interface IUserEmailRepository {
  create: (email: UserEmailEntityModel) => Promise<UserEmailEntityModel>

  getEmailByUserId: (userId: IdValueObject) => Promise<UserEmailEntityModel[] | null>

  getEmailById: (emailId: IdValueObject) => Promise<UserEmailEntityModel | null>

  getEmailByEmail: (email: EmailValueObject) => Promise<UserEmailEntityModel | null>

  update: (email: UserEmailEntityModel) => Promise<UserEmailEntityModel>

  delete: (emailId: IdValueObject) => Promise<UserEmailEntityModel>

  deleteByUserId: (emailId: IdValueObject) => Promise<UserEmailEntityModel[]>
}
