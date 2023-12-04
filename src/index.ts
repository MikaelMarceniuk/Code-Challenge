require("dotenv").config()
import ApiServer from "./server"

enum EExitStatus {
  Success = 0,
  Failure = 1,
}

process.on("unhandledRejection", (reason, promise) => {
  console.error(
    `App exiting due to an unhandled promise: ${promise} and reason: ${reason}`
  )
  throw reason
})

process.on("uncaughtException", (error) => {
  console.log("Caiu aqui")
  console.error(`App exiting due to an uncaught exception: ${error}`)
  process.exit(EExitStatus.Failure)
})
;(async () => {
  try {
    const server = new ApiServer(Number(process.env.PORT))
    await server.init()
    server.listen()

    const exitSignals: NodeJS.Signals[] = ["SIGINT", "SIGTERM", "SIGQUIT"]
    exitSignals.map((signal) =>
      process.on(signal, async () => {
        try {
          await server.shutdown()
          console.info("App exited with success")
          process.exit(EExitStatus.Success)
        } catch (e) {
          console.error("App exited with error: ", e)
          process.exit(EExitStatus.Failure)
        }
      })
    )
  } catch (e) {
    console.error("App exited with error: ", e)
    process.exit(EExitStatus.Failure)
  }
})()
