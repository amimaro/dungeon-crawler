class Contents {
  isPath(block) {
    if(block === 1)
      return true;
    return false;
  }
  isHeal(block) {
    if(block >= 20 && block <= 24)
      return true;
    return false;
  }
  isWall(block) {
    if(block === 0)
      return true;
    return false;
  }
  getBlocks() {
    let blocks = Array(40).fill('black');
    blocks[0] = 'LIGHTGRAY'; // Wall
    blocks[1] = 'WHITE'; // Path
    blocks[2] = 'BLACK';

    // Enemies
    blocks[10] = 'LIGHTCORAL';
    blocks[11] = 'RED';
    blocks[12] = 'CRIMSON';
    blocks[13] = 'FIREBRICK';
    blocks[14] = 'DARKRED';
    blocks[15] = 'INDIGO'; // Boss

    // Heals
    blocks[20] = 'PALEGREEN';
    blocks[21] = 'MEDIUMSPRINGGREEN';
    blocks[22] = 'MEDIUMSEAGREEN';
    blocks[23] = 'FORESTGREEN';
    blocks[24] = 'DARKGREEN';

    // Weapons
    blocks[30] = 'GRAY';
    blocks[31] = 'DIMGRAY';
    blocks[32] = 'LIGHTSLATEGRAY';
    blocks[33] = 'SLATEGRAY';
    blocks[34] = 'DARKSLATEGRAY';

    // Player
    blocks[40] = 'LIGHTSKYBLUE';
    blocks[41] = 'DEEPSKYBLUE';
    blocks[42] = 'DODGERBLUE';
    blocks[43] = 'ROYALBLUE';
    blocks[44] = 'MIDNIGHTBLUE';
    return blocks;
  }
}

export default Contents;
