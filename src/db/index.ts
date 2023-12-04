import mongoose from "mongoose"
import { singleton } from "tsyringe"

@singleton()
class MongoConn {
  public async loadConnection() {
    try {
      await mongoose.connect(this.createConnString())
      console.log("Connected to MongoDb")
    } catch (e: any) {
      throw new Error("Could not connect to database: " + e.message)
    }
  }

  private createConnString() {
    const isTestEnv = process.env.NODE_ENV == "test"

    const host = process.env.MONGODB_HOST
    const port = Number(process.env.MONGODB_PORT)
    const database = process.env.MONGODB_DB

    return `mongodb://${host}:${port}/${database}`
  }
}

export default MongoConn
