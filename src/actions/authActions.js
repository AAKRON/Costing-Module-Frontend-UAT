import { fetchUtils } from 'react-admin'
import { SERVER_URL } from '../config/'

export function setAuthorizationToken(url, options = {}) {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('token');
  options.headers.set('Authorization', `Bearer ${token}`);
  options.headers.set('Database', localStorage.getItem('db') || '')
  options.headers.set('Location', localStorage.getItem('location_id') || '')
  return fetchUtils.fetchJson(url, options);
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('role');
  localStorage.removeItem('db');
  localStorage.removeItem('location_id');
  localStorage.removeItem('yearFrozen');
  localStorage.removeItem('tokenExpiry');
  return Promise.resolve();
}

async function fetchActiveYear() {
  try {
    const res = await fetch(`${SERVER_URL}/year_management/active_year`);
    const json = await res.json();
    return String(json.active_year);
  } catch {
    return String(new Date().getFullYear());
  }
}

export async function login(data) {
  const { username, password, db } = data;

  // Use explicit db, or stored db, or fetch from backend
  let database = db || localStorage.getItem('db');
  if (!database) {
    database = await fetchActiveYear();
  }

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
      localStorage.setItem('db', database);
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
      return true;
    })
    .catch((err) => {
      console.log('Error logging in', err);
      throw err;
    });
}
