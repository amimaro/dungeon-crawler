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
    this.getAttribute = this.getAttribute.bind(this);
    this.setAttribute = this.setAttribute.bind(this);
    this.getValue = this.getValue.bind(this);
    this.setValue = this.setValue.bind(this);
    this.getIndex = this.getIndex.bind(this);
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
    let index = this.getIndex();
    if (this.isPlayer(index)) {
      this.move(event.keyCode);
    }
  }
  move(keyCode) {
    let step = 0;
    let index = this.getIndex();
    switch (keyCode) {
      case 37:
        console.log('left');
        step = -1;
        break;
      case 38:
        console.log('up');
        step = -100;
        break;
      case 39:
        console.log('right');
        step = 1;
        break;
      case 40:
        console.log('down');
        step = 100;
        break;
    }
    if (this.isPath(index + step) && step != 0) {
      this.setColor(index + step, 40);
      this.setColor(index, 1);
    }
  }
  isPlayer(index) {
    if (this.getValue(index) >= 40 && this.getValue(index) <= 44)
      return true;
    return false;
  }
  isPath(index) {
    if (this.getValue(index) == 1)
      return true;
    return false;
  }
  setColor(index, value) {
    document.getElementById(index).style.backgroundColor = this.state.blocks[value];
    this.setValue(index, value);
  }
  isPlayerAround() {
    let i = this.getIndex();
    if (this.isPlayer(i - 1)) // Player at left
      return i - 1;
    if (this.isPlayer(i + 1)) // Player at right
      return i + 1;
    if (this.isPlayer(i - 100)) // Player up
      return i - 100;
    if (this.isPlayer(i + 100)) // Player down
      return i + 100;
    return 0;
  }
  getIndex() {
    return this.props.index;
  }
  getValue(index) {
    return this.getAttribute(index, 'value');
  }
  setValue(index, value) {
    this.setAttribute(index, 'value', value);
  }
  getAttribute(index, attr) {
    return document.getElementById(index).getAttribute(attr);
  }
  setAttribute(index, attr, value) {
    document.getElementById(index).setAttribute(attr, value);
  }
  render() {
    return (<div className="board-element" id={this.props.index} style={{
        backgroundColor: this.state.blocks[this.state.value]
      }} value={this.state.value}></div>);
  }
}

export default Block;
