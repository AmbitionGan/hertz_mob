<!-- 默认弹窗 -->
<template>
    <div class="toast" v-show="isShow">
        <div class="toast-box">
            <div class="title">
                提示信息
            </div>
            <div class="content">
                <p>{{content}}</p>
                <div class="btns">
                    <button class="btn-confirm" @click="confirm" v-show="confirmBtn == 1 ? false : true">{{confirmBtn}}</button>
                    <button class="btn-cancel" @click="cancel" v-show="cancelBtn == 1 ? false : true">{{cancelBtn}}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang='less' scoped>
    .toast {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 99;
        background: rgba(0, 0, 0, 0.5);
        .toast-box {
            position: absolute;
            width: 6.68rem;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            .title {
                line-height: .98rem;
                padding: 0 .35rem;
                background: #58595b;
                color: #fff;
                font-size: .36rem;
                border-top-left-radius: .08rem;
                border-top-right-radius: .08rem;
            }
            .content {
                padding: .55rem .35rem .71rem;
                background: #fff;
                border-bottom-left-radius: .08rem;
                border-bottom-right-radius: .08rem;
                > p {
                    color: #969ca3;
                    line-height: .4rem;
                    margin-bottom: .7rem;
                }
                .btns {
                    text-align: right;
                    button {
                        width: 2.08rem;
                        height: .58rem;
                        line-height: .58rem;
                        text-align: center;
                        font-size: .28rem;
                        border-radius: .08rem;
                        margin-left: .1rem;
                        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
                        &.btn-confirm {
                            background: #ffc300;
                            color: #3b444f;                            
                        }
                        &.btn-cancel {
                            background: #6c6d70;
                            color: #fff;
                        }
                    }
                }
            }
        }
    }
</style>