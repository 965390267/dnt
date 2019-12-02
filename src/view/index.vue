<template>
  <div class="home">
    <!-- card begin-->
    <div class="card">
      <div class="card1">
        <div class="tit1">
          <div class="left">DNT Wallet</div>
          <div class="right">{{dntBalance|fixed}} DNT</div>
        </div>
        <div class="tit2">
          <div class="left">
            {{hiddenMidAddress}}
            <i></i>
          </div>
          <div class="right">≈￥{{CNY}}</div>
        </div>
        <!-- <div class="dottod"></div> -->
      </div>
      <div class="card2">
        <div class="tit sm">
          <!-- <div class="left">DNT总资产</div>
          <div class="right">{{totalAssetsDNT|fixed}} DNT</div>
          <div class="sm-tit">￥{{totalCNY}}</div> -->
        </div>

        <div class="tit">
          <div class="left">BFB总资产</div>
          <div class="right">{{totalAssetsBFB|fixed}}BFB</div>
        </div>
        <div class="tit">
          <div class="left">累计收益</div>
          <div class="right">{{totalIncome|fixed}}BFB</div>
        </div>
      </div>
    </div>
    <!-- card end-->
    <!-- middle logo start -->
    <div class="logo-wrap">
      <div class="left">
        <div class="icon"></div>DNT
      </div>
      <div class="mid">
        <div class="icon"></div>首发合作
      </div>
      <div class="right">
        <div class="icon"></div>BFB
      </div>
    </div>
    <!-- middle logo end -->
    <NodeDetail></NodeDetail>
  
    <div class="guide">
      <router-link :to="{path:'/guide'}">
     <div class="guide-txt"> 遇到问题?</div>
     </router-link>
     </div>
  </div>
</template>

<script>
import NodeDetail from "@/components/homedetail.vue";
import { personalAssest, getDNTCNY } from "@/api";
export default {
  components: {
    NodeDetail
  },
  name: "index",
  data() {
    return {
      CNY: '',
      totalCNY:'',
      nodeaddress: this.imtokenAddress,
      totalAssetsDNT: '',
      totalAssetsBFB: '',
      totalIncome: '',
      dntBalance: ''
    };
  },
  computed: {
    hiddenMidAddress() {
      return this.nodeaddress.replace(/(.{10}).*(.{10})/, "$1******$2");
    }
  },
  beforeCreate() {},
  methods: {

  },
  created() {
    //  this.$confirm('Hello world ?', 'Confirm');
    personalAssest(this.imtokenAddress).then(res => {
      this.totalAssetsDNT = res.data.totalAssetsDNT?res.data.totalAssetsDNT:0 ;
      this.totalAssetsBFB = res.data.totalAssetsBFB?res.data.totalAssetsBFB:0;
      this.totalIncome = res.data.totalIncome?res.data.totalIncome:0 ;
      this.dntBalance = res.data.dntBalance?res.data.dntBalance:0;
      getDNTCNY().then(ret => {
        /* nova转人民币汇率 */
        this.totalCNY = (( this.totalAssetsDNT / 1000) * (ret.data.dntToCny||0)).toFixed(3);
        this.CNY=(( this.dntBalance / 1000) *( ret.data.dntToCny||0)).toFixed(3);
      });
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.home {
  overflow: hidden;
}
.card {
  display: flex;
  flex-direction: column;
  height: 234px;
  width: 95%;
  margin: 0 auto;
  margin-top: 20px;
  color: #fff;
}

.card .card1 {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 50px;
  background: url("../assets/img/card-item@2x.png") no-repeat;
  background-size: 100% 100%;
}

.dottod {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  border-bottom: 1px dotted #ddd;
}

.card .tit1,
.card .tit2 {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.card .card2 {
  display: flex;
  flex-direction: column;
  flex: 1;
  background: url("../assets/img/card-bg@2x.png") no-repeat;
  background-position-y: -2px;
  background-size: 100% 100%;
  margin-top: -1px;
}

.card2 .sm-tit {
  text-align: right;
  padding-right: 15px;
}

.card .card2 .tit {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 14px;
}

.card .card2 .tit.sm {
  position: relative;
  flex: .3;
}

.sm .sm-tit {
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 10px;
}
.card .tit1 .left,
.card .tit1 .right {
  font-size: 14px;
}
.card .tit2 .left,
.card .tit2 .right {
  font-size: 10px;
  font-weight: 400;
}
.card .left {
  display: flex;
  align-items: center;
  padding-left: 15px;
}

.card .right {
  display: flex;
  align-items: center;
  padding-right: 15px;
}
/* logo style */
.logo-wrap {
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 27px;
}
.logo-wrap .icon {
  width: 44px;
  height: 44px;
}
.logo-wrap .left .icon {
  background: url("../assets/img/dntlogo@2x.png") no-repeat;
  background-size: 100% 100%;
}
.logo-wrap .mid {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.logo-wrap .mid .icon {
  align-self: center;
  background: url("../assets/img/sm-icon.png") no-repeat;
  background-size: 100% 100%;
}
.logo-wrap .right .icon {
  background: url("../assets/img/bfblogo@2x.png") no-repeat;
  background-size: 100% 100%;
}
.guide{
 position: relative;
  text-align: right;
  padding-right: 2.5%;
  margin-top: 20px;
  margin-bottom: 60px;
  font-size: 15px;
  height: 22px;
}
.guide .guide-txt{
  position: absolute;
  right: 2.5%;
}
.guide-txt::before{
  content: '';
  position: absolute;
  left: 0px;
  bottom: -4px;
  width: 100%;
  height: 1px;
  background: #000;
}

</style>
