import { type IAgentTypeRepository } from '@/domain/user/interfaces'
import { IdValueObject } from '@/domain/shared'
import { type AgentTypeEntityModel } from './agent-type-entity-model'

export class AgentTypeEntity {
  constructor (private readonly repository: IAgentTypeRepository) { }

  async getById (agentTypeId: number): Promise<AgentTypeEntityModel> {
    const agentTypeOrError = IdValueObject.create(agentTypeId)

    return await this.repository.getByAgentType(agentTypeOrError)
  }

  async get (): Promise<AgentTypeEntityModel[]> {
    return await this.repository.get()
  }
}
