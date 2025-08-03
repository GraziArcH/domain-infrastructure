export interface AuditDTO {
  auditId: number
  action: string
  date: Date
  details: string
  identity: string
  origin: string
  status: string
}

export type AuditDTOWithoutId = Omit<AuditDTO, 'auditId'>
