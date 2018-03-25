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
          <h1 className="App-title">React Roguelike Dungeon Crawler</h1>
          <p>by <a href="https://github.com/amimaro" target="_blank">amimaro</a></p>
        </header>
        <Listener></Listener>
        <div align="center" >
          <div className="camera" style={{ width: 'width: 100%', height: '500px' }}>
            <Board TOTAL_BLOCKS="10000" WIDTH="1000" HEIGHT="1000" BLOCK_SIZE="10"/>
          </div>
        </div>
        <footer className="App-footer">
          <p>
            <strong>
              <a href="https://github.com/amimaro/dungeon-crawler">
                dungeon-crawler
              </a>
            </strong>. The source code is licensed MIT.
          </p>
        </footer>
      </div>
    );
  }
}

export default App;
