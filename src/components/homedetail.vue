<template>
        <div class="sub-list">
      <ul>
        <router-link :to="{path:'/mynodedetail'}">
        <li>
             <mu-ripple>
          <div class="top">
            <div class="tit1">
              <div class="left">{{pledgeAmout}}DNT</div>
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
              <div class="tit5">{{totalPledgeAmout}} DNT</div>
            </div>
            <div class="mid">
              <div class="tit4">昨日收益</div>
              <div class="tit5">{{yesterdayIncome}} BFB</div>
            </div>
            <div class="right">
              <div class="tit4">预计收益(天)</div>
              <div class="tit5">3.225 BFB</div>
            </div>
          </div>
           </mu-ripple>
        </li>
        </router-link>
      </ul>
    </div>
</template>
<script>
import {  myNodeDetail } from "@/api";
export default {
    data(){
        return{
           pledgeAmout: '',
           returnRate: '',
           todayIncome: '',
           totalIncome: '',
           totalPledgeAmout: '',
           yesterdayIncome: '',
        }
    },
    created(){
           myNodeDetail(this.imtokenAddress).then(res=>{
              this.pledgeAmout=(res.data.pledgeAmout).toFixed(3)
              this.returnRate=(res.data.returnRate).toFixed(3)
              this.todayIncome=(res.data.todayIncome).toFixed(3)
              this.totalIncome=(res.data.totalIncome).toFixed(3)
              this.totalPledgeAmout=(res.data.totalPledgeAmout).toFixed(3)
              this.yesterdayIncome=(res.data.yesterdayIncome).toFixed(3)
   })
    }
}
</script>
<style  scoped>
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