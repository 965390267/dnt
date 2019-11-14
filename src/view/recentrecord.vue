<template>
  <div class="recorddetail">
  <div class="tit">最近交易</div> 

    <div class="list-wrap">
            <ul>
                <li v-for="(item,index) in recordList" :key='index'>
                    <div class="top">
                        <div class="lf">质押DNT</div>
                        <div class="rt">质押成功<i class="icon"></i> </div>
                    </div>
                    <div class="down">
                            <div class="lf">{{item.date|formatDateToYear}}</div>
                            <div class="rt">1200.368DNT</div> 
                    </div>
                </li>
                 <!-- <li>
                    <div class="top">
                        <div class="lf">质押DNT</div>
                        <div class="rt">质押成功<i class="icon"></i> </div>
                    </div>
                    <div class="down">
                            <div class="lf">2019.11.01 00:00:00</div>
                            <div class="rt">1200.368DNT</div> 
                    </div>
                </li>
                 <li>
                    <div class="top">
                        <div class="lf">质押DNT</div>
                        <div class="rt">质押成功<i class="icon active"></i> </div>
                    </div>
                    <div class="down">
                            <div class="lf">2019.11.01 00:00:00</div>
                            <div class="rt">1200.368DNT</div> 
                    </div>
                </li> -->
            </ul>
               </div>
  </div>
</template>
<script>
import { recentTransactions } from "@/api";
export default {
  data() {
    return {
      recordList: [],
    };
  },
  filters:{
   formatDateToYear(date) {
      /* 格式化时间根据空格左边为年月日，右边为时分秒 */

      try {
        return date.split(" ")[0];
      } catch (error) {
        return date;
      }
    },
  },
  methods: {

  },
  mounted() {
         recentTransactions(this.imtokenAddress).then(res=>{
           this.recordList=res.data;
         })
  }
};
</script>
<style  scoped>
.recorddetail {
  height: 100%;
  background: #F5F5F5;
}
.tit{
    font-size: 16px;
    padding: 40px 0;
    padding-bottom: 15px;
    text-align: center;
}
/* 列表 */
.list-wrap{

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
.top .lf{
  color: #000;
  font-size: 16px;
}
.top .rt{
       display: flex;
          align-items: center;
    font-size: 0.24rem;
    color: #707070;
 
}
.top .icon{
    display: inline-block;
    width: 25px;
    height: 25px;
    background: url('../assets/img/success@2x.png') no-repeat;
    background-size: 100% 100%;
}
.top .icon.active{
      background: url('../assets/img/fail@2x.png') no-repeat;
    background-size: 100% 100%;
}
.down{
  color: #313131;
  font-size: 12px;
}
</style>