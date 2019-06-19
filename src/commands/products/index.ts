import { flags } from '@oclif/command'
import { Input } from '@oclif/parser/lib/flags'

import client from '../../helpers/client'
import { Product } from '../../schemas'
import Base from '../base'

export default class ProductsIndex extends Base {
  static description: string = 'Gets all products'

  static aliases: string[] = ['products:all']

  static examples: string[] = [
    `moltin products`,
    `moltin products --only id,name`,
  ]

  static flags: Input<any> = {
    ...Base.flags,
  }

  async run(): Promise<void> {
    const { data, errors } = await client
      .get(`products`)
      .catch((err) => err)

    if (errors) {
      this.panic(errors)
      process.exit(1)
    }

    const output: Product = this.parseOutput(data)
    this.output(200, 'Got products', output)
  }
}
