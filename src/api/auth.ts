import axios from 'axios'

export const login = (data: { email: string, password: string }) =>
  axios.post('/authentication/login', data)

export const register = (data: { email: string, password: string }) =>
  axios.post('/authentication/register', data)