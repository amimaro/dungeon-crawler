import React, {Component} from 'react';

class Listener extends Component {
  constructor(props) {
    super(props);
    this.state = {}

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.move = this.move.bind(this);
    this.isPlayerAround = this.isPlayerAround.bind(this);
    this.isPlayer = this.isPlayer.bind(this);
    this.isPath = this.isPath.bind(this);
    this.setColor = this.setColor.bind(this);
    this.getAttribute = this.getAttribute.bind(this);
    this.setAttribute = this.setAttribute.bind(this);
    this.setValue = this.setValue.bind(this);
    this.getIndex = this.getIndex.bind(this);
    this.getPlayer = this.getPlayer.bind(this);
    this.getId = this.getId.bind(this);
    this.getValue = this.getValue.bind(this);
    this.getElementById = this.getElementById.bind(this);
  }
  componentWillMount() {
    document.addEventListener("keydown", this.handleKeyPress, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }
  handleKeyPress = (event) => {
    this.move(event.keyCode);
  }
  move(keyCode) {
    let step = 0;
    let index = this.getIndex();
    switch (keyCode) {
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
      if(this.getValue(this.getElementById(playerId + step)) == 1) {
        console.log('path');
      }
      if(this.getValue(this.getElementById(playerId + step)) == 0) {
        console.log('wall');
      }
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
  isPlayerAround(index) {
    if (this.isPlayer(index - 1)) // Player at left
      return index - 1;
    if (this.isPlayer(index + 1)) // Player at right
      return index + 1;
    if (this.isPlayer(index - 100)) // Player up
      return index - 100;
    if (this.isPlayer(index + 100)) // Player down
      return index + 100;
    return 0;
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
  getIndex() {
    return this.props.index;
  }
  getValue(element) {
    return element.getAttribute('value');
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
    return (<div></div>);
  }
}

export default Listener;