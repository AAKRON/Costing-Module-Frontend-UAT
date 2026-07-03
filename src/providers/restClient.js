import { stringify } from 'querystring-es3'
import { setAuthorizationToken } from '../actions/authActions'
import { SERVER_URL } from '../config'

const rethrow = (error) => { throw error }

export default {
  getCustom: (resource, params) => {
    const url = `${SERVER_URL}/${resource}?${stringify(params)}`
    return setAuthorizationToken(url)
      .then(({ json }) => ({ data: json }))
      .catch(rethrow)
  },

  getList: (resource, params) => {
    const { page, perPage } = params.pagination
    const { field, order } = params.sort
    const query = {
      _sort: field,
      _order: order,
      _start: (page - 1) * perPage,
      _end: page * perPage,
      ...params.filter,
    }
    const url = `${SERVER_URL}/${resource}?${stringify(query)}`
    return setAuthorizationToken(url)
      .then(({ headers, json }) => ({
        data: json,
        total: parseInt(headers.get('x-total-count') || 0),
      }))
      .catch(rethrow)
  },

  getOne: (resource, params) =>
    setAuthorizationToken(`${SERVER_URL}/${resource}/${params.id}`)
      .then(({ json }) => ({ data: json }))
      .catch(rethrow),

  getMany: (resource, params) => {
    const url = `${SERVER_URL}/${resource}?${stringify({ id: params.ids })}`
    return setAuthorizationToken(url)
      .then(({ json }) => ({ data: json }))
      .catch(rethrow)
  },

  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination
    const { field, order } = params.sort
    const query = {
      _sort: field,
      _order: order,
      _start: (page - 1) * perPage,
      _end: page * perPage - 1,
      ...params.filter,
      [params.target]: params.id,
    }
    const url = `${SERVER_URL}/${resource}?${stringify(query)}`
    return setAuthorizationToken(url)
      .then(({ headers, json }) => ({
        data: json,
        total: parseInt(headers.get('x-total-count') || 0),
      }))
      .catch(rethrow)
  },

  update: (resource, params) =>
    setAuthorizationToken(`${SERVER_URL}/${resource}/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    })
      .then(({ json }) => ({ data: json }))
      .catch(rethrow),

  updateMany: (resource, params) =>
    setAuthorizationToken(
      `${SERVER_URL}/${resource}?${stringify({ id: params.ids })}`,
      { method: 'PUT', body: JSON.stringify(params.data) }
    )
      .then(({ json }) => ({ data: json }))
      .catch(rethrow),

  create: (resource, params) =>
    setAuthorizationToken(`${SERVER_URL}/${resource}`, {
      method: 'POST',
      body: JSON.stringify(params.data),
    })
      .then(({ json }) => ({ data: { ...params.data, id: json.id } }))
      .catch(rethrow),

  delete: (resource, params) =>
    setAuthorizationToken(`${SERVER_URL}/${resource}/${params.id}`, {
      method: 'DELETE',
      ...(params.data ? { body: JSON.stringify(params.data) } : {}),
    })
      .then(({ json }) => ({ data: json }))
      .catch(rethrow),

  deleteMany: (resource, params) =>
    setAuthorizationToken(
      `${SERVER_URL}/${resource}?${stringify({ id: params.ids })}`,
      { method: 'DELETE' }
    )
      .then(({ json }) => ({ data: json || params.ids }))
      .catch(rethrow),
}
