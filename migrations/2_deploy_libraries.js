const tdr = require("truffle-deploy-registry");

const LibNibble = artifacts.require("LibNibble");
const LibBytesString = artifacts.require("LibBytesString");

module.exports = (deployer, network) => {
  deployer.then(async () => {

    const libnibble = await deployer.deploy(LibNibble);
    await deployer.link(LibNibble, LibBytesString);

    if (!tdr.isDryRunNetworkName(network)) {
      await tdr.appendInstance(libnibble);
    }
  });
};
