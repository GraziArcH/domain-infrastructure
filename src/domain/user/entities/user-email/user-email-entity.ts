import { IdValueObject, NotFoundError } from '@/domain/shared'
import { type UserEmailDTO, type UserEmailWithoutIdDTO, type IUserEmailRepository, EmailValueObject } from '@/domain/user'
import { UserEmailEntityModel } from './user-email-entity-model'

export class UserEmailEntity {
  constructor (protected readonly repository: IUserEmailRepository) { }

  async create (dto: UserEmailWithoutIdDTO): Promise<UserEmailEntityModel> {
    const emailEntityModelOrError = UserEmailEntityModel.create({
      emailId: 1,
      ...dto
    })

    const emailExists = await this.repository.getEmailByEmail(emailEntityModelOrError.email)

    if (emailExists) throw new NotFoundError('Email já cadastrado')

    return await this.repository.create(emailEntityModelOrError)
  }

  async getEmailByUserId (
    userId: number
  ): Promise<UserEmailEntityModel[]> {
    const userIdOrError = IdValueObject.create(userId)

    return await this.repository.getEmailByUserId(userIdOrError)
  }

  async update (dto: UserEmailDTO): Promise<UserEmailEntityModel> {
    const emailEntityModelOrError = UserEmailEntityModel.create(dto)

    const emailExists = await this.repository.getEmailById(emailEntityModelOrError.emailId)

    if (!emailExists) throw new NotFoundError('Email não cadastrado')

    return await this.repository.update(emailEntityModelOrError)
  }

  async delete (emailId: number): Promise<UserEmailEntityModel> {
    const emailIdOrError = IdValueObject.create(emailId)

    const emailExists = await this.repository.getEmailById(emailIdOrError)

    if (!emailExists) throw new NotFoundError('Email não cadastrado')

    return await this.repository.delete(emailIdOrError)
  }

  async getEmailByEmail (email: string): Promise<UserEmailEntityModel | null>{
    const emailOrError = EmailValueObject.create(email)

    return await this.repository.getEmailByEmail(emailOrError)
  }
}
