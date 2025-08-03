export interface UserTypeDTO {
  userTypeId: number
  userType: string
}

export type UserTypeWithoutIdDTO = Omit<UserTypeDTO, 'userTypeId'>
