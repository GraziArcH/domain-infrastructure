import { type IdValueObject } from '@/domain/shared'
import { UserTypeEntityModel, type IUserTypeRepository } from '@/domain/user'
import { type DatabaseHelper } from '@/application/framework'
import { type QueryResultRow } from 'pg'

export class UserTypeRepository implements IUserTypeRepository {
  constructor (private readonly databaseHelper: DatabaseHelper) { }

  private async mapper (rows: QueryResultRow): Promise<UserTypeEntityModel> {
    if (!rows) return null

    return UserTypeEntityModel.create({
      userTypeId: rows.user_type_id,
      userType: rows.user_type
    })
  }

  async getByUserTypeId (userTypeId: IdValueObject): Promise<UserTypeEntityModel> {
    const result = await this.databaseHelper.query('SELECT * FROM user_type WHERE user_type_id = $1', [userTypeId.value])
    const rows: QueryResultRow = result.rows[0]
    return await this.mapper(rows)
  }

  async getAll (): Promise<UserTypeEntityModel[]> {
    const result = await this.databaseHelper.query('SELECT * FROM user_type')
    const rows: QueryResultRow[] = result.rows

    const models = []

    for (const row of rows) models.push(await this.mapper(row))

    return models
  }
}
