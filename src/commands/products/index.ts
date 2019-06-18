import { Command, flags } from '@oclif/command'
import { Input } from '@oclif/parser/lib/flags'

import client from '../../helpers/client'
import { Product } from '../../schemas'

export default class ProductsIndex extends Command {
  static description: string = 'Gets all products'

  static examples: string[] = [
    `moltin products`,
    `moltin products --only id,name`,
  ]

  static flags: Input<any> = {
    help: flags.help({ char: 'h' }),
    only: flags.string({ char: 'o' }),
  }

  async run(): Promise<void> {
    const { flags } = this.parse(ProductsIndex)

    const response = await client
      .get(`products`)
      .catch(console.error)

    if (!response || !response.data) {
      process.exit(1)
    }

    let output: Product[] = []

    // Gets the fields from the data that the user requested
    if (flags.only) {
      const fields = flags.only.split(',')
      for (const product of response.data) {
        const p: Product = {} as Product
        fields.forEach((f: string) => p[f] = product[f])
        output.push(p)
      }
    } else {
      output = response.data
    }

    console.log(output)
  }
}
