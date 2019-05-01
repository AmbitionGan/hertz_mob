<template>
  <div class="send-page" @click.stop="closeBox">
    <div class="page-content">
      <div class="content-group">
        <p class="group-p">发送至邮箱</p>
        <input
          type="text"
          class="group-input e-input"
          v-model="sendParams.email"
          placeholder="E-mail(用于接收确认单邮件)"
        >
      </div>
      <div class="content-group">
        <p class="group-p">发送至手机</p>
        <p @click.stop="openCode" class="codeP">
          +
          <input type="text" v-model="sendParams.areacode" disabled>
          <img src="@/assets/images/bot-jiao.png" :class="{'detailsinverse':isOpenCode}" alt>
        </p>
        <input
          type="text"
          class="group-input p-input"
          v-model="sendParams.phone"
          placeholder="电话（用于接收订单信息）"
        >
        <div style="clear:both"></div>
        <div v-if="isOpenCode" class="code-list-box">
          <ul>
            <li v-for="(item,index) in codeList" :key="index" @click.stop="changeCode(item)">
              <span>{{item.cnName}}</span>
              <span>+{{item.mobileCode}}</span>
              <div style="clear:both"></div>
            </li>
          </ul>
        </div>
      </div>
      <div class="sure-btn">
        <div @click="sureSend">确认发送</div>
      </div>
    </div>
  </div>
</template>
<script>
import orderApi from "../api/orderCompletion.js";
export default {
  data() {
    return {
      sendParams: {
        email: "",
        areacode: "",
        phone: ""
      },
      isOpenCode: false, //区号列表显隐
      codeList: [], //国际区号列表
      phoneVerification: "" //手机号正则验证
    };
  },
  mounted() {
    this.getAreacode(); //获取国际区号列表
  },
  methods: {
    // 关闭弹框
    closeBox() {
      this.isOpenCode = false;
    },
    // 获取国际区号列表
    getAreacode() {
      orderApi
        .getAreacode()
        .then(res => {
          this.codeList = res.Result;
          this.sendParams.areacode = this.codeList[0].mobileCode;
          this.phoneVerification = this.codeList[0].Regex;
        })
        .catch(res => {});
    },
    // 打开关闭国际区号列表
    openCode() {
      this.isOpenCode = !this.isOpenCode;
    },
    // 选择国际区号
    changeCode(item) {
      this.sendParams.areacode = item.mobileCode;
      this.phoneVerification = item.Regex;
      this.isOpenCode = false;
    },
    // 发送邮箱接口
    sendEmail() {
      let data = {
        email: this.sendParams.email,
        guid: this.$route.query.guid
      };
      orderApi
        .sendEmail(data)
        .then(res => {
          if (res.ErrorMsg == 0) {
            alert("邮箱发送成功");
          } else {
            alert(res.ErrorMsg);
          }
        })
        .catch(err => {
          alert(err.ErrorMsg);
        });
    },
    // 发送邮箱接口
    sendSms() {
      let data = {
        phone: "+" + this.sendParams.areacode + this.sendParams.phone,
        guid: this.$route.query.guid
      };
      orderApi
        .sendSms(data)
        .then(res => {
          if (res.ErrorMsg == 0) {
            alert("手机短信发送成功");
          } else {
            alert(res.ErrorMsg);
          }
        })
        .catch(res => {
          alert(res.ErrorMsg);
        });
    },
    // 确认发送
    sureSend() {
      if (!this.sendParams.email && !this.sendParams.phone)
        return alert("请输入邮箱或区号和电话");
      if (this.sendParams.email && !this.sendParams.phone) {
        this.sendEmail();
      }
      if (!this.sendParams.email && this.sendParams.phone) {
        if (!this.phoneVerification.test(this.sendParams.phone)) {
          alert("电话格式错误，请重新输入");
        } else {
          this.sendSms();
        }
      }
      if (this.sendParams.email && this.sendParams.phone) {
        if (!this.phoneVerification.test(this.sendParams.phone)) {
          alert("电话格式错误，请重新输入");
        } else {
          this.sendSms();
        }
        this.sendEmail();
      }
    }
  }
};
</script>
<style lang="less" scoped>
.send-page {
  height: 100vh;
  .page-content {
    margin-top: 1.03rem;
    padding: 0 0.4rem;
    .content-group {
      width: 100%;
      position: relative;
      .group-p {
        height: 0.24rem;
        line-height: 0.24rem;
        font-size: 0.24rem;
        font-weight: 400;
        color: rgba(59, 68, 79, 1);
        margin-bottom: 0.09rem;
      }
      .codeP {
        width: 32%;
        float: left;
        padding: 0.1rem 0;
        border-bottom: 1px solid #cecece;
        font-size: 0.24rem;
        margin-right: 0.26rem;
        input {
          color: #707275;
          font-size: 0.24rem;
          display: inline-block;
          width: 46%;
        }
        textarea:disabled,
        input:disabled {
          background-color: #fff;
        }
        img {
          float: right;
          margin-top: 0.06rem;
          width: 0.23rem;
          height: 0.12rem;
          transform: rotate(0deg);
          -webkit-transform: rotate(0deg);
          transition: transform 0.5s;
        }
        .detailsinverse {
          transform: rotate(180deg);
          -webkit-transform: rotate(180deg);
          transition: transform 0.5s;
        }
      }
      .group-input {
        padding: 0.1rem 0;
        border: none;
        border-bottom: 1px solid #cecece;
        -webkit-box-shadow: none;
        box-shadow: none;
        border-radius: 0;
        font-size: 0.24rem;
      }
      .e-input {
        width: 100%;
        display: block;
        margin-bottom: 0.59rem;
      }
      .p-input {
        width: 63%;
        float: right;
      }
      .code-list-box {
        position: absolute;
        width: 100%;
        bottom: 1px solid #ff9c00;
        right: 0;
        top: 100%;
        height: 2rem;
        overflow-y: scroll;
        border: 1px solid #ff9c00;
        background: #fff;
        ul {
          li {
            padding: 0.1rem 0.2rem;
            font-size: 0.24rem;
            span {
              font-size: 0.24rem;
              font-weight: 400;
              color: rgba(188, 188, 187, 1);
            }
            span:nth-child(2) {
              float: right;
            }
          }
        }
      }
    }
    .sure-btn {
      margin-top: 1rem;
      padding: 0 0.4rem;
      div {
        height: 0.84rem;
        line-height: 0.84rem;
        background: linear-gradient(
          0deg,
          rgba(255, 186, 0, 1),
          rgba(255, 204, 0, 1)
        );
        box-shadow: 0rem 0.05rem 0.24rem 0rem rgba(0, 0, 0, 0.26);
        font-size: 0.3rem;
        font-weight: 400;
        color: rgba(59, 68, 79, 1);
        border-radius: 0.1rem;
        text-align: center;
      }
    }
  }
}
</style>
