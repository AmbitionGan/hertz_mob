import vue from 'vue'
import loading from './loading.vue'

// 返回一个 扩展实例构造器
const LoadingConstructor = vue.extend(loading)

// 定义弹出组件的函数 
const LoadingToast = {
    loadingDom: new Object,
    show () {
        if (this.loadingDom.isAppend) {
            this.loadingDom.isShow = true
            return
        }
        this.loadingDom = new LoadingConstructor({
            el: document.createElement('div'),
            data () {
                return {
                    isShow: true,
                    isAppend: true
                }
            }
        })

        // 把 实例化的 loading.vue 添加到 body 里
        document.body.appendChild(this.loadingDom.$el)
        
    },
    close () {
        if (this.loadingDom.isAppend) {
            this.loadingDom.isShow = false
        }
    }
}

// 注册为全局组件的函数
function regLoadingToast() {
    // 将组件注册到 vue 的 原型链里去,
    // 这样就可以在所有 vue 的实例里面使用 this.$loadingToast.show()
    vue.prototype.$loadingToast = LoadingToast
  }
  
  export default regLoadingToast