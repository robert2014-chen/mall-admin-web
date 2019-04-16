import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'user/mgt/account/list/page',
    method:'post',
    headers:{'Content-Type': 'application/json'},
    transformRequest: [function (data) {
      return JSON.stringify(data);
    }],
    data:params
  })
}

export function deleteAccount(id) {
  return request({
    url:'user/mgt/account/delete/'+id,
    method:'delete'
  })
}

