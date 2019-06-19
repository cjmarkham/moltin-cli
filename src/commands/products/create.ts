import { Command, flags } from '@oclif/command'
import { Input } from '@oclif/parser/lib/flags'

import client from '../../helpers/client'
import { Product } from '../../schemas'
import { parseOutput } from '../../helpers/output'
import { payloadFromJson, payloadFromFile } from '../../helpers/payload'
import { panic, log } from '../../helpers/logger'

export default class ProductsCreate extends Command {
  static description: string = 'Creates a product'

  static examples: string[] = [
    `moltin products:create -n 'Some name'`,
    `moltin products:create -j {name: 'Some name'}`,
    `moltin products:create -f path/to/json/file`,
  ]

  static flags: Input<any> = {
    help: flags.help({ char: 'h' }),
    json: flags.string({ char: 'j', description: 'A JSON object of attributes to update' }),
    only: flags.string({ char: 'o', description: 'Only return a subset of fields' }),
    file: flags.string({ char: 'f', description: 'A JSON file of update fields' }),
  }

  async run(): Promise<void> {
    const { flags: { json, file, only } } = this.parse(ProductsCreate)

    let payload: any = {}

    if (json) {
      payload = { ...payload, ...payloadFromJson(json) }
    } else if (file) {
      payload = { ...payload, ...payloadFromFile(file) }
    }

    if (Object.keys(payload).length === 0) {
      log(400, 'Please specify a payload')
      process.exit(1)
    }

    payload.type = 'product'

    const { data, errors } = await client
      .post(`products`, payload)
      .catch((err) => err)

    if (errors) {
      panic(errors)
      process.exit(1)
    }

    const output: Product = parseOutput(data, only)
    log(201, 'Product created', output)
  }
}
