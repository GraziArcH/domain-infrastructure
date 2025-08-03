import { type IUnitOfWork } from '@/application/framework'
import {
  type IUserRepository,
  type InviteEntity,
  type UpdateUserAdminDTO,
  type UpdateUserDTO,
  UserAggregate,
  type UserEmailEntity,
  type UserPhoneEntity,
  type UserTypeEntity,
  type UserAggregateModel
} from '@/domain/user'

export class UserFacade extends UserAggregate {
  constructor (
    protected readonly emailEntity: UserEmailEntity,
    protected readonly phoneEntity: UserPhoneEntity,
    protected readonly repository: IUserRepository,
    protected readonly userAggregate: UserAggregate,
    protected readonly userType: UserTypeEntity,
    protected readonly inviteEntity: InviteEntity,
    protected readonly unitOfWork: IUnitOfWork
  ) {
    super(emailEntity, phoneEntity, userType, inviteEntity, repository)
  }

  async updateUser (dto: UpdateUserDTO): Promise<UserAggregateModel> {
    try {
      await this.unitOfWork.start()

      const userAggregateEntityModelOrError = await this.userAggregate.updateUser(dto)

      if (userAggregateEntityModelOrError instanceof Error) {
        await this.unitOfWork.rollback()
        return userAggregateEntityModelOrError
      }

      await this.unitOfWork.commit()

      return userAggregateEntityModelOrError
    } catch (e) {
      await this.unitOfWork.rollback()
      throw e
    }
  }

  async updateUserByAdmin (dto: UpdateUserAdminDTO): Promise<UserAggregateModel> {
    try {
      await this.unitOfWork.start()

      const userAggregateEntityModelOrError = await this.userAggregate.updateUserByAdmin(dto)

      if (userAggregateEntityModelOrError instanceof Error) {
        await this.unitOfWork.rollback()
        return userAggregateEntityModelOrError
      }

      await this.unitOfWork.commit()

      return userAggregateEntityModelOrError
    } catch (e) {
      await this.unitOfWork.rollback()
      throw e
    }
  }

  async delete (
    idpUserId: string
  ): Promise<UserAggregateModel> {
    try {
      await this.unitOfWork.start()

      const userAggregateEntityModelOrError = await this.userAggregate.delete(idpUserId)

      if (userAggregateEntityModelOrError instanceof Error) {
        await this.unitOfWork.rollback()
        return userAggregateEntityModelOrError
      }

      await this.unitOfWork.commit()

      return userAggregateEntityModelOrError
    } catch (e) {
      await this.unitOfWork.rollback()
      throw e
    }
  }
}
