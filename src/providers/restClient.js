import { stringify } from 'querystring-es3'
import { setAuthorizationToken } from '../actions/authActions'
import { SERVER_URL } from '../config'

export default {
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

    return setAuthorizationToken(url).then(({ headers, json }) => ({
      data: json,
      total: parseInt(headers.get('x-total-count') || 0)
    }))
  },

  getOne: (resource, params) => {
    return setAuthorizationToken(`${SERVER_URL}/${resource}/${params.id}`)
      .then(({ json }) => ({ data: json }))
  },
  getMany: (resource, params) => {
    const query = {
      id: params.ids,
    }
    const url = `${SERVER_URL}/${resource}?${stringify(query)}`
    return setAuthorizationToken(url).then(({ json }) => ({ data: json }))
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

    return setAuthorizationToken(url).then(({ headers, json }) => ({
      data: json,
      total: parseInt(headers.get('x-total-count') || 0)
    }))
  },

  update: (resource, params) => {
    return setAuthorizationToken(`${SERVER_URL}/${resource}/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }))
  },

  updateMany: (resource, params) => {
    const query = {
      id: params.ids,
    }
    return setAuthorizationToken(`${SERVER_URL}/${resource}?${stringify(query)}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }))
  },

  create: (resource, params) =>
    setAuthorizationToken(`${SERVER_URL}/${resource}`, {
      method: 'POST',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...params.data, id: json.id },
    })),

  delete: (resource, params) =>
    setAuthorizationToken(`${SERVER_URL}/${resource}/${params.id}`, {
      method: 'DELETE',
      ...(params.data ? { body: JSON.stringify(params.data) } : {}),
    }).catch(error => console.log(error)),

  deleteMany: (resource, params) => {
    const query = {
      id: params.ids
    }
    return setAuthorizationToken(`${SERVER_URL}/${resource}?${stringify(query)}`, {
      method: 'DELETE',
    }).catch(error => console.log(error))
  },
}