<template>
  <diV class="ziya">
     <div class="logo">

    </div>
    <div class="tips">
        <div class="lt">DNT 可用余额</div>
        <div class="rf">20000</div>
    </div>
    <div class="input-wrap">
        <input type="text" placeholder="输入数量">
        <div class="total">DNT | 全部</div>
    </div>
    <div class="pladge-rule">
        <p class="p1"> 质押规则:</p>
        <p>当日投入DNT后将于次日产生BFB收益，并将于每日24:00结算当日收益。</p>
        <p>BFB的产出速度与根据投入DNT的时间和数量呈正比。</p>
        <p>即DNT投入数量越多，BFB产出越快；DNT投入时间越久，BFB产出越多。</p>
        <p>投入10000DNT，一年将产出300BFB。</p>
        <p>DNT现价：0.025USDT</p>
        <p>BFB现价：0.14USDT</p>
        <p>当前年化16.8%</p>
    </div>
    <div class="btn"></div>
  </diV>
</template>
<script>
import { getNodeRedeem, personalAssest } from "@/config";
import Alert from "@/components/alert.vue";
export default {
  components: {
    Alert
  },
  data() {
    return {
      index: 0,
      amount: "",
      blance: 0,
      gasPrice: "",
      show: false,
      alertcontent:'',
      lockSubmit:true
    };
  },
  watch:{
    amount(val){
      if(val>this.$route.query.pledgeAmount/1000){
        this.amount=Number(val.toString().substring(0,val.toString().length-1));
        return   imToken.callAPI('native.toastInfo', this.$t('shuhui.amountLimit'))
      }
    }
  },
  methods: {
    choosetype(index) {
      this.index = index;
    },
    certain(data) {
      console.log(data);
      if (data) {
        this.get();
      }
    },
    submit() {
      if(this.index==0){
       this.alertcontent=this.$t('components.alert.atoncetext')
      }else{
        this.alertcontent=this.$t('components.alert.slowtext')
      }
      this.bus.$emit("alert", true);
    },
    get() {
      this.show = true;
 if (window.ethereum) {
       imToken.callAPI("native.showLoading", "loading...");
 }
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
      // this.bus.$emit('loading',true)
      var obj = {
        nodeId: this.$route.query.nodeId, //服务器地址
        toAddress: this.imtokenAddress, //钱包地址
        amount: this.amount * 1000,
        type: this.index
      };
      if(this.lockSubmit){
        this.lockSubmit=false;
       getNodeRedeem(obj)
        .then(res => {
          this.lockSubmit=true
           if (window.ethereum) {
           imToken.callAPI("native.hideLoading");
           }
          if (res.data.success) {
            this.show = false;
            alert(this.$t("shuhui.changenodealert"));
            this.$router.back(-1);
          } else {
            Promise.reject(ret);
            this.show = false;
          }
        })
        .catch(err => {
          this.lockSubmit=true
           imToken.callAPI("native.hideLoading");
          this.show = false;
        });
      }
     
    },
    setAll() {
      // personalAssest(this.imtokenAddress).then(res => {
      //   var res = res.data;
      //   if (res.success) {
      //this.balance = this.$route.query.nodeMessage.pledgeAmount
      this.amount = this.$route.query.pledgeAmount / 1000;
      //   }
      // });
    },
    initData() {
      /* 初始的页面数据获取 */

    }
  },
  mounted() {
    //this.initData(); /* 数据初始化 */
  }
};
</script>

<style lang="scss" scoped>
.ziya {
  height: 100%;
  background: #fdf9f4;
  overflow: hidden;
}
.avtor {
  width: 90%;
  margin: 15px auto;
  display: flex;
  align-items: center;
  color: #122f4d;
  font-size: 19px;
  .circle {
    margin-right: 5px;
    width: 30px;
    height: 30px;
    background: -webkit-gradient(
      linear,
      left top,
      right top,
      from(#f08740),
      to(#f06b40)
    );
    background: linear-gradient(90deg, #f08740, #f06b40);
    border-radius: 50%;
  }
}
.ziyaed {
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
  em {
    font-size: 14px;
    color: #122f4d;
    font-weight: 400;
    padding-right: 15px;
  }
  .txt {
    color: #979fa5;
  }
  font-size: 13px;
  color: #979fa5;
}
.balance {
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
  position: relative;
  .canbalance {
    position: absolute;
    right: 0;
    // top: 14px;
    height: 40px;
    line-height: 40px;
    width: 50px;
    text-align: center;
    color: #f08a40;
    font-size: 13px;
  }
  .inputbalance {
    width: 100%;
    margin: 0 auto;
    height: 40px;
    line-height: 40px;
    border: 1px solid #f07440;
    background: transparent;
    outline: none;
    border-radius: 8px;
  }
}

.smtip {
  width: 90%;

  margin: 0 auto;
  margin-top: 5px;
  text-align: right;
  font-size: 10px;
  color: #979fa5;
}
.ordinary {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  height: 45px;
  align-items: center;
  border-top: 1px solid #c5c7c8;
  .left-txt {
    padding-left: 10px;
    color: #122f4d;
    font-size: 13px;
  }
  .right {
    display: none;
  //  background: url("../assets/img/choose@2x.png") no-repeat;
    background-size: 100% 100%;
    width: 45px;
    height: 45px;
  }
}
.ordinary.top {
  margin-top: 30px;
}
.ordinary.bottom {
  border-bottom: 1px solid #c5c7c8;
}
.active .right {
  display: block;
}
.active .left-txt {
  color: #f08a40;
}
.submit-btn {
  display: block;
  width: 90%;
  height: 36px;
  margin: 0 auto;
  margin-top: 30px;
  background: linear-gradient(90deg, #f08740, #f06b40);
  border-radius: 20px;
  line-height: 36px;
  color: #fff;
  text-align: center;
}
.ziya .note {
  padding: 40px 10px;
}
.ziya .note p {
  color: #979fa5;
  font-size: 12px;
  text-align: left;
  padding: 2px 0;
  line-height: 20px;
  letter-spacing: 2px;
}
</style>

