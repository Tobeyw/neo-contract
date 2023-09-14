/*
 * @Descripttion: 
 * @version: 
 * @Author: Mindy
 * @Date: 2023-09-12 11:20:42
 */


const hre = require("hardhat");

async function main() {
  
  const governance = "0x678a4b32f835e8154cfc6f6baee6e9630c4e1504"
  const ProxyAdmin = "0x4d73c99206330a409043061d10f4117022e06942"
  const data = hre.ethers.toUtf8Bytes("");
 
  const lock = await hre.ethers.deployContract("contracts/lib/TransparentUpgradeableProxy.sol:TransparentUpgradeableProxy",[governance,ProxyAdmin,data]);
 
  await lock.waitForDeployment();

  console.log(
    `deployed to ${lock.target}`     //const Proxy = "0xf16193901282e4df7aa3ad4beaeaebe01f2d616e"
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
