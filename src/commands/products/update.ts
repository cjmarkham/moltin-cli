import { Command, flags } from '@oclif/command'
import { Input } from '@oclif/parser/lib/flags'
import { IArg } from '@oclif/parser/lib/args'

import client from '../../helpers/client'
import { getStdin } from '../../helpers/process'
import { Product } from '../../schemas'
import { parseOutput } from '../../helpers/output'
import { payloadFromJson, payloadFromFile } from '../../helpers/payload'
import { panic, log } from '../../helpers/logger'

export default class ProductsUpdate extends Command {
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
    help: flags.help({ char: 'h' }),
    json: flags.string({ char: 'j', description: 'A JSON object of attributes to update' }),
    only: flags.string({ char: 'o', description: 'Only return a subset of fields' }),
    file: flags.string({ char: 'f', description: 'A JSON file of update fields' }),
  }

  async run(): Promise<void> {
    const { args, flags: { json, file, only } } = this.parse(ProductsUpdate)
    let id: string = args.id

    const input: any = await getStdin()
    // The ID was piped in from another command
    if (input && input.id) {
      id = input.id
    }

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

    payload = { ...payload, id, type: 'product' }

    const { data, errors } = await client
      .put(`products/${id}`, payload)
      .catch((err) => err)

    if (errors) {
      panic(errors)
      process.exit(1)
    }

    const output: Product = parseOutput(data, only)
    log(200, 'Updated product', output)
  }
}
