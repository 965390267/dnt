import Vue from 'vue'
import LoadIng from '.'
//创建构造器
const SelfLoading = Vue.extend(LoadIng)

LoadIng.install = function (options = {}) {
  //创建实例
  let instance = new SelfLoading({
    data: options
  })
  instance.hide = () => {
    options.makeSure()
    options.show = false
  }
  instance.$mount()
  document.body.appendChild(instance.$el)
  Vue.nextTick(() => {
    instance.show = true
  })
}
export default LoadIng;
