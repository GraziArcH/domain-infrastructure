import { type DatabaseHelper, type IUnitOfWork } from '@/application/framework'

export class UnitOfWork implements IUnitOfWork {
  constructor (private readonly databaseHelper: DatabaseHelper) { }

  async start (): Promise<void> {
    await this.databaseHelper.query('BEGIN')
  }

  async commit (): Promise<void> {
    await this.databaseHelper.query('COMMIT')
  }

  async rollback (): Promise<void> {
    await this.databaseHelper.query('ROLLBACK')
  }
}
