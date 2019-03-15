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

  before(async () => {
    const libnibble = await waffle.deployContract(wallet, LibNibble);
    waffle.link(LibNibbleMock, "contracts/LibNibble.sol:LibNibble", libnibble.address);
    libnibbleMock = await waffle.deployContract(wallet, LibNibbleMock);
  });

  const byteA = ethers.utils.hexlify(0xff);
  const byteB = ethers.utils.hexlify(0x12);
  const byteC = ethers.utils.hexlify(0x01);
  const byteD = ethers.utils.hexlify(0x0f);

  it("can distinguish a nibble", async () => {
    let ret = await libnibbleMock.isNibble(byteA);
    expect(ret).to.be.false;
    ret = await libnibbleMock.isNibble(byteB);
    expect(ret).to.be.false;
    ret = await libnibbleMock.isNibble(byteC);
    expect(ret).to.be.true;
    ret = await libnibbleMock.isNibble(byteD);
    expect(ret).to.be.true;
  });

  it("can convert bytes1 to nibble", async () => {
    let ret = await libnibbleMock.toNibble(byteB, true);
    expect(ret).to.eq(ethers.utils.hexlify(0x01));
    ret = await libnibbleMock.toNibble(byteB, false);
    expect(ret).to.eq(ethers.utils.hexlify(0x02));
  });

});
