import { Command, flags } from '@oclif/command'
import { IArg } from '@oclif/parser/lib/args'
import { Input } from '@oclif/parser/lib/flags'

import client from '../../helpers/client'
import { Product } from '../../schemas'

export default class ProductsGet extends Command {
  static args: IArg<string>[] = [
    { name: 'id' },
  ]

  static description: string = 'Gets a single product'

  static examples: string[] = [
    `moltin products:get {uuid}`,
    `moltin products:get {uuid} --only id,name`,
  ]

  static flags: Input<any> = {
    help: flags.help({ char: 'h' }),
    only: flags.string({ char: 'o', description: 'Only return a subset of fields' }),
  }

  async run(): Promise<void> {
    const { args, flags } = this.parse(ProductsGet)

    const response = await client
      .get(`products/${args.id}`)
      .catch(console.error)

    if ( ! response || ! response.data) {
      process.exit(1)
    }

    let output: Product = {} as Product

    // Gets the fields from the data that the user requested
    if (flags.only) {
      const fields: string[] = flags.only.split(',')
      fields.forEach((f: string) => output[f] = response.data[f])
    } else {
      output = response.data
    }

    if (process.stdout.isTTY) {
      console.log(output)
    } else {
      console.log(JSON.stringify(output))
    }
  }
}
