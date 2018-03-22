import React, { Component } from 'react';
import './Block.css';

class Block extends Component {
  constructor(props) {
    super(props);
    this.state = {
        block: ['lightgray', 'white', 'blue', 'red', 'green', 'orange', 'purple']
    }
  }
  render() {
    return (
        <div className="board-element" id={this.props.index} style={{ backgroundColor: this.state.block[this.props.value] }}>
        </div>
    );
  }
}

export default Block;
