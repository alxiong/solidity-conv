pragma solidity ^0.5.5;

import "../LibNibble.sol";


contract LibNibbleMock {
  function isNibble(bytes1 b) public pure returns(bool){
    return LibNibble.isNibble(b);
  }

  function toNibble(bytes1 b, bool first) public pure returns(bytes1){
    return LibNibble.toNibble(b, first);
  }

  function nibbleToChar(bytes1 b) public pure returns(bytes1){
    return LibNibble.nibbleToChar(b);
  }
}
