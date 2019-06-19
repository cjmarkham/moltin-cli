import { Command, flags } from '@oclif/command'
import { Input } from '@oclif/parser/lib/flags'

import client from '../../helpers/client'
import { panic, log } from '../../helpers/logger'

export default class ProductsAttributes extends Command {
  static description: string = 'Gets product attributes'

  static examples: string[] = [
    `moltin products:attributes`,
  ]

  static flags: Input<any> = {
    help: flags.help({ char: 'h' }),
  }

  async run(): Promise<void> {
    const { errors, data } = await client
      .get(`products/attributes`)
      .catch((err) => err)

    if (errors) {
      panic(errors)
      process.exit(1)
    }

    log(200, 'Got product attributes', data)
  }
}
