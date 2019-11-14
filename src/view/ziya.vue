<template>
  <div class="ziya">
     <div class="logo">
   <lo-go txt="DNT" :url="require('../assets/img/dntlogo@2x.png')"></lo-go>
    </div>
    <div class="tips">
        <div class="lt">DNT 投入数量</div>
        <div class="rf">20000</div>
    </div>
    <div class="input-wrap">
        <input type="text" placeholder="输入数量">
        <div class="total">DNT | 全部</div>
    </div>
    <div class="pricegas">手续费：50 DNT</div>
    <div class="pladge-rule">
        <p class="p1">质押规则：</p>
        <p>当日投入DNT后将于次日产生BFB收益，并将于每日24:00结算当日收益。</p>
        <p>BFB的产出速度与根据投入DNT的时间和数量呈正比。</p>
        <p>即DNT投入数量越多，BFB产出越快；DNT投入时间越久，BFB产出越多。</p>
        <p> 投入10000DNT，一年将产出300BFB。</p>
        <p> DNT现价：0.025USDT</p>
        <p>BFB现价：0.14USDT</p>
        <p>当前年化16.8%</p>
    </div>
   <div class="btn-wrap">
    
     <div class="btn"  v-loading="btnloading" data-mu-loading-text="" data-mu-loading-size="28"> <mu-ripple class="mu-ripple" @click="get()"   :opacity="0.5">确定 </mu-ripple></div>
 
   </div>
  </div>
