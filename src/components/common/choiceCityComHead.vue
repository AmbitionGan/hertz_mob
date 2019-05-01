<!-- 选择城市 -->
<template>
    <div class="choiceCityComHead clear">
        <span class="goBack left" @click="goBack()"></span>
        <span>{{title}}</span>
        <span class="goHome right" @click="goHome()"></span>
    </div>
</template>

<script>
export default {
    name: 'choiceCityComHead',
    props: ['title'],
    data () {
        return {
            path: ''
        }
    },
    mounted () {
        this.path = this.$route.path
    },
    methods: {
        goBack () {
            if (this.path === '/' || this.path === '/list') {
                this.$store.state.isShowChoiceCity = false
                this.$store.state.isShowChoiceLand = false
            }else{
                this.$router.go(-1)
            }
        },
        goHome () {
            if (this.path === '/' || this.path === '/list') {
                this.$store.state.isShowChoiceCity = false
                this.$store.state.isShowChoiceLand = false
            }else{
                this.$router.push({
                    path: '/'
                })
            }
        }
    }
}

</script>

<style lang='less' scoped>
    .choiceCityComHead {
        height: 1.04rem;
        padding: .31rem .41rem;
        text-align: center;
        background: #fff;
        // margin-bottom: .15rem;
        > span {
            font-size: .3rem;
            height: .42rem;
            line-height: .42rem;
        }
        .goBack {
            width: .19rem;
            background: url(../../assets/images/icon_back.png) no-repeat center center;
            background-size: contain;
        }
        .goHome {
            width: .46rem;
            background: url(../../assets/images/icon_home.png) no-repeat center center;
            background-size: contain;
        }
    }
</style>