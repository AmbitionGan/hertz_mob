<template>
    <div class="index">
        <!-- 首页导航 -->
        <header class="header clear" :class="{'active': isShowMenu}">
            <router-link to="/" class="logo left">
                <img src="@/assets/images/logo.jpg" alt>
            </router-link>
            <span class="user right" @click="isShowMenu = !isShowMenu"></span>
            <div class="language right">
                <span></span>
                <ul>
                    <li></li>
                </ul>
            </div>
            <div class="menu" v-show="isShowMenu">
                <div class="menuBox">
                    <p class="logined clear" v-if="$store.state.isLogin">
                        <img :src="$store.state.userAvatar" alt class="left">
                        <span class="left">
                            <b>ID:</b> 13213213
                        </span>
                    </p>
                    <p class="unLogin" v-else>
                        <router-link to="/">我是会员，立即登录</router-link>
                    </p>
                    <ul>
                        <li v-for="(item, index) in menuLsit" :key="index">
                            <router-link :to="item.href">{{item.title}}</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
        <!-- 轮播图 -->
        <div class="banner">
            <div class="swiper-container">
                <div class="swiper-wrapper clear">
                    <div class="swiper-slide" v-for="item in bannerList" :key="item.id">
                        <img :src="item.src" alt>
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </div>
        <!-- 搜车 -->
        <find-car/>
        <!-- 栏目列表 -->
        <div class="columnList">
            <ul class="clear">
                <li v-for="(item, index) in columnList" :key="index">
                    <router-link :to="item.href">
                        <span>
                            <img :src="item.src" alt>
                        </span>
                        <p class="ellipsis">{{item.title}}</p>
                    </router-link>
                </li>
            </ul>
        </div>
        <!-- 品牌列表 -->
        <div class="logoList">
            <ul class="clear">
                <li v-for="(item, index) in logoList" :key="index">
                    <img :src="item.src" alt>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import findCar from "./common/findCar";

export default {
    name: "index",
    components: {
        findCar
    },
    data() {
        return {
            // banner 图
            bannerList: [
                { src: require("@/assets/images/banner_1.jpg"), id: 1 },
                { src: require("@/assets/images/banner_2.jpg"), id: 2 },
                { src: require("@/assets/images/banner_3.jpg"), id: 3 },
                { src: require("@/assets/images/banner_4.jpg"), id: 4 }
            ],
            // 导航下拉
            menuLsit: [
                { title: "预订", href: "/" },
                { title: "驾照翻译", href: "/" },
                { title: "设备和服务", href: "/" },
                { title: "国内租车", href: "/" },
                { title: "订单查询", href: "/" },
                { title: "语言版本", href: "/" },
                { title: "我是代理商，代理商登录", href: "/" }
            ],
            // 栏目列表
            columnList: [
                {
                    src: require("@/assets/images/icon_1.jpg"),
                    title: "赫兹金卡会员",
                    href: "/"
                },
                {
                    src: require("@/assets/images/icon_2.jpg"),
                    title: "订单查询",
                    href: "/"
                },
                {
                    src: require("@/assets/images/icon_3.jpg"),
                    title: "驾照翻译",
                    href: "/"
                },
                {
                    src: require("@/assets/images/icon_4.jpg"),
                    title: "保险和服务",
                    href: "/"
                },
                {
                    src: require("@/assets/images/icon_5.jpg"),
                    title: "租车所需材料",
                    href: "/"
                },
                {
                    src: require("@/assets/images/icon_6.jpg"),
                    title: "优惠活动",
                    href: "/"
                },
                {
                    src: require("@/assets/images/icon_7.jpg"),
                    title: "国内租车",
                    href: "/"
                },
                {
                    src: require("@/assets/images/icon_8.jpg"),
                    title: "代理商登录",
                    href: "/"
                }
            ],
            // 合作伙伴列表
            logoList: [
                { src: require("@/assets/images/hertz.png") },
                { src: require("@/assets/images/dollar.png") },
                { src: require("@/assets/images/thrifty.png") },
                { src: require("@/assets/images/firefly.png") },
                { src: require("@/assets/images/ace.png") }
            ],
            // 是否显示下来菜单
            isShowMenu: false
        };
    },
    mounted() {
        this.initSwiper();
    },
    methods: {
        initSwiper() {
            new Swiper(".swiper-container", {
                loop: true,
                autoplay: 4000,
                speed: 1000,
                pagination: ".swiper-pagination"
            });
        }
    }
};
</script>

