import axios from 'axios'
import Vue from 'vue'
import Toast from 'muse-ui-toast';
import Loading from 'muse-ui-loading';

Vue.use(Toast,{
  position: 'top',               // 弹出的位置
  time: 2000,                       // 显示的时长
  closeIcon: '',               // 关闭的图标
  close: false,                      // 是否显示关闭按钮
  successIcon: '',      // 成功信息图标
  infoIcon: '',                 // 信息信息图标
  warningIcon: '',     // 提醒信息图标
  errorIcon: ''              // 错误信息图标
});
// // export const baseurl='http://106.15.52.35:8080/' 
//   // axios.defaults.baseURL = 'https://39.97.184.19:443/';/* 7-12-10-14更改 */
// 'production'?location.origin+'/':
  axios.defaults.baseURL = 'https://dnt.network';
// axios.defaults.timeout = 10000;
function env() {
  if (process.env.NODE_ENV === "development") return "development";   //开发环境
  if (window.location.href.includes('192.168')) return 'test';        //测试环境，"192.168"根据实际情况而定
  return 'production'                                                 //线上环境
}

let loading =null;
// 添加请求拦截器
axios.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  !loading&&(loading = Loading());//muse ui小bug，不能同时实例化多个，否则可能关闭不了，所以需要先判断，如果已经有了就不能再创建loading
  return config;
}, function (error) {
  // 对请求错误做些什么
  loading&&loading.close();
  loading =null;
  console.log(error);
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  loading&&loading.close();
  loading =null;
  console.log(response);
  let res = response.data
  if (!res.success) {
    Toast.message(res.msg||'出点小问题，再试一次');
  }
  return res;
}, function (error) {
  // 对响应错误做点什么
  console.log(error);
  loading&&loading.close();
  loading =null;
  if (error && error.response) {
console.log(error.response);

    switch (error.response.status) {
      case 400:
          Toast.error('错误请求');
        break;
      case 401:
          Toast.error('未授权，请重新登录');   
        break;
      case 403:
          Toast.error('拒绝访问');      
        break;
      case 404:
          Toast.error('出错啦，网络未响应，稍后再试');   
        break;
      case 405:
          Toast.error('请求方法未允许'); 
        break;
        case 500:
            Toast.error('出错啦，服务器维修中'); 
          break;
         default:  Toast.error('出错啦，专业人员正在修复中'); 
      }
  }
  return Promise.reject(error);
});


export default axios;