<template>
  <div class="recorddetail">
  <div class="logo-box">
      <div class="logo">
      <div class="icon-logo-wrap">
          <div class="lf-icon"></div>
          <div class="txt">BFB</div>
      </div>
      <div class="profit">累计收益：3.225</div>
    </div>
  </div>

    <div class="list-wrap">
            <ul>
                <li>
                    <div class="top">
                        <div class="lf">收益</div>
                        <div class="rt">+0.8<i class="icon"></i> </div>
                    </div>
                    <div class="down">
                            <div class="lf">2019.11.01</div>
                            <div class="rt">3.225BFB</div> 
                    </div>
                </li>
            
            </ul>
               </div>
  </div>
</template>
<script>
import { myIncomeRecode } from "@/config";
export default {
  data() {
    return {
      recordList: [],
      time: "",
      totalAmount: 0,
      totalIncome: 0,
      date: ""
    };
  },
  methods: {
    formatDateToYear(date) {
      /* 格式化时间根据空格左边为年月日，右边为时分秒 */

      try {
        return date.split(" ")[0];
      } catch (error) {
        return date;
      }
    },
    getYearMonthDay() {
      var date = new Date();
    let  Y = date.getFullYear() + "-";
    let  M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
    let   D = date.getDate() + " ";
      this.date = Y + M + D;
    }
  },
  mounted() {

  }
};
</script>
<style  scoped>
.recorddetail {
  height: 100%;
  background: #F5F5F5;
  overflow: hidden;
}
.logo-box{
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
.logo{
  display: flex;
  flex-direction: column;
}
.icon-logo-wrap{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.icon-logo-wrap .lf-icon{
  width: 60px;
  height: 60px;
  background: url('../assets/img/bfblogo@2x.png') no-repeat;
  background-size: 100% 100%;
}
.icon-logo-wrap .txt{
  font-size: 16px;
  font-weight:400;
}
.icon-logo-wrap .profit{
  font-size:15px;
font-family:PingFang SC;
font-weight:400;
}
/* 列表 */
.list-wrap{
  margin-top: 45px;
}
.list-wrap li{
  width: 95%;
  margin: 6px auto;

  padding-bottom: 4px;
  border-bottom: 1px dotted #707070;
}
.top,.down{
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 4px 0;
}
.top{
  color: #000;
  font-size: 16px;
}
.down{
  color: #313131;
  font-size: 12px;
}
</style>