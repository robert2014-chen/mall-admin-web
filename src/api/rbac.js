import request from '@/utils/request'

export function fetchRoleList(params) {
  return request({
    url: 'user-sys-service/user-sys-service/user/mgt/role/list/page',
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    transformRequest: [function (data) {
      return JSON.stringify(data);
    }],
    data: params
  })
}

export function addRole(params) {
  return request({
    url: 'user-sys-service/user-sys-service/user/mgt/role/add',
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    transformRequest: [function (data) {
      return JSON.stringify(data);
    }],
    data: params
  })
}

export function deleteRole(id) {
  return request({
    url: 'user-sys-service/user-sys-service/user/mgt/role/delete/'+id,
    method: 'delete',
    headers: {'Content-Type': 'application/json'}
  })
}

export function fetchPermissionList(params) {
  return request({
    url: 'user-sys-service/user-sys-service/user/mgt/permission/list/page',
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    transformRequest: [function (data) {
      return JSON.stringify(data);
    }],
    data: params
  })
}
