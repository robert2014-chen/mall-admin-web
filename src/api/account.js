import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: '/mgt/account/list',
    method: 'post',
    params: params
  })
}
