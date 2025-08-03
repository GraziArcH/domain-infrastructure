export interface AgentTypeDTO {
  agentTypeId: number
  agentType: string
}

export type AgentTypeWithoutIdDTO = Omit<AgentTypeDTO, 'agentTypeId'>
