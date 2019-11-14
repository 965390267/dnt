import axios from '@/config'
/** 
 * @request {POST}
 * @param {nodeId}
 * @param {toAddress}
 *  @param {amount}
 *  @param {type}
 *  @return {
"success": false,
"code": "1",
"msg": "赎回失败",
"data":{}
}
 * //赎回接口
*/
export function getNodeRedeem(data) {
    return axios.post('api/nodeRedeem', data);
  }
  
  
  /** 
  * @request {POST}
  * @param {fromAddress}
  *  @param {amount}
  *  @param {txnHash}
  * @return {
"success": false,
"code": "1",
"msg": "质押错误，交易验证失败",
"data":{}
}
  * //质押接口
  */
  export function getNodePledge(data) {
    return axios.post('api/nodePledge', data);
  }
  
  
  /** 
  * @request {GET}
  * @param {address}
  * @return {
"success": true,
"code": "0",
"msg": "success",
"data":[
{"date": "2019-11-13 08:24:38", "amount": 200000, "type": 0, "transactionId": 1,…}
]
}
  * //最近交易接口
  */
  export function recentTransactions(userAddress) {
    return axios(`api/recentTransactions?userAddress=${userAddress}`);
  }
  
  
  /** 
  * @request {GET}
  * @param {address}
  * @return {
"success": true,
"code": "0",
"msg": "success",
"data":{
"totalIncome": 1792,
"returnRate": 3,
"isPledged": false,
"yesterdayIncome": 16,
"totalPledgeAmout": 600000,
"pledgeAmout": 200000,
"todayIncome": 16,
"desc": "这是个很厉害的简介！"
}
}
  * //我的节点详情接口
  */
  export function myNodeDetail(address) {
    return axios(`api/myNodeDetail?address=${address}`);
  }
  


  
  /** 
  * @request {GET}
  * @param {address}
  * @return {
"success": true,
"code": "0",
"msg": "success",
"data":{
"totalIncome": 2208,
"totalAssetsBFB": 2208,
"dntBalance": 0,
"totalAssetsDNT": 200000
}
}
  * //个人总资产接口
  */
  export function personalAssest(address) {
  
    return axios(`api/personalAssest?address=${address}`);
  }
  



  /** 
  * @request {GET}
  * @param {address}
  * @return {
"success": true,
"code": "0",
"msg": "success",
"data":{
"totalAmount": 200000,
"totalIncome": 2320,
"incomeRecodes":[{"pledgeAmount": 200000, "incomeAmount": 16, "createDate": "2019-11-14 08:50:00" }, {"pledgeAmount": 200000,…]
}
}
  * //我的收益记录
  */
  export function myIncomeRecode(address) {
  
    return axios(`api/myIncomeRecode?address=${address}`);
  }
  



  /** 
  * @request {GET}
  * @param {none}
  * @return {
"success": true,
"code": "0",
"msg": "success",
"data":{
"gas": 198000000000000
}
}
  * //获取矿工费
  */
  export function getGas() {
  
    return axios(`api/getGas`);
  }
  



  /** 
  * @request {GET}
  * @param {none}
  * @return {
"success": true,
"code": "0",
"msg": "success",
"data":{
"cny": 0.1980306058
}
}
  * //获取DNT汇率
  */
  export function getDNTCNY() {
  
    return axios(`api/getDNTCNY`);
  }
  
