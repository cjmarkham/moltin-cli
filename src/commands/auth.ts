import fetch from 'node-fetch'
import { API_BASE } from '../config'
import { URLSearchParams } from 'url'
import { config } from 'dotenv'
import { LocalStorage } from 'node-localstorage'
const localStorage = new LocalStorage('./scratch')

import { isAccessTokenValid } from '../helpers/auth'

config({ path: '../.env' })

const { MOLTIN_CLIENT_ID, MOLTIN_CLIENT_SECRET } = process.env

const getNewAccessToken = async () => {
  // See if we have an access token in storage
  if (isAccessTokenValid()) {
    return
  }

  // If no access token then get one
  const params = new URLSearchParams()
  params.append('client_id', MOLTIN_CLIENT_ID)
  params.append('client_secret', MOLTIN_CLIENT_SECRET)
  params.append('grant_type', 'client_credentials')

  const response = await fetch(`${API_BASE}/oauth/access_token`, {
    method: 'POST',
    body: params,
  })

  const json = await response.json()
  if (json.errors) {
    console.log(json.errors)
    process.exit(1)
  }

  localStorage.setItem('access_token', json.access_token)
  localStorage.setItem('expires', json.expires)
}

export default {
  getNewAccessToken,
}
