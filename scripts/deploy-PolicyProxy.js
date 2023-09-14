/*
 * @Descripttion: 
 * @version: 
 * @Author: Mindy
 * @Date: 2023-09-01 16:29:15
 */


const hre = require("hardhat");

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;
  const policy = "0x1c0c396c643018d74aa061394dfa211af0b6d5d0"
  const ProxyAdmin = "0xc03efd38704855da17003793df423a77a634e452"
  const data = hre.ethers.toUtf8Bytes("");
  const lock = await hre.ethers.deployContract("contracts/lib/TransparentUpgradeableProxy.sol:TransparentUpgradeableProxy",[policy,ProxyAdmin,data]);

 
  await lock.waitForDeployment();

  console.log(
    `deployed to ${lock.target}`     //const Proxy = "0xe9461e53921d213a26adacfc2ce8ac4427b1a013"
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
