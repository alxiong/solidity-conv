# Solidity Type Conversion Utils

**NOTE**: this repo is super early in development and no where near production-ready. Please use under careful discretion.

## Motivation
Conversion between types in Solidity can be tricky. Sometimes explicit typecasting would do the work, while it won't in other occasions (e.g. `addressToString`, i.e. hexstring to UTF-8).

If you are looking for utility library for bytes and string operations,
look no further than [Goncalo's bytes-utils](https://github.com/GNSPS/solidity-bytes-utils) and [Nick Johnson's stringutils](https://github.com/Arachnid/solidity-stringutils).

This library is mainly for **conversion between types**, especially between `uint`, `bytes` and `string`, fixed or dyanmic, we would like to abstract away those details and provide clean, intuitive API for Solidity dev.

## Installation
```shell
npm install solidity-conv
```
 TODO: publish under EthPM when more ready.
## Usage
in your Solidity contract, import it using:
```solidity
import "solidity-conv/contracts/(whichever).sol";
```

## Examples
```solidity
pragma solidity ^0.5.5;

import "solidity-conv/contracts/LibBytesString.sol";

contract myContract {
  function myFunc() public pure returns (string memory) {
    address dai = 0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359;
    // ERROR: Explicit type conversion not allowed (from fixed to dyanmic)
    // string memory greet = string(dai);
    
    // CORRECT: this how you rock:
    string memory greet = LibBytesString.addressToString(dai);
    return greet;
  }
}
```

## Contributing
All contributions are welcomed.

Roadmap:
- [x] `addressToString` PoC with tests
- [ ] extending to bytesToString, stringToBytes, uintToBytes, etc. 
- [ ] consider exposing better API
- [ ] inline assembly optimization

