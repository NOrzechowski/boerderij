import Phaser from 'phaser'
import Game from './scenes/game'

const config = {
  type: Phaser.WEBGL,
  parent: 'boerderij',
  width: 2000,
  height: 780,
  scene: [Game]
}

const game = new Phaser.Game(config)
