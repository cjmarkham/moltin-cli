import { LocalStorage } from 'node-localstorage'
const localStorage = new LocalStorage('./scratch')

import commands from '../commands'

// Checks for an access token in storage and that it hasnt expired
export const isAccessTokenValid = () => {
  if (localStorage.getItem('access_token')) {
    const expires = localStorage.getItem('expires')
    const currentTime = Math.floor(new Date().getTime() / 1000)
    if (currentTime < Number(expires)) {
      return true
    } else {
      return false
    }
  }

  return false
}

// Helper to get a new access token if none available
export const reAuth = async () => {
  if (isAccessTokenValid()) {
    return
  }

  await commands.auth.getNewAccessToken()
}
