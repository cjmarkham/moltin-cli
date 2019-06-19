import { flags } from '@oclif/command'
import { Input } from '@oclif/parser/lib/flags'
import { IArg } from '@oclif/parser/lib/args'

import client from '../../helpers/client'
import { Product } from '../../schemas'
import Base from '../base'

export default class ProductsUpdate extends Base {
  static args: IArg<string>[] = [
    { name: 'id' },
  ]

  static description: string = 'Updates a product'

  static examples: string[] = [
    `moltin products:update {uuid}`,
    `moltin products:update {uuid} -n 'Some name'`,
    `moltin products:update {uuid} -j {name: 'Some name'}`,
    `moltin products:update {uuid} -f path/to/json/file`,
    `moltin products:get {uuid} | moltin products:update -n "Some name"`,
  ]

  static flags: Input<any> = {
    ...Base.flags,
    json: flags.string({ char: 'j', description: 'A JSON object of attributes to update' }),
    file: flags.string({ char: 'f', description: 'A JSON file of update fields' }),
  }

  async run(): Promise<void> {
    const { args, flags: { json, file } } = this.parse(ProductsUpdate)
    let id: string = args.id

    const input: any = await this.getStdin()
    // The ID was piped in from another command
    if (input && input.id) {
      id = input.id
    }

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

    payload = { ...payload, id, type: 'product' }

    const { data, errors } = await client
      .put(`products/${id}`, payload)
      .catch((err) => err)

    if (errors) {
      this.panic(errors)
      process.exit(1)
    }

    const output: Product = this.parseOutput(data)
    this.output(200, 'Updated product', output)
  }
}
