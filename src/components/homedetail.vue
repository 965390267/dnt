<template>
        <div class="sub-list">
      <ul>
        <router-link :to="{path:'/mynodedetail'}">
        <li>
             <mu-ripple>
          <div class="top">
            <div class="tit1">
              <div class="left">DNT淬炼池总量</div>
              <div class="right">每万份DNT七日收益</div>
            </div>
            <div class="tit2">
              <div class="left">
               {{totalPledgeAmout|fixed}}DNT 
                <i></i>
              </div>
              <div class="right">5.75%</div>
            </div>
          </div>
          <div class="bottom">
            <div class="left">
              <div class="tit4">我的投入</div>
              <div class="tit5">{{pledgeAmout|fixed}} DNT</div>
            </div>
            <div class="mid">
              <div class="tit4">昨日收益</div>
              <div class="tit5">{{yesterdayIncome|fixed}} BFB</div>
            </div>
            <div class="right">
              <div class="tit4">预计收益(天)</div>
              <div class="tit5">{{todayIncome|fixed}} BFB</div>
            </div>
          </div>
          <div class="detail">
            详情>
          </div>
           </mu-ripple>
        </li>
        </router-link>
      </ul>
        <!-- 用class名为ignore的容器包裹控制整个区域的显示隐藏 -->
    <div class="btn-wrap">
      <router-link
        :to="{path:'/zhiya',query:{nodeAddress:nodeAddress,pledgeDate:pledgeDate}}"
      >
        <div class="btn fullwidth">
          <mu-ripple>投入DNT</mu-ripple>
        </div>
      </router-link>
    </div>
    </div>
</template>
<script>
import {  myNodeDetail } from "@/api";
export default {
    data(){
        return{
           pledgeAmout: '',
           todayIncome: '',
           totalPledgeAmout: '',
           yesterdayIncome: '',
           nodeAddress:'',
           pledgeDate:''
        }
    },
    created(){
           myNodeDetail(this.imtokenAddress).then(res=>{
              this.pledgeAmout=res.data.pledgeAmout?res.data.pledgeAmout:0
              this.todayIncome=res.data.todayIncome?res.data.todayIncome:0
              this.totalPledgeAmout=res.data.totalPledgeAmout?res.data.totalPledgeAmout:0
              this.yesterdayIncome=res.data.yesterdayIncome?res.data.yesterdayIncome:0
               this.nodeAddress = res.data.nodeAddress;
               this.pledgeDate = res.data.pledgeDate;
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
  font-size: 12px;
  color: #eee;
  padding-left: 15px;
}
li .top .tit1 .right {
  font-size: 12px;
  color: #eee;
  padding-right: 15px;
}
li .top .tit2 .left {
  font-size: 14px;
  padding-left: 15px;
  font-weight: 300;
}
li .top .tit2 .right {
  font-size: 14px;
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
.detail{
      text-align: right;
    padding-right: 2.5%;
    background: #e9e9e9;
    padding: 8px 0;
    padding-right: 4.5%;
    font-size:12px;
font-family:PingFang SC;
font-weight:400;
line-height:22px;
color:rgba(0,0,0,1);
}
.btn-wrap {

  width: 100%;
}

.btn {
  position: relative;
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
</style>