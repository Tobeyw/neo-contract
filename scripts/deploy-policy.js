/*
 * @Descripttion: 
 * @version: 
 * @Author: Mindy
 * @Date: 2023-09-04 09:49:18
 */

const hre = require("hardhat");

async function main() {
  
  const Policy = await hre.ethers.deployContract("Policy");

  await Policy.waitForDeployment();

  console.log(
    `Policy deployed to ${Policy.target}`   //0x1c0c396c643018d74aa061394dfa211af0b6d5d0
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
