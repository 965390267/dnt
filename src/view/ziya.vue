<template>
  <div class="ziya">
    <div class="logo">
      <lo-go txt="DNT" :url="require('../assets/img/dntlogo@2x.png')"></lo-go>
    </div>
    <div class="tips">
      <div class="lt">DNT 可用余额</div>
      <div class="rf">{{userTotalAmount|fixed}} DNT</div>
    </div>
    <div class="input-wrap">
      <input type="number" placeholder="输入数量" v-model="amount" />
      <div class="total" @click="setAll()">DNT | 全部</div>
    </div>
    <div class="pricegas">矿工费≈{{gas}}ETH</div>
    <div class="pladge-rule">
      <p class="p1">质押规则：</p>
      <p>当日投入DNT后将于次日产生BFB收益，并将于每日24:00结算当日收益。</p>
      <p>BFB的产出速度与根据投入DNT的时间和数量呈正比。</p>
      <p>即DNT投入数量越多，BFB产出越快；DNT投入时间越久，BFB产出越多。</p>
      <p>投入10000DNT，一年将产出300BFB。</p>
      <p>DNT现价：{{dntToUsdt.toFixed(6)}}USDT</p>
      <p>BFB现价：{{bfbToUsdt.toFixed(6)}}USDT</p>
    </div>
    <div class="btn-wrap">
      <div
        class="btn"
        :class="{grey:isgrey}"
        v-loading="btnloading"
        data-mu-loading-text
        data-mu-loading-size="28"
      >
        <mu-ripple class="mu-ripple" @click="get()" :opacity="0.5">确定</mu-ripple>
      </div>
    </div>
  </div>
</template>
<script>
import LoGo from "@/components/logo";
import imtokenPay from "@/assets/js/pay.js";
import { dntABI, dntAddress } from "@/assets/js/abi.js";
import { getNodePledge,personalAssest,getGas,getDNTCNY } from "@/api";
export default {
  components: { LoGo },
  data() {
    return {
      amount: "" /* 用户输入的Nova数量，提交需要*1000 */,
      btnloading: false,
      isgrey: true,
      userTotalAmount: 0,
      gas:'',
      bfbToUsdt:'',
      dntToUsdt:''
    };
  },
  watch: {
    amount(val) {
      if (val > 0) this.isgrey = false;

      if (val > this.userTotalAmount / 1000) {
        this.amount = Number(
          val.toString().substring(0, val.toString().length - 1)
        );
        // return this.$alert('已超过您所拥有的的最大量');
      }
    }
  },
  methods: {
    get() {
      if (this.isgrey) return;

      this.amount = Number(this.amount);
        if (this.amount == 0) return this.$alert('余额不足，不可投入');
      if (!this.imtokenAddress) {
        this.$alert("未成功授权，请退出重试", "提示", {
          okLabel: "确定"
        });
        return this.$router.back(-1);
      }
      let payAmount = this.amount * 1000;
      this.btnloading = true;
      imtokenPay(dntABI,this.$route.query.nodeAddress, dntAddress, payAmount)
        .then(hash => {
    
          //调用封装钱包支付的方法
          this.pay(hash);
        })
        .catch(err => {
           this.btnloading=false
        });
    },
    pay(hash) {
      //走自己的后台记录
      var obj = {
        fromAddress: this.imtokenAddress, //转入方是自己的地址
        amount: Number(this.amount) * 1000,
        txnHash: hash
      };
      getNodePledge(obj).then(res => {
          this.btnloading=false
        if(res.success){         
        this.$router.back(-1); //成功后返回上一页
        }

      });
    },
    setAll() {
      //设置质押全部
      this.amount = this.userTotalAmount / 1000;
    }
  },
  mounted() {
    personalAssest(this.imtokenAddress).then(res=>{
    this.userTotalAmount =res.data.dntBalance||0;
    })

    getGas().then(res=>{
      this.gas=res.data.gas/1000000000000000000;
    })
      getDNTCNY().then(res=>{
      this.bfbToUsdt=res.data.bfbToUsdt;
      this.dntToUsdt=res.data.dntToUsdt;
    
    })
  } ,
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
  position: relative;
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
  overflow: hidden;
}
.btn.grey {
  background: #ccc;
}
</style>

