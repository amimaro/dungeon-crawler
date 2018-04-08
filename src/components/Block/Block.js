import React, {Component} from 'react';
import './Block.css';

import Contents from '../Contents/Contents';

class Block extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    }
  }
  componentWillMount() {
    this.blocks = new Contents().getBlocks();
    this.setState({value: this.props.value})
  }
  render() {
    return (<div className="board-element" id={this.props.index} style={{
        backgroundColor: this.blocks[this.state.value]
      }} value={this.state.value}></div>);
  }
}

export default Block;
