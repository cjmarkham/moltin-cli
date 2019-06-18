import { Command, flags } from '@oclif/command'

import client from '../../helpers/client'
import { Product } from '../../schemas'

export default class ProductsIndex extends Command {
  static description = 'Gets all products'

  static examples = [
    ``,
  ]

  static flags = {
    help: flags.help({ char: 'h' }),
    only: flags.string({ char: 'o' }),
  }

  async run() {
    const { flags } = this.parse(ProductsIndex)

    const response = await client
      .get(`products`)
      .catch(console.error)

    if (!response || !response.data) {
      process.exit(1)
    }

    const data = response.data

    let output: Product[] = []

    // Gets the fields from the data that the user requested
    if (flags.only) {
      const fields = flags.only.split(',')
      for (const product of data) {
        const p = {}
        fields.forEach((f: string) => p[f] = product[f])
        output.push(p as Product)
      }
    } else {
      output = data
    }

    console.log(output)
  }
}
