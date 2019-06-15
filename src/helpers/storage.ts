import { LocalStorage } from 'node-localstorage'
const localStorage = new LocalStorage('./scratch')

export const getAccessToken = () => {
  return localStorage.getItem('access_token')
}
