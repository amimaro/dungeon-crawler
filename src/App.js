import React, { Component } from 'react';
import './App.css';
import Block from './components/Block/Block';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
        board: Array(parseInt(this.props.TOTAL_BLOCKS)).fill(0),
        renderedBoard: [],
        rows: this.props.TOTAL_BLOCKS / this.props.WIDTH * this.props.BLOCK_SIZE,
        columns: this.props.TOTAL_BLOCKS / this.props.HEIGHT * this.props.BLOCK_SIZE
    }
    this.renderBoard = this.renderBoard.bind(this);
    this.renderBoard = this.renderBoard.bind(this);
    this.generateDungeon = this.generateDungeon.bind(this);
    this.getRow = this.getRow.bind(this);
    this.getColumn = this.getColumn.bind(this);
    this.createRect = this.createRect.bind(this);
  }
  componentWillMount() {
    this.generateDungeon();
  }
  componentDidMount() {
    this.renderBoard();
  }
  generateDungeon() {
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

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React Roguelike Dungeon Crawler</h1>
        </header>
        <div align="center" >
          <div className="camera" style={{ width: '500px', height: '500px' }}>
            <Board TOTAL_BLOCKS="10000" WIDTH="1000" HEIGHT="1000" BLOCK_SIZE="10"/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
