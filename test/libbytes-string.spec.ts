import chai from "chai";
import * as waffle from "ethereum-waffle";
import { ethers } from "ethers";
import LibBytesString from "../build/LibBytesString.json";
import LibNibble from "../build/LibNibble.json";

chai.use(waffle.solidity);
const { expect } = chai;

describe("LibBytesString", () => {
  let provider: ethers.providers.Web3Provider;
  let wallet: ethers.Wallet;
  let libnibble: ethers.Contract;
  let libconv: ethers.Contract;

  before(async () => {
    provider = waffle.createMockProvider();
    wallet = waffle.getWallets(provider)[0];

    libnibble = await waffle.deployContract(wallet, LibNibble);
    waffle.link(LibBytesString, "contracts/LibNibble.sol:LibNibble", libnibble.address);
    libconv = await waffle.deployContract(wallet, LibBytesString);
  });

  const bn = ethers.utils.bigNumberify("0xab5801a7d398351b8be11c439e05c5b3259aec9b")
  const b20 = ethers.utils.hexlify(bn);

  it("can convert bytes20 to char array", async () => {
    let ret = await libconv.bytes20ToCharArray(b20);
    ret = ethers.utils.arrayify(ret);

    const arrayExpect = ethers.utils.toUtf8Bytes("ab5801a7d398351b8be11c439e05c5b3259aec9b");
    expect(ret).to.deep.eq(arrayExpect);
  });

  it("can convert address to string", async () => {
    const ret = await libconv.addressToString(b20);
    expect(typeof ret).to.eq("string");
    expect(ret).to.eq("0xab5801a7d398351b8be11c439e05c5b3259aec9b");
  });
});
