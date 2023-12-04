interface IGetProductsFilter {
  price: string
  priceCondition: "gt" | "gte" | "lt" | "lte"
  description: string
}

export default IGetProductsFilter
