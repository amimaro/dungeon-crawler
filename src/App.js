import React, { Component } from 'react';
import './App.css';
import Board from './components/Board/Board';
import Listener from './components/Listener/Listener';

class App extends Component {
  render() {
    return (
      <div className="App">
        <a href="https://github.com/amimaro/dungeon-crawler">
          <img style={{position: 'absolute', top: '0', right: '0', border: '0'}}
            src="https://s3.amazonaws.com/github/ribbons/forkme_right_white_ffffff.png" alt="Fork me on GitHub" />
        </a>
        <header className="App-header">
          <p>
            <a href="https://www.freecodecamp.org/challenges/build-a-roguelike-dungeon-crawler-game" target="_blank" rel="noopener noreferrer">
              React Roguelike Dungeon Crawler
            </a>
          </p>
          <p>by <a href="https://github.com/amimaro" target="_blank" rel="noopener noreferrer">amimaro</a></p>
        </header>
        <Listener></Listener>
        <center>
          <div className="camera" style={{ width: '100%', height: '500px' }}>
            <Board TOTAL_BLOCKS="10000" WIDTH="1000" HEIGHT="1000" BLOCK_SIZE="10"/>
          </div>
        </center>
      </div>
    );
  }
}

export default App;
