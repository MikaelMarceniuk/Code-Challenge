import { Server } from "@overnightjs/core"
import express from "express"
import mongoose from "mongoose"
import morgan from "morgan"
import MongoConn from "./db"
import { container } from "tsyringe"
import ProductController from "./resources/product/controller"
import ProductRepository from "./repository/productRepository"

class ApiServer extends Server {
  constructor(private PORT = 3000) {
    super()
  }

  async init() {
    this.loadMiddlewares()
    this.loadResources()
    await this.loadDatabase()
  }

  listen() {
    this.app.listen(this.PORT, () =>
      console.log(`Server listening on port: ${this.PORT}`)
    )
  }

  async shutdown() {
    await mongoose.disconnect()
  }

  private async loadDatabase() {
    await new MongoConn().loadConnection()
    container.resolve(MongoConn)
  }

  private loadMiddlewares() {
    this.app.use(express.json())
    this.app.use(morgan("dev"))
  }

  private loadResources() {
    const productController = container.resolve(ProductController)
    container.resolve(ProductRepository)

    super.addControllers([productController])
  }
}

export default ApiServer
