<template>
  <div class="nodedetail" v-cloak>
    <div class="card">
      <p class="tit">DNT & BFB</p>
      <div class="tit2">
        <div class="top">
          <div class="lf">DNT淬炼池总量</div>
          <div class="rt">每万份DNT七日收益</div>
        </div>
        <div class="down">
          <div class="lf">{{totalPledgeAmout|fixed}}DNT</div>
          <div class="rt">5.75%</div>
        </div>
      </div>
      <div class="dot-line"></div>
      <p class="gg">投入DNT，每日免费获取BFB收益。</p>
      <p class="gg">DNT交易所网址：www.bbkx.com</p>
      <div class="gg">BFB交易所网址：www.bitcola.pro</div>
    </div>
    <!-- 没有记录时候 -->
    <div class="record" v-if="!isPledged">
      <div class="lf-record">
        <router-link :to="{path:'/moneyrecord'}">收益记录</router-link>
      </div>
      <div class="rt-record">
        <router-link :to="{path:'/recentrecord'}">交易记录</router-link>
      </div>
    </div>
    <!-- 没有记录时候 -->
    <div class="ignore" v-if="isPledged">
      <!-- 有记录 -->
      <div class="record-list">
        <ul>
          <router-link :to="{path:'/recentrecord'}">
            <li>
              <div class="lf">
                <div class="up">{{pledgeAmout|fixed}}DNT</div>
                <div class="down">我的投入数量</div>
              </div>
              <div class="rt">
                交易记录
                <i class="back"></i>
              </div>
            </li>
          </router-link>
          <router-link :to="{path:'/moneyrecord'}">
            <li>
              <div class="lf">
                <div class="up">{{totalIncome|fixed}}BFB</div>
                <div class="down">累计收益</div>
              </div>
              <div class="rt">
                收益记录
                <i class="back"></i>
              </div>
            </li>
          </router-link>
        </ul>
      </div>
      <!-- 有记录 -->
      <!-- btn group -->
      <div class="btn-group">
        <div class="btn highlight">
          <router-link
            :to="{path:'/zhiya',query:{nodeAddress:nodeAddress,pledgeDate:pledgeDate}}"
          >
            <mu-ripple style="color:#fff">投入</mu-ripple>
          </router-link>
        </div>

        <div class="btn normalbtn">
          <router-link :to="{path:'/suhuidnt',query:{pledgeAmout:pledgeAmout,isPassDate:isPassDate}}">
           <mu-ripple >赎回DNT</mu-ripple></router-link>
        </div>

        <div class="btn normalbtn">
          <router-link :to="{path:'/suhuibfb',query:{totalIncome:totalIncome}}">
          <mu-ripple >提现BFB</mu-ripple></router-link>
        </div>
      </div>
      <!-- btn group -->
          </div>
      <!-- list -->
      <div class="package">
        <ul>
          <li v-for="(item,index) in recordList" :key="index">
            <div class="up">
              <div
                class="lf"
              >{{item.tokenType==""?'DNT':item.tokenType}}{{item.type==0?'质押中':'赎回中'}}</div>
              <div class="rt">交易正在打包</div>
            </div>
            <div class="down">
              <div class="lf">{{item.date}}</div>
              <div class="rt">{{item.amount|fixed}}{{item.tokenType==""?'DNT':item.tokenType}}</div>
            </div>
          </li>
        </ul>
      </div>

    <!-- 用class名为ignore的容器包裹控制整个区域的显示隐藏 -->
    <div class="btn-wrap" v-if="!isPledged">
      <router-link
        :to="{path:'/zhiya',query:{nodeAddress:nodeAddress,pledgeDate:pledgeDate}}"
      >
        <div class="btn fullwidth">
          <mu-ripple>投入</mu-ripple>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { myNodeDetail, recentTransactions } from "@/api";
