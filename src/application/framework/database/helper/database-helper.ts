import ArchFramework from 'versatus-arch-framework/src' // Adjust import as necessary
import { type QueryResult, type QueryResultRow } from 'pg'
import type ArcHPgDb from 'versatus-arch-framework/src/cross/ArcH-Postgres-Wrapper'

export class DatabaseHelper {
  private readonly db: ArcHPgDb

  constructor(databaseName: string) {
    // Create a new instance of ArcHPgDb for each database
    this.db = ArchFramework.getPgInstance(databaseName)
  }

  async disconnect(): Promise<void> {
    await this.db.close() // Close the database connection
  }

  async query(query: string, parameters?: unknown[]): Promise<QueryResult<QueryResultRow>> {
    // Use the ArcHPgDb's query method to execute SQL statements
    return await this.db.query(query, parameters)
  }
}
