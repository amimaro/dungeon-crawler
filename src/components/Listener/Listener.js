import React, {Component} from 'react';

import Contents from '../Contents/Contents';

class Listener extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDark: true
    }

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.move = this.move.bind(this);
    this.setValue = this.setValue.bind(this);
    this.getPlayer = this.getPlayer.bind(this);
    this.getId = this.getId.bind(this);
    this.getValue = this.getValue.bind(this);
    this.getElementById = this.getElementById.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
    this.isPlayerView = this.isPlayerView.bind(this);
    this.setDarkness = this.setDarkness.bind(this);
    this.unsetDarkness = this.unsetDarkness.bind(this);
    this.toggleDarkness = this.toggleDarkness.bind(this);
    this.updateGameStatus = this.updateGameStatus.bind(this);
    this.heal = this.heal.bind(this);
    this.powerup = this.powerup.bind(this);
    this.enemy = this.enemy.bind(this);
    this.gameover = this.gameover.bind(this);
    this.displayEvent = this.displayEvent.bind(this);

    this.state.storage = {
      player: {
        level: 1,
        xp: 0,
        hp: 100,
        atack: 5
      },
      enemies: []
    };
  }
  componentWillMount() {
    this.blocks = new Contents().getBlocks();

    document.addEventListener("keydown", this.handleKeyPress, false);
    this.setState({value: this.props.value})
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress, false);
    document.getElementById('toggle-darkness').removeEventListener("click", this.handleKeyPress, false);
  }
  componentDidMount() {
    document.getElementById('toggle-darkness').addEventListener("click", this.toggleDarkness, false);
    this.setDarkness();
    this.updateGameStatus();
    this.scrollTo(this.getPlayer());
  }
  handleKeyPress = (event) => {
    let step = 0;
    switch (event.keyCode) {
      case 37:
        console.log('left pressed');
        step = -1;
        break;
      case 38:
        console.log('up pressed');
        step = -100;
        break;
      case 39:
        console.log('right pressed');
        step = 1;
        break;
      case 40:
        console.log('down pressed');
        step = 100;
        break;
      default:
        break;
    }
    if (step !== 0) {
      let player = this.getPlayer();
      let playerId = this.getId(player);
      let nextElement = this.getElementById(playerId + step);
      let nextValue = this.getValue(nextElement);
      if (nextValue === 0) { // if wall
        console.log('wall');
      } else if (nextValue === 1) { // if path
        console.log('path');
        this.move(player, nextElement);
      } else if (nextValue >= 20 && nextValue <= 24) { // if heal
        this.heal(1 + nextValue - 20);
        this.move(player, nextElement);
      } else if (nextValue >= 30 && nextValue <= 34) { // if powerup
        this.powerup(1 + nextValue - 30);
        this.move(player, nextElement);
      } else if (nextValue >= 10 && nextValue <= 15) { // if enemy
        this.enemy(player, nextElement);
      }
    } else {
      console.log('GAME OVER');
    }
  }
  move(origin, destination) {
    this.setValue(origin, 1);
    this.setValue(destination, this.state.storage.player.level + 39);
    this.scrollTo(destination);
    if (this.state.isDark)
      this.setDarkness(destination);
    console.log('move from: ', this.getId(origin), ' to: ', this.getId(destination));
  }
  heal(healId) {
    console.log('heal');
    let gameStatus = this.state.storage;
    gameStatus.player.hp += (5 * healId);
    this.displayEvent('+' + (
    5 * healId) + ' heal');
    this.setState({
      storage: gameStatus
    }, this.updateGameStatus());
  }
  powerup(powerId) {
    console.log('powerUp');
    let gameStatus = this.state.storage;
    gameStatus.player.atack += powerId;
    this.displayEvent('+' + (
    powerId) + ' atack');
    this.setState({
      storage: gameStatus
    }, this.updateGameStatus());
  }
  enemy(player, enemy) {
    console.log('enemy: ' + this.getValue(enemy))
    let playerStatus = this.state.storage.player;
    let enemies = this.state.storage.enemies;
    let enemyObj = enemies.find(o => o.id === this.getId(enemy));
    if (enemyObj === undefined) {
      enemyObj = {
        id: this.getId(enemy),
        level: this.getValue(enemy) - 9,
        hp: 2 ** (this.getValue(enemy) - 7),
        atack: 2 ** (this.getValue(enemy) - 8)
      };
      enemies.push(enemyObj);
    } else {
      console.log('enemy already listed');
    }
    enemies.map((element) => {
      if (element.id === this.getId(enemy)) {
        element.hp -= playerStatus.atack;
        playerStatus.hp -= element.atack;
        if (playerStatus.hp <= 0) { // player dies
          console.log('GAME OVER');
          this.setValue(player, 1);
          document.removeEventListener("keydown", this.handleKeyPress, false);
          this.gameover('Game Over');
        } else if (element.hp <= 0) { // enemy dies
          console.log('enemy killed');
          if (this.getValue(enemy) === 15) {
            console.log('BOSS KILLED');
            document.removeEventListener("keydown", this.handleKeyPress, false);
            this.gameover('Congratulations!');
          }
          this.setValue(enemy, 1);
          playerStatus.xp += 2 ** element.level + 2;
          this.displayEvent('+' + (
          2 ** element.level + 2) + ' XP');

          if (playerStatus.xp >= 50 && playerStatus.level == 1) {
            playerStatus.level = 2;
            playerStatus.hp += 20;
            playerStatus.atack += 5;
            this.setValue(player, 41);
            this.displayEvent('Level up!!');
          } else if (playerStatus.xp >= 100 && playerStatus.level == 2) {
            playerStatus.level = 3;
            playerStatus.hp += 20;
            playerStatus.atack += 5;
            this.setValue(player, 42);
            this.displayEvent('Level up!!');
          } else if (playerStatus.xp >= 150 && playerStatus.level == 3) {
            playerStatus.level = 4;
            playerStatus.hp += 20;
            playerStatus.atack += 5;
            this.setValue(player, 43);
            this.displayEvent('Level up!!');
          } else if (playerStatus.xp >= 200 && playerStatus.level == 4) {
            playerStatus.level = 5;
            playerStatus.hp += 20;
            playerStatus.atack += 5;
            this.setValue(player, 44);
            this.displayEvent('Level up!!');
          } else if (playerStatus.xp >= 250 && playerStatus.level == 5) {
            playerStatus.xp -= 50;
            playerStatus.level = 5;
            playerStatus.hp += 20;
            playerStatus.atack += 5;
            this.setValue(player, 44);
            this.displayEvent('Level up!!');
          }

          console.log(playerStatus.level, playerStatus.xp, element.level);
          this.move(player, enemy);
        } else {
          this.displayEvent('enemy hp ' + element.hp);
        }
        console.log('atack ', 'playerHP: ', playerStatus.hp, ' enemyHP: ', element.hp);
      }
      return element;
    });

    let gameState = this.state.storage;
    gameState.enemies = enemies;
    gameState.player = playerStatus;
    this.setState({
      storage: gameState
    }, this.updateGameStatus());
  }
  getPlayer() {
    for(let level of [40,41,42,43,44]) {
      let player = document.querySelector(`[value="${level}"]`);
      if(player != null)
        return player;
    }
    return null;
  }
  getId(element) {
    return parseInt(element.getAttribute('id'), 10);
  }
  getElementById(id) {
    return document.getElementById(id);
  }
  getValue(element) {
    return parseInt(element.getAttribute('value'), 10);
  }
  setValue(element, value) {
    element.setAttribute('value', value);
    element.style.backgroundColor = this.blocks[value];
  }
  scrollTo(element) {
    let elementId = this.getId(element);
    let offset = 2500;
    let view = elementId;
    if (elementId <= 7500)
      view = elementId - offset;
    if (view <= 0)
      view = 0;
    this.getElementById(view).scrollIntoView();
  }
  isPlayerView(player, block) {
    let blockId = parseInt(block.getAttribute('id'), 10);
    let playerId = parseInt(player.getAttribute('id'), 10);
    let map = [
      1,
      2,
      3,
      4,
      5,
      6,
      7
    ];
    for (let position of map) {
      if (playerId === blockId)
        return true;
      if ((playerId + position) === blockId || (playerId - position) === blockId) {
        return true;
      }
      if ((playerId + position * 100) === blockId || (playerId - position * 100) === blockId) {
        return true;
      }
      for (let position2 of map) {
        if (position <= (11 - position2)) {
          let val1 = playerId + position + 100 * position2;
          let val2 = playerId - position + 100 * position2;
          let val3 = playerId - position - 100 * position2;
          let val4 = playerId + position - 100 * position2;
          if (val1 === blockId || val2 === blockId || val3 === blockId || val4 === blockId) {
            return true;
          }
        }
      }
    }
    return false;
  }
  toggleDarkness() {
    if (this.state.isDark) {
      this.unsetDarkness();
    } else {
      this.setDarkness();
    }
  }
  setDarkness() {
    console.log('set darkness');
    let player = this.getPlayer();
    Array.from(document.getElementsByClassName('board-element')).map((element) => {
      if (this.isPlayerView(player, element))
        element.style.backgroundColor = this.blocks[this.getValue(element)];
      else
        element.style.backgroundColor = this.blocks[2];
      return element;
    });
    this.setState({isDark: true});
  }
  unsetDarkness() {
    console.log('unset darkness');
    Array.from(document.getElementsByClassName('board-element')).map((element) => {
      element.style.backgroundColor = this.blocks[this.getValue(element)];
      return element;
    });
    this.setState({isDark: false});
  }
  updateGameStatus() {
    console.log('update game status');
    let gameStatus = this.state.storage;
    console.log(gameStatus);
    this.getElementById('dc-level').innerHTML = gameStatus.player.level;
    this.getElementById('dc-hp').innerHTML = gameStatus.player.hp;
    this.getElementById('dc-atack').innerHTML = gameStatus.player.atack;
    this.getElementById('dc-xp').innerHTML = 50 * gameStatus.player.level - gameStatus.player.xp;
  }
  gameover(msg) {
    this.getElementById('panel-msg').innerHTML = msg;
    this.getElementById('panel-display').style.display = 'block';
  }
  displayEvent(event) {
    this.getElementById('dc-event').innerHTML = event;
  }
  render() {
    return (<div></div>);
  }
}

export default Listener;
