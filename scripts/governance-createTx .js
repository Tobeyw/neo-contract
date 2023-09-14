/*
 * @Descripttion: 
 * @version: 
 * @Author: Mindy
 * @Date: 2023-09-12 13:56:26
 */

const hre = require("hardhat");
 
const ethers = require("ethers");
 

const goveranceProxyAddress = "0xf16193901282e4df7aa3ad4beaeaebe01f2d616e"

async function main() {
  const blocknum = await hre.ethers.provider.getBlockNumber()
  console.log(blocknum)

  const  signer  = await hre.ethers.provider.getSigner()
  const provider = await hre.ethers.provider
  // console.log(provider)
  const governanceabi = await hre.artifacts.readArtifact("Governance");

  const goverance =new hre.ethers.Contract(goveranceProxyAddress,governanceabi.abi,provider)
  const  goveranceWithSigner = goverance.connect(signer)
  const  add = await goveranceWithSigner.getAddress()
  console.log(add)
  //初始化
    // goveranceWithSigner.initialize()     //只能执行一次
 
 //查询consenses
  const result = await goverance.getCurrentPhase();
  console.log("owner is:",result.toString());
 
  const result1 = await goverance.lastStartHeight();
  console.log("lastStartHeight is:",result1.toString());

  const start = await goverance.startDraftId();
  console.log("start is:",start.toString());
  const end = await goverance.endDraftId();
  console.log("end is:",end.toString());
  //发起提案
  const startheight = blocknum + 150
  console.log("inputHeight is:",startheight)
  // const miners = ["0x42869a360781E77AE1F63Be4f85e364eF77C66Ac","0xA83e88525eAaA73bC831455A2A6b41F88eEC1e75"]
  const miners = ["0xcf41E8a906bFc1b8eB8ABE6e073353b942a5d363","0x42869a360781E77AE1F63Be4f85e364eF77C66Ac","0xA83e88525eAaA73bC831455A2A6b41F88eEC1e75"]
  const resultnum = await goveranceWithSigner.propose(startheight,miners);
  console.log(resultnum.toString());
  //投票
    //  const resultvote = await goveranceWithSigner.vote(1);
  
 
  // const privateKey2 = "908cb93129f920d7f9575962e074b5591cf0e19540041ca147bae7dbf53569b9"  //0xA83e88525eAaA73bC831455A2A6b41F88eEC1e75
  // const owner2= new hre.ethers.Wallet(privateKey2,provider);
  
  // //
  // const policyabi = await hre.artifacts.readArtifact("Policy");
  // const PolicyWithSigner =new hre.ethers.Contract(PolicyProxyAddress,policyabi.abi,provider)


  
  // const selector = ethers.id('setMinGasPrice(uint256)').slice(0, 10);

  // console.log("funSig:",selector);
  // const amount = 20000000;
  // const data = selector + ethers.AbiCoder.defaultAbiCoder().encode(['uint256'], [amount]).substring(2);
 
  // console.log("data:",data);

  // const test = await multiWallet.Test2();
  // console.log("test2 is:",test.toString());
 

   
  //提交交易
  //  const result_index = await multiWalletWithSigner.submitTransaction(PolicyProxyAddress,0,data);   
  //  console.log("result_index:",result_index);

  //查询提交交易
  // const result_index = await multiWalletWithSigner.getTransaction(2);   
  // console.log("result_index:",result_index);

   ////owner1 确认交易
  // const  multiWalletWithSigner1 = multiWallet.connect(owner1) 
  // const confirm1 = await multiWalletWithSigner1.confirmTransaction(2);   
  // console.log(confirm1)

  ////owner2 确认交易
  // const  multiWalletWithSigner2 = multiWallet.connect(owner2) 
  // const confirm2 = await multiWalletWithSigner2.confirmTransaction(2);   
  // console.log(confirm2)

  // 执行交易
  // const  multiWalletWithSigner2 = multiWallet.connect(owner2) 
  // const executeTx = await multiWalletWithSigner2.executeTransaction(2);  
  // console.log(executeTx) 

  // 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
