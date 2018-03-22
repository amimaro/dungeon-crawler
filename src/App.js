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
        board: Array(15000).fill(0),
        renderedBoard: []
    }
    this.renderBoard = this.renderBoard.bind(this);
    this.renderBlock = this.renderBlock.bind(this);
  }
  componentWillMount() {
    this.renderBoard();
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
        <div className="board">
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
            <Board />
        </div>
      </div>
    );
  }
}

export default App;
