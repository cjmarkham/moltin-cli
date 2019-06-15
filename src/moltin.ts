import * as commander from 'commander'
import { version } from './package.json'
import commands from './commands'

const program = new commander.Command()
program.version(version)

program
  .command('authenticate')
  .action(commands.auth.getNewAccessToken)

program
  .command('products [id]')
  .option('-a, --all', 'Get products')
  .option('--only <fields>', 'Return specific fields only')
  .action(commands.products.get)

program
  .command('products:update [id]')
  .option('--name <name>', 'The name of the product')
  .action(commands.products.update)

program.parse(process.argv)
