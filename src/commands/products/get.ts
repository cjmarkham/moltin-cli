import { IArg } from '@oclif/parser/lib/args'
import { Input } from '@oclif/parser/lib/flags'

import client from '../../helpers/client'
import { Product } from '../../schemas'
import Base from '../base'

export default class ProductsGet extends Base {
  static args: IArg<string>[] = [
    { name: 'id' },
  ]

  static description: string = 'Gets a single product'

  static examples: string[] = [
    `moltin products:get {uuid}`,
    `moltin products:get {uuid} --only id,name`,
  ]

  static flags: Input<any> = {
    ...Base.flags,
  }

  async run(): Promise<void> {
    const { args } = this.parse(ProductsGet)

    const { errors, data } = await client
      .get(`products/${args.id}`)
      .catch((err) => err)

    if (errors) {
      this.panic(errors)
      process.exit(1)
    }

    const output: Product = this.parseOutput(data)

    if (process.stdout.isTTY) {
      this.output(200, 'Got product', output)
    } else {
      console.log(JSON.stringify(output))
    }
  }
}
