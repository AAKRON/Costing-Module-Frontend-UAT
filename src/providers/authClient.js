import { AUTH_CHECK, AUTH_ERROR, AUTH_GET_PERMISSIONS, AUTH_LOGIN, AUTH_LOGOUT } from 'react-admin'
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
			const token = localStorage.getItem('token');
			const username = localStorage.getItem('username');
			const tokenExpiry = localStorage.getItem('tokenExpiry');
			
			// Check if token exists and hasn't expired
			if (token && username) {
				if (tokenExpiry) {
					const now = Date.now();
					if (now >= parseInt(tokenExpiry)) {
						// Token expired, clear storage
						localStorage.removeItem('token');
						localStorage.removeItem('username');
						localStorage.removeItem('role');
						localStorage.removeItem('tokenExpiry');
						return Promise.reject('Token expired');
					}
				}
				return Promise.resolve();
			}
			
			return Promise.reject('No valid token found');
		}
		case AUTH_GET_PERMISSIONS:{
			return Promise.resolve()
		}
		case AUTH_ERROR:{
			console.error('AUTH_ERROR', params)
			return Promise.resolve()
		}
		default:{
			return Promise.reject('Unknown method')
		}
	}
};
