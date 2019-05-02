<!-- 在线支付 -->
<template>
    <div class="onlinePay">
        <!-- 头部 -->
        <choiceCityComHead title="订单支付"/>
        <!-- 支付区域 -->
        <div class="onlinePayContainer">
            <div class="priceBox">
                <div class="price clear">
                    <h4 class="left">支付订单费用</h4>
                    <span class="right">RMB<b>3200</b></span>
                    <p class="clear">价格浮动频繁，请在<span>44分59秒</span>内完成支付，逾期订单将自动取消</p>
                </div>
                <div class="showDetail">
                    <span>查看订单详情</span>
                </div>
            </div>

            <div class="choosePayType">
                <p>请选择支付方式</p>
                <ul>
                    <li>
                        <router-link to="/">
                            <img src="@/assets/images/alipay.png" alt="">
                            支付宝
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/">
                            <img src="@/assets/images/bankpay.png" alt="">
                            银联云闪付
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/">
                            <img src="@/assets/images/bankpay.png" alt="">
                            银联支付
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 提示信息弹窗 -->
        <div class="promptLayer" v-show="isShowPromptLayer" @click="isShowPromptLayer = false">
            <div
                class="promptLayerBox"
            >尊敬的客户，您现在购买的产品/服务供应商在中国境外，根据中华人民共和国国家外汇管理局外汇管理相关业务要求， 请真实准确的输入以下个人信息。如信息有误，将会影响您的支付体验。 赫兹不会储存您的以上信息。</div>
        </div>
        <!-- 身份证弹窗 -->
        <div class="identityLayer" v-show="isShowIdentityLayer">
            <div class="identityLayerBox">
                <div class="title">提示信息</div>
                <div class="content">
                    <div class="input clear">
                        <div class="name left">
                            <label>*</label>
                            <input type="text" placeholder="姓名" v-model="name">
                        </div>
                        <div class="number right">
                            <label>*</label>
                            <input type="text" placeholder="身份证号" v-model="number">
                        </div>
                    </div>
                    <p>尊敬的客户，您现在购买的产品/服务供应商在中国境外，根据中华人民共和国国家外汇管理局外汇管理相关业务要求， 请真实准确的输入以下个人信息。如信息有误，将会影响您的支付体验。 赫兹不会储存您的以上信息。</p>
                    <div class="btns">
                        <button class="goPay" @click="goPay()">立即支付</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import choiceCityComHead from '../common/choiceCityComHead'
import indexApi from '@/api/index'
import {common} from '@/assets/mixin/common'

export default {
    name: 'onlinePay',
    components: {
        choiceCityComHead
    },
    mixins: [common],
    data () {
        return {
            // 提醒弹窗
            isShowPromptLayer: false,

            // 个人信息弹窗
            isShowIdentityLayer: true,

            // 姓名
            name: '',

            // 身份证号
            number: ''
        };
    },
    mounted () {
        // this.getPay()
    },
    methods: {
        init () {

        },

        /**
         * @param {String} str 支付类型
         */
        getPay(str) {
            let params = {
                address: "",
                guid: this.$route.query.guid,
                href: "",
                idnumber: "320125199604170018",
                name: "甘志成",
                pmode: "306",
                random: Math.random().toString(36).substr(8)
            }
            this.$loadingToast.show()
            indexApi
                .getPay(params)
                .then(res => {
                    this.$loadingToast.close()
                    if (res.ErrorCode == 0) {
                        if (res.Result != '') {
                            // window.open(res.Result)
                            location.href = res.Result
                        }
                    }else{
                        this.messageLayer(res.ErrorMsg, 0)
                    }
                })
                .catch(err => {
                    this.$loadingToast.close()
                    this.messageLayer("请求失败，请重试", 0)
                });
        },

        /**
         * 身份验证
         */
        goPay () {
            if (this.name == '') {
                this.messageLayer('姓名不能为空')
                return
            }

            let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if (!reg.test(this.number)) {
                this.messageLayer('身份证号码错误')
                return
            }
            this.isShowIdentityLayer = false
            this.isShowPromptLayer = true
        },
    },
    watch: {
        // 姓名输入
        name () {
            this.name = pubMethod.filterCode(this.name)
        }
    }
}
</script>

<style lang="less" scoped>
.onlinePayContainer {
    .price {
        padding: 0.46rem 0.3rem;
        background: #57585a;
        border-bottom: 1px solid #7c7d7f;
        h4 {
            font-size: .36rem;
            line-height: .52rem;
            color: #fff;
        }
        > span {
            color: #FFCC00;
            > b {
                margin-left: 5px;
                font-size: 0.48rem;
                color: #ffcc00;
            }
        }
        > p {
            clear: both;
            color: #fff;
            padding-top: .28rem;
            span {
                color: #FF0000;
            }
        }
    }
    .showDetail {
        padding: .21rem .45rem;
        background: #57585A;
        span {
            color: #FFCC00;
            text-decoration: underline;
        }
    }
    .choosePayType {
        > p {
            background: #F3F3F5;
            color: #969CA3;
            padding: 0 .4rem;
            line-height: .9rem;
        }
        li {
            > a{
                display: block;
                font-size: .3rem;
                padding-left: 1.97rem;
                line-height: 1.5rem;
                border-bottom: 1px solid #E9E9E9;
                position: relative;
                img {
                    width: 1.37rem;
                    height: .75rem;
                    position: absolute;
                    left: .19rem;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
            &:first-child {
                img {
                    width: .87rem;
                    height: .87rem;
                    left: .49rem;
                }
            }
        }
    }
}
.promptLayer {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9;
    .promptLayerBox {
        width: 6.75rem;
        padding: .45rem .31rem .45rem .36rem;
        position: absolute;
        top: 2.71rem;
        left: 50%;
        transform: translateX(-50%);
        background: #fff;
        line-height: .4rem;
        color: #969CA3;
        border-radius: .05rem;
    }
}
.identityLayer {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background: rgba(0, 0, 0, 0.5);
    .identityLayerBox {
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
                color: #6b727b;
                line-height: .3rem;
                margin-bottom: .7rem;
                font-size: .24rem;
            }
            .input {
                margin-bottom: .3rem;
                label {
                    color: red;
                    position: absolute;
                    left: 0;
                    top: 0;
                }
                input {
                    width: 100%;
                    line-height: .4rem;
                    border-bottom: 1px solid #e8e8e8;
                }
                .name {
                    position: relative;
                    width: 2.2rem;
                    padding-left: .15rem;
                    height: 100%;
                    line-height: .4rem;
                }
                .number {
                    position: relative;
                    width: 3.4rem;
                    padding-left: .15rem;
                    height: 100%;
                    line-height: .4rem;
                }
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
                    &.goPay {
                        width: 100%;
                        background: #ffc300;
                        color: #3b444f;
                        margin-left: 0;
                    }
                }
            }
        }
    }
}
</style>

