import { type IdValueObject } from '@/domain/shared'
import { type EmailValueObject, type IUserEmailRepository, UserEmailEntityModel } from '@/domain/user'
import { type DatabaseHelper } from '@/application/framework'
import { type QueryResultRow } from 'pg'

export class UserEmailRepository implements IUserEmailRepository {
  constructor (private readonly databaseHelper: DatabaseHelper) { }

  private mapper (rows: QueryResultRow): UserEmailEntityModel {
    if (!rows) return null

    return UserEmailEntityModel.create(
      {
        emailId: rows.email_id,
        userId: rows.user_id,
        email: rows.email,
        type: rows.type
      }
    )
  }

  async create (email: UserEmailEntityModel): Promise<UserEmailEntityModel> {
    const query = `
      INSERT INTO email (user_id, email, type)
      VALUES ($1, $2, $3) RETURNING *
    `
    const result = await this.databaseHelper.query(
      query,
      [email.userId.value, email.email.value, email.type.value]
    )
    const rows: QueryResultRow = result.rows[0]
    return this.mapper(rows)
  }

  async getEmailById (emailId: IdValueObject): Promise<UserEmailEntityModel | null> {
    const result = await this.databaseHelper.query('SELECT * FROM email WHERE email_id = $1', [
      emailId.value
    ])
    const rows: QueryResultRow = result.rows[0]
    return this.mapper(rows)
  }

  async getEmailByUserId (userId: IdValueObject): Promise<UserEmailEntityModel[]> {
    const result = await this.databaseHelper.query('SELECT * FROM email WHERE user_id = $1', [
      userId.value
    ])
    const rows: QueryResultRow[] = result.rows

    const models = []

    for (const row of rows) models.push(this.mapper(row))

    return models
  }

  async getEmailByEmail (email: EmailValueObject): Promise<UserEmailEntityModel> {
    const result = await this.databaseHelper.query('SELECT * FROM email WHERE email = $1', [
      email.value
    ])
    const rows: QueryResultRow = result.rows[0]
    return this.mapper(rows)
  }

  async update (email: UserEmailEntityModel): Promise<UserEmailEntityModel> {
    const query = `
      UPDATE email
      SET email = $1, type = $2
      WHERE email_id = $3 AND user_id = $4 RETURNING *
    `
    const result = await this.databaseHelper.query(
      query,
      [email.email.value, email.type.value, email.emailId.value, email.userId.value]
    )
    const rows: QueryResultRow = result.rows[0]
    return this.mapper(rows)
  }

  async delete (emailId: IdValueObject): Promise<UserEmailEntityModel> {
    const result = await this.databaseHelper.query(
      'DELETE FROM email WHERE email_id = $1 RETURNING *',
      [emailId.value]
    )
    const rows: QueryResultRow = result.rows[0]
    return this.mapper(rows)
  }

  async deleteByUserId (userId: IdValueObject): Promise<UserEmailEntityModel[]> {
    const result = await this.databaseHelper.query(
      'DELETE FROM email WHERE user_id = $1 RETURNING *',
      [userId.value]
    )
    const rows: QueryResultRow[] = result.rows

    const models = []

    for (const row of rows) models.push(this.mapper(row))

    return models
  }
}
