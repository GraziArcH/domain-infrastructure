import { type IInviteRepository, type InviteWithoutIdDTO, StringValueObject } from '@/domain/user'
import { InviteEntityModel } from './invite-entity-model'

export class InviteEntity {
  constructor (private readonly repository: IInviteRepository) { }

  async create (dto: InviteWithoutIdDTO): Promise<InviteEntityModel> {
    const inviteEntityModelOrError = InviteEntityModel.create(
      {
        inviteId: 1,
        ...dto
      }
    )

    return await this.repository.create(inviteEntityModelOrError)
  }

  async getInviteByHash (hash: string): Promise<InviteEntityModel> {
    const hashOrError = StringValueObject.create(hash)

    return await this.repository.getInviteByHash(hashOrError)
  }

  async invalidateInvitation (
    hash: string
  ): Promise<InviteEntityModel> {
    const hashOrError = StringValueObject.create(hash)

    return await this.repository.invalidateInvitation(hashOrError)
  }
}
