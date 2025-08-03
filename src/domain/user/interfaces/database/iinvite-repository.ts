import { type InviteEntityModel, type StringValueObject } from '@/domain/user'

export interface IInviteRepository {
  create: (invite: InviteEntityModel) => Promise<InviteEntityModel>

  getInviteByHash: (hash: StringValueObject) => Promise<InviteEntityModel | null>

  invalidateInvitation: (hash: StringValueObject) => Promise<InviteEntityModel>
}
