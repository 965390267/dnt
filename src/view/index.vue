<template>
  <div class="home">
    <!-- card begin-->
    <div class="card">
      <div class="card1">
        <div class="tit1">
          <div class="left">DNT Wallet</div>
          <div class="right">2000 DNT</div>
        </div>
        <div class="tit2">
          <div class="left">
            0xewterstgsdf56ers
            <i></i>
          </div>
          <div class="right">~￥6000 DNT</div>
        </div>
        <!-- <div class="dottod"></div> -->
      </div>
      <div class="card2">
        <div class="tit sm">
          <div class="left">DNT总资产</div>
          <div class="right">32000 DNT</div>
          <div class="sm-tit">￥9000</div>
        </div>

        <div class="tit">
          <div class="left">BFB总资产</div>
          <div class="right">3.225BFB</div>
        </div>
        <div class="tit">
          <div class="left">累计收益</div>
          <div class="right">3.225BFB</div>
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
        <div class="icon"></div>双轨经济生态
      </div>
      <div class="right">
        <div class="icon"></div>BFB
      </div>
    </div>
    <!-- middle logo end -->

    <div class="sub-list">
      <ul>
        
        <li>
             <mu-ripple   >
          <div class="top">
            <div class="tit1">
              <div class="left">1585150DNT</div>
              <div class="right">100DNT:3BFB</div>
            </div>
            <div class="tit2">
              <div class="left">
                DNT投入总量
                <i></i>
              </div>
              <div class="right">BFB年化收益</div>
            </div>
          </div>
          <div class="bottom">
            <div class="left">
              <div class="tit4">我的投入</div>
              <div class="tit5">120000000 DNT</div>
            </div>
            <div class="mid">
              <div class="tit4">昨日收益</div>
              <div class="tit5">3.225 BFB</div>
            </div>
            <div class="right">
              <div class="tit4">预计收益(天)</div>
              <div class="tit5">3.225 BFB</div>
            </div>
          </div>
           </mu-ripple>
        </li>
        <li>
          <div class="top">
            <div class="tit1">
              <div class="left">1585150DNT</div>
              <div class="right">100DNT:3BFB</div>
            </div>
            <div class="tit2">
              <div class="left">
                DNT投入总量
                <i></i>
              </div>
              <div class="right">BFB年化收益</div>
            </div>
          </div>
          <div class="bottom">
            <div class="left">
              <div class="tit4">我的投入</div>
              <div class="tit5">120000000 DNT</div>
            </div>
            <div class="mid">
              <div class="tit4">昨日收益</div>
              <div class="tit5">3.225 BFB</div>
            </div>
            <div class="right">
              <div class="tit4">预计收益(天)</div>
              <div class="tit5">3.225 BFB</div>
            </div>
          </div>
        </li>
    
      </ul>
    </div>
  </div>
</template>

<script>
// import NodeList from "@/components/homeListNode.vue";
import { personalAssest, getMyNodeList, getNovaCNY } from "@/config";
export default {
  components: {
    // NodeList
  },
  name: "index",
  data() {
    return {
      deg: 0,
      zh: "中文",
      en: "English",
      switchstate: false,
      nodeaddress: this.imtokenAddress,
      balance: "",
      ETH: 0,
      pendingAmount: "",
      totalAssets: "",
      totalIncome: "",
      yesterdayIncome: "",
      nodelistdata: [],
      CNY: ""
    };
  },
  computed: {
    hiddenMidAddress() {
      return this.nodeaddress.replace(/(.{10}).*(.{10})/, "$1******$2");
    }
  },
  beforeCreate() {},
  methods: {
    gotoList() {
      if (window.ethereum) {
        imToken.callAPI("native.showLoading", "loading...");
      }
      this.$router.push({ path: "/nodeswiper" });
    }
  },
  mounted() {
    getNovaCNY().then(res => {
      /* nova转人民币汇率 */
      this.CNY = res.data.data.cny;
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
.sub-list {
  width: 95%;
  margin: 0 auto;
  margin-top: 15px;
}
.sub-list ul {
  padding: 0;
}
.sub-list li {
    position: relative;
  display: flex;
  flex-direction: column;
  margin: 25px auto;
  border-radius: 8px;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.16);
  overflow: hidden;
}
li .top {
  height: 70px;
  display: flex;
  flex-direction: column;
  background: url("../assets/img/list-bg@2x.png") no-repeat;
  background-size: 120% 140%;
  background-position: center center;
  color: #fff;
}
li .top .tit1 .left {
  font-size: 15px;
  padding-left: 15px;
}
li .top .tit1 .right {
  font-size: 15px;
  padding-right: 15px;
}
li .top .tit2 .left {
  font-size: 12px;
  padding-left: 15px;
  font-weight: 300;
}
li .top .tit2 .right {
  font-size: 12px;
  padding-right: 15px;
  font-weight: 300;
}
li .top .tit1,
li .top .tit2 {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
li .bottom {
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #e9e9e9;
  color: rgba(0, 0, 0, 1);
}
li .bottom .tit4 {
  font-size: 12px;
}
li .bottom .tit5 {
  font-size: 14px;
}
li .bottom .left {
  padding-left: 15px;
}
li .bottom .right {
  padding-right: 15px;
}
li .bottom .left,
li .bottom .mid,
li .bottom .right {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>
