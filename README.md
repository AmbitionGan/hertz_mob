# 赫兹移动端

## 项目运行

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm start

```

## 关于接口

/src 目录下 /api 文件夹存放接口及请求方式

/api 目录下 service.js 为请求封装

/api 目录下 list.js 为首页接口数据请求

可根据 list.js 建好各自栏目下的 接口数据请求

## 请求方式

get  请求 正常请求
post 请求 所有参数 请使用 TDES.encrypt() 进行加密 该方法已添加至全局直接调用

## 静态资源

可以都放在 /assets 文件夹下

## 关于状态管理

/store 目录下 list.js 为状态仓库主文件

/store 目录下 state.js 为定义储存参数文件 按各自栏目建好各自分类 common为公共分类

/store 目录下 action.js 为定义储存异步方法文件 按各自栏目建好各自分类 common为公共分类

/store 目录下 mutations.js 为定义储存同步方法文件 按各自栏目建好各自分类 common为公共分类

/store 目录下 getter.js 为计算方法，共用方法文件 按各自栏目建好各自分类 common为公共分类

## 公共弹窗

### 默认弹窗

#### 1、使用示例

``` bash
# 组件内直接使用
this.$Toast.show('用户名输入错误', {
    confirmBtn: 1,
    cancelBtn: '关闭'，
    confirm: () => {

    },
    cancel: () => {

    }
})

```

#### 2、参数

``` bash
# 可选参数 描述信息 默认为空
content 

# 可选参数 其他配置 默认为初始化设置
obj
    ## 可选参数 确认按钮文字信息 默认显示为确认 传 1 不显示该按钮
    confirmBtn
    ## 可选参数 取消按钮文字信息 默认显示为取消 传 1 不显示该按钮
    cancelBtn
    ## 可选参数 确认按钮点击后回调
    confirm
    ## 可选参数 取消按钮点击后回调
    cancel

```

### Loading弹窗

#### 1、使用示例

``` bash
# 组件内直接使用
## 显示
this.$loadingToast.show()

## 关闭
this.$loadingToast.close()

```

## 其他

若有其他需要，自行添加配置并加以说明，争取每天上传一次git

##测试上传