export default {
  data() {
    return {
      pledgeAmout: "",
      totalPledgeAmout: "",
      desc: "",
      isPledged: false,
      isLoad: false,
      totalmoney: "",
      recordList: [],
      nodeAddress: "",
      pledgeDate: "",
      isPassDate:''
    };
  },
  computed: {
    recentTransactionsListLength() {
      return this.recentTransactionsList.filter(
        item => item.status == 4 || item.status == 0
      ).length;
    }
  },
  methods: {
    initData() {
      myNodeDetail(this.imtokenAddress).then(res => {
        //节点详情
        this.pledgeAmout = res.data.pledgeAmout;
        this.totalPledgeAmout = res.data.totalPledgeAmout;
        this.desc = res.data.desc;
        this.todayIncome = res.data.todayIncome;
        this.totalIncome = res.data.totalIncome;
        this.isPledged = res.data.isPledged;
        this.nodeAddress = res.data.nodeAddress;
        this.pledgeDate = res.data.pledgeDate;
        this.isPassDate=res.data.isPassDate;
      });
      recentTransactions(this.imtokenAddress).then(res => {
        //最近交易
        let result = res.data;
        this.recordList = result.filter(item => item.status == 0); //0代表交易中
      });
    }
  },
  mounted(){
  
  },
  created() {
    this.initData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped >
.nodedetail {
  overflow: hidden;
}
.card {
  width: 95%;
  margin: 0 auto;
  margin-top: 20px;
  height: 238px;
  background: #363636;
  border-radius: 6px;
}
.card .tit {
  text-align: center;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 22px;
  color: rgba(255, 255, 255, 1);
  padding: 20px 0;
}
.tit2 .top,
.tit2 .down {
  display: flex;
  justify-content: space-between;
  color: #fff;
}
.tit2 .top {
  padding-top: 10px;
  font-size: 15px;
}
.tit2 .top .lf {
  padding-left: 15px;
  font-size: 12px;
  color: #eee;
}
.tit2 .top .rt {
  font-size: 12px;
  color: #eee;
  padding-right: 15px;
}
.tit2 .down {
  padding-top: 8px;
  font-size: 12px;
}
.tit2 .down .lf {
  padding-left: 15px;
      color: #ccc;
      font-size:15px;
}
.tit2 .down .rt {
  font-size:15px;
  padding-right: 15px;
    color: #ccc;
}
.dot-line {
  width: 92%;
  margin: 0 auto;
  padding-top: 20px;
  margin-bottom: 10px;
  border-bottom: 1px dotted #fff;
}
.gg {
  padding: 5px 0;
  padding-left: 15px;
  color: #fff;
  font-size: 13px;
  text-transform: none;
}
.record {
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  margin-top: 30px;
  font-weight: 400;
  padding: 6px 0;
}
.record .lf-record {
  position: relative;
  margin-left: 2.5%;
  padding-bottom: 6px;
}
.record .rt-record {
  position: relative;
  margin-right: 2.5%;
  padding-bottom: 6px;
}
.record .lf-record::before,
.record .rt-record::before {
  content: "";
  position: absolute;
  right: 0;
  bottom: 2px;
  height: 1px;
  width: 100%;
  background: #000;
}
.record-list {
  margin-top: 30px;
}
.record-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  width: 95%;
  margin: 16px auto;
  padding: 0 15px;
  border: 1px solid rgba(112, 112, 112, 1);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}
.record-list li .down {
  padding-top: 5px;
}
.back {
  display: inline-block;
  background: url("../assets/img/back@2x.png") no-repeat;
  background-size: contain;
  width: 7px;
  height: 13px;
}
/* 按钮 */
.btn-wrap {
  position: absolute;
  bottom: 20px;
  left: 0;
  width: 100%;
}
.btn-group {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
}
.btn {
  position: relative;
  height: 48px;
    width: 88px;
  border-radius: 24px;
  text-align: center;
  color: #fff;
  line-height: 48px;
  font-size: 17px;
}
.fullwidth {
  width: 90%;
  margin: 0 auto;
  height: 48px;
  background: linear-gradient(
    131deg,
    rgba(38, 38, 107, 1) 0%,
    rgba(19, 24, 36, 1) 100%
  );
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.55);
}
.highlight {

  background: linear-gradient(
    131deg,
    rgba(38, 38, 107, 1) 0%,
    rgba(19, 24, 36, 1) 100%
  );
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.55);
  color: #fff;
  font-size: 15px;
}
.normalbtn {
  color: rgba(23, 27, 53, 1);
  border: 1px solid rgba(26, 29, 62, 1);
  font-size: 15px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
}
/* btn  list*/
/* packing */
.package {
  margin-top: 25px;
}
.package li {
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 66px;
  background: rgba(210, 210, 210, 1);
  margin: 8px 0;
}
.package li .up,
.package li .down {
  display: flex;
  justify-content: space-between;
  padding: 8px 10px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(23, 27, 53, 1);
}

.package li .down {
  font-size: 12px;
}
</style>
