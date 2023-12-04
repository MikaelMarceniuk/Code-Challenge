require("dotenv").config()
import ApiServer from "../src/server"
import supertest from "supertest"

let server: ApiServer
beforeAll(async () => {
  server = new ApiServer()
  await server.init()
  global.testRequest = supertest(server.app)
})

afterAll(async () => await server.shutdown())
