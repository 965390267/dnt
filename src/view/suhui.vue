<template>
  <div class="ziya">
    <div class="logo">
      <lo-go txt="DNT" :url="require('../assets/img/dntlogo@2x.png')"></lo-go>
    </div>
    <div class="tips">
      <div class="lt">DNT 投入数量</div>
      <div class="rf">20000</div>
    </div>
    <div class="input-wrap">
      <input type="text" placeholder="输入数量" />
      <div class="total">DNT | 全部</div>
    </div>
    <div class="pricegas">手续费：50 DNT</div>
    <div class="pladge-rule">
      <p class="p1">赎回规则：</p>
      <p>DNT投入未满15天，赎回时按照赎回数量的11.23%作为手续费扣除；</p>
      <p>DNT投入满15天后，赎回时扣除手续费50DNT。</p>
    </div>
    <div class="btn-wrap">
      <div class="btn">确定</div>
    </div>
  </div>
</template>
<script>
// import { getNodeRedeem, personalAssest } from "@/api";

import LoGo from "@/components/logo.vue";
export default {
  components: {
    LoGo
  },
  data() {
    return {
      amount: "",
      src: require("../assets/img/dntlogo@2x.png")
    };
  },
  watch: {
    amount(val) {
      if (val > this.$route.query.pledgeAmount / 1000) {
        this.amount = Number(
          val.toString().substring(0, val.toString().length - 1)
        );
        return imToken.callAPI(
          "native.toastInfo",
          this.$t("shuhui.amountLimit")
        );
      }
    }
  },
  methods: {
    submit() {},
    get() {
      if (this.amount == 0) return alert(this.$t("shuhui.numbernotzero"));
      this.amount = Number(this.amount);
      if (!this.$route.query.nodeId) {
        alert(this.$t("shuhui.nogetaddress"));
        return this.$router.back(-1);
      }
      if (!this.imtokenAddress) {
        alert(this.$t("shuhui.noauthtoken"));
        return this.$router.back(-1);
      }
      var obj = {
        nodeId: this.$route.query.nodeId, //服务器地址
        toAddress: this.imtokenAddress, //钱包地址
        amount: this.amount * 1000
      };
      getNodeRedeem(obj).then(res => {
        this.$router.back(-1);
      });
    },
    setAll() {
      // personalAssest(this.imtokenAddress).then(res => {
      //   var res = res.data;
      //   if (res.success) {
      //this.balance = this.$route.query.nodeMessage.pledgeAmount
      this.amount = this.$route.query.pledgeAmount / 1000;
      //   }
      // });
    }
  },
  mounted() {
    //this.initData(); /* 数据初始化 */
  }
};
</script>

<style lang="scss" scoped>
.logo {
  margin-top: 15px;
  display: flex;
  justify-content: center;
}
.tips {
  width: 95%;
  margin: 0 auto;
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
/* 提示 */
.input-wrap {
  position: relative;
  width: 95%;
  margin: 0 auto;
  margin-top: 10px;
  padding: 6px 2px;
  border: 1px solid #707070;
  border-radius: 6px;
}
.input-wrap input {
  border: none;
  outline: none;
  background: transparent;
}
.input-wrap .total {
  position: absolute;
  right: 14px;
  top: 8px;
  color: #707070;
  font-size: 12px;
}
/* 输入 */
.pricegas {
  font-size: 11px;
  font-family: PingFang SC;
  font-weight: 400;
  text-align: right;
  padding-right: 2.5%;
  margin-top: 15px;
}
/* 规则 */
.pladge-rule {
  width: 95%;
  margin: 0 auto;
  margin-top: 70px;
}
.pladge-rule p {
  font-size: 12px;
  color: #707070;
  padding: 3px 2px;
  line-height: 18px;
}
.pladge-rule .p1 {
  color: #000;
  font-size: 14px;
  margin-bottom: 12px;
}
/* 按钮 */
.btn-wrap {
  position: absolute;
  bottom: 20px;
  left: 0;
  width: 100%;
}
.btn {
  width: 349px;
  height: 48px;
  margin: 0 auto;
  background: linear-gradient(
    131deg,
    rgba(38, 38, 107, 1) 0%,
    rgba(19, 24, 36, 1) 100%
  );
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.55);
  opacity: 1;
  border-radius: 24px;
  text-align: center;
  color: #fff;
  line-height: 48px;
  font-size: 17px;
}
</style>

