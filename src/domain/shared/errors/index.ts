export class DomainError extends Error {
  public code = 400
  constructor (message?: string) {
    super()
    this.message = message
    this.name = 'DomainError'
  }
}

export class NotFoundError extends DomainError {
  public code = 404
  constructor (message: string) {
    super(message)
    this.message = message
    this.name = 'NotFoundError'
  }
}

export class UnauthorizedError extends DomainError {
  public code = 401
  constructor (message: string) {
    super(message)
    this.message = message
  }
}
