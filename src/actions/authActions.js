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
    .then(({ username, token, role }) => {
      localStorage.setItem('username', username);
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
    }).catch((err) => {
      console.log('Error logging in', err)
    })
}
