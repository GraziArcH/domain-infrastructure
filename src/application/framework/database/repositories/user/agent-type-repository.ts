import { type IdValueObject } from '@/domain/shared'
import { AgentTypeEntityModel, type IAgentTypeRepository } from '@/domain/user'
import { type DatabaseHelper } from '@/application/framework'
import { type QueryResultRow } from 'pg'

export class AgentTypeRepository implements IAgentTypeRepository {
  constructor (private readonly databaseHelper: DatabaseHelper) { }

  private mapper (rows: QueryResultRow): AgentTypeEntityModel {
    if (!rows) return null

    return AgentTypeEntityModel.create({
      agentTypeId: rows.agent_type_id, agentType: rows.agent_type
    })
  }

  async getByAgentType (agentTypeId: IdValueObject): Promise<AgentTypeEntityModel> {
    const result = await this.databaseHelper.query('SELECT * FROM agent_type WHERE agent_type_id = $1', [agentTypeId.value])
    const rows: QueryResultRow = result.rows[0]
    return this.mapper(rows)
  }

  async get (): Promise<AgentTypeEntityModel[]> {
    const result = await this.databaseHelper.query('SELECT * FROM agent_type')
    const rows: QueryResultRow[] = result.rows

    const models = []

    for (const row of rows) models.push(this.mapper(row))

    return models
  }
}
