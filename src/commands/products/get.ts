import { Command, flags } from '@oclif/command'
import { IArg } from '@oclif/parser/lib/args'
import { Input } from '@oclif/parser/lib/flags'

import client from '../../helpers/client'
import { Product } from '../../schemas'
import { parseOutput } from '../../helpers/output';

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

    const output: Product = parseOutput(response.data, flags.only)

    if (process.stdout.isTTY) {
      console.log(output)
    } else {
      console.log(JSON.stringify(output))
    }
  }
}
