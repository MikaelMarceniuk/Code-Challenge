import mongoose from "mongoose"
import IProduct from "../types/IProduct"

const productSchema = new mongoose.Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
})

const Product = mongoose.model("Product", productSchema)

export default Product
