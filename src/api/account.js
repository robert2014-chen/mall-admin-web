import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/mgt/account/list',
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    transformRequest: [function (data) {
      return JSON.stringify(data);
    }],
    data: params
  })
}

export function createAccount(params) {
  return request({
    url: '/mgt/account/add',
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    transformRequest: [function (data) {
      return JSON.stringify(data);
    }],
    data: params
  })
}

export function updateAccount(params) {
  return request({
    url: '/mgt/account/update',
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    transformRequest: [function (data) {
      return JSON.stringify(data);
    }],
    data: params
  })
}

export function getAccount(id) {
  const url = "/mgt/account/" + id + "/info"
  return request({
    url: url,
    method: 'get'
  })
}

export function deleteAccount(id) {
  const url = "/mgt/account/" + id + "/delete"
  return request({
    url: url,
    method: 'delete'
  })
}
