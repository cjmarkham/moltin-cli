import { flags } from '@oclif/command'
import { Input } from '@oclif/parser/lib/flags'

import client from '../../helpers/client'
import { Product } from '../../schemas'
import Base from '../base'

export default class ProductsCreate extends Base {
  static description: string = 'Creates a product'

  static examples: string[] = [
    `moltin products:create -n 'Some name'`,
    `moltin products:create -j {name: 'Some name'}`,
    `moltin products:create -f path/to/json/file`,
  ]

  static flags: Input<any> = {
    ...Base.flags,
    json: flags.string({ char: 'j', description: 'A JSON object of attributes to update' }),
    file: flags.string({ char: 'f', description: 'A JSON file of update fields' }),
  }

  async run(): Promise<void> {
    const { flags: { json, file } } = this.parse(ProductsCreate)

    let payload: any = {}

    if (json) {
      payload = { ...payload, ...this.payloadFromJson(json) }
    } else if (file) {
      payload = { ...payload, ...this.payloadFromFile(file) }
    }

    if (Object.keys(payload).length === 0) {
      this.output(400, 'Please specify a payload')
      process.exit(1)
    }

    payload.type = 'product'

    const { data, errors } = await client
      .post(`products`, payload)
      .catch((err) => err)

    if (errors) {
      this.panic(errors)
      process.exit(1)
    }

    const output: Product = this.parseOutput(data)
    this.output(201, 'Product created', output)
  }
}
