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
