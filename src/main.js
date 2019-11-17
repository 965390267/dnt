// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.prototype.bus = new Vue;
import 'muse-ui/lib/styles/base.less';
import { Button, TextField,Dialog ,Snackbar,Icon,Progress} from 'muse-ui';
import 'muse-ui/lib/styles/theme.less';
import '@/assets/css/reset.css'
import Helpers from 'muse-ui/lib/Helpers';
import Message from 'muse-ui-message';
import option from './config/messageconf'
import 'muse-ui-loading/dist/muse-ui-loading.css'; // load css
import Loading from 'muse-ui-loading';
import Toast from 'muse-ui-toast';
Vue.use(Loading,{
  overlayColor: 'rgba(0, 0, 0, .55)',        // 背景色
  size: 20,
  color: 'primary',                           // color
  text:'数据加载中',
  className: 'hiddenloading' ,
  target:document.body
});
Vue.use(Button).use(Dialog).use(Snackbar).use(Icon).use(Progress).use(TextField).use(Helpers).use(Message,option).use(Toast,{
  position: 'top',               // 弹出的位置
  time: 2000,                       // 显示的时长
  closeIcon: '',               // 关闭的图标
  close: false,                      // 是否显示关闭按钮
  successIcon: '',      // 成功信息图标
  infoIcon: '',                 // 信息信息图标
  warningIcon: '',     // 提醒信息图标
  errorIcon: ''              // 错误信息图标
});
Vue.filter('fixed', function (value) {
  if (!value) return ''
  return (value/1000).toFixed(3)
})
Vue.config.productionTip = false

let vm=  new Vue({
  router,
  components: { App },
  template: '<App/>'
})
if (!!window.imToken) {/* imtoken环境下 */
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);

    try {
      // Request account access if needed
      ethereum.enable().then((accounts) => {
        Vue.prototype.imtokenAddress = window.accounts = accounts[0];
       // Vue.prototype.imtokenAddress = window.accounts = '0xfe35583b20f5f4a29e10260a03a2d94a2117525a';
        /* eslint-disable no-new */
        vm.$mount('#app')
      }).catch((err) => {
        alert('未成功授权,请退出重新授权')
      })
    } catch (error) {
      alert('未成功授权,请退出重新授权')
      // User denied account access...
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider);
    ethereum.enable().then((accounts) => {
     Vue.prototype.imtokenAddress = window.accounts = accounts[0];
    // Vue.prototype.imtokenAddress = window.accounts = '0xfe35583b20f5f4a29e10260a03a2d94a2117525a';
      /* eslint-disable no-new */
      vm.$mount('#app')
    }).catch((err) => {
      alert('未成功授权,请退出重新授权')
    })
  } else {
    alert('未成功授权,请退出重新授权')
    /* eslint-disable no-new */
    vm.$mount('#app')
    alert('请在imtoken浏览器打开')
  }
}
else {/* 浏览器环境下 */

  if (env() != 'production') {
    Vue.prototype.imtokenAddress = '0x9861C181Be9413bF8f445d4AeEbc9DcF71D8eA03'
  }else{
    Vue.prototype.imtokenAddress = ''
  }
  function env() {
    if (process.env.NODE_ENV === "development") return "development";   //开发环境
    if (window.location.href.includes('192.168')) return 'test';        //测试环境，"192.168"根据实际情况而定
    return 'production'                                                 //线上环境0x6E746901b6675a9AE97e3458D9F45d424bFCd908
  }

  /* eslint-disable no-new */
  vm.$mount('#app')
}


