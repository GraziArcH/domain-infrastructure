import { type AuditEntity, SecurityAggregate } from '@/domain/security'

export class SecurityFacade extends SecurityAggregate {
  constructor (protected readonly auditEntity: AuditEntity) {
    super(auditEntity)
  }
}
