import {
  ClassErrorMiddleware,
  Controller,
  Delete,
  Get,
  Post,
  Put,
} from "@overnightjs/core"
import { NextFunction, Request, Response } from "express"
import { injectable } from "tsyringe"
import ProductService from "./service"
import IGetProductsFilter from "../../types/IGetProductsFilter"
import ErrorHandler from "../../middlewares/errorHandlerMiddleware"
import IProduct from "../../types/IProduct"

@Controller("api/product")
@ClassErrorMiddleware(ErrorHandler)
@injectable()
class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  private async getProducts(
    req: Request<{}, {}, {}, IGetProductsFilter>,
    res: Response,
    next: NextFunction
  ) {
    try {
      res.json(await this.productService.getProducts(req.query))
    } catch (e) {
      return next(e)
    }
  }

  @Get(":productId")
  private async getProductById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { productId } = req.params
      res.json(await this.productService.getProductById(productId))
    } catch (e) {
      return next(e)
    }
  }

  @Post()
  private async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      await this.productService.createProduct(req.body)

      res.statusCode = 201
      res.send()
    } catch (e) {
      return next(e)
    }
  }

  @Put(":productId")
  private async updateProduct(
    req: Request<{ productId: string }, {}, Partial<IProduct>>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { productId } = req.params
      const updatedProduct = req.body

      await this.productService.updateProduct(productId, updatedProduct)

      res.send()
    } catch (e) {
      return next(e)
    }
  }

  @Delete(":productId")
  private async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      await this.productService.deleteProduct(req.params.productId)

      res.send()
    } catch (e) {
      return next(e)
    }
  }
}

export default ProductController
