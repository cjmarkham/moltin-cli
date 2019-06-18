interface Product {
  id: string,
}

interface ResponseError {
  status?: number
  title: string
  detail: string
}

export {
  Product,
  ResponseError,
}
