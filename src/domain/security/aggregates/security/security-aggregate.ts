import { type AuditDTOWithoutId, type AuditEntity, type AuditEntityModel } from '@/domain/security'

export class SecurityAggregate {
  constructor (protected readonly auditEntity: AuditEntity) { }

  async createAudit (dto: AuditDTOWithoutId): Promise<AuditEntityModel> {
    return await this.auditEntity.create(dto)
  }
}
