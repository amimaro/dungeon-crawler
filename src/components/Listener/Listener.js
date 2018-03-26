import React, {Component} from 'react';

class Listener extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: Array(40).fill('black'),
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

    this.state.storage = {
      player: {
        level: 1,
        xp: 0,
        hp: 100,
        atack: 20,
      },
      enemies: []
    };
  }
  componentWillMount() {
    let blocks = this.state.blocks;

    blocks[0] = 'LIGHTGRAY';
    blocks[1] = 'WHITE';
    blocks[2] = 'BLACK';

    // Enemies
    blocks[10] = 'LIGHTCORAL';
    blocks[11] = 'RED';
    blocks[12] = 'CRIMSON';
    blocks[13] = 'FIREBRICK';
    blocks[14] = 'DARKRED';
    blocks[15] = 'INDIGO'; // Boss

    // Heals
    blocks[20] = 'PALEGREEN';
    blocks[21] = 'MEDIUMSPRINGGREEN';
    blocks[22] = 'MEDIUMSEAGREEN';
    blocks[23] = 'FORESTGREEN';
    blocks[24] = 'DARKGREEN';

    // Weapons
    blocks[30] = 'GRAY';
    blocks[31] = 'DIMGRAY';
    blocks[32] = 'LIGHTSLATEGRAY';
    blocks[33] = 'SLATEGRAY';
    blocks[34] = 'DARKSLATEGRAY';

    // Player
    blocks[40] = 'LIGHTSKYBLUE';
    blocks[41] = 'DEEPSKYBLUE';
    blocks[42] = 'DODGERBLUE';
    blocks[43] = 'ROYALBLUE';
    blocks[44] = 'MIDNIGHTBLUE';

    document.addEventListener("keydown", this.handleKeyPress, false);
    this.setState({blocks: blocks, value: this.props.value})
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
    }
    if (step != 0) {
      let player = this.getPlayer();
      if(player != null){
        let playerId = this.getId(player);
        let nextElement = this.getElementById(playerId + step);
        let nextValue = this.getValue(nextElement);
        if(nextValue == 0) { // if wall
          console.log('wall');
        } else if (nextValue == 1) { // if path
          console.log('path');
          this.move(player, nextElement);
        } else if(nextValue >= 20 && nextValue <= 24) { // if heal
          this.heal(1 + nextValue - 20);
          this.move(player, nextElement);
        } else if(nextValue >= 30 && nextValue <= 34) { // if powerup
          this.powerup(1 + nextValue - 30);
          this.move(player, nextElement);
        } else if(nextValue >= 10 && nextValue <= 15) { // if enemy
          this.enemy(player, nextElement);
        }
      } else {
        console.log('GAME OVER');
      }
    }
  }
  move(origin, destination) {
    this.setValue(origin, 1);
    this.setValue(destination, this.state.storage.player.level + 39);
    this.scrollTo(destination);
    if(this.state.isDark)
      this.setDarkness(destination);
    console.log('move from: ', this.getId(origin), ' to: ', this.getId(destination));
  }
  heal(healId) {
    console.log('heal');
    let gameStatus = this.state.storage;
    gameStatus.player.hp += healId;
    this.setState({storage: gameStatus}, this.updateGameStatus());
  }
  powerup(powerId) {
    console.log('powerUp');
    let gameStatus = this.state.storage;
    gameStatus.player.atack += powerId;
    this.setState({storage: gameStatus}, this.updateGameStatus());
  }
  enemy(player, enemy) {
    console.log('enemy: ' + this.getValue(enemy))
    let playerStatus = this.state.storage.player;
    let enemies = this.state.storage.enemies;
    let enemyObj = enemies.find(o => o.id === this.getId(enemy));
    if(enemyObj == undefined){
      enemyObj = {id: this.getId(enemy), level: this.getValue(enemy), hp:  this.getValue(enemy) * 10};
      enemies.push(enemyObj);
    } else {
      console.log('enemy already listed');
    }
    enemies.map((element) => {
      if(element.id == this.getId(enemy)){
        element.hp -= playerStatus.atack;
        playerStatus.hp -= element.level;
        if(playerStatus.hp <= 0) { // player dies
          console.log('game over');
          this.setValue(player, 1);
        } else if(element.hp <= 0) { // enemy dies
          console.log('enemy killed');
          this.setValue(enemy, 1);
          this.move(player, enemy);
          enemies.filter((element2) => {
            if(element2.id == element.id){
              return false;
            }
            return true;
          });
        }
        console.log('atack ', 'playerHP: ', playerStatus.hp, ' enemyHP: ', element.hp);
      }
      return element;
    });

    let gameState = this.state.storage;
    gameState.enemies = enemies;
    gameState.player = playerStatus;
    this.setState({storage: gameState}, this.updateGameStatus());
    // this.setValue(origin, 1);
    // this.setValue(destination, this.state.storage.player.level + 39);
    // this.scrollTo(destination);
    // if(this.state.isDark)
    //   this.setDarkness(destination);
  }
  getPlayer() {
    return document.querySelector('[value="40"]')
  }
  getId(element) {
    return parseInt(element.getAttribute('id'));
  }
  getElementById(id) {
    return document.getElementById(id);
  }
  getValue(element) {
    return parseInt(element.getAttribute('value'));
  }
  setValue(element, value) {
    element.setAttribute('value', value);
    element.style.backgroundColor = this.state.blocks[value];
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
    let blockId = parseInt(block.getAttribute('id'));
    let playerId = parseInt(player.getAttribute('id'));
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
      if (playerId == blockId)
        return true;
      if ((playerId + position) == blockId || (playerId - position) == blockId) {
        return true;
      }
      if ((playerId + position * 100) == blockId || (playerId - position * 100) == blockId) {
        return true;
      }
      for (let position2 of map) {
        if (position <= (11 - position2)) {
          let val1 = playerId + position + 100 * position2;
          let val2 = playerId - position + 100 * position2;
          let val3 = playerId - position - 100 * position2;
          let val4 = playerId + position - 100 * position2;
          if (val1 == blockId || val2 == blockId || val3 == blockId || val4 == blockId) {
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
        element.style.backgroundColor = this.state.blocks[this.getValue(element)];
      else
        element.style.backgroundColor = this.state.blocks[2];
      return element;
    });
    this.setState({isDark: true});
  }
  unsetDarkness() {
    console.log('unset darkness');
    Array.from(document.getElementsByClassName('board-element')).map((element) => {
      element.style.backgroundColor = this.state.blocks[this.getValue(element)];
      return element;
    });
    this.setState({isDark: false});
  }
  updateGameStatus() {
    console.log('update game status');
    let gameStatus = this.state.storage;
    console.log(gameStatus);
    this.getElementById('dc-level').innerHTML = gameStatus.player.level;
    if(gameStatus.player.hp <= 0)
      this.getElementById('dc-hp').innerHTML = 'Game Over. Please, press F5 to start a new game';
    else
      this.getElementById('dc-hp').innerHTML = gameStatus.player.hp;
    this.getElementById('dc-atack').innerHTML = gameStatus.player.atack;
  }
  render() {
    return (<div></div>);
  }
}

export default Listener;