<style scope lang="less">
.index {
    background: #f3f3f5;
}
/* 头部 */
.header {
    background: #fff;
    height: 1.04rem;
    padding: 0.3rem 0.32rem 0.29rem 0.27rem;
    .logo {
        width: 4.53rem;
        height: 0.43rem;
        img {
            width: 100%;
        }
    }
    .language {
        width: 0.48rem;
        height: 0.48rem;
        background: url(../assets/images/lang.png) no-repeat center center;
        background-size: cover;
    }
    .user {
        width: 0.45rem;
        height: 0.45rem;
        background: url(../assets/images/user.png) no-repeat center center;
        background-size: cover;
        margin-left: 0.26rem;
        position: relative;
        &::after {
            content: "";
            width: 2px;
            height: 100%;
            position: absolute;
            left: 50%;
            top: 0;
            background: #58595b;
            transform: rotate(45deg);
            display: none;
        }
        &::before {
            content: "";
            width: 2px;
            height: 100%;
            position: absolute;
            left: 50%;
            top: 0;
            background: #58595b;
            transform: rotate(-45deg);
            display: none;
        }
    }
    &.active {
        .user {
            background: none;
            &::before,
            &::after {
                display: block;
            }
        }
        .language {
            display: none;
        }
    }
    .menu {
        position: fixed;
        left: 0;
        top: 1.04rem;
        width: 100%;
        height: calc(100vh - 1rem);
        z-index: 99;
        background: rgba(0, 0, 0, 0.5);
        .menuBox {
            width: 100%;
            position: absolute;
            left: 0;
            top: 0;
            padding-bottom: 1.78rem;
            background: #fff;
            > p {
                background: #57585a;
                &.unLogin {
                    line-height: 1.12rem;
                    text-align: center;
                    font-size: 0.3rem;
                    a {
                        display: block;
                        color: #ffd100;
                    }
                }
                &.logined {
                    padding: 0.24rem 0 0.24rem 0.41rem;
                    font-size: 0.3rem;
                    img {
                        width: 0.65rem;
                        height: 0.65rem;
                    }
                    b {
                        color: #ffd100;
                    }
                    span {
                        margin-left: 0.23rem;
                        line-height: 0.65rem;
                        color: #fff;
                    }
                }
            }
            li {
                color: #3b444f;
                border-bottom: 1px solid #cfcfcf;
                line-height: 0.72rem;
                a {
                    padding-left: 0.39rem;
                    display: block;
                }
            }
        }
    }
}

/* 轮播图 */
.banner {
    height: 3.75rem;
    background: #bcbcbb;
    overflow: hidden;
    .swiper-slide {
        float: left;
        img {
            width: 100%;
        }
    }
    .swiper-pagination-bullet {
        width: 0.14rem;
        height: 0.14rem;
        background: none;
        opacity: 1;
        border: 1px solid #fff;
        margin: 0 0.04rem;
    }
    .swiper-pagination-bullet-active {
        background: #fff;
    }
    .swiper-container-horizontal > .swiper-pagination-bullets,
    .swiper-pagination-custom,
    .swiper-pagination-fraction {
        bottom: 0.1rem;
    }
}

/* 栏目列表 */
.columnList {
    background: #fff;
    padding: 0.5rem 0.4rem 0;
    margin: 0.2rem 0;
    li {
        float: left;
        width: 25%;
        text-align: center;
        font-size: 0.18rem;
        color: #3b444f;
        text-align: center;
        margin-bottom: 0.5rem;
        a {
            display: block;
        }
        span {
            display: inline-block;
            width: 0.74rem;
            height: 0.6rem;
            line-height: 0.6rem;
            img {
                display: inline-block;
                max-height: 100%;
                vertical-align: middle;
            }
        }
        p {
            margin-top: 0.31rem;
        }
    }
}

/* 品牌列表 */
.logoList {
    background: #fff;
    padding: 0.3rem 0.4rem 0.6rem;
    li {
        float: left;
        width: 20%;
        text-align: center;
        height: 0.4rem;
        line-height: 0.4rem;
        img {
            display: inline-block;
            max-width: 0.8rem;
            vertical-align: middle;
        }
    }
}
</style>