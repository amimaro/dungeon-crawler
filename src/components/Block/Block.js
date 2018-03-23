import React, { Component } from 'react';
import './Block.css';

class Block extends Component {
  constructor(props) {
    super(props);
    this.state = {
        blocks: Array(40).fill('black')
    }
  }
  componentWillMount() {
    let blocks = this.state.blocks;

    blocks[0] = 'LIGHTGRAY';
    blocks[1] = 'WHITE'; //
    blocks[2] = 'BLUE'; // Player
    blocks[3] = 'INDIGO'; // Boss

    blocks[10] = 'LIGHTCORAL';
    blocks[11] = 'CRIMSON';
    blocks[12] = 'RED';
    blocks[13] = 'FIREBRICK';
    blocks[14] = 'DARKRED';

    blocks[20] = 'PALEGREEN';
    blocks[21] = 'MEDIUMSPRINGGREEN';
    blocks[22] = 'MEDIUMSEAGREEN';
    blocks[23] = 'FORESTGREEN';
    blocks[24] = 'DARKGREEN';

    blocks[30] = 'SILVER';
    blocks[31] = 'GRAY';
    blocks[32] = 'DIMGRAY';
    blocks[33] = 'SLATEGRAY';
    blocks[34] = 'DARKSLATEGRAY';

    this.setState({blocks: blocks})
  }
  render() {
    return (
        <div className="board-element" id={this.props.index} style={{ backgroundColor: this.state.blocks[this.props.value] }}>
          {this.props.walls}
        </div>
    );
  }
}

export default Block;
