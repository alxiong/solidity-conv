const tdr = require("truffle-deploy-registry");

const LibNibble = artifacts.require("LibNibble");
const LibBytesString = artifacts.require("LibBytesString");

const ARTIFACTS = [
  LibBytesString
];

module.exports = (deployer, network) => {
  deployer.then(async () => {
    for (const artifact of ARTIFACTS) {
      const instance = await deployer.deploy(artifact);
      if (!tdr.isDryRunNetworkName(network)) {
        await tdr.appendInstance(instance);
      }
    }
  });
};
