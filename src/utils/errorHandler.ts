import BaseError from "./baseError"

class ErrorHandler {
  public async handleError(err: Error): Promise<void> {
    // Here should send email or discord/slack/teams notification to the development team and save log
  }

  public isTrustedError(error: Error) {
    if (error instanceof BaseError) {
      return error.isOperational
    }
    return false
  }
}

export const errorHandler = new ErrorHandler()
