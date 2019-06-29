import request from '@/utils/request'

export function fetchFilterChainList(params) {
  return request({
    url: 'user-sys-service/user-sys-service/user/mgt/filter/chain/defination/list/page',
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    transformRequest: [function (data) {
      return JSON.stringify(data);
    }],
    data: params
  })
}
