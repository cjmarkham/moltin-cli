import { IArg } from '@oclif/parser/lib/args'
import { Input } from '@oclif/parser/lib/flags'

import client from '../../helpers/client'
import Base from '../base'

export default class ProductsDestroy extends Base {
  static args: IArg<string>[] = [
    { name: 'id' },
  ]

  static description: string = 'Destroys a product'

  static examples: string[] = [
    `moltin products:destroy {uuid}`,
  ]

  static flags: Input<any> = {
    ...Base.flags,
  }

  async run(): Promise<void> {
    const { args } = this.parse(ProductsDestroy)

    const { errors } = await client
      .delete(`products/${args.id}`, {}) // <-- no idea why body is needed heree
      .catch((err) => err)

    if (errors) {
      this.panic(errors)
      process.exit(1)
    }

    this.output(204, 'Product has been deleted')
  }
}
