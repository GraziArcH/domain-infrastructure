import { type IEntityModel, IdValueObject } from '@/domain/shared'
import {
  EmailValueObject,
  type InviteDTO,
  StringValueObject
} from '@/domain/user'

export class InviteEntityModel implements IEntityModel<InviteDTO> {
  private constructor (
    public readonly inviteId: IdValueObject,
    public readonly hash: StringValueObject,
    public readonly email: EmailValueObject,
    public readonly userAdminId: IdValueObject,
    public readonly companyId: IdValueObject,
    public readonly expirationsDate: Date,
    public readonly used: boolean
  ) { }

  static create (
    {
      inviteId,
      hash,
      email,
      userAdminId,
      companyId,
      expirationsDate,
      used
    }: InviteDTO
  ): InviteEntityModel {
    const inviteIdOrError = IdValueObject.create(inviteId)
    const hashOrError = StringValueObject.create(hash)
    const userAdminIdOrError = IdValueObject.create(userAdminId)
    const companyIdOrError = IdValueObject.create(companyId)
    const emailOrError = EmailValueObject.create(email)

    return new InviteEntityModel(
      inviteIdOrError,
      hashOrError,
      emailOrError,
      userAdminIdOrError,
      companyIdOrError,
      expirationsDate,
      used
    )
  }

  getValues (): InviteDTO {
    return {
      inviteId: this.inviteId.value,
      hash: this.hash.value,
      email: this.email.value,
      userAdminId: this.userAdminId.value,
      companyId: this.companyId.value,
      expirationsDate: this.expirationsDate,
      used: this.used
    }
  }
}
