<template>
  <div class="cancel-page" @click="clickClose">
    <choiceCityComHead title="取消预定"></choiceCityComHead>
    <div class="cancel-content">
      <div class="content-group">
        <p class="group-p">取消原因</p>
        <div class="group-div" @click.stop="openBox">
          <input type="text" class="inputs" v-model="cancelForm.why" placeholder="请选择取消原因" disabled>
          <img src="@/assets/images/select.png" :class="{'imginverse':isOpenBox}" alt>
          <div v-if="isOpenBox" class="resaon-list-box">
            <ul>
              <li v-for="(item,index) in reasonList" :key="index" @click.stop="changeReason(item)">
                <span>{{item}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="content-group">
        <p class="group-p tow-p">安全验证</p>
        <input type="text" class="inputs" placeholder="请输入下单时预订人邮箱">
      </div>
      <div class="content-tips">
        注：订单可在去取车时间（当地时间：2018.07.16 10:00）
        前免费取消。订单一旦取消，将不可恢复。
      </div>
      <div class="footer">
        <button @click="noCancel">我再想想</button>
        <button @click="sureCancel">确认取消</button>
        <div style="clear:both"></div>
      </div>
    </div>
  </div>
</template>
<script>
import orderApi from "@/api/orderCompletion.js";
import choiceCityComHead from "@/components/common/choiceCityComHead"; //顶部
import { common } from "@/assets/mixin/common";
export default {
  components: {
    choiceCityComHead
  },
  mixins: [common],
  data() {
    return {
      isOpenBox: false,
      reasonList: ["行程有变", "取/还车时间有误", "其他"],
      cancelForm: {
        why: "", //取消原因
        email: "", //订单邮箱
        guid: ""
      },
      isCancel: true //防止重复提交
    };
  },
  methods: {
    clickClose() {
      this.isOpenBox = false;
    },
    // 打开原因列表
    openBox() {
      this.isOpenBox = !this.isOpenBox;
    },
    // 选择取消原因
    changeReason(item) {
      this.cancelForm.why = item;
      this.isOpenBox = false;
    },
    // 再想想
    noCancel() {},
    // 确认取消
    sureCancel() {
      if (!this.cancelForm.why) return this.messageLayer("请选择取消原因");
      if (!this.cancelForm.email) return this.messageLayer("请填写订单邮箱");
      if (
        !/^[0-9A-Za-z][\.-_0-9A-Za-z]*@[0-9A-Za-z]+(?:\.[0-9A-Za-z]+)+$/.test(
          this.cancelForm.email
        )
      )
        return this.messageLayer("邮箱格式错误，请重新输入");
      if (this.isCancel) {
        this.isCancel = false;
        this.$loadingToast.show();
        orderApi
          .cancelOrder(this.cancelForm)
          .then(res => {
            this.$loadingToast.close();
            if (res.ErrorCode == 0) {
              this.$router.push({
                path: "/orderInfo",
                query: { guid: res.Result }
              });
            }
            this.isCancel = true;
          })
          .catch(res => {
            this.$loadingToast.close();
            this.messageLayer(res.ErrorMsg);
            this.isCancel = true;
          });
      }
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.cancel-page {
  height: 100vh;
  background: #fff;
  .cancel-content {
    padding: 1.03rem 0.4rem 0 0.4rem;
    .content-group {
      width: 100%;
      .group-p {
        height: 0.24rem;
        line-height: 0.24rem;
        font-size: 0.24rem;
        font-weight: 400;
        color: rgba(59, 68, 79, 1);
        margin-bottom: 0.09rem;
      }
      .tow-p {
        margin-top: 0.45rem;
      }
      .group-div {
        width: 100%;
        position: relative;
        img {
          position: absolute;
          right: 0;
          width: 0.12rem;
          height: 0.23rem;
          bottom: 0.1rem;
          transform: rotate(0deg);
          -webkit-transform: rotate(0deg);
          transition: transform 0.5s;
        }
        .imginverse {
          transform: rotate(90deg);
          -webkit-transform: rotate(90deg);
          transition: transform 0.5s;
        }
      }
      .inputs {
        width: 100%;
        display: block;
        padding: 0.1rem 0;
        border: none;
        border-bottom: 1px solid #cecece;
        -webkit-box-shadow: none;
        box-shadow: none;
        border-radius: 0;
        font-size: 0.24rem;
        width: 100%;
        background-color: #fff;
      }
      .resaon-list-box {
        position: absolute;
        width: 100%;
        right: 0;
        top: 100%;
        overflow-y: scroll;
        border: 1px solid #ff9c00;
        background: #fff;
        padding: 0.05rem 0;
        ul {
          li {
            padding: 0.1rem 0.2rem;
            font-size: 0.24rem;
            span {
              display: inline-block;
              font-weight: 400;
              color: rgba(188, 188, 187, 1);
            }
          }
        }
      }
    }
    .content-tips {
      margin-top: 0.62rem;
      font-size: 0.24rem;
      font-weight: 400;
      color: rgba(59, 68, 79, 1);
      line-height: 0.36rem;
    }
    .footer {
      margin-top: 1.09rem;
      button {
        height: 0.6rem;
        line-height: 0.6rem;
        border-radius: 0.1rem;
        width: 47.45%;
      }
      button:nth-child(1) {
        background: linear-gradient(
          180deg,
          rgba(149, 156, 164, 1),
          rgba(88, 89, 91, 1)
        );
        box-shadow: 0px 5px 24px 0px rgba(0, 0, 0, 0.26);
        float: left;
        color: rgba(255, 255, 255, 1);
      }
      button:nth-child(2) {
        background: linear-gradient(
          0deg,
          rgba(255, 186, 0, 1),
          rgba(255, 204, 0, 1)
        );
        box-shadow: 0px 5px 24px 0px rgba(0, 0, 0, 0.26);
        float: right;
        color: rgba(59, 68, 79, 1);
      }
    }
  }
}
</style>
