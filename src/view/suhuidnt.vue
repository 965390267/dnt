<template>
  <div class="ziya">
    <div class="logo">
      <lo-go txt="DNT" :url="require('../assets/img/dntlogo@2x.png')"></lo-go>
    </div>
    <div class="tips">
      <div class="lt">DNT 已投入数量</div>
      <div class="rf">{{total}}</div>
    </div>
    <div class="input-wrap">
      <input type="number" placeholder="输入数量" v-model="amount"/>
      <div class="total" @click="setAll()">DNT | 全部</div>
    </div>
    <div class="pricegas">手续费：50 DNT</div>
    <div class="pladge-rule">
      <p class="p1">赎回规则：</p>
      <p>DNT投入未满15天，赎回时按照赎回数量的11.23%作为手续费扣除；</p>
      <p>DNT投入满15天后，赎回时扣除手续费50DNT。</p>
    </div>
    <div class="btn-wrap">
      <div class="btn"  @click=" get()">确定</div>
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
      total:'',
      amount: "",
      src: require("../assets/img/dntlogo@2x.png"),
      isPassDate:false
    };
  },
  watch: {
    amount(val) {

      if (val > this.$route.query.pledgeAmout / 1000) {
        this.amount = Number(
          val.toString().substring(0, val.toString().length - 1)
        );
        // return this.$alert('已超过您所拥有的的最大量');
      }

    }
  },
  methods: {
    // diffDay(date){
    // let diff=  (new Date().getTime()-new Date(date).getTime())/1000/60/60/24
    // return diff>15?true:false;
    // },
    get() {
            this.amount = Number(this.amount);
      if (this.amount == 0) return this.$alert('数量不能为0');
      if(this.amount<50&&this.isPassDate){
          return this.$alert('DNT投入已满15天，赎回时手续费为50DNT，您账户中DNT数量不足，暂时不可提现。');
      }

      if (!this.imtokenAddress) {
        this.$alert('未授权钱包地址，请授权后重试');
        return this.$router.back(-1);
      }
      this.$confirm(this.isPassDate?`赎回数量：${this.amount}DNT 实际到账：${this.amount-50}DNT 手续费为50DNT，您确定赎回吗？`:`赎回数量：${this.amount}DNT，实际到账:${this.amount-(this.amount*0.1123)}DNT,投入满15天，手续费为50DNT建议投入15天后赎回`)
      .then(({ result }) => {
        if (result) {
           var obj = {
        tokenType: 'DNT' , //服务器地址
        toAddress: this.imtokenAddress, //钱包地址
        amount: this.amount * 1000
      };
      getNodeRedeem(obj).then(res => {//赎回接口
        this.$router.back(-1);
      });

        } 
      });
    
    },
    setAll() {
      this.amount= this.total ;
    }
  },
  mounted() {
   this.total = this.$route.query.pledgeAmout / 1000;
    this.isPassDate=this.$route.query.isPassDate;//是否满15天，true是超过15天的
    
  }  ,
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

