import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Block extends Component {
  constructor(props) {
    super(props);
    this.state = {
        block: ['red', 'blue']
    }
  }
  render() {
    return (
      <span style={{ backgroundColor: this.state.block[this.props.value] }}>&nbsp;&nbsp;</span>
    );
  }
}

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
        board: Array(15000).fill(0)
    }
    this.renderBoard = this.renderBoard.bind(this);
    this.renderBlock = this.renderBlock.bind(this);
  }
  renderBoard() {
    let rows = [];
    this.state.board.map((block, index) => {
      if(index === 10)
        rows.push(this.renderBlock(1));
      else if(index % 200 === 0)
        rows.push(<br/>);
      else
        rows.push(this.renderBlock(block));
    })
    return rows;
  }
  renderBlock(code) {
    return <Block value={code} />;
  }
  render() {
    return (
      <div className="board">
        {this.renderBoard()}
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
        <Map />
      </div>
    );
  }
}

export default App;
