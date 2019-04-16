import request from '@/utils/request'

export function fetchQueryList(params) {
  return request({
    url: 'user/mgt/role/list/query',
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    transformRequest: [function (data) {
      return JSON.stringify(data);
    }],
    data: params
  })
}


