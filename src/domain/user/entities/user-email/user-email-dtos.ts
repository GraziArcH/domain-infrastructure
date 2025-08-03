export interface UserEmailDTO {
  emailId: number
  userId: number
  email: string
  type: string
}

export type UserEmailWithoutIdDTO = Omit<UserEmailDTO, 'emailId'>
