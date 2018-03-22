import React, { Component } from 'react';
import './App.css';

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

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
        board: Array(parseInt(this.props.TOTAL_BLOCKS)).fill(0),
        renderedBoard: []
    }
    this.renderBoard = this.renderBoard.bind(this);
    this.renderBoard = this.renderBoard.bind(this);
    this.generateDungeon = this.generateDungeon.bind(this);
    this.getRow = this.getRow.bind(this);
    this.getColumn = this.getColumn.bind(this);
  }
  componentWillMount() {
    this.generateDungeon();
  }
  componentDidMount() {
    this.renderBoard();
  }
  generateDungeon() {
    let border = 0;
    let rows = this.props.TOTAL_BLOCKS / this.props.WIDTH * this.props.BLOCK_SIZE;
    let columns = this.props.TOTAL_BLOCKS / this.props.HEIGHT * this.props.BLOCK_SIZE;
    while(border < 3) {
      let board = this.state.board.map((block, index) => {
        if(this.getRow(index) > rows/2 - 5 && this.getRow(index) < rows/2 + 5)
          if(this.getColumn(index) > columns/2 - 5 && this.getColumn(index) < columns/2 + 5)
            return 1;
        return 0;
      });
      this.setState({board: board});
      border = 4;
    }
  }
  getRow(index) {
      return Math.floor(index/100);
  }
  getColumn(index) {
      return index % 100;
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
