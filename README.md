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

/api 目录下 index.js 为首页接口数据请求

可根据 index.js 建好各自栏目下的 接口数据请求


## 关于状态管理

/store 目录下 index.js 为状态仓库主文件

/store 目录下 state.js 为定义储存参数文件 按各自栏目建好各自分类 common为公共分类

/store 目录下 action.js 为定义储存异步方法文件 按各自栏目建好各自分类 common为公共分类

/store 目录下 mutations.js 为定义储存同步方法文件 按各自栏目建好各自分类 common为公共分类

/store 目录下 getter.js 为计算方法，共用方法文件 按各自栏目建好各自分类 common为公共分类


## 其他

若有其他需要，自行添加配置并加以说明，争取每天上传一次git