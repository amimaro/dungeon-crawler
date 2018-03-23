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
    this.isCorner = this.isCorner.bind(this);
    this.countWalls = this.countWalls.bind(this);
    this.getRand = this.getRand.bind(this);
    this.createVerticalRandomPath = this.createVerticalRandomPath.bind(this);
    this.createHorizontalRandomPath = this.createHorizontalRandomPath.bind(this);
  }
  componentWillMount() {
    this.generateDungeons();
  }
  componentDidMount() {
    this.renderBoard();
  }
  generateDungeons() {
    let board = Array(parseInt(this.props.TOTAL_BLOCKS)).fill(0);
    let rows = this.state.rows;
    let columns = this.state.columns;

    for(let i = 5; i < 99; i+=20) {
      board = this.createHorizontalRandomPath(board, i);
      board = this.createVerticalRandomPath(board, i);
      for(let j = 5; j < 99; j+=20) {
        board = this.createRect(board,
          i - this.getRand(1, 4),
          j - this.getRand(1, 4),
          i + this.getRand(5, 9),
          j + this.getRand(5, 9));
      }
    }

    this.setState({board: board});
  }
  createRect(board, x0, y0, x1, y1) {
    return board.map((block, index) => {
      if(this.getRow(index) >= x0 && this.getRow(index) <= x1 &&
         this.getColumn(index) >= y0 && this.getColumn(index) <= y1 &&
         board[index] == 0){
          return 1;
      } else if(board[index] == 1) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  createHorizontalRandomPath(board, pivot) {
    let direction = false; // false - turn left; true - turn right
    for(let i = 10; i < 90; i++) { // offset borders
      if(this.getRand(0,10) > 8) { // 20% chance to turn to a direction
        for(let j = 0; j < this.getRand(3,5); j++) { // walk up and down
          if(direction){
            pivot++;
          } else if(this.getRow(i + 100 * pivot) == 0 ) { // Avoid borders
            pivot++;
          } else {
            pivot--;
          }
          board[i + 100 * pivot] = 1;
        }
        direction = !direction; // toggle direction
      }
      board[i + 100 * pivot] = 1;
    }
    return board;
  }
  createVerticalRandomPath(board, pivot) {
    let direction = false; // false - turn left; true - turn right
    for(let i = 10; i < 90; i++) { // offset borders
      if(this.getRand(0,10) > 8) { // 20% chance to turn to a direction
        for(let j = 0; j < this.getRand(3,5); j++) { // walk sideways
          if(direction){
            pivot++;
          } else if(this.getColumn(pivot + 100 * this.getColumn(i)) == 0 ) { // Avoid borders
            pivot++;
          } else {
            pivot--;
          }
          board[pivot + 100 * this.getColumn(i)] = 1;
        }
        direction = !direction; // toggle direction
      }
      board[pivot + 100 * this.getColumn(i)] = 1;
    }
    return board;
  }
  isCorner(index, x0, y0, x1, y1) {
    if(this.getRow(index) == x0 && this.getColumn(index) == y0)
      return true;
    if(this.getRow(index) == x1 && this.getColumn(index) == y1)
      return true;
    if(this.getRow(index) == x1 && this.getColumn(index) == y0)
      return true;
    if(this.getRow(index) == x0 && this.getColumn(index) == y1)
      return true;
    return false;
  }
  countWalls(index) {
    let count = 0;
    let row = this.getRow(index), column = this.getColumn(index);
    if(this.state.board[index+1] === 0 && column < 99)
      count ++;
    if(this.state.board[index-1] === 0 && column > 0)
      count ++;
    if(this.state.board[index-100] == 0 && row > 0)
      count ++;
    if(this.state.board[index+100] == 0 && row < 99)
      count ++;
    if(this.state.board[index+99] == 0 && row < 99 && column > 0)
      count ++;
    if(this.state.board[index-99] == 0 && row > 0 && column < 99)
      count ++;
    if(this.state.board[index-101] == 0 && column > 0 && row > 0)
      count ++;
    if(this.state.board[index+101] == 0 && column < 99 && row < 99)
      count ++;
    return count;
  }
  getRow(index) {
      return Math.floor(index/this.state.rows);
  }
  getColumn(index) {
      return index % this.state.columns;
  }
  getRand(min, max){
    return Math.floor(Math.random() * max + min);
  }
  renderBoard() {
    let renderedBoard = this.state.board.map((block, index) => {
        return this.renderBlock({value: block, index: index});
    });
    this.setState({renderedBoard: renderedBoard});
  }
  renderBlock(block) {
    return <Block value={block.value} key={block.index} index={block.index} walls={this.countWalls(block.index)} />;
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
