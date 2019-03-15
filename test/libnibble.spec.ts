import chai from "chai";
import * as waffle from "ethereum-waffle";
import { ethers } from "ethers";
import LibNibble from "../build/LibNibble.json";
import LibNibbleMock from "../build/LibNibbleMock.json";

chai.use(waffle.solidity);
const { expect } = chai;

describe("LibNibble", () => {
  const provider: ethers.providers.Web3Provider = waffle.createMockProvider();
  const wallet: ethers.Wallet = waffle.getWallets(provider)[0];
  let libnibble: ethers.Contract;
  let libnibbleMock: ethers.Contract;

  beforeEach(async () => {
    const libnibble = await waffle.deployContract(wallet, LibNibble);
    waffle.link(LibNibbleMock, "contracts/LibNibble.sol:LibNibble", libnibble.address);
    libnibbleMock = await waffle.deployContract(wallet, LibNibbleMock);
  });

  it("could distinguish a nibble", async () => {
    expect(await libnibbleMock.isNibble(ethers.utils.hexlify(0x12))).to.be.false;
    expect(await libnibbleMock.isNibble(ethers.utils.hexlify(0x0f))).to.be.true;
  });

});
