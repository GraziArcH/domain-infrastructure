import { type AuditEntityModel } from '@/domain/security'

export interface IAuditRepository {
  create: (auditEntityModel: AuditEntityModel) => Promise<AuditEntityModel>
}
