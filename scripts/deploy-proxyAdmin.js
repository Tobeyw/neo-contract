/*
 * @Descripttion: 
 * @version: 
 * @Author: Mindy
 * @Date: 2023-09-04 09:39:50
 */

const hre = require("hardhat");

async function main() {
 

  //  const ProxyAdmin = await hre.ethers.deployContract("ProxyAdmin");  //0x4d73c99206330a409043061d10f4117022e06942
 const ProxyAdmin = await hre.ethers.deployContract("GovProxyAdmin");    //0xc03efd38704855da17003793df423a77a634e452
  await ProxyAdmin.waitForDeployment();

  console.log(
    `ProxyAdmin deployed to ${ProxyAdmin.target}`    //
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
