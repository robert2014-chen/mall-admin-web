import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'user/mgt/account/list/page',
    method:'post',
    params:params
  })
}
