import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/mgt/org/list',
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    transformRequest: [function (data) {
      return JSON.stringify(data);
    }],
    data: params
  })
}

export function createOrg(params) {
  return request({
    url: '/mgt/org/save',
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    transformRequest: [function (data) {
      return JSON.stringify(data);
    }],
    data: params
  })
}

export function updateOrg(params) {
  return request({
    url: '/mgt/org/update',
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    transformRequest: [function (data) {
      return JSON.stringify(data);
    }],
    data: params
  })
}

export function getOrg(id) {
  const url = "/mgt/org/" + id + "/info"
  return request({
    url: url,
    method: 'get'
  })
}

export function deleteOrg(id) {
  const url = "/mgt/org/" + id + "/delete"
  return request({
    url: url,
    method: 'delete'
  })
}
