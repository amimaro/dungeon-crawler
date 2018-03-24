import React, {Component} from 'react';
import './Block.css';

class Block extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: Array(40).fill('black'),
      value: 0
    }

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.move = this.move.bind(this);
    this.isPlayerAround = this.isPlayerAround.bind(this);
    this.isPlayer = this.isPlayer.bind(this);
    this.isPath = this.isPath.bind(this);
    this.setColor = this.setColor.bind(this);
  }
  componentWillMount() {
    let blocks = this.state.blocks;

    blocks[0] = 'LIGHTGRAY';
    blocks[1] = 'WHITE';
    blocks[2] = 'BLACK';

    // Enemies
    blocks[10] = 'LIGHTCORAL';
    blocks[11] = 'CRIMSON';
    blocks[12] = 'RED';
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

    document.addEventListener("keydown", this.handleKeyPress, false);
    this.setState({blocks: blocks, value: this.props.value})
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }
  handleKeyPress = (event) => {
    if (this.state.value >= 40 && this.state.value <= 44) {
      switch (event.keyCode) {
        case 37:
          console.log('left');
          this.move(-1);
          break;
        case 38:
          console.log('up');
          this.move(-100);
          break;
        case 39:
          console.log('right');
          this.move(1);
          break;
        case 40:
          console.log('down');
          this.move(100);
          break;
      }
    }
  }
  move(step) {
    let index = this.props.index;
    if(this.isPath(index + step)) {
      this.setColor(1);
    }
    // let board = this.state.board;
    // for (let i = 0; i < board.length; i++) {
    //   if (board[i] >= 40 && board[i] <= 44 && board[i + step] === 1) {
    //     document.getElementById(i).setAttribute("value", "1");
    //     document.getElementById(i + step).setAttribute("value", 40);
    //     // board[i + step] = 40;
    //     // board[i] = 1;
    //     break;
    //   }
    // }
  }
  isPlayer(index) {
    if(document.getElementById(index).getAttribute('value') >= 40 ||
       document.getElementById(index).getAttribute('value') <= 44)
       return true;
    return false;
  }
  isPath(index) {
    if(document.getElementById(index).getAttribute('value') === 1)
       return true;
    return false;
  }
  setColor(color) {
    document.getElementById(this.props.index).getAttribute('background-color', this.props.blocks[color]);
  }
  isPlayerAround() {
    let i = this.prop.index;
    if (this.isPlayer(i - 1))
      return i - 1;
    if (this.isPlayer(i + 1))
      return i + 1;
    if (this.isPlayer(i - 100))
      return i - 100;
    if (this.isPlayer(i + 100))
      return i + 100;
    return 0;
  }
  render() {
    return (<div className="board-element" id={this.props.index} style={{
        backgroundColor: this.state.blocks[this.state.value]
      }} value={this.state.value}></div>);
  }
}

export default Block;
