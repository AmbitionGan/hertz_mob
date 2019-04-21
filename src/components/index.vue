<template>
	<div>
		<!-- 首页导航 -->
		<header class="header">
			<span class="menu"></span>
			<router-link to="/"><img src="@/assets/images/logo.jpg" alt=""></router-link>
			<router-link to='/'></router-link>
			<div class="language">
				<span></span>
				<ul>
					<li></li>
				</ul>
			</div>
		</header>
		<!-- 轮播图 -->
		<div class="banner">
			<div class="swiper-container">
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
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'index',
	mounted () {
		// this.$store.dispatch('getAreaCode');
	}  
}
</script>

<style scope lang="less">
	h1{
		font-size: .48rem;
		text-align: center;
	}
</style>