import { IdValueObject } from '@/domain/shared'
import { type IUserTypeRepository } from '@/domain/user/interfaces'
import { type UserTypeEntityModel } from './user-type-entity-model'

export class UserTypeEntity {
  constructor (private readonly repository: IUserTypeRepository) { }

  async getById (userTypeId: number): Promise<UserTypeEntityModel> {
    const userTypeOrError = IdValueObject.create(userTypeId)

    return await this.repository.getByUserTypeId(userTypeOrError)
  }

  async getAll (): Promise<UserTypeEntityModel[]> {
    return await this.repository.getAll()
  }
}
