import { InvalidActionValueObjectError } from './invalid-action-value-object-error'

export class ActionValueObject {
  private constructor (private readonly action: string) {
    this.action = action
    Object.freeze(this)
  }

  public get value (): string {
    return this.action
  }

  static create (action: string): ActionValueObject {
    if (!this.validate(action)) throw new InvalidActionValueObjectError()

    return new ActionValueObject(action)
  }

  private static validate (action: string): boolean {
    if (typeof action !== 'string') return false

    if (action.length === 0 || action.length > 50) return false

    return true
  }
}
