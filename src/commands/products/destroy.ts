import { Command, flags } from '@oclif/command'
import { IArg } from '@oclif/parser/lib/args'
import { Input } from '@oclif/parser/lib/flags'

import client from '../../helpers/client'
import { panic, log } from '../../helpers/logger'

export default class ProductsDestroy extends Command {
  static args: IArg<string>[] = [
    { name: 'id' },
  ]

  static description: string = 'Destroys a product'

  static examples: string[] = [
    `moltin products:destroy {uuid}`,
  ]

  static flags: Input<any> = {
    help: flags.help({ char: 'h' }),
  }

  async run(): Promise<void> {
    const { args } = this.parse(ProductsDestroy)

    const { errors } = await client
      .delete(`products/${args.id}`, {}) // <-- no idea why body is needed heree
      .catch((err) => err)

    if (errors) {
      panic(errors)
      process.exit(1)
    }

    log(204, 'Product has been deleted')
  }
}
