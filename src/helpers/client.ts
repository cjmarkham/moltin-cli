import { MoltinClient } from '@moltin/request'
import NodeStorageAdapter = require('@moltin/node-storage-adapter')
import { config } from 'dotenv'

config({ path: '../.env' })

const {
  MOLTIN_API_BASE,
  MOLTIN_CLIENT_ID,
  MOLTIN_CLIENT_SECRET
} = process.env

export default new MoltinClient({
  client_id: MOLTIN_CLIENT_ID,
  client_secret: MOLTIN_CLIENT_SECRET,
  storage: new NodeStorageAdapter('../localStorage'),
  host: MOLTIN_API_BASE,
})

