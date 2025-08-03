import { type IdValueObject } from '@/domain/shared'
import { type UserTypeEntityModel } from '@/domain/user'

export interface IUserTypeRepository {
  getByUserTypeId: (userTypeId: IdValueObject) => Promise<UserTypeEntityModel | null>

  getAll: () => Promise<UserTypeEntityModel[]>
}
