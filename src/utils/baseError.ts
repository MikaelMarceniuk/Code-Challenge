import EHttpStatusCode from "../enum/EHttpStatusCode"

class BaseError extends Error {
  public readonly name: string
  public readonly httpCode: EHttpStatusCode
  public readonly description: string
  public readonly isOperational: boolean

  constructor(
    name: string,
    httpCode: EHttpStatusCode,
    description: string,
    isOperational: boolean
  ) {
    super(description)
    Object.setPrototypeOf(this, new.target.prototype)

    this.name = name
    this.httpCode = httpCode
    this.description = description
    this.isOperational = isOperational

    Error.captureStackTrace(this)
  }
}

export default BaseError
