import { Command, flags } from '@oclif/command'

import client from '../../helpers/client'
import { getStdin } from '../../helpers/process'
import { Product } from '../../schemas'

export default class ProductsGet extends Command {
  static args = [
    { name: 'id' },
  ]

  static description = 'Gets a single product'

  static examples = [
    ``,
  ]

  static flags = {
    help: flags.help({ char: 'h' }),
    name: flags.string({ char: 'n' }),
  }

  async run() {
    const { args, flags } = this.parse(ProductsGet)
    let id = args.id

    const input: any = await getStdin()
    // The ID was piped in from another command
    if (input && input.id) {
      id = input.id
    }

    const payload = {
      id,
      type: 'product',
      ...flags,
    }

    const response = await client
      .put(`products/${id}`, payload)
      .catch(console.error)

    if (!response || !response.data) {
      process.exit(1)
    }

    const data: Product = response.data
    console.log(data)
  }
}
