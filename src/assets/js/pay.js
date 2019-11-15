
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
      /* 
       *@ useraddress{用户imtoken授权地址}
        @ contractAddress{签署合约地址}
        @ pledgeAmount{质押进钱包的数量}
      */
    export default function imtokenPay(abi,useraddress,contractAddress,pledgeAmount){//封装了promise的imtoken钱包支付
       return new Promise(function(resolve,reject){      
  if (typeof web3 !== "undefined") {
    console.debug(web3.currentProvider);
    web3 = new Web3(web3.currentProvider);
  } else {
    alert("No currentProvider for web3");
  }
        transferNova(
            web3.currentProvider,
            abi,
            useraddress,
            pledgeAmount,
            contractAddress ,
            hash => {       
              resolve(hash)
            },
            err => {
             reject(err)
            }
          );
       })   
    }
  //授权 授权按钮触发这个
  // approveNova(web3.currentProvider, abi, '0xb48b7e5bf6563b3e0a85055821a83deb8cfc12f6', (res)=>{
  // alert(res)
  //  alert(JSON.stringify(res))
  // })
  // 20000000是20Nova，要乘6个0
  // 质押 质押按钮触发这个 function transferNova(provider, novaAbi, toAddress, amountOfNova, gasPrice, novaAddress, callBackTransfer)

//   transferNova(
//     web3.currentProvider,
//     abi,
//     this.$route.query.address,
//     Number(this.amount) * 1000,
//     "0xb48b7e5bf6563b3e0a85055821a83deb8cfc12f6",
//     hash => {       
      
//       this.pay(hash);
//     },
//     err => {

//     }
//   );
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