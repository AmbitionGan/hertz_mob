<template>
      <div class="priceFooter">
        <!--footer-->
        <div class="detailPage-footer">
          <div class="detailPage-footer-left">
            <p v-show="$store.state.payState == 'online'">在线需付<br> {{$store.state.unitMoney}} <span>{{($store.state.insureRateState == true)?$store.state.dayRateTotal:$store.state.dayTotal}}</span><br>约RMB <span>{{($store.state.insureRateState == true)?$store.state.allRateTotal:$store.state.allTotal}}</span></p>
            <p v-show="$store.state.payState == 'online' && $store.state.insureRateState == true">到店需付 <br> 约{{$store.state.unitMoney}} <span>{{$store.state.dayRateArriveTotal}}</span><br /></p>
            <p v-show="$store.state.payState == 'arrive'">到店需付<br> {{$store.state.unitMoney}} <span>{{($store.state.insureRateState == true)?$store.state.dayRateArriveTotal:$store.state.dayArriveTotal}}</span><br>约RMB <span>{{($store.state.insureRateState == true)?$store.state.allRateArriveTotal:$store.state.allArriveTotal}}</span></p>
            <p @click="dialogVisible = true" class="">费用 <br>明细</p>
          </div>
          <div class="detailPage-footer-right" @click="submitDetail">
            <p>预估总额 <br>
              {{$store.state.unitMoney}} {{getTotalMoney()}}
            </p>
            <p>提交订单</p>
          </div>
        </div>
        <!-- Modal -->
        <el-dialog custom-class = "dialogFoot"
                   :visible.sync="dialogVisible"
                   width="90%">
          <div class="dialog-foot">
            <div class="modal fade" id="Charges" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <p>费用明细</p>
                  </div>
                  <div class="modal-body">
                    <div>
                      <p v-show="$store.state.payState == 'online'">
                        <span>在线支付包含</span>
                        <span><span class="modal-body-leftSpan">{{$store.state.unitMoney}} {{($store.state.insureRateState == true)?$store.state.dayRateTotal:$store.state.dayTotal}}</span>  <span class="modal-body-rightSpan">约RMB {{($store.state.insureRateState == true)?$store.state.allRateTotal:$store.state.allTotal}}</span></span>
                      </p>
                      <p v-show="$store.state.payState == 'arrive'">
                        <span>到店支付包含</span>
                        <span><span class="modal-body-leftSpan">{{$store.state.unitMoney}} {{getArriveFunction()}}</span>  </span>
                      </p>
                      <ul class="modal-body-ul">
                        <li v-for="(items,index) in getContent()" :key="index">{{items}}</li>
                      </ul>
                    </div>
                    <div>
                      <p v-show="$store.state.payState == 'online' && $store.state.insureRateState == true">
                        <span>到店支付包含</span>
                        <span><span class="modal-body-leftSpan">{{$store.state.unitMoney}} {{getArriveFunction()}}</span>  </span>
                      </p>
                      <ul class="modal-body-ul">
                        <li v-for="items in $store.state.resultGroup">{{turnInsureName(items).name}}</li>
                      </ul>
                      <ul class="modal-body-ul">
                        <li v-if="$store.state.gpsMenu">GPS</li>
                        <li v-if="$store.state.equiChild1 != 0">婴儿座椅 X {{$store.state.equiChild1}} </li>
                        <li v-if="$store.state.equiChild2 != 0">幼儿座椅 X {{$store.state.equiChild2}}</li>
                        <li v-if="$store.state.equiChild3 != 0">儿童座椅 X {{$store.state.equiChild3}}</li>
                      </ul>
                    </div>
                    <span>  &nbsp;&nbsp;&nbsp;(门店服务的具体价格和库存需以门店为准，此处价格仅供参考，可能在
门店加收额外税费)</span>
                  </div>
                  <!--<div class="modal-footer">-->
                  <!--<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>-->
                  <!--<button type="button" class="btn btn-primary">Save changes</button>-->
                  <!--</div>-->
                </div>
              </div>
            </div>
          </div>
        </el-dialog>
      </div>
</template>

<script>
  import Vue from 'vue';
  import ElementUI from 'element-ui';
  import 'element-ui/lib/theme-chalk/index.css';

  Vue.use(ElementUI);

  export default {
    name: 'footerPrice',
    data() {
      return {
        dialogVisible:false
      }
    },
    mounted() {
    },
    methods: {
      getContent:function(){
        try{
          return this.$store.state.insureList[this.$store.state.insureIndex].content;
        }catch(e){}
      },
      getArriveFunction(){
        if(this.$store.state.insureRateState == true){
          if(this.$store.state.payState == 'online'){
            return this.$store.state.dayRateArriveTotal;
          }else{
            return this.$store.state.allRateArriveTotal;
          }
        }else{
          return this.$store.state.dayArriveTotal
        }
      },
      getTotalMoney:function(){
        if(this.$store.state.insureRateState == true) {
          if (this.$store.state.payState == 'online') {
            return this.$store.state.dayTotal;
          }else{
            return this.$store.state.dayRateArriveTotal;
          }
        }else{
          if (this.$store.state.payState == 'online') {
            return this.$store.state.dayTotal;
          }else{
            return this.$store.state.dayArriveTotal;
          }
        }
      },
      /**
       * 创建可排序信息
       * @param code 服务code
       * @return {*}
       */
      turnInsureName:function(code){
        switch(code){
          case "AAO":
            return {name:"额外服务",code:"AAO",order:0};
            break;
          case "FPO":
            return {name:"燃油",code:"FPO",order:1};
            break;
          case "PER":
            return {name:"高级道路救援",code:"PER",order:2};
            break;
        }
      },
      /**
       * 提交订单
       */
      submitDetail:function(){
        var facility = this.$store.state.gpsMenu;
        facility == true?facility=1:facility=0;
        var littleActive = 0;
        this.$store.state.payState == 'online'?littleActive=this.$store.state.littleOnline:littleActive=this.$store.state.littleArrive;
        // var url = '/orderCompletion/facility='+this.$store.state.equiChild1+','+this.$store.state.equiChild2+','+this.$store.state.equiChild3+'&facility2='+facility+'&active='+this.$store.state.insureIndex+','+littleActive;
        // window.location.href= url;
        
        let query = {
            guid: this.$route.query.guid,
            facility: this.$store.state.equiChild1+','+this.$store.state.equiChild2+','+this.$store.state.equiChild3,
            facility2: facility,
            active: this.$store.state.insureIndex+','+littleActive,
            take: this.$route.query.take,
            ret: this.$route.query.ret,
        }
        this.$router.push({
            path: '/orderCompletion',
            query: query
        })
      }
    },
    computed: {}
  }
</script>

<style lang="less" scoped>

</style>
