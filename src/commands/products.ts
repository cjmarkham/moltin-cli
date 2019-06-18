import { getStdin } from '../helpers/process'
import client from '../helpers/client'

import { newResponseError } from '../helpers/errors'
import { Product, ResponseError } from '../schemas'

const get = async (id: string, cmd: any): Promise<Product | ResponseError[]> => {
  const response = await client
    .get(`products/${id}`)
    .catch(console.error)

  if ( ! response || ! response.data) {
    return [newResponseError(400, 'No response', 'There was no response')]
  }

  const data = response.data

  let output: Product

  // Gets the fields from the data that the user requested
  if (cmd.only) {
    const fields = cmd.only.split(',')
    fields.forEach((f: string) => output[f] = data[f])
  } else {
    output = data
  }

  return output
}

const gets = async (cmd: any): Promise<Product[] | ResponseError[]> => {
  const response = await client
    .get('products')
    .catch(console.error)

  if ( ! response || ! response.data) {
    return [newResponseError(400, 'No response', 'There was no response')]
  }

  return response.data
}

const update = async (id: string, cmd: any): Promise<Product | ResponseError[]> => {
  const input: any = await getStdin()

  // The ID was piped in from another command
  if (input && input.id) {
    id = input.id
  }

  const payload: any = {
      id,
      type: 'product',
  }

  // TODO: How do we handle payloads?
  // Do we allow json to be passed?
  // Do we allow a json filename to be passed?
  // Do we just use arguments?
  if (cmd.name) {
    // This can get pretty messy if everything is passed as an argument
    payload.name = cmd.name
  }

  const response = await client
    .put(`products/${id}`, payload)
    .catch(console.error)

    if ( ! response || ! response.data) {
      return [newResponseError(400, 'No response', 'There was no response')]
    }

  return response.data
}

export default {
  get,
  gets,
  update,
}
