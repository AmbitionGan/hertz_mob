/**
 * 默认弹窗样式
 */ 

import vue from 'vue'
import toast from './toast.vue'

// 返回一个 扩展实例构造器
const ToastConstructor = vue.extend(toast)

// 定义弹出组件的函数 
const Toast = {
    ToastDom: new Object,
    /**
     * 
     * @param { String } content 提示信息字符串
     * @param { Object } obj 配置信息
     */
    show (content, obj) {
        // obj 如果不传值都使用默认值
        let o = !!obj ? obj : new Object
        
        if (this.ToastDom.isAppend) {
            // 已添加DOM实例
            this.ToastDom.isShow = true
            this.ToastDom.content = content || ''
            this.ToastDom.confirmBtn = o.confirmBtn || '确认'
            this.ToastDom.cancelBtn = o.cancelBtn || '取消'
        }else{
            // 第一次添加DOM实例
            this.ToastDom = new ToastConstructor({
                el: document.createElement('div'),
                data () {
                    return {
                        // 描述 如果不填则默认为空
                        content: content || '',
                        // 确认按钮文字 如果不填则默认为确认 如果为空字符串 则隐藏
                        confirmBtn: o.confirmBtn || '确认',
                        // 取消按钮文字 如果不填则默认为取消 如果为空字符串 则隐藏
                        cancelBtn: o.cancelBtn || '取消',
                        // 是否显示弹窗
                        isShow: true,
                        // 是否已添加dom
                        isAppend: true,
                    }
                },
                methods: {
                    // 点击确认按钮
                    confirm () {
                        this.isShow = false
                        if (!!o.confirm) {
                            // 如果有回调 则调用 确认按钮回调
                            o.confirm()
                        }
                    },
                    // 点击取消按钮
                    cancel () {
                        this.isShow = false
                        if (!!o.cancel) {
                            // 如果有回调 则调用 取消按钮回调
                            o.cancel()
                        }
                    }
                }
            })
    
            // 把 实例化的 toast.vue 添加到 body 里
            document.body.appendChild(this.ToastDom.$el)
        }
    }
}

// 注册为全局组件的函数
function regToast() {
    // 将组件注册到 vue 的 原型链里去,
    // 这样就可以在所有 vue 的实例里面使用 this.$Toast.show()
    vue.prototype.$Toast = Toast
  }
  
  export default regToast