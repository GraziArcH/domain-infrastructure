import { type IEntityModel, IdValueObject } from '@/domain/shared'
import {
  ActionValueObject,
  DetailsValueObject,
  IdentityValueObject,
  OriginValueObject,
  StatusValueObject
} from '@/domain/security'
import { type AuditDTO } from './audit-dtos'

export class AuditEntityModel implements IEntityModel<AuditDTO> {
  private constructor (
    public readonly auditId: IdValueObject,
    public readonly action: ActionValueObject,
    public readonly date: Date,
    public readonly details: DetailsValueObject,
    public readonly identity: IdentityValueObject,
    public readonly origin: OriginValueObject,
    public readonly status: StatusValueObject
  ) { }

  static create (
    {
      auditId,
      action,
      date,
      details,
      identity,
      origin,
      status
    }: AuditDTO
  ): AuditEntityModel {
    const auditIdOrError = IdValueObject.create(auditId)
    const actionOrError = ActionValueObject.create(action)
    const detailsOrError = DetailsValueObject.create(details)
    const identityOrError = IdentityValueObject.create(identity)
    const originOrError = OriginValueObject.create(origin)
    const statusOrError = StatusValueObject.create(status)

    return new AuditEntityModel(
      auditIdOrError,
      actionOrError,
      date,
      detailsOrError,
      identityOrError,
      originOrError,
      statusOrError
    )
  }

  getValues (): AuditDTO {
    return {
      auditId: this.auditId.value,
      action: this.action.value,
      date: this.date,
      details: this.details.value,
      identity: this.identity.value,
      origin: this.origin.value,
      status: this.status.value
    }
  }
}
