<template>
    <div class="order-page">
        <!-- ==============================填写驾驶人信息============================================= -->
        <div class="fill-in-driversMessage fill-in-modol">
            <div class="fill-in-driversMessage-title form-group ">
                <span >驾驶人信息</span>
                <span class="spancolor-hui">驾驶员姓名须与驾照、护照拼音/英文</span>
                <img src="../assets/images/driversicon.png" alt="" @click="openDriver">
            </div>
            <div class="form-group ">
                <input type="text" name="" class="form-control" placeholder="英文名或拼音*">
            </div>
            <div class="form-group ">
                <input type="text" name="" class="form-control" placeholder="英文姓或拼音*">
            </div>
            <div class="form-group ">
                <input type="number" name="" class="form-control" placeholder="年龄*">
            </div>
            <div class="fill-in-driversMessage-tips form-group">
                <span >如填写更多详细信息，请点击展开</span>
                <img src="../assets/images//bot-jiao.png" alt="">
            </div>
            <div class="preservation">保存驾驶人至常用驾驶人</div>
        </div>
        <!-- ==============================填写航班信息============================================= -->
        <div class="fill-in-flightMessage fill-in-modol">
            <div class="fill-in-driversMessage-title form-group ">
                <span >航班信息</span>
            </div>
            <div class="form-group ">
                <input type="text" name="" class="form-control" placeholder="到达航班号（方便为您预留车辆）">
            </div>
            <div class="flight-tips">
                注：提供到达航班号，如果航班延误导致取车时间推迟，我们
                会为您安排修改时间。
            </div>
        </div>   
        <!-- ==============================填写优惠券============================================= -->
        <div class="fill-in-couponMessage fill-in-modol">
            <div class="fill-in-driversMessage-title form-group ">
                <span >优惠券</span>
                <p style="float:right;">
                    <i class="origin">1张可用</i>
                    <img src="@/assets/images/select.png" alt="">
                </p>
            </div>
            <div class="fill-in-driversMessage-title form-group flight-tips">
                <span>我有其他优惠券</span>
            </div>
            <div class="form-group ">
                <input type="text" name="" class="form-control" placeholder="优惠代码">
            </div>
        </div>
        <!-- tips -->
        <div class="Agreement">
            注：点击提交订单即表示我已经阅读并接受 
            <span @click="gotoClause">《赫兹租车条款和条件》</span>
        </div>
        <div class="elastic-frame" v-if="elastic" @click="closeElastic"></div>
        <!-- <div class="driver-list-box" v-if="driverListShow"> -->
        <div :class="['driver-list-box',driverListShow?'shows':'']" >
            <div class="driver-list-title">选择驾驶人</div>
            <div class="driver-list">
                <ul>
                    <li v-for="(item,index) in driverList" :key="index">
                        <p>{{item.name}}{{item.surname}}</p>
                        <p>
                            <span>+{{item.areacode}}</span>
                            <span>{{item.phone}}</span>
                        </p>
                        <img src="@/assets/images/change-pencil.png" alt="" @click="editInfo">
                    </li>
                </ul>
            </div>
        </div>     
    </div>
