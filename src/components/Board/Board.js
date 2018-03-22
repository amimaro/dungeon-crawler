import React, { Component } from 'react';
import './Board.css';
import Block from '../Block/Block';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
        renderedBoard: [],
        board: Array(parseInt(this.props.TOTAL_BLOCKS)).fill(0),
        rows: this.props.TOTAL_BLOCKS / this.props.WIDTH * this.props.BLOCK_SIZE,
        columns: this.props.TOTAL_BLOCKS / this.props.HEIGHT * this.props.BLOCK_SIZE
    }
    this.renderBoard = this.renderBoard.bind(this);
    this.renderBoard = this.renderBoard.bind(this);
    this.generateDungeons = this.generateDungeons.bind(this);
    this.getRow = this.getRow.bind(this);
    this.getColumn = this.getColumn.bind(this);
    this.createRect = this.createRect.bind(this);
  }
  componentWillMount() {
    this.generateDungeons();
  }
  componentDidMount() {
    this.renderBoard();
  }
  generateDungeons() {
    let border = 0;
    let rows = this.state.rows;
    let columns = this.state.columns;
    while(border < 3) {
      let board = this.state.board.map((block, index) => {
        if(this.createRect(index, rows/2 - 5, columns/2 - 5, rows/2 + 5, columns/2 + 5))
            return 1;
        return 0;
      });
      this.setState({board: board});
      border = 4;
    }
  }
  createRect(index, x0, y0, x1, y1) {
    if(this.getRow(index) > x0 && this.getRow(index) < x1)
      if(this.getColumn(index) > y0 && this.getColumn(index) < y1)
        if(this.state.board[index] == 0)
          return true;
    return false;
  }
  getRow(index) {
      return Math.floor(index/this.state.rows);
  }
  getColumn(index) {
      return index % this.state.columns;
  }
  renderBoard() {
    let renderedBoard = this.state.board.map((block, index) => {
        return this.renderBlock({value: block, index: index});
    });
    this.setState({renderedBoard: renderedBoard});
  }
  renderBlock(block) {
    return <Block value={block.value} key={block.index} index={block.index}  />;
  }
  render() {
    return (
        <div className="board" style={{ width: this.props.WIDTH + 'px', height: this.props.HEIGHT + 'px' }}>
          {this.state.renderedBoard}
        </div>
    );
  }
}

export default Board;
