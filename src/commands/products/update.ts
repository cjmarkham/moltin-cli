import { Command, flags } from '@oclif/command'
import { Input } from '@oclif/parser/lib/flags'
import { IArg } from '@oclif/parser/lib/args'
import chalk from 'chalk'
import * as fs from 'fs'

import client from '../../helpers/client'
import { getStdin } from '../../helpers/process'
import { Product } from '../../schemas'
import { parseOutput } from '../../helpers/output'

export default class ProductsUpdate extends Command {
  static args: IArg<string>[] = [
    { name: 'id' },
  ]

  static description: string = 'Updates a single product'

  static examples: string[] = [
    `moltin products:update {uuid}`,
    `moltin products:update {uuid} -n ;Some name'`,
    `moltin products:update {uuid} -j {name: 'Some name'}`,
    `moltin products:get {uuid} | moltin products:update -n "Some name"`,
  ]

  static flags: Input<any> = {
    help: flags.help({ char: 'h' }),
    name: flags.string({ char: 'n', description: 'The new name of the product' }),
    json: flags.string({ char: 'j', description: 'A JSON object of attributes to update' }),
    only: flags.string({ char: 'o', description: 'Only return a subset of fields' }),
    file: flags.string({ char: 'f', description: 'A JSON file of update fields' }),
  }

  async run(): Promise<void> {
    const { args, flags } = this.parse(ProductsUpdate)
    let id: string = args.id

    const input: any = await getStdin()
    // The ID was piped in from another command
    if (input && input.id) {
      id = input.id
    }

    let payload: object = {
      id,
      type: 'product',
    }

    // If JSON flag passed, parse it and set the payload
    if (flags.json) {
      let fields: object
      try {
        fields = JSON.parse(flags.json)
      } catch (e) {
        console.error(chalk.redBright('Could not parse JSON from --json flag'))
        process.exit(1)
      }

      Object.keys(fields).map((k) => payload[k] = fields[k])
    } else if (flags.file) {
      const buffer = fs.readFileSync(flags.file)
      let json: object
      try {
        json = JSON.parse(buffer.toString())
      } catch (e) {
        console.error(chalk.redBright(`Could not parse JSON from ${flags.file}`))
        process.exit(1)
      }
      for (const key in json) {
        if (ProductsUpdate.allowedFields.indexOf(key) !== -1) {
          payload[key] = json[key]
        }
      }
    } else {
      for (const key in flags) {
        if (ProductsUpdate.allowedFields.indexOf(key) !== -1) {
          payload[key] = flags[key]
        }
      }
    }

    const response = await client
      .put(`products/${id}`, payload)
      .catch(console.error)

    if (!response || !response.data) {
      process.exit(1)
    }

    const output: Product = parseOutput(response.data, flags.only)
    console.log(output)
  }

  static allowedFields: string[] = ['name']
}
