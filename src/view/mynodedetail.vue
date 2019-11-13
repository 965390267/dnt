<template>
  <div class="nodedetail" v-cloak>
      <div class="card">
        <p class="tit">DNT 双轨经济生态 BFB</p>
        <div class="tit2">
            <div class="top">
                <div class="lf">1585150DNT</div>
                <div class="rt">100DNT:3BFB</div>
            </div>
            <div class="down">
                    <div class="lf">DNT投入总量</div>
                    <div class="rt">BFB年化收益</div>
            </div>
        </div>
        <div class="dot-line"></div>
        <p class="gg">投入DNT，每日坐享BFB收益。</p>
        <p class="gg"> DNT交易所网址：www.bbkx.com</p>
    </div>
   
    <div class="record">
            <div class="lf-record">收益记录</div>
            <div class="rt-record">交易记录</div>
    </div>
    <div class="btn-wrap">
    <div class="btn">
            投入
    </div>
    </div>

  </div>
</template>

<script>
import { recentTransactions, myNodeDetail,cancelNodeRedeem } from "@/config";
export default {
  data() {
    return {
      nodeMessage: { pledgeAmount: ' ', returnrate: ' ', nodeName: ' ',declaration:' ' },
      recentTransactionsList: [],
      isLoad: false,
      totalmoney: '',
    };
  },
  computed: {
    recentTransactionsListLength(){
    return  this.recentTransactionsList.filter(item=>item.status==4||item.status==0).length;
    }
  },
  methods: {

    initData(){
    recentTransactions(this.imtokenAddress, this.$route.query.nodeId).then(
      res => {
        if (window.ethereum) {
          imToken.callAPI("native.hideLoading");
        }
        if (res.data.success) {
          this.recentTransactionsList = res.data.data;
        }else{
        return  Promise.reject(res)
        }
      }
    );
    }
  },
  created() {
  this.initData()
   
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
.card{
  width: 95%;
  margin: 0 auto;
  margin-top: 20px;
  height: 238px;
  background: #363636;
  border-radius: 6px;
}
.card .tit{
  text-align: center;
  font-size:16px;
font-family:PingFang SC;
font-weight:400;
line-height:22px;
color:rgba(255,255,255,1);
padding: 20px 0;
}
.tit2 .top,.tit2 .down{
  display: flex;
  justify-content: space-between;
color: #fff;
}
.tit2 .top{
  padding-top: 10px;
  font-size: 15px;
}
.tit2 .top .lf{
  padding-left: 15px;
}
.tit2 .top .rt{
  padding-right: 15px;
}
.tit2 .down{
   padding-top: 8px;
  font-size: 12px;
}
.tit2 .down .lf{
  padding-left: 15px;
}
.tit2 .down .rt{
  padding-right: 15px;
}
.dot-line{
  width: 92%;
  margin: 0 auto;
  padding-top: 20px;
  margin-bottom: 10px;
  border-bottom: 1px dotted #fff;
}
.gg{
  padding: 5px 0;
  padding-left: 15px;

  color: #fff;
  font-size: 13px;
}
.record{
 
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  margin-top: 30px;
  font-weight:400;
}
.record .lf-record{
   position: relative;
  margin-left: 2.5%;
}
.record .rt-record{
   position: relative;
  margin-right: 2.5%;
}
.record .lf-record::before,.record .rt-record::before{
  content: '';
  position: absolute;
  right:0;
  bottom: -3px;
  height: 1px;
  width: 100%;
  background: #000;
}
.btn-wrap{
  position: absolute;
  bottom: 20px;
  left: 0;
  width: 100%;
}
.btn{

 width:349px;
height:48px;
margin: 0 auto;
background:linear-gradient(131deg,rgba(38,38,107,1) 0%,rgba(19,24,36,1) 100%);
box-shadow:0px 3px 6px rgba(0,0,0,0.55);
opacity:1;
border-radius:24px;
text-align: center;
color: #fff;
line-height: 48px;
font-size: 17px;
}
</style>
