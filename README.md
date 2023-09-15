<!--
 * @Descripttion: 
 * @version: 
 * @Author: Mindy
 * @Date: 2023-09-01 16:29:15
-->
# Neo Governance

The contract address that has been deployed on the Sepolia network

```shell
ProxyAdmin:0x4d73c99206330a409043061d10f4117022e06942
GovProxyAdmin:0xc03efd38704855da17003793df423a77a634e452    
Governance:0x678a4b32f835e8154cfc6f6baee6e9630c4e1504
GovernanceProxy:0xf16193901282e4df7aa3ad4beaeaebe01f2d616e

policy:0x1c0c396c643018d74aa061394dfa211af0b6d5d0
policyProxy:0xe9461e53921d213a26adacfc2ce8ac4427b1a013
```

#### Test steps

注：GroProxyAdmin 实现了检查并仅允许共识（治理）更新配置和升级合约的功能，我们需要在使用GroProxyAdmin 之前先部署一个标准的ProxyAdmin,然后在部署GovernanceProxy合约之后，再调用ProxyAdmin.changeProxyAdmin(Proxy.newAdmin)来更新GroProxyAdmin

##### 1.deploy ProxyAdmin contract

```
npx hardhat run --network  sepolia   .\scripts\deploy-proxyAdmin.js 
```

ProxyAdmin  contract address: 0x4d73c99206330a409043061d10f4117022e06942

##### 2.deploy Governance contract

```
npx hardhat run --network  sepolia   .\scripts\deploy-governance.js
```

Governance contract address: 0x678a4b32f835e8154cfc6f6baee6e9630c4e1504

##### 3.deploy GovernanceProxy contract

```
npx hardhat run --network  sepolia   .\scripts\deploy-governanceProxy.js
```

GovernanceProxy contract address: 0xf16193901282e4df7aa3ad4beaeaebe01f2d616e

##### 4.Modify  the address in GovernanceVote contract

```
IGovernance public constant governance = IGovernance(0xF16193901282E4DF7aA3ad4beAEAeBE01f2d616e);
```

##### 5.deploy GovProxyAdmin contract （Need to modify the contract name in the file）

```
npx hardhat run --network  sepolia   .\scripts\deploy-proxyAdmin.js
```

GovProxyAdmin contract address: 0xc03efd38704855da17003793df423a77a634e4

#####  6.modify proxyadmin

```
ProxyAdmin.changeProxyAdmin(Proxy,newAdmin)
```

