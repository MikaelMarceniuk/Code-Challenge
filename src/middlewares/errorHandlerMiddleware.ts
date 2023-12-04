import { Request, Response, NextFunction } from "express"
import BaseError from "../utils/baseError"
import { errorHandler } from "../utils/errorHandler"

const ErrorHandler = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!errorHandler.isTrustedError(err)) {
    // Will pass if error is a "programmer error", so our application should restart
    throw err
  }
  await errorHandler.handleError(err)

  const baseError = err as BaseError
  res.statusCode = baseError.httpCode
  res.statusMessage = baseError.name
  res.json({ message: baseError.message })
}

export default ErrorHandler
