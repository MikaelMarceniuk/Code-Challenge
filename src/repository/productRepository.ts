import { injectable } from "tsyringe"
import Product from "../models/product"
import IProduct from "../types/IProduct"

@injectable()
class ProductRepository {
  async getProducts() {
    return await Product.find({})
  }

  async getProductById(productId: string) {
    return await Product.findById(productId)
  }

  // TODO Type query
  async getProductWithFilters(query: any) {
    return await query.exec()
  }

  async createProduct(newProduct: IProduct) {
    await Product.create(newProduct)
  }

  async updateProduct(productId: string, updatedProduct: any) {
    await Product.findOneAndUpdate({ _id: productId }, updatedProduct)
  }

  async deleteProduct(productId: string) {
    await Product.findOneAndDelete({ _id: productId })
  }
}

export default ProductRepository
