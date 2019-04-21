<template>
<<<<<<< HEAD
	<div>
		<!-- 首页导航 -->
		<header class="header">
			<span class="menu"></span>
			<router-link to="/"><img src="@/assets/images/logo.jpg" alt=""></router-link>
			<router-link to='/'></router-link>
			<div class="language">
=======
	<div class="index">
		<!-- 首页导航 -->
		<header class="header clear">
			<router-link to="/" class="logo left"><img src="@/assets/images/logo.jpg" alt=""></router-link>
			<span class="menu right"></span>
			<div class="language right">
>>>>>>> 6f9070f9a0ec6fa102df46daccbd81b6304908c3
				<span></span>
				<ul>
					<li></li>
				</ul>
			</div>
		</header>
		<!-- 轮播图 -->
		<div class="banner">
			<div class="swiper-container">
<<<<<<< HEAD
				<div class="swiper-wrapper">
					<div class="swiper-slide">
						<img src="" alt="">
					</div>
				</div>
			</div>
		</div>
		<!-- 搜车 -->

		<!-- 栏目列表 -->
		<div class="columnList">
			<ul>
				<li><router-link to='/'></router-link></li>
			</ul>
		</div>

		<!-- 品牌列表 -->
		<div class="logoList">
			<ul>
				<li>
					<router-link to='/'><img src="@/assets/images/banner_1.jpg" alt=""></router-link>
=======
				<div class="swiper-wrapper clear">
					<div class="swiper-slide" v-for="item in bannerList" :key="item.id">
						<img :src="item.src" alt="">
					</div>
				</div>
				<div class="swiper-pagination"></div>
			</div>
		</div>
		<!-- 搜车 -->
		<find-car />
		<!-- 栏目列表 -->
		<div class="columnList">
			<ul class="clear">
				<li v-for="(item, index) in columnList" :key="index">
					<router-link :to="item.href">
						<span><img :src="item.src" alt=""></span>
						<p class="ellipsis">{{item.title}}</p>
					</router-link>
				</li>
			</ul>
		</div>
		<!-- 品牌列表 -->
		<div class="logoList">
			<ul class="clear">
				<li v-for="(item, index) in logoList" :key="index">
					<img :src="item.src" alt="">
>>>>>>> 6f9070f9a0ec6fa102df46daccbd81b6304908c3
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
<<<<<<< HEAD
export default {
	name: 'index',
	mounted () {
		// this.$store.dispatch('getAreaCode');
	}  
=======
import findCar from './common/findCar'

export default {
	name: 'index',
	components: {
		findCar
	},
	data () {
		return {
			bannerList: [
				{src: require('@/assets/images/banner_1.jpg'), id: 1},
				{src: require('@/assets/images/banner_2.jpg'), id: 2},
				{src: require('@/assets/images/banner_3.jpg'), id: 3},
				{src: require('@/assets/images/banner_4.jpg'), id: 4},
			],
			columnList: [
				{src: require('@/assets/images/icon_1.jpg'), title: '赫兹金卡会员', href: '/'},
				{src: require('@/assets/images/icon_2.jpg'), title: '订单查询', href: '/'},
				{src: require('@/assets/images/icon_3.jpg'), title: '驾照翻译', href: '/'},
				{src: require('@/assets/images/icon_4.jpg'), title: '保险和服务', href: '/'},
				{src: require('@/assets/images/icon_5.jpg'), title: '租车所需材料', href: '/'},
				{src: require('@/assets/images/icon_6.jpg'), title: '优惠活动', href: '/'},
				{src: require('@/assets/images/icon_7.jpg'), title: '国内租车', href: '/'},
				{src: require('@/assets/images/icon_8.jpg'), title: '代理商登录', href: '/'},
			],
			logoList: [
				{src: require('@/assets/images/hertz.png')},
				{src: require('@/assets/images/dollar.png')},
				{src: require('@/assets/images/thrifty.png')},
				{src: require('@/assets/images/firefly.png')},
				{src: require('@/assets/images/ace.png')},
			]
		}
	},
	mounted () {
		this.initSwiper();
	},
	methods: {
		initSwiper () {
			new Swiper ('.swiper-container', {
				loop: true,
				autoplay: 4000,
				speed: 1000,
				pagination: '.swiper-pagination',
			})
		}
	}
>>>>>>> 6f9070f9a0ec6fa102df46daccbd81b6304908c3
}
</script>

<style scope lang="less">
<<<<<<< HEAD
	h1{
		font-size: .48rem;
		text-align: center;
=======
	body {
		background: #f3f3f5;
	}
	/* 头部 */ 
	header {
		background: #fff;
		height: 1.04rem;
		padding: .30rem .32rem .29rem .27rem;
		.logo {
			width: 4.53rem;
			height: .43rem;
		}
		.language {
			width: .48rem;
			height: .48rem;
			background: url(../assets/images/lang.png) no-repeat center center;
			background-size: cover;
		}
		.menu {
			width: .45rem;
			height: .45rem;
			background: url(../assets/images/user.png) no-repeat center center;
			background-size: cover;
			margin-left: .26rem;
		}
	}

	/* 轮播图 */ 
	.banner {
		height: 3.75rem;
		background: #BCBCBB;
		overflow: hidden;
		.swiper-slide {
			float: left;
		}
		.swiper-pagination-bullet {
			width: .14rem;
			height: .14rem;
			background: none;
			opacity: 1;
			border: 1px solid #fff;
			margin:0 .04rem;
		}
		.swiper-pagination-bullet-active {
			background: #fff;
		}
		.swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction {
			bottom: .1rem;
		}
	}

	/* 栏目列表 */ 
	.columnList {
		background: #fff;
		padding: .5rem .4rem 0;
		margin: .2rem 0;
		li {
			float: left;
			width: 25%;
			text-align: center;
			font-size: .18rem;
			color: #3B444F;
			text-align: center;
            margin-bottom: .5rem;
            a {
                display: block;
            }
			span {
				display: inline-block;
				width: .74rem;
				height: .60rem;
				line-height: .60rem;
				img {
					display: inline-block;
					max-height: 100%;
					vertical-align: middle;
				}
			}
			p {
				margin-top: .31rem;
			}
		}
	}

	/* 品牌列表 */ 
	.logoList {
		background: #fff;
		padding: .3rem .4rem .6rem;
		li {
			float: left;
			width: 20%;
			text-align: center;
			height: .4rem;
			line-height: .2rem;
			img {
				display: inline-block;
				max-width: .8rem;
				vertical-align: middle;
			}
		}
>>>>>>> 6f9070f9a0ec6fa102df46daccbd81b6304908c3
	}
</style>