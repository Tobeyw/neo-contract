/*
 * @Descripttion: 
 * @version: 
 * @Author: Mindy
 * @Date: 2023-09-04 09:50:56
 */

const hre = require("hardhat");
const { ContractFunctionVisibility } = require("hardhat/internal/hardhat-network/stack-traces/model");

const PolicyProxyAddress = "0xe9461e53921d213a26adacfc2ce8ac4427b1a013"

async function main() {
  const blocknum = await hre.ethers.provider.getBlockNumber()
  console.log(blocknum)
  const  signer  = await hre.ethers.provider.getSigner()
  const provider = await hre.ethers.provider
  // console.log(provider)
  const policyabi = await hre.artifacts.readArtifact("Policy");

  const Policy =new hre.ethers.Contract(PolicyProxyAddress,policyabi.abi,provider)
  const  PolicyWithSigner = Policy.connect(signer)
  
  //初始化
  
    // PolicyWithSigner.initialize()     //只能执行一次
    const add = "0x42869a360781E77AE1F63Be4f85e364eF77C66Ac";
   
   const getMiner = await Policy.getMiner();
   console.log("getMiner:",getMiner.toString());

   const isMiner = await Policy.isMiner(add);
   console.log("isMiner:",isMiner.toString(),signer.address);
  // //查地址有没有被加入黑名单
  const isBlackListedd = await Policy.isBlackListed(signer);
  console.log("isBlackListedd:",isBlackListedd.toString());

  //   //查询最低Gas 价格
  const GetminGas = await Policy.getMinGasPrice();
  console.log("GetMInGasPrice:",GetminGas.toString());
 
 

  const privateKey = "b5e2af6731cb284258ce331f634b40642dbdb2632a3140272350fe44cb95ed21"
  const owner = new hre.ethers.Wallet(privateKey,provider);
  
  const  PolicyWithSigner2 = Policy.connect(owner)
  const gasAmount = 2000000
  const  setMinGasPrice =  PolicyWithSigner.setMinGasPrice(gasAmount);
  const  setMinGasPrice2 =  PolicyWithSigner2.setMinGasPrice(gasAmount);
 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
