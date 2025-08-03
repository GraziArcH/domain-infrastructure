import { type DatabaseHelper } from '@/application/framework'
import { InviteEntityModel, type IInviteRepository, type StringValueObject } from '@/domain/user'
import { type QueryResultRow } from 'pg'

export class InviteRepository implements IInviteRepository {
  constructor (private readonly databaseHelper: DatabaseHelper) { }

  private mapper (rows: QueryResultRow): InviteEntityModel {
    if (!rows) return null

    return InviteEntityModel.create(
      {
        inviteId: rows.invite_id,
        hash: rows.hash,
        userAdminId: rows.user_admin_id,
        companyId: rows.company_id,
        expirationsDate: new Date(rows.expirations_date as Date),
        used: Boolean(rows.used),
        email: rows.email
      }
    )
  }

  async create (invite: InviteEntityModel): Promise<InviteEntityModel> {
    const query = `
      INSERT INTO invite (hash, user_admin_id, company_id, expirations_date, used, email)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `
    const result = await this.databaseHelper.query(
      query,
      [
        invite.hash.value,
        invite.userAdminId.value,
        invite.companyId.value,
        invite.expirationsDate,
        invite.used,
        invite.email.value
      ]
    )
    const rows: QueryResultRow = result.rows[0]
    return this.mapper(rows)
  }

  async getInviteByHash (hash: StringValueObject): Promise<InviteEntityModel | null> {
    const result = await this.databaseHelper.query('SELECT * FROM invite WHERE hash = $1 AND used = false', [hash.value])
    const rows: QueryResultRow = result.rows[0]
    return this.mapper(rows)
  }

  async invalidateInvitation (hash: StringValueObject): Promise<InviteEntityModel> {
    const result = await this.databaseHelper.query('UPDATE invite SET used = true WHERE hash = $1 RETURNING *', [hash.value])
    const rows: QueryResultRow = result.rows[0]
    return this.mapper(rows)
  }
}
