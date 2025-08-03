import { IdValueObject, NotFoundError } from '@/domain/shared'
import { type IUserPhoneRepository, type UserPhoneDTO, type UserPhoneWithoutIdDTO } from '@/domain/user'
import { UserPhoneEntityModel } from './user-phone-entity-model'

export class UserPhoneEntity {
  constructor (protected readonly repository: IUserPhoneRepository) { }

  async create (dto: UserPhoneWithoutIdDTO): Promise<UserPhoneEntityModel> {
    const phoneEntityModelOrError = UserPhoneEntityModel.create({
      phoneId: 1,
      ...dto
    })

    const phoneExists = await this.repository.getPhoneByPhone(phoneEntityModelOrError.phone)

    if (phoneExists) throw new NotFoundError('Telefone já cadastrado')

    return await this.repository.create(phoneEntityModelOrError)
  }

  async getByUserId (
    userId: number
  ): Promise<UserPhoneEntityModel[]> {
    const userIdOrError = IdValueObject.create(userId)

    return await this.repository.getPhoneByUserId(userIdOrError)
  }

  async update (dto: UserPhoneDTO): Promise<UserPhoneEntityModel> {
    const phoneEntityModelOrError = UserPhoneEntityModel.create(dto)

    const phoneExists = await this.repository.getPhoneById(phoneEntityModelOrError.phoneId)

    if (!phoneExists) throw new NotFoundError('Telefone não cadastrado')

    return await this.repository.update(phoneEntityModelOrError)
  }

  async delete (phoneId: number): Promise<UserPhoneEntityModel> {
    const phoneIdOrError = IdValueObject.create(phoneId)

    const phoneExists = await this.repository.getPhoneById(phoneIdOrError)

    if (!phoneExists) throw new NotFoundError('Telefone não existe')

    return await this.repository.delete(phoneIdOrError)
  }
}
