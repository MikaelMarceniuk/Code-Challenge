import { injectable } from "tsyringe"
import Product from "../../models/product"
import ProductRepository from "../../repository/productRepository"
import IGetProductsFilter from "../../types/IGetProductsFilter"
import IProduct from "../../types/IProduct"
import BaseError from "../../utils/baseError"
import EHttpStatusCode from "../../enum/EHttpStatusCode"

@injectable()
class ProductService {
  constructor(private productRepo: ProductRepository) {}

  async getProducts(filters: IGetProductsFilter) {
    if (filters) {
      this.validateFilters(filters)
      const query = Product.find()

      if (filters.price) {
        query.where("price")[filters.priceCondition](Number(filters.price))
      }

      if (filters.description) {
        const regex = new RegExp(filters.description, "i")
        query.where("description").regex(regex)
      }

      return await this.productRepo.getProductWithFilters(query)
    }

    return await this.productRepo.getProducts()
  }

  async getProductById(productId: string) {
    return await this.productRepo.getProductById(productId)
  }

  async createProduct(product: IProduct) {
    this.validateCreateProduct(product)
    const newProduct: IProduct = {
      name: product.name,
      description: product.description,
      price: Number(product.price),
    }

    await this.productRepo.createProduct(newProduct)
  }

  async updateProduct(productId: string, updatedProduct: Partial<IProduct>) {
    this.validateUpdateProduct(updatedProduct)
    await this.productRepo.updateProduct(productId, updatedProduct)
  }

  async deleteProduct(productId: string) {
    await this.productRepo.deleteProduct(productId)
  }

  private validateFilters(filters: IGetProductsFilter) {
    if (filters.price) {
      const { price, priceCondition } = filters
      if (Number.isNaN(price)) {
        throw new BaseError(
          "BAD_REQUEST",
          EHttpStatusCode.BAD_REQUEST,
          "Failed to convert price to Number",
          true
        )
      }

      const validPriceCond = ["gt", "gte", "lt", "lte"]
      if (!validPriceCond.includes(priceCondition)) {
        throw new BaseError(
          "BAD_REQUEST",
          EHttpStatusCode.BAD_REQUEST,
          `Expected PriceCondition to be ${validPriceCond.join(
            ","
          )}, but it is ${priceCondition}`,
          true
        )
      }
    }

    if (filters.description && typeof filters.description != "string") {
      throw new BaseError(
        "BAD_REQUEST",
        EHttpStatusCode.BAD_REQUEST,
        `Expected Description filter to be a string, but it is ${typeof filters.description}`,
        true
      )
    }
  }

  private validateCreateProduct({ name, description, price }: IProduct) {
    if (!name) throw new Error(`Product name is not defined`)
    if (!description) throw new Error(`Product description is not defined`)
    if (!price) throw new Error(`Product price is not defined`)

    if (typeof name != "string")
      throw new BaseError(
        "BAD_REQUEST",
        EHttpStatusCode.BAD_REQUEST,
        `Expected product name to be String, but it is ${typeof name}`,
        true
      )

    if (typeof description != "string")
      throw new BaseError(
        "BAD_REQUEST",
        EHttpStatusCode.BAD_REQUEST,
        `Expected product description to be String, but it is ${typeof name}`,
        true
      )

    if (Number.isNaN(Number(price)))
      throw new BaseError(
        "BAD_REQUEST",
        EHttpStatusCode.BAD_REQUEST,
        `Error in converting product price to Number`,
        true
      )
  }

  private validateUpdateProduct(p: Partial<IProduct>) {
    if (p.name && typeof p.name != "string")
      throw new BaseError(
        "BAD_REQUEST",
        EHttpStatusCode.BAD_REQUEST,
        `Expected product name to be a string, but it is ${typeof p.name}`,
        true
      )

    if (p.description && typeof p.description != "string")
      throw new BaseError(
        "BAD_REQUEST",
        EHttpStatusCode.BAD_REQUEST,
        `Expected product description to be a string, but it is ${typeof p.description}`,
        true
      )

    if (p.price && Number.isNaN(Number(p.price)))
      throw new BaseError(
        "BAD_REQUEST",
        EHttpStatusCode.BAD_REQUEST,
        "Error in converting product price to Number",
        true
      )
  }
}

export default ProductService
