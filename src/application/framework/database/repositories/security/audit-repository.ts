import { type DatabaseHelper } from '@/application/framework'
import { AuditEntityModel, type IAuditRepository } from '@/domain/security'
import { type QueryResultRow } from 'pg'

export class AuditRepository implements IAuditRepository {
  constructor (private readonly databaseHelper: DatabaseHelper) { }

  private mapper (rows: QueryResultRow): AuditEntityModel {
    if (!rows) return null

    return AuditEntityModel.create(
      {
        auditId: rows.audit_id,
        action: rows.action,
        date: new Date(rows.date as Date),
        details: rows.details,
        identity: rows.identity,
        origin: rows.origin,
        status: rows.status
      }
    )
  }

  async create (audit: AuditEntityModel): Promise<AuditEntityModel> {
    const result = await this.databaseHelper.query(
      `
                INSERT INTO audit (action, date, details, identity, origin, status)
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
            `,
      [
        audit.action.value,
        audit.date.toISOString(),
        audit.details.value,
        audit.identity.value,
        audit.origin.value,
        audit.status.value
      ]
    )
    const rows: QueryResultRow = result.rows[0]
    return this.mapper(rows)
  }
}
