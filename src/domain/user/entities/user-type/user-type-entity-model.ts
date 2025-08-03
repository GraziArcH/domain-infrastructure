import { type IEntityModel, IdValueObject } from '@/domain/shared'
import { type UserTypeDTO, UserTypeValueObject } from '@/domain/user'

export class UserTypeEntityModel implements IEntityModel<UserTypeDTO> {
  private constructor (
    public readonly userTypeId: IdValueObject,
    public readonly userType: UserTypeValueObject
  ) { }

  static create (
    {
      userTypeId,
      userType
    }: UserTypeDTO
  ): UserTypeEntityModel {
    const userTypeIdOrError = IdValueObject.create(userTypeId)
    const userTypeOrError = UserTypeValueObject.create(userType)

    return new UserTypeEntityModel(
      userTypeIdOrError,
      userTypeOrError
    )
  }

  getValues (): UserTypeDTO {
    return {
      userTypeId: this.userTypeId.value,
      userType: this.userType.value
    }
  }
}
