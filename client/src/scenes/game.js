// import io from 'socket.io-client'
import Card from '../helpers/card'
import Dealer from '../helpers/dealer'
import Zone from '../helpers/zone'
import Deck from '../helpers/deck'
const { Socket } = require('phoenix-channels')

export default class Game extends Phaser.Scene {
  constructor () {
    super({
      key: 'Game'
    })
  }

  preload () {
    //TODO: need to put the base path into an env variable
    //2
    this.load.image('2_clubs', 'src/static/cards/2_of_clubs.png')
    this.load.image('2_diamonds', 'src/static/cards/2_of_diamonds.png')
    this.load.image('2_hearts', 'src/static/cards/2_of_hearts.png')
    this.load.image('2_spades', 'src/static/cards/2_of_spades.png')

    //3
    this.load.image('3_clubs', 'src/static/cards/3_of_clubs.png')
    this.load.image('3_diamonds', 'src/static/cards/3_of_diamonds.png')
    this.load.image('3_hearts', 'src/static/cards/3_of_hearts.png')
    this.load.image('3_spades', 'src/static/cards/3_of_spades.png')

    //4
    this.load.image('4_clubs', 'src/static/cards/4_of_clubs.png')
    this.load.image('4_diamonds', 'src/static/cards/4_of_diamonds.png')
    this.load.image('4_hearts', 'src/static/cards/4_of_hearts.png')
    this.load.image('4_spades', 'src/static/cards/4_of_spades.png')

    //5
    this.load.image('5_clubs', 'src/static/cards/5_of_clubs.png')
    this.load.image('5_diamonds', 'src/static/cards/5_of_diamonds.png')
    this.load.image('5_hearts', 'src/static/cards/5_of_hearts.png')
    this.load.image('5_spades', 'src/static/cards/5_of_spades.png')

    //6
    this.load.image('6_clubs', 'src/static/cards/6_of_clubs.png')
    this.load.image('6_diamonds', 'src/static/cards/6_of_diamonds.png')
    this.load.image('6_hearts', 'src/static/cards/6_of_hearts.png')
    this.load.image('6_spades', 'src/static/cards/6_of_spades.png')

    //7
    this.load.image('7_clubs', 'src/static/cards/7_of_clubs.png')
    this.load.image('7_diamonds', 'src/static/cards/7_of_diamonds.png')
    this.load.image('7_hearts', 'src/static/cards/7_of_hearts.png')
    this.load.image('7_spades', 'src/static/cards/7_of_spades.png')

    //8
    this.load.image('8_clubs', 'src/static/cards/8_of_clubs.png')
    this.load.image('8_diamonds', 'src/static/cards/8_of_diamonds.png')
    this.load.image('8_hearts', 'src/static/cards/8_of_hearts.png')
    this.load.image('8_spades', 'src/static/cards/8_of_spades.png')

    //9
    this.load.image('9_clubs', 'src/static/cards/9_of_clubs.png')
    this.load.image('9_diamonds', 'src/static/cards/9_of_diamonds.png')
    this.load.image('9_hearts', 'src/static/cards/9_of_hearts.png')
    this.load.image('9_spades', 'src/static/cards/9_of_spades.png')

    //10
    this.load.image('10_clubs', 'src/static/cards/10_of_clubs.png')
    this.load.image('10_diamonds', 'src/static/cards/10_of_diamonds.png')
    this.load.image('10_hearts', 'src/static/cards/10_of_hearts.png')
    this.load.image('10_spades', 'src/static/cards/10_of_spades.png')

    //jack
    this.load.image('jack_clubs', 'src/static/cards/jack_of_clubs.png')
    this.load.image('jack_diamonds', 'src/static/cards/jack_of_diamonds.png')
    this.load.image('jack_hearts', 'src/static/cards/jack_of_hearts.png')
    this.load.image('jack_spades', 'src/static/cards/jack_of_spades.png')

    //queen
    this.load.image('queen_clubs', 'src/static/cards/queen_of_clubs.png')
    this.load.image('queen_diamonds', 'src/static/cards/queen_of_diamonds.png')
    this.load.image('queen_hearts', 'src/static/cards/queen_of_hearts.png')
    this.load.image('queen_spades', 'src/static/cards/queen_of_spades.png')

    //king
    this.load.image('king_clubs', 'src/static/cards/king_of_clubs.png')
    this.load.image('king_diamonds', 'src/static/cards/king_of_diamonds.png')
    this.load.image('king_hearts', 'src/static/cards/king_of_hearts.png')
    this.load.image('king_spades', 'src/static/cards/king_of_spades.png')

    //ace
    this.load.image('ace_clubs', 'src/static/cards/ace_of_clubs.png')
    this.load.image('ace_diamonds', 'src/static/cards/ace_of_diamonds.png')
    this.load.image('ace_hearts', 'src/static/cards/ace_of_hearts.png')
    this.load.image('ace_spades', 'src/static/cards/ace_of_spades.png')

    // TODO: load remaining cards here
    this.load.image('back', 'src/static/card_back.png')
  }

