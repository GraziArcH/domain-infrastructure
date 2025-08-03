import { type IdValueObject } from '@/domain/shared'
import { type UserPhoneEntityModel, type PhoneValueObject } from '@/domain/user'

export interface IUserPhoneRepository {
  create: (phone: UserPhoneEntityModel) => Promise<UserPhoneEntityModel>

  getPhoneById: (phoneId: IdValueObject) => Promise<UserPhoneEntityModel | null>

  getPhoneByPhone: (phone: PhoneValueObject) => Promise<UserPhoneEntityModel | null>

  getPhoneByUserId: (userId: IdValueObject) => Promise<UserPhoneEntityModel[]>

  update: (phone: UserPhoneEntityModel) => Promise<UserPhoneEntityModel>

  delete: (phoneId: IdValueObject) => Promise<UserPhoneEntityModel>

  deleteByUserId: (userId: IdValueObject) => Promise<UserPhoneEntityModel[]>
}
