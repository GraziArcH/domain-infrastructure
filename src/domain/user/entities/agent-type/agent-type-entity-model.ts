import { type IEntityModel, IdValueObject } from '@/domain/shared'
import { type AgentTypeDTO, AgentTypeValueObject } from '@/domain/user'

export class AgentTypeEntityModel implements IEntityModel<AgentTypeDTO> {
  private constructor (
    public readonly agentTypeId: IdValueObject,
    public readonly agentType: AgentTypeValueObject
  ) { }

  static create (
    {
      agentTypeId,
      agentType
    }: AgentTypeDTO
  ): AgentTypeEntityModel {
    const agentTypeIdOrError = IdValueObject.create(agentTypeId)

    const agentTypeOrError = AgentTypeValueObject.create(agentType)

    return new AgentTypeEntityModel(
      agentTypeIdOrError,
      agentTypeOrError
    )
  }

  getValues (): AgentTypeDTO {
    return {
      agentTypeId: this.agentTypeId.value,
      agentType: this.agentType.value
    }
  }
}