  create () {
    this.deck = new Deck()
    this.deck.shuffle()
    this.isPlayerA = false
    this.opponentCards = []

    this.zone = new Zone(this)
    this.dropZones = this.zone.renderZones()
    this.zone.renderBaseCards()

    this.dealer = new Dealer(this)

    let self = this

    // TODO: need to control this URL via env variable
    // this.socket = io('localhost:4000/socket')
    // this.socket.on('connect', function () {
    //   console.log('Connected!')
    // })

    this.socket = new Socket('ws:localhost:4000/socket')
    this.socket.connect()
    this.channel = this.socket.channel('moves', {})
    console.log('try to join')
    this.channel
      .join()
      .receive('ok', resp => {
        console.log('Joined successfully', resp)
      })
      .receive('error', resp => {
        console.log('Unable to join', resp)
      })

    console.log('channel: ', this.channel)

    this.channel.on('moves:isPlayerA', function () {
      self.isPlayerA = true
    })

    this.channel.on('moves:dealCards', function () {
      self.dealer.dealCards(self.deck)
      self.dealText.disableInteractive()
    })

    this.channel.on('moves:cardPlayed', function (val) {
      console.log('val yo: ', val)
      const { gameObject, isPlayerA, dropZone, card } = val
      console.log('dropzone: ', dropZone)
      //TODO: need improvements here
      if (isPlayerA !== self.isPlayerA) {
        let sprite = gameObject.textureKey
        let suit = sprite.split('_')[1]
        let number = sprite.split('_')[0]
        console.log('suit, number', suit, number)
        self.opponentCards.shift().destroy()
        self.dropZone.data.values.cards.push(card)
        console.log(
          'self.dropZone.data.values.cards: ',
          self.dropZone.data.values.cards
        )
        let card = new Card(self)
        card
          .render(
            self.dropZone.x - 350 + self.dropZone.data.values.cards.length * 50,
            self.dropZone.y,
            sprite
          )
          .disableInteractive()
      }
    })

    this.dealText = this.add
      .text(75, 350, ['DEAL CARDS'])
      .setFontSize(18)
      .setFontFamily('Trebuchet MS')
      .setColor('#00ffff')
      .setInteractive()

    this.dealText.on('pointerdown', function () {
      self.channel.push('moves:dealCards')
    })

    this.dealText.on('pointerover', function () {
      self.dealText.setColor('#ff69b4')
    })

    this.dealText.on('pointerout', function () {
      self.dealText.setColor('#00ffff')
    })

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX
      gameObject.y = dragY
    })

    this.input.on('dragstart', function (pointer, gameObject) {
      gameObject.setTint(0xff69b4)
      self.children.bringToTop(gameObject)
    })

    this.input.on('dragend', function (pointer, gameObject, dropped) {
      gameObject.setTint()
      if (!dropped) {
        gameObject.x = gameObject.input.dragStartX
        gameObject.y = gameObject.input.dragStartY
      }
    })

    this.input.on('drop', function (pointer, gameObject, dropZone) {
      let sprite = gameObject.texture.key
      let suit = sprite.split('_')[1]
      let number = sprite.split('_')[0]

      const dropZoneSuit = dropZone.data.values.suit

      //only drop if correct suit
      if (dropZoneSuit == suit) {
        dropZone.data.values.cards.push(sprite)
        gameObject.x = dropZone.x + 0
        gameObject.y = dropZone.y + 350 + dropZone.data.values.cards.length * 30
        gameObject.disableInteractive()
        self.channel.push('moves:cardPlayed', {
          obj: gameObject,
          isPlayerA: self.isPlayerA,
          dropZone: dropZone,
          sprite: sprite
        })
      }
    })
  }

  update () {}
}
