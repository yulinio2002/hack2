import axios from 'axios'

export const login = (data: { email: string, passwd: string }) =>
  axios.post('http://198.211.105.95:8080/authentication/login', data)

export const register = (data: { email: string, passwd: string }) =>
  axios.post('http://198.211.105.95:8080/authentication/register', data)