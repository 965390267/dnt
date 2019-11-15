<template>
  <div class="nodedetail" v-cloak>
    <div class="card">
      <p class="tit">DNT 双轨经济生态 BFB</p>
      <div class="tit2">
        <div class="top">
          <div class="lf">{{totalPledgeAmout|fixed}}DNT</div>
          <div class="rt">100DNT:3BFB</div>
        </div>
        <div class="down">
          <div class="lf">DNT投入总量</div>
          <div class="rt">BFB年化收益</div>
        </div>
      </div>
      <div class="dot-line"></div>
      <p class="gg">{{desc}}</p>
      <p class="gg">DNT交易所网址：www.bbkx.com</p>
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
        </ul>
      </div>
      <!-- 有记录 -->
      <!-- btn group -->
      <div class="btn-group">
        <div class="btn highlight">
          <router-link :to="{path:'/zhiya',query:{totalPledgeAmout:totalPledgeAmout}}">
            <mu-ripple style="color:#fff">投入</mu-ripple>
          </router-link>
        </div>
        <div class="btn normalbtn">赎回DNT</div>
        <div class="btn normalbtn">提现BFB</div>
      </div>
      <!-- btn group -->
      <!-- list -->
      <div class="package">
        <ul>
          <li>
            <div class="up">
              <div class="lf">DNT赎回中</div>
              <div class="rt">交易正在打包</div>
            </div>
            <div class="down">
              <div class="lf">2019.01.01 23：13：58</div>
              <div class="rt">1200DNT</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 用class名为ignore的容器包裹控制整个区域的显示隐藏 -->
    <div class="btn-wrap" v-if="!isPledged">
      <router-link :to="{path:'/zhiya',query:{totalPledgeAmout:totalPledgeAmout}}">
        <div class="btn fullwidth">
          <mu-ripple>投入</mu-ripple>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { myNodeDetail } from "@/api";
export default {
  data() {
    return {
      pledgeAmout: "",
      totalPledgeAmout: "",
      desc: "",
      isPledged: false,
      isLoad: false,
      totalmoney: ""
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
        this.pledgeAmout = res.data.pledgeAmout;
        this.totalPledgeAmout = res.data.totalPledgeAmout;
        this.desc = res.data.desc;
        this.todayIncome = res.data.todayIncome;
        this.totalIncome = res.data.totalIncome;
        this.isPledged = res.data.isPledged;
      });
    }
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
}
.tit2 .top .rt {
  padding-right: 15px;
}
.tit2 .down {
  padding-top: 8px;
  font-size: 12px;
}
.tit2 .down .lf {
  padding-left: 15px;
}
.tit2 .down .rt {
  padding-right: 15px;
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
}
.record .rt-record {
  position: relative;
  margin-right: 2.5%;
}
.record .lf-record::before,
.record .rt-record::before {
  content: "";
  position: absolute;
  right: 0;
  bottom: -3px;
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
  width: 107px;
  height: 48px;
  margin: 0 auto;
  opacity: 1;
  border-radius: 24px;
  text-align: center;
  color: #fff;
  line-height: 48px;
  font-size: 17px;
}
.fullwidth {
  width: 349px;
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
