import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url: 'user-sys-service/user-sys-service/user/mgt/account/list/page',
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    transformRequest: [function (data) {
      return JSON.stringify(data);
    }],
    data: params
  })
}

export function deleteAccount(id) {
  return request({
    url: 'user-sys-service/user-sys-service/user/mgt/account/delete/' + id,
    method: 'delete'
  })
}

export function getDetail(id) {
  return request({
    url: 'user-sys-service/user-sys-service/user/mgt/account/' + id + '/detail',
    method: 'get'
  });
}

export function getPersonByAccountSN(sn) {
  return request({
    url:''
  });
}

