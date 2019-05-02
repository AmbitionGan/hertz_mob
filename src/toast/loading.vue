<!-- 弹窗 -->
<template>
  <div class="loading" v-show="isShow">
      <div class="loading-box">
          <img src="@/assets/images/loading_white.gif" alt="">
          <p>正在加载中...</p>
      </div>
  </div>
</template>

<style lang='less' scoped>
    .loading {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 98;
        .loading-box {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 2.3rem;
            padding: .3rem;
            background: rgba(0, 0, 0, 0.5);
            border-radius: 0.05rem;
            img {
                width: .8rem;
                height: .8rem;
            }
            p {
                color: #fff;
                margin-top: .1rem;
            }
        }
    }
</style>