export interface UserDTO {
  userId: number
  idpUserId: string
  companyId: number
  name: string
  surname: string
  cpf: string
  userTypeId: number
  admin: boolean
  active: boolean
  createdAt: Date
  email?: { emailId: number, userId: number, email: string, type: string }
  phones?: Array<{ phoneId: number, userId: number, phone: string, whatsapp: boolean, telegram: boolean, type: string }>
  lastLoginAt?: Date
}

export interface UpdateUserDTO {
  idpUserId: string
  name: string
  surname: string
  phones: Array<{ phoneId: number, phone: string, type: string }>
  lastLoginAt?: Date
}

export interface UpdateUserAdminDTO {
  idpUserId: string
  userIdToBeUpdated: number
  name: string
  surname: string
  email: string
  userTypeId: number
  phones: Array<{ phoneId: number, phone: string, type: string }>
  admin: boolean
  active: boolean
  lastLoginAt?: Date
}
