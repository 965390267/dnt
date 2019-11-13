<template>
    <div class="logo">
   <div class="lf-icon" :style="{backgroundImage:'url('+url+')'}"></div>
   <div class="icon-txt">{{txt}}</div>
    </div>
</template>
<script>
export default {
    props:{
        url:{
            type:String,
            default:'../assets/img/bfblogo@2x.png'
        },
        txt:{
            type:String,
            default:'BFB'
        }
    }
}
</script>
<style  scoped>

.logo{
    width: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
 justify-content: center;
}
.logo .lf-icon{

  width: 58px;
  height: 58px;
  /* background: url('') no-repeat; */
  background-size: 100% 100%;
}
.logo .icon-txt{
  text-align: center;
  margin-top: -8px;
}
</style>