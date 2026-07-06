import { fetchUtils } from 'react-admin'
import { SERVER_URL } from '../config/'

const DEFAULT_YEAR = '2027'

export function setAuthorizationToken(url, options = {}) {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('token');
  options.headers.set('Authorization', `Bearer ${token}`);
  options.headers.set('Database', localStorage.getItem('db') || DEFAULT_YEAR)

  return fetchUtils.fetchJson(url, options);
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('role');
  localStorage.removeItem('tokenExpiry');
  return Promise.resolve();
}

// db param lets callers authenticate against a specific year (e.g. when switching
// away from a frozen year — the current localStorage db would be rejected).
export function login(data) {
  const { username, password, db } = data;
  const database = db || localStorage.getItem('db') || DEFAULT_YEAR;
  const request = new Request(`${SERVER_URL}/sessions`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: new Headers({
      'Content-Type': 'application/json',
      'Database': database,
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
      if (!localStorage.getItem('db')) {
        localStorage.setItem('db', DEFAULT_YEAR);
      }

      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        localStorage.setItem('username', payload.username || 'user');
        localStorage.setItem('role', payload.role || 'user');
        localStorage.setItem('tokenExpiry', payload.exp * 1000);
      } catch (e) {
        console.warn('Could not decode JWT token:', e);
        localStorage.setItem('username', 'user');
        localStorage.setItem('role', 'user');
      }

      return true
    }).catch((err) => {
      console.log('Error logging in', err);
      throw err;
    })
}
