import { type IdValueObject } from '@/domain/shared'
import { type AgentTypeEntityModel } from '@/domain/user'

export interface IAgentTypeRepository {
  getByAgentType: (agentTypeId: IdValueObject) => Promise<AgentTypeEntityModel | null>

  get: () => Promise<AgentTypeEntityModel[]>
}
