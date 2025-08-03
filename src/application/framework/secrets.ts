import 'dotenv/config'

export class Secrets {
  static getSecret (secret: string): string | null {
    return process.env[secret]
  }

  static getSecretRequered (secret: string): string {
    const value = process.env[secret]

    if (!value) throw new Error(`A secret ${secret} is null`)

    return value
  }
}
