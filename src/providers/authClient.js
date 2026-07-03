import { login, logout } from '../actions/authActions'

export default {
  login: (params) => login(params),

  logout: () => {
    logout()
    return Promise.resolve()
  },

  checkAuth: () => {
    const token = localStorage.getItem('token')
    const username = localStorage.getItem('username')
    const tokenExpiry = localStorage.getItem('tokenExpiry')

    if (token && username) {
      if (tokenExpiry) {
        const now = Date.now()
        if (now >= parseInt(tokenExpiry)) {
          localStorage.removeItem('token')
          localStorage.removeItem('username')
          localStorage.removeItem('role')
          localStorage.removeItem('tokenExpiry')
          return Promise.reject('Token expired')
        }
      }
      return Promise.resolve()
    }

    return Promise.reject('No valid token found')
  },

  getPermissions: () => Promise.resolve(),

  checkError: (error) => {
    const status = error?.status
    if (status === 401 || status === 403) {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('role')
      localStorage.removeItem('tokenExpiry')
      return Promise.reject()
    }
    return Promise.resolve()
  },
}
