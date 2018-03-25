import React, { Component } from 'react';
import './App.css';
import Board from './components/Board/Board';
import Listener from './components/Listener/Listener';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React Roguelike Dungeon Crawler</h1>
        </header>
        <Listener></Listener>
        <div align="center" >
          <div className="camera" style={{ width: 'width: 100%', height: '500px' }}>
            <Board TOTAL_BLOCKS="10000" WIDTH="1000" HEIGHT="1000" BLOCK_SIZE="10"/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
