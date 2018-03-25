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
    this.getValue = this.getValue.bind(this);
    this.setValue = this.setValue.bind(this);
    this.getIndex = this.getIndex.bind(this);
    this.getPlayer = this.getPlayer.bind(this);
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
    if (step != 0) {
      console.log(this.getPlayer());
      // if (this.isPlayer(index) && this.isPath(index + step) == 1) {
      //   this.setColor(index + step, 40);
      //   this.setColor(index, 1);
      // }
      // if (this.isPath(index)) {
      //   console.log('path ' + this.isPlayerAround(index))
      //   this.setColor(index + step, 15);
      // }
      // if(this.isPath(index)) {
      //   console.log('isPath');
      // }
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
    return (<div></div>);
  }
}

export default Listener;
