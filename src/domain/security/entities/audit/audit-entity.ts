import { type IAuditRepository, AuditEntityModel, type AuditDTOWithoutId } from '@/domain/security'

export class AuditEntity {
  constructor (
    private readonly repository: IAuditRepository
  ) { }

  async create (dto: AuditDTOWithoutId): Promise<AuditEntityModel> {
    const auditEntityModelOrError = AuditEntityModel.create({
      auditId: 1,
      ...dto
    })

    return await this.repository.create(auditEntityModelOrError)
  }
}
