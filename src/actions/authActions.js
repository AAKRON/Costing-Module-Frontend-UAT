import { fetchUtils } from 'react-admin'
import { SERVER_URL } from '../config/'

export function setAuthorizationToken(url, options = {}) {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('token');
  options.headers.set('Authorization', `Bearer ${token}`);
  options.headers.set('Database', localStorage.getItem('db'))

  return fetchUtils.fetchJson(url, options);
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('role');
  localStorage.removeItem('tokenExpiry');
  return Promise.resolve();
}

export function login(data) {
  const { username, password } = data;
  const request = new Request(`${SERVER_URL}/sessions`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: new Headers({
      'Content-Type': 'application/json',
      'Database': localStorage.getItem('db'),
    }),
  });
  return fetch(request)
    .then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }

      return response.json();
    })
    .then(({ token }) => {
      localStorage.setItem('token', token);
      
      // Decode JWT to get user info (basic decode - no verification needed on frontend)
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        localStorage.setItem('username', payload.username || 'user');
        localStorage.setItem('role', payload.role || 'user');
        localStorage.setItem('tokenExpiry', payload.exp * 1000); // Convert to milliseconds
      } catch (e) {
        console.warn('Could not decode JWT token:', e);
        localStorage.setItem('username', 'user');
        localStorage.setItem('role', 'user');
      }
      
      return true
    }).catch((err) => {
      console.log('Error logging in', err);
      throw err; // Re-throw to show login errors
    })
}
