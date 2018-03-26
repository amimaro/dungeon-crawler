import React, {Component} from 'react';
import './Board.css';
import Block from '../Block/Block';
import {Button} from 'react-bootstrap';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderedBoard: [],
      board: Array(parseInt(this.props.TOTAL_BLOCKS, 10)).fill(0),
      rows: this.props.TOTAL_BLOCKS / this.props.WIDTH * this.props.BLOCK_SIZE,
      columns: this.props.TOTAL_BLOCKS / this.props.HEIGHT * this.props.BLOCK_SIZE,
    }
    this.getRow = this.getRow.bind(this);
    this.getColumn = this.getColumn.bind(this);
    this.countWalls = this.countWalls.bind(this);
    this.getRand = this.getRand.bind(this);
    this.generateDungeons = this.generateDungeons.bind(this);
    this.renderBoard = this.renderBoard.bind(this);
    this.createRect = this.createRect.bind(this);
    this.createRandomPath = this.createRandomPath.bind(this);
    this.createElements = this.createElements.bind(this);
  }
  componentWillMount() {
    this.generateDungeons();
  }
  generateDungeons() {
    let board = Array(parseInt(this.props.TOTAL_BLOCKS, 10)).fill(0);

    for (let i = 5; i < 99; i += 20) {
      board = this.createRandomPath(board, i, 'horizontal');
      board = this.createRandomPath(board, i, 'vertical');
      for (let j = 5; j < 99; j += 20) {
        board = this.createRect(board, i - this.getRand(1, 4), j - this.getRand(1, 4), i + this.getRand(5, 9), j + this.getRand(5, 9));
      }
    }

    // Enemies
    board = this.createElements(board, [
      0.01, 0.02, 0.03, 0.03, 0.03
    ], [14, 13, 12, 11, 10]);
    // Heals
    board = this.createElements(board, [
      0.01, 0.01, 0.01, 0.01, 0.01
    ], [24, 23, 22, 21, 20]);
    // Weapons
    board = this.createElements(board, [
      0.01, 0.01, 0.01, 0.01, 0.01
    ], [34, 33, 32, 31, 30]);
    // Boss
    board = this.createElements(board, [
      0.01, 0, 0, 0, 0
    ], [
      15, 15, 15, 15, 15
    ], 1);
    // Player
    board = this.createElements(board, [
      0, 0, 0, 0, 0.01
    ], [
      40, 40, 40, 40, 40
    ], 1);

    this.renderBoard(board);
  }
  createRect(board, x0, y0, x1, y1) {
    return board.map((block, index) => {
      if (this.getRow(index) >= x0 && this.getRow(index) <= x1 && this.getColumn(index) >= y0 && this.getColumn(index) <= y1 && board[index] === 0) {
        return 1;
      } else if (board[index] === 1) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  createRandomPath(board, pivot, direction) {
    let turn = false; // false - turn left; true - turn right
    let position = 0;
    for (let i = 10; i < 90; i++) { // offset borders
      if (direction === 'horizontal')
        position = i + 100 * pivot;
      else if (direction === 'vertical')
        position = pivot + 100 * i;
      board[position] = 1;
      if (this.getRand(0, 10) > 8) { // 20% chance to turn to a direction
        for (let j = 0; j < this.getRand(3, 5); j++) { // walk up and down
          turn === true
            ? pivot++
            : pivot--;
          if (direction === 'horizontal') {
            position = i + 100 * pivot;
            if (this.getRow(position) === 0)
              pivot++;
            position = i + 100 * pivot;
          } else if (direction === 'vertical') {
            position = pivot + 100 * i;
            if (this.getColumn(position) === 0)
              pivot++;
            position = pivot + 100 * i;
          }
          board[position] = 1;
        }
        turn = !turn; // toggle direction
      }
    }
    return board;
  }
  createElements(board, chance = [
    0.1, 0.1, 0.1, 0.1, 0.1
  ], element = [
    0, 0, 0, 0, 0
  ], quantity = -1) {
    let count = 0;
    return board.map((block, index) => {
      let row = this.getRow(index);
      if (quantity === count) {
        return board[index];
      }
      if (row < 20) {
        if (board[index] === 1 && Math.random() <= chance[0]) {
          if (quantity > 0)
            count++;
          return element[0];
        }
      } else if (row >= 20 && row < 40) {
        if (board[index] === 1 && Math.random() <= chance[1]) {
          if (quantity > 0)
            count++;
          return element[1];
        }
      } else if (row >= 40 && row < 60) {
        if (board[index] === 1 && Math.random() <= chance[2]) {
          if (quantity > 0)
            count++;
          return element[2];
        }
      } else if (row >= 60 && row < 80) {
        if (board[index] === 1 && Math.random() <= chance[3]) {
          if (quantity > 0)
            count++;
          return element[3];
        }
      } else if (row >= 80) {
        if (board[index] === 1 && Math.random() <= chance[4]) {
          if (quantity > 0)
            count++;
          return element[4];
        }
      }
      return board[index];
    });
  }
  countWalls(board, index) {
    let count = 0;
    let row = this.getRow(index),
      column = this.getColumn(index);
    if (board[index + 1] === 0 && column < 99)
      count++;
    if (board[index - 1] === 0 && column > 0)
      count++;
    if (board[index - 100] === 0 && row > 0)
      count++;
    if (board[index + 100] === 0 && row < 99)
      count++;
    if (board[index + 99] === 0 && row < 99 && column > 0)
      count++;
    if (board[index - 99] === 0 && row > 0 && column < 99)
      count++;
    if (board[index - 101] === 0 && column > 0 && row > 0)
      count++;
    if (board[index + 101] === 0 && column < 99 && row < 99)
      count++;
    return count;
  }
  getRow(index) {
    return Math.floor(index / this.state.rows);
  }
  getColumn(index) {
    return index % this.state.columns;
  }
  getRand(min, max) {
    return Math.floor(Math.random() * max + min);
  }
  renderBlock(block) {
    return <Block value={block.value} key={block.index} index={block.index} walls={this.countWalls(this.state.board, block.index)}/>;
  }
  renderBoard(board) {
    let renderedBoard = board.map((block, index) => {
      return this.renderBlock({value: block, index: index});
    });
    this.setState({board: board, renderedBoard: renderedBoard});
  }
  render() {
    return (<div>
      <div className="board" style={{
          width: this.props.WIDTH + 'px',
          height: this.props.HEIGHT + 'px'
        }} onKeyDown={this.handleKeyPress}>
        {this.state.renderedBoard}
      </div>
      <div className="status">
        <h4 style={{
            color: 'black'
          }}>Level: 0</h4>
        <h4 style={{
            color: 'green'
          }}>HP: 100</h4>
        <h4 style={{
            color: 'black'
          }}>Weapon: stick</h4>
        <h4 style={{
            color: 'red'
          }}>Atack: 7</h4>    
        <p>
          <Button id="toggle-darkness">Toggle Darkness</Button>
        </p>
      </div>
    </div>);
  }
}

export default Board;
