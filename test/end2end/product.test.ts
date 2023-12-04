describe("Product gracefull end2end tests", () => {
  const newProducts = [
    {
      id: undefined,
      name: "Calca",
      description: "Jeans azul",
      price: 39.99,
    },
    {
      id: undefined,
      name: "Calca",
      description: "Cargo preta",
      price: 99.99,
    },
  ]

  it("Should create 2 new products", async () => {
    for (const p of newProducts) {
      const newP = { ...p }
      delete newP.id

      const { body, statusCode } = await global.testRequest
        .post("/api/product")
        .send(p)

      expect(body).toStrictEqual({})
      expect(statusCode).toBe(201)
    }
  })

  it("Should retrieve 2 products", async () => {
    const { body } = await global.testRequest.get("/api/product")

    expect(Array.isArray(body)).toBe(true)
    expect(body.length).toBe(2)

    newProducts[0].id = body[0]._id
    newProducts[1].id = body[1]._id
  })

  it("Should update product", async () => {
    const newDescription = "Cargo azul"
    const { body, statusCode } = await global.testRequest
      .put(`/api/product/${newProducts[1].id}`)
      .send({ description: newDescription })

    expect(body).toStrictEqual({})
    expect(statusCode).toBe(200)

    newProducts[1].description = newDescription
  })

  it("Should retrieve product by id with new updated value", async () => {
    const { body } = await await global.testRequest.get(
      `/api/product/${newProducts[1].id}`
    )

    expect(body.description).toBe(newProducts[1].description)
  })

  it("Should retrieve products with price greater than 40", async () => {
    const queryParams = `?price=40&priceCondition=gt`
    const { body } = await await global.testRequest.get(
      `/api/product${queryParams}`
    )

    expect(Array.isArray(body)).toBe(true)
    expect(body.length).toBe(1)
    expect(body[0]._id).toBe(newProducts[1].id)
  })

  it("Should retrieve products that has jeans on description", async () => {
    const queryParams = `?description=jeans`
    const { body } = await await global.testRequest.get(
      `/api/product${queryParams}`
    )

    expect(Array.isArray(body)).toBe(true)
    expect(body.length).toBe(1)
    expect(body[0]._id).toBe(newProducts[0].id)
  })

  it("Should delete all products", async () => {
    for (const p of newProducts) {
      const { body, statusCode } = await global.testRequest.delete(
        `/api/product/${p.id}`
      )

      expect(body).toStrictEqual({})
      expect(statusCode).toBe(200)
    }
  })
})
