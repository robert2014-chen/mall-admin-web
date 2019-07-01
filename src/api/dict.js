import request from '@/utils/request'

export function fetchDictByType(dictType) {
  return request({
    url: 'comm-sys-service/comm-sys-service/mgt/dict/'+dictType+'/dict/type',
    method: 'post',
    headers: {'Content-Type': 'application/json'}
    // transformRequest: [function (data) {
    //   return JSON.stringify(data);
    // }],
    // data: params
  })
}
