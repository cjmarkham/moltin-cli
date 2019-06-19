import chalk from 'chalk'
import * as fs from 'fs'

const payloadFromJson = (json: string) => {
  let fields: object
  try {
    fields = JSON.parse(json)
  } catch (e) {
    console.error(chalk.redBright('Could not parse JSON from --json flag'))
    process.exit(1)
  }

  return fields
  // Object.keys(fields).map((k) => payload[k] = fields[k])
}

const payloadFromFile = (path: string) => {
  const buffer = fs.readFileSync(path)
  let json: object

  try {
    json = JSON.parse(buffer.toString())
  } catch (e) {
    console.error(chalk.redBright(`Could not parse JSON from ${path}`))
    process.exit(1)
  }

  return json
}

export {
  payloadFromJson,
  payloadFromFile,
}
