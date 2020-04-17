import { createAPI } from './create-api'
import project from './module/project'
import router from '@/router/index.js';
const $api = createAPI(
  {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  }
)
$api.interceptors.response.use(
  response => {
    let _response = response.data
    if (!_response) { // 重定向到登录页
      location.href = 'http://grcxf.wzcredit.gov.cn/cnvpweb/Home/login';
      // router.replace({name: 'login'});
    }
    switch (_response.state) {
      // 登录超时,Token过期，重定向到首页
      case 'overdue':
        console.log(store)
        break;
      default:
    }
    return Promise.resolve(_response)
  }, error => {
    // Do something with response error
    return Promise.reject(error)
  }
)
// $api.interceptors.request.use((config) => {
//     var x = ['getmark', 'getmarklevel', 'getemp', 'useremp', 'cancelemp', 'edu', 'upedu', 'insertedu', 'iden', 'upiden', 'insertiden', 'car', 'upcar', 'insertcar'];
//     if (x.some((item) => {
//       return config.url.indexOf(item) > -1;
//     })) {
//       const params = new URLSearchParams();
//       params.append('token', window.localStorage.getItem('token'));
//       project($api).verifytoken(params).then(rs => {
//         if (rs == true) {
//           return config;
//         }
//         window.location.href = window.location.origin + '/#/login';
//       })
//     }
//     return config;
//   }, error => {
//     window.location.href = window.location.origin + '/#/login';
//     return Promise.reject(error);
//   }
// )
const projectApi = project($api)
export default projectApi;
