import * as commander from 'commander'
import { version } from './package.json'
import commands from './commands'
import { ResponseError, Product } from './schemas'

const program = new commander.Command()
program.version(version)

program
  .command('product <id>')
  .option('-a, --all', 'Get products')
  .option('--only <fields>', 'Return specific fields only')
  .action(async (id, cmd) => {
    const response: Product | ResponseError = await commands.products.get(id, cmd)

    if (process.stdout.isTTY) {
      console.log(response)
    } else {
      console.log(JSON.stringify(response))
    }
  })

program
  .command('products')
  .option('--only <fields>', 'Return specific fields only')
  .action(async (cmd) => {
    const response: Product[] | ResponseError = await commands.products.gets(cmd)

    if (process.stdout.isTTY) {
      console.log(response)
    } else {
      console.log(JSON.stringify(response))
    }
  })

program
  .command('products:update [id]')
  .option('--name <name>', 'The name of the product')
  .action(commands.products.update)

program.parse(process.argv)
