/*
 * @Descripttion: 
 * @version: 
 * @Author: Mindy
 * @Date: 2023-09-12 10:59:20
 */

const hre = require("hardhat");

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;
  const multi = "0xA83e88525eAaA73bC831455A2A6b41F88eEC1e75"
  const Policy = await hre.ethers.deployContract("Governance");  //

  await Policy.waitForDeployment();

  console.log(
    `Policy deployed to ${Policy.target}`   //0x678a4b32f835e8154cfc6f6baee6e9630c4e1504
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
