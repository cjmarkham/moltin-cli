import { Product } from "../schemas";

const parseOutput = (data: Product, only?: string): Product => {
  let output: Product = {} as Product

  // Gets the fields from the data that the user requested
  if (only) {
    const fields: string[] = only.split(',')
    fields.forEach((f: string) => output[f] = data[f])
  } else {
    output = data
  }

  return output
}

export {
  parseOutput,
}
