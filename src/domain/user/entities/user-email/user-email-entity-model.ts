import { type IEntityModel, IdValueObject } from '@/domain/shared'
import {
  TypeValueObject,
  EmailValueObject,
  type UserEmailDTO
} from '@/domain/user'

export class UserEmailEntityModel implements IEntityModel<UserEmailDTO> {
  private constructor (
    public readonly emailId: IdValueObject,
    public readonly userId: IdValueObject,
    public readonly email: EmailValueObject,
    public readonly type: TypeValueObject
  ) { }

  static create (
    {
      emailId,
      userId,
      email,
      type
    }: UserEmailDTO
  ): UserEmailEntityModel {
    const emailIdOrError = IdValueObject.create(emailId)
    const userIdOrError = IdValueObject.create(userId)
    const emailOrError = EmailValueObject.create(email)
    const typeOrError = TypeValueObject.create(type)

    return new UserEmailEntityModel(
      emailIdOrError,
      userIdOrError,
      emailOrError,
      typeOrError
    )
  }

  getValues (): UserEmailDTO {
    return {
      emailId: this.emailId.value,
      userId: this.userId.value,
      email: this.email.value,
      type: this.type.value
    }
  }
}
