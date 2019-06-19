import { Command, flags } from '@oclif/command'
import { Input } from '@oclif/parser/lib/flags'
import cli from 'cli-ux'

import client from '../../helpers/client'
import { Product } from '../../schemas'
import { parseOutput } from '../../helpers/output'
import { panic, log } from '../../helpers/logger'

export default class ProductsIndex extends Command {
  static description: string = 'Gets all products'

  static aliases: string[] = ['products:all']

  static examples: string[] = [
    `moltin products`,
    `moltin products --only id,name`,
  ]

  static flags: Input<any> = {
    help: flags.help({ char: 'h' }),
    only: flags.string({ char: 'o', description: 'Only return a subset of fields' }),
  }

  async run(): Promise<void> {
    const { flags: { only } } = this.parse(ProductsIndex)

    const { data, errors } = await client
      .get(`products`)
      .catch((err) => err)

    if (errors) {
      panic(errors)
      process.exit(1)
    }

    const output: Product = parseOutput(data, only)
    log(200, 'Got products', output)
  }
}
