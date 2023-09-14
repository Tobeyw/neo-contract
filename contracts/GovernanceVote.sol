// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IGovernance {
    struct Phase {
        uint startHeight;
        address[] miners;
        uint preHeight;
    }

    // get current consensus phase
    function getCurrentPhase() external view returns (Phase memory);
}

abstract contract GovernanceVote {
    IGovernance public constant governance =
        IGovernance(0xF16193901282E4DF7aA3ad4beAEAeBE01f2d616e);

    // vote mapping, method key ->(user address -> param key)
    mapping(bytes32 => mapping(address => bytes32)) private voteMap;

    function isMiner(address addr) public view returns (bool) {
        address[] memory miners = governance.getCurrentPhase().miners;
        for (uint i = 0; i < miners.length; i++) {
            if (addr == miners[i]) {
                return true;
            }
        }
        return false;
    }

      function getMiner() public view returns (address[] memory) {
        address[] memory miners = governance.getCurrentPhase().miners;
       
        return miners;
    }


    function vote(bytes32 methodKey, bytes32 paramKey) internal {
        voteMap[methodKey][msg.sender] = paramKey;
    }

    function clearVote(bytes32 methodKey) internal {
        address[] memory voters = governance.getCurrentPhase().miners;
        for (uint i; i < voters.length; i++) {
            delete voteMap[methodKey][voters[i]];
        }
    }

    function checkVote(
        bytes32 methodKey,
        bytes32 paramKey
    ) internal view returns (bool isPass) {
        address[] memory voters = governance.getCurrentPhase().miners;
        uint votedCount;
        for (uint i; i < voters.length; i++) {
            if (voteMap[methodKey][voters[i]] == paramKey) {
                votedCount++;
            }
        }
        return votedCount > (voters.length * 2) / 3;
    }

    modifier needVote(bytes32 methodKey, bytes32 paramKey) {
        require(isMiner(msg.sender), "Not Miner");
        // update vote map
        vote(methodKey, paramKey);
        // check vote, if not pass just return
        if (!checkVote(methodKey, paramKey)) {
            return;
        }
        // execute method
        _;
        // clear vote
        clearVote(methodKey);
    }
}