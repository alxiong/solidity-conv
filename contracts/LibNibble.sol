pragma solidity ^0.5.5;


/// @notice utility library for bytes1 as nibble type
library LibNibble {
  function isNibble(bytes1 b) public pure returns(bool) {
    return uint(bytes32(b>>4)) == 0;
  }

  /// @notice extract nibble from a bytes1
  /// @dev b the bytes to extract from
  /// @dev first returns the first nibble if set to true
  function toNibble(bytes1 b, bool first)
    public
    pure
    returns (bytes1)
  {
    if (first) return b>>4;
    return b & hex"0f";
  }
}
