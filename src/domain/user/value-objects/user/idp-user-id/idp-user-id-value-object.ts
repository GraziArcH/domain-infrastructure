import { InvalidIDPUserIdValueObjectError } from './invalid-idp-user-id-value-object-error'

export class IDPUserIdValueObject {
  private constructor (private readonly idpUserId: string) {
    this.idpUserId = idpUserId
    Object.freeze(this)
  }

  public get value (): string {
    return this.idpUserId
  }

  static create (idpUserId: string): IDPUserIdValueObject {
    if (!this.validate(idpUserId)) throw new InvalidIDPUserIdValueObjectError()

    return new IDPUserIdValueObject(idpUserId)
  }

  private static validate (idpUserId: string): boolean {
        if (typeof idpUserId !== 'string') return false

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

    return uuidRegex.test(idpUserId)
  }
}
