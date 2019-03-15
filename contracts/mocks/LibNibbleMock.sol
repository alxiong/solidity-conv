pragma solidity ^0.5.5;

import "../LibNibble.sol";


contract LibNibbleMock {
  function isNibble(bytes1 b) public pure returns(bool){
    return LibNibble.isNibble(b);
  }
}
