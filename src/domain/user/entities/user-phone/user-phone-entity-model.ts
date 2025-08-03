import { type IEntityModel, IdValueObject } from '@/domain/shared'
import {
  TypeValueObject,
  PhoneValueObject,
  type UserPhoneDTO
} from '@/domain/user'

export class UserPhoneEntityModel implements IEntityModel<UserPhoneDTO> {
  private constructor (
    public readonly phoneId: IdValueObject,
    public readonly userId: IdValueObject,
    public readonly phone: PhoneValueObject,
    public readonly whatsapp: boolean,
    public readonly telegram: boolean,
    public readonly type: TypeValueObject
  ) { }

  static create (
    {
      phoneId,
      userId,
      phone,
      whatsapp,
      telegram,
      type
    }: UserPhoneDTO
  ): UserPhoneEntityModel {
    const phoneIdOrError = IdValueObject.create(phoneId)
    const userIdOrError = IdValueObject.create(userId)
    const phoneOrError = PhoneValueObject.create(phone)
    const typeOrError = TypeValueObject.create(type)

    return new UserPhoneEntityModel(
      phoneIdOrError,
      userIdOrError,
      phoneOrError,
      whatsapp,
      telegram,
      typeOrError
    )
  }

  getValues (): UserPhoneDTO {
    return {
      phoneId: this.phoneId.value,
      userId: this.userId.value,
      phone: this.phone.value,
      whatsapp: this.whatsapp,
      telegram: this.telegram,
      type: this.type.value
    }
  }
}
