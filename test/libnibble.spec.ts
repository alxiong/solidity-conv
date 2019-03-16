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
    libnibble = await waffle.deployContract(wallet, LibNibble);
    waffle.link(LibNibbleMock, "contracts/LibNibble.sol:LibNibble", libnibble.address);
    libnibbleMock = await waffle.deployContract(wallet, LibNibbleMock);
  });

  const byteA = ethers.utils.hexlify(0xff);
  const byteB = ethers.utils.hexlify(0x12);
  const byteC = ethers.utils.hexlify(0x01);
  const byteD = ethers.utils.hexlify(0x0f);

  it("can distinguish a nibble", async () => {
    let ret = await libnibbleMock.isNibble(byteA);
    expect(ret).to.equal(false);
    ret = await libnibbleMock.isNibble(byteB);
    expect(ret).to.equal(false);
    ret = await libnibbleMock.isNibble(byteC);
    expect(ret).to.equal(true);
    ret = await libnibbleMock.isNibble(byteD);
    expect(ret).to.equal(true);
  });

  it("can convert bytes1 to nibble", async () => {
    let ret = await libnibbleMock.toNibble(byteB, true);
    expect(ret).to.eq(ethers.utils.hexlify(0x01));
    ret = await libnibbleMock.toNibble(byteB, false);
    expect(ret).to.eq(ethers.utils.hexlify(0x02));
  });

  it("can map a nibble to char in ASCII", async () => {
    let ret = await libnibbleMock.nibbleToChar(ethers.utils.hexlify(0x3));
    expect(ret).to.equal(ethers.utils.hexlify(0x33));
    ret = await libnibbleMock.nibbleToChar(ethers.utils.hexlify(0xb));
    expect(ret).to.equal(ethers.utils.hexlify(0x62));
    await expect(libnibbleMock.nibbleToChar(ethers.utils.hexlify(0x12))).to.be.reverted;
  });
});
