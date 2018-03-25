import React, {Component} from 'react';

class Listener extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: Array(40).fill('black')
    }

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.move = this.move.bind(this);
    this.setValue = this.setValue.bind(this);
    this.getPlayer = this.getPlayer.bind(this);
    this.getId = this.getId.bind(this);
    this.getValue = this.getValue.bind(this);
    this.getElementById = this.getElementById.bind(this);
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
    let step = 0;
    let index = this.getIndex();
    switch (event.keyCode) {
      case 37:
        console.log('left pressed');
        step = -1;
        break;
      case 38:
        console.log('up pressed');
        step = -100;
        break;
      case 39:
        console.log('right pressed');
        step = 1;
        break;
      case 40:
        console.log('down pressed');
        step = 100;
        break;
    }
    if (step != 0) {
      let player = this.getPlayer();
      let playerId = parseInt(this.getId(player));
      let nextElement = this.getElementById(playerId + step);
      switch (this.getValue(nextElement)) {
        case 0:
          console.log('wall');
          break;
        case 1:
          console.log('path');
          this.move(player, nextElement);
          break;
      }
    }
  }
  move(origin, destination) {
    origin.setValue(1);
    destination.setValue(40);
  }
  getPlayer() {
    return document.querySelector('[value="40"]')
  }
  getId(element) {
    return element.getAttribute('id');
  }
  getElementById(id) {
    return document.getElementById(id);
  }
  getValue(element) {
    return element.getAttribute('value');
  }
  setValue(element, value) {
    element.setAttribute('value', value);
    element.style.backgroundColor = this.state.blocks[value];
  }
  render() {
    return (<div></div>);
  }
}

export default Listener;
