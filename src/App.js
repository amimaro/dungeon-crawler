import React, { Component } from 'react';
import './App.css';
import Board from './components/Board/Board';
import Listener from './components/Listener/Listener';
import { Button } from 'react-bootstrap';

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
            <a href="https://www.freecodecamp.org/challenges/build-a-roguelike-dungeon-crawler-game" target="_blank">
              React Roguelike Dungeon Crawler
            </a>
          </p>
          <p>by <a href="https://github.com/amimaro" target="_blank">amimaro</a></p>
        </header>
        <Listener></Listener>
        <div align="center" >
          <div className="camera" style={{ width: 'width: 100%', height: '500px' }}>
            <Board TOTAL_BLOCKS="10000" WIDTH="1000" HEIGHT="1000" BLOCK_SIZE="10"/>
          </div>
        </div>
        <div className="status">
          <h4 style={{color: 'black'}}>Level: 0</h4>
          <h4 style={{color: 'green'}}>HP: 100</h4>
          <h4 style={{color: 'black'}}>Weapon: stick</h4>
          <h4 style={{color: 'red'}}>Atack: 7</h4>
          <p><Button>Restart</Button></p>
          <p><Button>Toggle Darkness</Button></p>
        </div>
      </div>
    );
  }
}

export default App;
