import { AUTH_CHECK, AUTH_GET_PERMISSIONS, AUTH_LOGIN, AUTH_LOGOUT } from 'react-admin'
import { login, logout } from '../actions/authActions'

export default (type, params) => {
	switch(type) {
		case AUTH_LOGIN:{
			return login(params)
		}
		case AUTH_LOGOUT:{
			return logout()
		}
		case AUTH_CHECK:{
			return (localStorage.getItem('username') && localStorage.getItem('token'))
				? Promise.resolve()
				: Promise.reject()
		}
		case AUTH_GET_PERMISSIONS:{
			return Promise.resolve()
		}
		default:{
			return Promise.reject('Unknown method')
		}
	}
};
