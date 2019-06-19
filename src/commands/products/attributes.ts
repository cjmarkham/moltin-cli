import { flags } from '@oclif/command'
import { Input } from '@oclif/parser/lib/flags'

import client from '../../helpers/client'
import Base from '../base';

export default class ProductsAttributes extends Base {
  static description: string = 'Gets product attributes'

  static examples: string[] = [
    `moltin products:attributes`,
  ]

  static flags: Input<any> = {
    ...Base.flags,
  }

  async run(): Promise<void> {
    const { errors, data } = await client
      .get(`products/attributes`)
      .catch((err) => err)

    if (errors) {
      this.panic(errors)
      process.exit(1)
    }

    this.output(200, 'Got product attributes', data)
  }
}
