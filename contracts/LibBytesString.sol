pragma solidity ^0.5.5;
pragma experimental ABIEncoderV2;

/* solium-disable */
import "./LibNibble.sol";

contract LibBytesString {

  /// @notice converting address type to string
  // function addressToString(address a) public pure returns(string memory){

  // }

  function bytes20ToCharArray(bytes20 b) public pure returns(bytes1[] memory){
    bytes1[] memory ret = new bytes1[](40);
    for (uint i = 0; i<20; i++){
      ret[2*i] = LibNibble.nibbleToChar(LibNibble.toNibble(b[i], true));
      ret[2*i+1] = LibNibble.nibbleToChar(LibNibble.toNibble(b[i], false));
    }
    return ret;
  }
  // TODO: all other byte type conversion
}
