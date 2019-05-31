import request from '@/utils/request'

export function login(account, password,systemSN) {
  debugger;
  return request({
    url: '/user/rest/login',
    method: 'post',
    data: {
      account,
      password,
      systemSN
    }
  })
}

export function getInfo() {
  return request({
    url: '/admin/info',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}
