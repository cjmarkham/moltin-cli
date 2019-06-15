import fetch from 'node-fetch'
import * as fs from 'fs'

import { API_BASE } from '../config'
import { getAccessToken } from '../helpers/storage'
import { reAuth } from '../helpers/auth'
import { getStdin } from '../helpers/process'

// TODO: Add to definition file
interface ApiResponse {
  errors?: Array<object>
  data?: Array<object>
}

const get = async (id?: string, cmd?: { all: any; }) => {
  await reAuth()

  if (cmd.all) {
    return getAll()
  } else if (id) {
    return getOne(id, cmd)
  }

  console.log('Please provide a product UUID or the --all flag')
  process.exit(1)
}

const getOne = async (id: string, cmd: any) => {
  const response = await fetch(`${API_BASE}/v2/products/${id}`, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    }
  })
  // TODO: Needs catching

  const json: ApiResponse = await response.json()
  if (json.errors) {
    console.log(json.errors)
    process.exit(1)
  }

  const data = json.data
  let output: object

  // Gets the fields from the data that the user requested
  if (cmd.only) {
    output = {}
    const fields = cmd.only.split(',')
    fields.forEach((f: string) => output[f] = data[f])
  } else {
    output = data
  }

  // If being piped, we need to stringify it
  if (process.stdout.isTTY) {
    console.log(output)
  } else {
    console.log(JSON.stringify(output))
  }
}

const getAll = async () => {
  const response = await fetch(`${API_BASE}/v2/products`, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    }
  })

  const json = await response.json()
  console.log(json.data)
}

const update = async (id: string, cmd: any) => {
  const input: any = await getStdin()

  // The ID was piped in from another command
  if (input && input.id) {
    id = input.id
  }

  const payload: any = {
    data: {
      id,
      type: 'product',
    }
  }

  // TODO: How do we handle payloads?
  // Do we allow json to be passed?
  // Do we allow a json filename to be passed?
  // Do we just use arguments?
  if (cmd.name) {
    // This can get pretty messy if everything is passed as an argument
    payload.data.name = cmd.name
  }

  const response = await fetch(`${API_BASE}/v2/products/${id}`, {
    method: 'PUT',
    headers: {
      // TODO: Abstract this
      Authorization: `Bearer ${getAccessToken()}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const json: ApiResponse = await response.json()
  console.log(json)
}

export default {
  get,
  update,
}
