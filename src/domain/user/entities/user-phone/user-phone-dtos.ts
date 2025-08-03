export interface UserPhoneDTO {
  phoneId: number
  userId: number
  phone: string
  whatsapp: boolean
  telegram: boolean
  type: string
}

export type UserPhoneWithoutIdDTO = Omit<UserPhoneDTO, 'phoneId'>
