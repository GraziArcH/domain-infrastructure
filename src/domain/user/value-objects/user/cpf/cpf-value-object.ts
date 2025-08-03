import { InvalidCPFValueObjectError } from './invalid-cpf-value-object-error'

export class CPFValueObject {
  private constructor (private readonly cpf: string) {
    this.cpf = cpf
    Object.freeze(this)
  }

  public get value (): string {
    return this.cpf
  }

  static create (cpf: string): CPFValueObject {
    if (!this.validate(cpf)) throw new InvalidCPFValueObjectError()

    return new CPFValueObject(cpf)
  }

  private static validate (cpf: string): boolean {
    const cpfFormated = cpf.replace(/\D/g, '')

    if (cpfFormated.length !== 11) return false

    if (/^(\d)\1{10}$/.test(cpfFormated)) return false

    let sum = 0

    for (let i = 0; i < 9; i++) sum += parseInt(cpfFormated.charAt(i)) * (10 - i)

    let remainder = sum % 11

    const digitOne = remainder < 2 ? 0 : 11 - remainder

    if (digitOne !== parseInt(cpfFormated.charAt(9))) return false

    sum = 0

    for (let i = 0; i < 10; i++) sum += parseInt(cpfFormated.charAt(i)) * (11 - i)

    remainder = sum % 11

    const digitTwo = remainder < 2 ? 0 : 11 - remainder

    if (digitTwo !== parseInt(cpfFormated.charAt(10))) return false

    return true
  }
}
