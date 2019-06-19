import Command, { flags } from "@oclif/command"
import chalk from 'chalk'
import { Input } from "@oclif/parser/lib/flags"

import { statusColor } from "../helpers/output"

export default abstract class extends Command {
  static flags: Input<any> = {
    help: flags.help({ char: 'h' }),
    only: flags.string({ char: 'o', description: 'Only return a subset of fields' }),
  }

  _flags

  async init () {
    const { flags } = this.parse()
    this._flags = flags
  }

  async getStdin(): Promise<object> {
    const { stdin } = process

    return new Promise(resolve => {
      let result: string

      if (stdin.isTTY) {
        resolve({})
        return;
      }

      stdin.setEncoding('utf8')

      stdin.on('data', (data) => {
        result = data
      })

      stdin.on('end', () => {
        resolve(JSON.parse(result))
      })
    })
  }

  panic(errors: object) {
    for (const key in errors) {
      const error = errors[key]
      console.log(`${statusColor(error.status)}: ${chalk.whiteBright(error.title)}`)
      console.log(`     ${error.detail}`)
    }
  }

  parseOutput(data: any): any {
    let output: any = {}

    // Gets the fields from the data that the user requested
    if (this._flags.only) {
      const fields: string[] = this._flags.only.split(',')
      if (Array.isArray(data)) {
        output = []
        for (const d of data) {
          const resource = {}
          fields.forEach((f: string) => resource[f] = d[f])
          output.push(resource)
        }
      } else {
        fields.forEach((f: string) => output[f] = data[f])
      }
    } else {
      output = data
    }

    return output
  }

  output(status: number, title: string, data?: object) {
    console.log(`${statusColor(status)}: ${chalk.whiteBright(title)}`)
    console.log(data)
  }
}
