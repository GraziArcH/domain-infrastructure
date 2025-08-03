export interface InviteDTO {
  inviteId: number
  hash: string
  email: string
  userAdminId: number
  companyId: number
  expirationsDate: Date
  used: boolean
}

export type InviteWithoutIdDTO = Omit<InviteDTO, 'inviteId'>
