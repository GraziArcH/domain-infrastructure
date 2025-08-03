import { type DatabaseHelper } from '@/application/framework'

export class MockSecurityDatabase {
  constructor (private readonly databaseHelper: DatabaseHelper) { }

  async clearTables (): Promise<void> {
    await this.databaseHelper.query(`
            DELETE FROM audit;
        `)
  }
}
