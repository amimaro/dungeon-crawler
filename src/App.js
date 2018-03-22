import React, { Component } from 'react';
import './App.css';
import Board from './components/Board/Board';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React Roguelike Dungeon Crawler</h1>
        </header>
        <div align="centerRemoved" >
          <div className="cameraRemoved" style={{ width: '500px', height: '500px' }}>
            <Board TOTAL_BLOCKS="10000" WIDTH="1000" HEIGHT="1000" BLOCK_SIZE="10"/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
