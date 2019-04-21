import request from '@/utils/request'

export function getPersonByAccountSN(accountSN) {
  let url = "user/mgt/person/account/" + accountSN + "/detail";
  return request({
    url: url,
    method: 'GET'
  });
}