</template>
<script>
import loading from "@/components/loading";
import LoGo from "@/components/logo";
// import { getNodePledge, personalAssest, getGas } from "@/api";
export default {
  components: {LoGo},
  data() {
    return {
      amount: "" /* 用户输入的Nova数量，提交需要*1000 */,
      gasPrice: 0,
      btnloading:false
    };
  },
  watch: {
    amount(val) {
      if (val > this.initDataObj.balance / 1000) {
        this.amount = Number(
          val.toString().substring(0, val.toString().length - 1)
        );
      }
    }
  },
  methods: {
    get() {
      this.btnloading=true;
     return false;
      this.amount = Number(this.amount);
      if (this.amount == 0) return this.$alert('数量必须大于0', '提示', {
        okLabel: '确定'
      });
      if (!this.$route.query.nodeId) {/* 地址必须存在 */
      this.$alert('地址不存在，请退出重试', '提示', {
        okLabel: '确定'
      });
        return this.$router.back(-1);
      }
      if (!this.imtokenAddress) {
       this.$alert('未成功授权，请退出重试', '提示', {
        okLabel: '确定'
      });
        return this.$router.back(-1);
      }
      var abi = [
        {
          constant: true,
          inputs: [],
          name: "name",
          outputs: [{ name: "", type: "string" }],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: false,
          inputs: [
            { name: "_spender", type: "address" },
            { name: "_value", type: "uint256" }
          ],
          name: "approve",
          outputs: [{ name: "success", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          constant: true,
          inputs: [],
          name: "totalSupply",
          outputs: [{ name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: false,
          inputs: [
            { name: "_from", type: "address" },
            { name: "_to", type: "address" },
            { name: "_value", type: "uint256" }
          ],
          name: "transferFrom",
          outputs: [{ name: "success", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          constant: true,
          inputs: [],
          name: "decimals",
          outputs: [{ name: "", type: "uint8" }],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: false,
          inputs: [{ name: "amount", type: "uint256" }],
          name: "withdrawEther",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          constant: false,
          inputs: [{ name: "_value", type: "uint256" }],
          name: "burn",
          outputs: [{ name: "success", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          constant: false,
          inputs: [{ name: "_value", type: "uint256" }],
          name: "unfreeze",
          outputs: [{ name: "success", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          constant: true,
          inputs: [{ name: "", type: "address" }],
          name: "balanceOf",
          outputs: [{ name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: true,
          inputs: [],
          name: "owner",
          outputs: [{ name: "", type: "address" }],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: true,
          inputs: [],
          name: "symbol",
          outputs: [{ name: "", type: "string" }],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: false,
          inputs: [
            { name: "_to", type: "address" },
            { name: "_value", type: "uint256" }
          ],
          name: "transfer",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          constant: true,
          inputs: [{ name: "", type: "address" }],
          name: "freezeOf",
          outputs: [{ name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          constant: false,
          inputs: [{ name: "_value", type: "uint256" }],
          name: "freeze",
          outputs: [{ name: "success", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          constant: true,
          inputs: [
            { name: "", type: "address" },
            { name: "", type: "address" }
          ],
          name: "allowance",
          outputs: [{ name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function"
        },
        {
          inputs: [
            { name: "initialSupply", type: "uint256" },
            { name: "tokenName", type: "string" },
            { name: "decimalUnits", type: "uint8" },
            { name: "tokenSymbol", type: "string" }
          ],
          payable: false,
          stateMutability: "nonpayable",
          type: "constructor"
        },
        { payable: true, stateMutability: "payable", type: "fallback" },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: "from", type: "address" },
            { indexed: true, name: "to", type: "address" },
            { indexed: false, name: "value", type: "uint256" }
          ],
          name: "Transfer",
          type: "event"
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: "from", type: "address" },
            { indexed: false, name: "value", type: "uint256" }
          ],
          name: "Burn",
          type: "event"
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: "from", type: "address" },
            { indexed: false, name: "value", type: "uint256" }
          ],
          name: "Freeze",
          type: "event"
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: "from", type: "address" },
            { indexed: false, name: "value", type: "uint256" }
          ],
          name: "Unfreeze",
          type: "event"
        }
      ];

      if (typeof web3 !== "undefined") {
        console.debug(web3.currentProvider);
        web3 = new Web3(web3.currentProvider);
      } else {
        alert("No currentProvider for web3");
      }
      function transferNova(b, c, d, e, f, g, h) {
        var h = new Eth(b);
        h.accounts().then(function(accounts) {
          imToken.callAPI("native.hideLoading");
          const Nova = h.contract(c, {
            from: accounts[0]
          });
          const nova = Nova.at(f);
          nova
            .transfer(d, e, {
              from: web3.eth.accounts[0]
            })
            .then(function(a) {
              g(String(a));
            })
            .catch(function(a) {
              h(String(a));
            });
        });
      }
      function balanceOfNova(b, c, d, e, f) {
        var g = new Eth(b);
        g.accounts().then(function(accounts) {
          const Nova = g.contract(c, {
            from: accounts[0]
          });
          var h = Nova.at(e);
          h.balanceOf(d)
            .then(function(a) {
              f(a[0].toNumber(10));
            })
            .catch(function(a) {
              f(String(a));
            });
        });
      }

      function approveNova(b, c, d, e, f) {
        var g = new Eth(b);
        g.accounts().then(function(accounts) {
          const Nova = g.contract(c, {
            from: accounts[0]
          });
          var h = Nova.at(e);
          h.balanceOf(d)
            .then(function(a) {
              f(a[0].toNumber(10));
            })
            .catch(function(a) {
              f(String(a));
            });
        });
      }

      function approveNova(provider, novaAbi, novaAddress, callBackBalance) {
        var eth = new Eth(provider);
        eth.accounts().then(accounts => {
          const Nova = eth.contract(novaAbi, {
            from: accounts[0]
          });
          var nova = Nova.at(novaAddress);
          nova
            .approve(novaAddress, 10000000000000, {
              from: web3.eth.accounts[0]
            })
            .then(function(info) {
              alert(info);
            })
            .catch(function(info) {
              alert(info);
            });
        });
      }

      //授权 授权按钮触发这个
      // approveNova(web3.currentProvider, abi, '0xb48b7e5bf6563b3e0a85055821a83deb8cfc12f6', (res)=>{
      // alert(res)
      //  alert(JSON.stringify(res))
      // })
      // 20000000是20Nova，要乘6个0
      // 质押 质押按钮触发这个 function transferNova(provider, novaAbi, toAddress, amountOfNova, gasPrice, novaAddress, callBackTransfer)
        transferNova(
          web3.currentProvider,
          abi,
          this.$route.query.address,
          Number(this.amount) * 1000,
          "0xb48b7e5bf6563b3e0a85055821a83deb8cfc12f6",
          hash => {       
            this.lockSubmit = true;
             if (window.ethereum) {
            imToken.callAPI("native.hideLoading");
             }
            this.pay(hash);
          },
          err => {
            if (window.ethereum) {
            imToken.callAPI("native.hideLoading");
            }
            this.lockSubmit = true;
          }
        );

      // 查询Nova余额触发这个 function balanceOfNova(provider, novaAbi, queryAddress, novaAddress, callBackBalance)
      // balanceOfNova(
      //   web3.currentProvider,
      //   abi,
      //   this.imtokenAddress,
      //   "0xb48b7e5bf6563b3e0a85055821a83deb8cfc12f6",
      //   res => {
      //     imToken.callAPI("native.hideLoading");
      //     imToken.callAPI('native.toastInfo', res)
      //   }
      // );
    },
    pay(hash) {
      var obj = {
        fromAddress: this.imtokenAddress, //转入方是自己的地址
        amount: Number(this.amount) * 1000,
        txnHash: hash
      };
      getNodePledge(obj)
        .then(res => {
          // alert(JSON.stringify(res));
          if (res.success) {
            this.$router.back(-1);
          }
        })
    },
    setAll() {
      personalAssest(this.imtokenAddress)
        .then(res => {
            this.initDataObj = res.data;
            this.amount = Number(res.data.balance) / 1000;
        })
    },
    initData() {
      /* 初始的页面数据获取 */
      personalAssest(this.imtokenAddress).then(res => {
          this.initDataObj = res.data;
      });
    }
  },
  mounted() {
    // this.initData(); /* 数据初始化 */
    // getGas().then(res => {
    //   this.gasPrice = res.data.data.gas / 1000000000000000000;
    // });
  }
};
</script>

<style lang="scss" scoped>

.logo{
  margin-top: 15px;
  display: flex;
  justify-content: center;
}
.tips{
  width: 95%;
  margin: 0 auto;
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
/* 提示 */
.input-wrap{
  position: relative;
  width: 95%;
  margin: 0 auto;
  margin-top: 10px;
  padding: 6px 2px;
  border: 1px solid #707070;
  border-radius: 6px;
}
.input-wrap input{
  border: none;
  outline: none;
  background: transparent;
}
.input-wrap .total{
  position: absolute;
  right: 14px;
  top: 8px;
  color: #707070;
  font-size: 12px;
}
/* 输入 */
.pricegas{
  font-size:11px;
font-family:PingFang SC;
font-weight:400;
text-align: right;
padding-right: 2.5%;
margin-top: 15px;
}
/* 规则 */
.pladge-rule{
  width: 95%;
  margin: 0 auto;
  margin-top: 70px;
}
.pladge-rule p{
font-size:12px;
color: #707070;
padding: 3px 2px;
line-height: 18px;
}
.pladge-rule .p1{
  color: #000;
  font-size: 14px;
    margin-bottom: 12px;
}
/* 按钮 */
.btn-wrap{
  position: absolute;
  bottom: 20px;
  left: 0;
  width: 100%;
}

.btn{
  position: relative;
 width:349px;
height:48px;
margin: 0 auto;
background:linear-gradient(131deg,rgba(38,38,107,1) 0%,rgba(19,24,36,1) 100%);
box-shadow:0px 3px 6px rgba(0,0,0,0.55);
opacity:1;
border-radius:24px;
text-align: center;
color: #fff;
line-height: 48px;
font-size: 17px;
overflow: hidden;
}
</style>

