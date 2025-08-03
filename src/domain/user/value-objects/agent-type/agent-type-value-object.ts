import { InvalidAgentTypeValueObjectError } from './invalid-agent-type-value-object-error'

export class AgentTypeValueObject {
  private constructor (private readonly agentType: string) {
    this.agentType = agentType
    Object.freeze(this)
  }

  public get value (): string {
    return this.agentType
  }

  static create (agentType: string): AgentTypeValueObject {
    if (!this.validate(agentType)) throw new InvalidAgentTypeValueObjectError()
    return new AgentTypeValueObject(agentType)
  }

  private static validate (agentType: string): boolean {
    if (
      agentType !== 'Comercializadora' &&
            agentType !== 'Distribuidora' &&
            agentType !== 'Geradora' &&
            agentType !== 'Consumidora'
    ) return false

    return true
  }
}