/*
 * @Descripttion: 
 * @version: 
 * @Author: Mindy
 * @Date: 2023-09-12 14:42:24
 */

const hre = require("hardhat");
const { ContractFunctionVisibility } = require("hardhat/internal/hardhat-network/stack-traces/model");



const ProxyAdmin = "0x4d73c99206330a409043061d10f4117022e06942"

async function main() {

  const  signer  = await hre.ethers.provider.getSigner()
  const provider = await hre.ethers.provider
  // console.log(provider)
  const proxyAdminabi = await hre.artifacts.readArtifact("ProxyAdmin");

  const proxyAdminContract =new hre.ethers.Contract(ProxyAdmin,proxyAdminabi.abi,provider)
  const ProxyAdminWithSigner = proxyAdminContract.connect(signer)
  const  add = await ProxyAdminWithSigner.getAddress()
  console.log("contract address is",add)

 
  const newAdmin = "0xc03efd38704855da17003793df423a77a634e452"     
  const ProxyAddress = "0xf16193901282e4df7aa3ad4beaeaebe01f2d616e"
 //查询proxyAdmin
  // const miners = await proxyAdminContract.getMiner();
  // console.log("admin is:",miners.toString());
  // const admin = await proxyAdminContract.getProxyAdmin(ProxyAddress);
  // console.log("admin is:",admin.toString());
 //
  const result = await ProxyAdminWithSigner.changeProxyAdmin(ProxyAddress,newAdmin);
  console.log("newAdmin is:",result.toString());

  // // 更新逻辑合约地址
  // console.log(ProxyAdminWithSigner)
  //   const result1 = await ProxyAdminWithSigner.upgrade(ProxyAddress,newimple);

  // // //查逻辑合约地址
  // const getProxyImplementation = await ProxyAdminWithSigner.getProxyImplementation(ProxyAddress);
  // console.log("getproxyImplementation:",getProxyImplementation.toString()); //0x0Cd213b5E4641db18AAE9650A79d4FB9F091267D

 
 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
