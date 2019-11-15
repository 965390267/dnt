<template>
  <div class="recorddetail">
    <div class="logo-box">
      <div class="logo">
        <div class="icon-logo-wrap">
          <div class="lf-icon"></div>
          <div class="txt">BFB</div>
        </div>
        <div class="profit">累计收益：{{totalIncome}}</div>
      </div>
    </div>

    <div class="list-wrap">
      <ul>
        <li v-for="(item,index) in recordList" :key="index">
          <div class="top">
            <div class="lf">收益</div>
            <div
              class="rt"
            >{{item.incomeAmount/1000>0?'+'+item.incomeAmount/1000:'-'+item.incomeAmount/1000}}</div>
          </div>
          <div class="down">
            <div class="lf">{{item.createDate|formatDateToYear}}</div>
            <div class="rt">{{item.pledgeAmount/1000}}FB</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { myIncomeRecode } from "@/api";
export default {
  data() {
    return {
      recordList: [],
      totalAmount: "",
      totalIncome: ""
    };
  },
  filters: {
    formatDateToYear(date) {
      /* 格式化时间根据空格左边为年月日，右边为时分秒 */
      try {
        return date.split(" ")[0];
      } catch (error) {
        return date;
      }
    }
  },
  methods: {},
  created() {
    myIncomeRecode(this.imtokenAddress).then(res => {
      this.totalAmount = (res.data.totalAmount / 1000).toFixed(3);
      this.totalIncome = res.data.totalIncome.toFixed(3);
      this.recordList = res.data.incomeRecodes;
    });
  }
};
</script>
<style  scoped>
.recorddetail {
  height: 100%;
  background: #f5f5f5;
}
.logo-box {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
.logo {
  display: flex;
  flex-direction: column;
}
.icon-logo-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.icon-logo-wrap .lf-icon {
  width: 60px;
  height: 60px;
  background: url("../assets/img/bfblogo@2x.png") no-repeat;
  background-size: 100% 100%;
}
.icon-logo-wrap .txt {
  font-size: 16px;
  font-weight: 400;
}
.icon-logo-wrap .profit {
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: 400;
}
/* 列表 */
.list-wrap {
  margin-top: 45px;
}
.list-wrap li {
  width: 95%;
  margin: 6px auto;

  padding-bottom: 4px;
  border-bottom: 1px dotted #707070;
}
.top,
.down {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 4px 0;
}
.top {
  color: #000;
  font-size: 16px;
}
.down {
  color: #313131;
  font-size: 12px;
}
</style>