</template>
<script>
import orderApi from '../api/orderCompletion.js'
export default {
    data(){
        return{
            // TDES.encrypt(asdasd)
            elastic:false,          //弹框
            driverListShow:false,   //驾驶人列表
            //驾驶人列表
            driverList:[
                {
                "guid": "01da9d69-782b-484e-894d-66c150776758",
                "name": "hao",
                "surname": "kaiwei",
                "age": "25",
                "email": "934295729@qq.com",
                "areacode": "86",
                "phone": "15952089797",
                "goldcardnum": "",
                "airlinecompany": "Aegean Airlines",
                "passengernum": "",
                "emergencycontactname": "haokaiwei",
                "emergencycontacttel": "",
                "emergencycontactcode": "86",
                "airlinecode": "A3"
                },
                {
                "guid": "01da9d69-782b-484e-894d-66c150776758",
                "name": "hao",
                "surname": "kaiwei",
                "age": "25",
                "email": "934295729@qq.com",
                "areacode": "86",
                "phone": "15952089797",
                "goldcardnum": "",
                "airlinecompany": "Aegean Airlines",
                "passengernum": "",
                "emergencycontactname": "haokaiwei",
                "emergencycontacttel": "",
                "emergencycontactcode": "86",
                "airlinecode": "A3"
                }

            ],          
        }
    },
    methods:{
        // 获取常用驾驶人列表
        getDriverList(){
            orderApi.getDriverList().then(res=>{
                this.driverList = res.Result
            }).catch(res=>{

            })
           
        },
        addDriver(){
            orderApi.addDriver().then(res=>{

            }).catch(res=>{

            })
        },
        // 关闭弹框
        closeElastic(){
            this.elastic = false
            if(this.driverListShow) return this.driverListShow = false
        },
        // 打开驾驶人列表
        openDriver(){
            this.elastic =this.driverListShow = true
        },
        // 编辑驾驶人信息
        editInfo(){

        },
        // 跳转条款页面
        gotoClause(){
            // this.$router.push()
        },
    },
    mounted(){
        // this.$store.
        // this.getDriverList()        //获取常用驾驶人列表
    }
}
</script>
<style lang="less" scoped>
.order-page{
    font-size: 0.24rem;
    color: rgb(59, 68, 79);
    background-color: #f3f3f5;
    overflow-x: hidden;
    position: relative;
    .fill-in-modol{
        padding: 0.44rem 0.4rem;
        background: #fff;
        margin-top: 0.2rem;
        display: table;
        width: 100%;
        .fill-in-driversMessage-title {
            display: table;
            width: 100%;
            border-bottom: 0.02rem solid #cecece;
            padding-bottom: 0.1rem;
            span{
                float: left;
                margin-right: 0.2rem;
            }
            .spancolor-hui{
                color: #969ca3;
            }
            img{
                width: 0.23rem;
                height: 0.24rem;
                float: right;
                vertical-align: middle;
            }
            p{
                img{
                    width: 0.13rem;
                    height: 0.24rem;
                    margin-left: 0.2rem;
                    float: none;
                    display: inline-block;
                    margin-bottom: 0.04rem;
                }
            }
        }
        .form-group{
            display: table;
            width: 100%;
            margin-bottom: 0.1rem;
            .form-control{
                padding: 6px 0;
                border: none;
                border-bottom: 1px solid #cecece; 
                box-shadow:none;
                border-radius: 0;
                display: block;
                width: 100%;
            }
            .form-control:focus{
                box-shadow:none!important;
            }
            .origin{
                color: #ff9c00!important;
            }
        }
        .fill-in-driversMessage-tips{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.16rem 0;
            border-bottom: 0.02rem solid #cecece;
             img{
                width: 0.25rem;
                height: 0.12rem;
                vertical-align: middle;
            }
        }
        .preservation{
            width: 100%;
            height: 0.84rem;
            line-height: 0.84rem;
            text-align: center;
            font-size: 0.3rem;
            border-radius: 0.1rem;;
            -webkit-border-radius: 0.1rem;
            -moz-border-radius: 0.1rem;
            -ms-border-radius: 0.1rem;
            -o-border-radius: 0.1rem;
            background: #ffc100;
            margin-top: 0.4rem;
        }
    }
    .Agreement{
        padding: 0.4rem;
    }
    .elastic-frame{
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background-color:#000 ;
        opacity: .5;
    }
    .driver-list-box{
        z-index: 3;
        padding: 0 0.4rem;
        width: 100%;
        position: fixed;
        left: 0;
        bottom: 0;
        transform:translateY(100%);
        transition:all .3s;
        .driver-list-title{
            border-top-left-radius: 0.1rem;
            border-top-right-radius: 0.1rem;
            height: 0.95rem;
            line-height: 0.95rem;
            background-color: #FFCD00;
            text-align: center;
            font-size:0.36rem;
            font-weight:400;
            color:rgba(59,68,79,1);
        }
        .driver-list{
            padding: 0 0.41rem 0.06rem 0.38rem;
            background-color: #fff;
            border-bottom-left-radius: 0.1rem;
            border-bottom-right-radius: 0.1rem;
            ul{
                li{
                    padding: 0.31rem 0;
                    border-bottom: 1px solid #CBCED2;
                    position: relative;
                    img{
                        width: 0.38rem;
                        height: 0.38rem;
                        position: absolute;
                        right: 0;
                        top: 0.47rem;
                    }
                    p{  
                        padding-left: 0.02rem;
                        font-size: 0.24rem;
                        height: 0.24rem;
                        line-height: 0.24rem;
                    }
                    p:nth-child(1){
                        color: #3B444F;
                        margin-bottom: 0.26rem;
                    }
                    p:nth-child(2){
                        span{
                        color: #969CA3;
                        }
                    }
                }
                li:last-child{
                    border:none;
                }
            }
        }
    }
    .shows{
        transform:translateY(-1.57rem);
    }

}
</style>
