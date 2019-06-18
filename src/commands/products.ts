import { getStdin } from '../helpers/process'
import client from '../helpers/client'

const get = (id?: string, cmd?: { all: any; }): Promise<void> => {
  if (cmd.all) {
    return getAll()
  } else if (id) {
    return getOne(id, cmd)
  }

  console.log('Please provide a product UUID or the --all flag')
  process.exit(1)
}

const getOne = async (id: string, cmd: any): Promise<void> => {
  const response = await client
    .get(`products/${id}`)

  if ( ! response) {
    console.error('Could not find product')
    return
  }
  const data = response.data

  let output: object

  // Gets the fields from the data that the user requested
  if (cmd.only) {
    output = {}
    const fields = cmd.only.split(',')
    fields.forEach((f: string) => output[f] = data[f])
  } else {
    output = data
  }

  // If being piped, we need to stringify it
  if (process.stdout.isTTY) {
    console.log(output)
  } else {
    console.log(JSON.stringify(output))
  }
}

const getAll = async (): Promise<void> => {
  const response = await client
    .get('products')

  console.log(response.data)
}

const update = async (id: string, cmd: any): Promise<void> => {
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

  console.log(response.data)
}

export default {
  get,
  getAll,
  getOne,
  update,
}
