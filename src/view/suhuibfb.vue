<template>
  <div class="ziya">
    <div class="logo">
      <lo-go txt="BFB" :url="require('../assets/img/bfblogo@2x.png')"></lo-go>
    </div>
    <div class="tips">
      <div class="lt">BFB 累计收益</div>
      <div class="rf">{{totalAssetsBFB|fixed}}</div>
    </div>
    <div class="input-wrap">
      <input type="number" placeholder="输入数量" v-model="amount"/>
      <div class="total" @click="setAll()">BFB | 全部</div>
    </div>
    <div class="pricegas">手续费：1%</div>
    <div class="pladge-rule">
      <p class="p1">提现规则：</p>
      <p>提现BFB时，会扣除您提现数量的1%作为手续费，但提现的最低手续费为100BFB，即您的收益未满100BFB时将不可进行提现操作。</p>
      <p>例如：</p>
      <p>您提现150BFB时，会扣除100BFB作为手续费，实际到账50BFB。</p>
      <p>您提现15000BFB时，会扣除提现总额的1%作为提现手续费，即150BFB，实际到账14850BFB</p>
    </div>
    <div class="btn-wrap">
      <div class="btn" @click=" get()">确定</div>
    </div>
  </div>
</template>
<script>
 import { getNodeRedeem } from "@/api";

import LoGo from "@/components/logo.vue";
export default {
  components: {
    LoGo
  },
  data() {
    return {
      totalAssetsBFB:'',
      amount: "",
      src: require("../assets/img/dntlogo@2x.png"),
    };
  },
  watch: {
    amount(val) {

      if (val >  this.totalAssetsBFB / 1000) {
        this.amount = Number(
          val.toString().substring(0, val.toString().length - 1)
        );
        // return this.$alert('已超过您所拥有的的最大量');
      }

    }
  },
  methods: {
    get() {
      if (this.amount == 0) return this.$alert('数量不能为0');
     if(this.amount<100){
          return  this.$alert('最小提现金额为100BFB，您账户中BFB数量不足，暂时不可提现，加大投入DNT，加速BFB的收益，可尽快完成提现。');
      }
      this.amount = Number(this.amount);

      if (!this.imtokenAddress) {
        this.$alert('未授权钱包地址，请授权后重试');
        return this.$router.back(-1);
      }
      this.$confirm(`提现数量：${this.amount}BFB,实际到账：${this.amount*0.99}BFB,将扣除1%作为提现手续费，您确定提现吗？`)
      .then(({ result }) => {
        if (result) {
           var obj = {
        tokenType: 'BFB' , //服务器地址
        toAddress: this.imtokenAddress, //钱包地址
        amount: this.amount * 1000
      };
      getNodeRedeem(obj).then(res => {//赎回接口
        this.$router.back(-1);
      });

        } 
      });
    
    },
    setAll() {//设置全部
      this.amount= this.totalAssetsBFB/1000 ;
    }
  },
  mounted() {
     this.totalAssetsBFB=this.$route.query.totalIncome
  },
   destroyed(){
         document.body.removeChild(document.querySelector('.mu-dialog-wrapper'))//一个不优雅的方式解决muse ui弹窗通过返回键返回不会关闭的问题，回到改页面移除弹窗DOM元素
          document.body.removeChild(document.querySelector('.mu-overlay'))
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
  padding: 10px 2px;
  border: 1px solid #707070;
  border-radius: 6px;
}
.input-wrap input {
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  padding-left: 6px;
}
.input-wrap .total {
  position: absolute;
  right: 14px;
      top: 12px;
    color: #707070;
    font-size: 16px;
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
  margin-top: 30px;
}
.pladge-rule p {
  font-size: 12px;
  color: #707070;
  padding: 3px 2px;
  line-height: 22px;
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
  width: 90%;
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

