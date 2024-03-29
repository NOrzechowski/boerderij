import Card from '../classes/card'
import Dealer from '../classes/dealer'
import PlayableArea from '../classes/playableArea'
import Deck from '../classes/deck'
const { Socket } = require('phoenix-channels')

export default class Game extends Phaser.Scene {
  constructor () {
    super({
      key: 'Game'
    })
  }

  create () {
    let self = this
    this.deck = new Deck()
    this.deck.shuffle()

    this.playableArea = new PlayableArea(this)
    this.playableArea.renderZones()
    this.playableArea.renderBaseCards()

    this.dealer = new Dealer(this)

    const socketUrl = new URL('/socket', window.location.href)
    socketUrl.protocol = socketUrl.protocol.replace('http', 'ws')
    this.socket = new Socket(socketUrl)
    this.socket.connect()

    this.channel = this.socket.channel('moves', {
      // TODO: will use user id from db later
      userId: Math.floor(Math.random() * 100) + 1,
      currentTokens: 100
    })

    this.channel
      .join()
      .receive('ok', resp => {
        console.log('Joined successfully', resp)
      })
      .receive('error', resp => {
        console.log('Unable to join', resp)
      })

    this.channel.on('moves:dealCards', function () {
      self.dealer.dealCards(self.deck)
      self.dealText.disableInteractive()
    })

    this.channel.on('moves:cardPlayed', function (val) {
      const { userId, dropZone: playedDropZone, sprite } = val
      if (userId != self.channel.params.userId) {
        const suit = sprite.split('_')[1]
        const number = sprite.split('_')[0]
        const dropZone = self.playableArea.getDropZoneBySuit(
          suit,
          playedDropZone.data.values.isAscending
        )
        dropZone.data.values.cards.push(sprite)
        dropZone.data.values.updateCurrent(suit, number)

        if (number == 7) {
          const otherDropZone = self.playableArea.getDropZoneBySuit(
            suit,
            !playedDropZone.data.values.isAscending
          )
          otherDropZone.data.values.updateCurrent(suit, number)
        }

        // TODO: in addition to ^, also update current low/high

        const adjustment = dropZone.data.values.isAscending == true ? 1 : -1
        let renderedCard = new Card(self)
        renderedCard
          .render(
            dropZone.x,
            dropZone.y +
              (350 + dropZone.data.values.cards.length * 30 * adjustment),
            sprite
          )
          .disableInteractive()
      }
    })

    this.dealText = this.add
      .text(75, 150, ['DEAL CARDS'])
      .setFontSize(18)
      .setFontFamily('Trebuchet MS')
      .setColor('#ffffff')
      .setInteractive()

    this.dealText.on('pointerdown', function () {
      self.channel.push('moves:dealCards')
    })

    this.dealText.on('pointerover', function () {
      self.dealText.setColor('#84cc16')
    })

    this.dealText.on('pointerout', function () {
      self.dealText.setColor('#ffffff')
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

    /** TODO: needs logic to test if correct card # as well as suit */
    this.input.on('drop', function (pointer, gameObject, dropZone) {
      console.log('dropped: ', dropZone.data.list)
      let sprite = gameObject.texture.key
      let suit = sprite.split('_')[1]
      let number = sprite.split('_')[0]
      const isPlayable = dropZone.data.values.isPlayableCard(suit, number)
      console.log('is playable??: ', isPlayable)
      if (isPlayable) {
        dropZone.data.values.cards.push(sprite)
        dropZone.data.values.updateCurrent(suit, number)
        if (number == 7) {
          //TODO: refactor this out
          const otherDropZone = self.playableArea.getDropZoneBySuit(
            suit,
            !dropZone.data.values.isAscending
          )
          otherDropZone.data.values.updateCurrent(suit, number)
        }

        const adjustment = dropZone.data.values.isAscending == true ? 1 : -1

        gameObject.x = dropZone.x + 0
        gameObject.y =
          dropZone.y +
          (350 + dropZone.data.values.cards.length * 30 * adjustment)
        gameObject.disableInteractive()
        self.channel.push('moves:cardPlayed', {
          userId: self.channel.params.userId,
          dropZone: dropZone,
          sprite: sprite
        })
      }
    })
  }

  preload () {
    //2
    this.load.image('2_clubs', 'images/cards/2_of_clubs.png')
    this.load.image('2_diamonds', 'images/cards/2_of_diamonds.png')
    this.load.image('2_hearts', 'images/cards/2_of_hearts.png')
    this.load.image('2_spades', 'images/cards/2_of_spades.png')

    //3
    this.load.image('3_clubs', 'images/cards/3_of_clubs.png')
    this.load.image('3_diamonds', 'images/cards/3_of_diamonds.png')
    this.load.image('3_hearts', 'images/cards/3_of_hearts.png')
    this.load.image('3_spades', 'images/cards/3_of_spades.png')

    //4
    this.load.image('4_clubs', 'images/cards/4_of_clubs.png')
    this.load.image('4_diamonds', 'images/cards/4_of_diamonds.png')
    this.load.image('4_hearts', 'images/cards/4_of_hearts.png')
    this.load.image('4_spades', 'images/cards/4_of_spades.png')

    //5
    this.load.image('5_clubs', 'images/cards/5_of_clubs.png')
    this.load.image('5_diamonds', 'images/cards/5_of_diamonds.png')
    this.load.image('5_hearts', 'images/cards/5_of_hearts.png')
    this.load.image('5_spades', 'images/cards/5_of_spades.png')

    //6
    this.load.image('6_clubs', 'images/cards/6_of_clubs.png')
    this.load.image('6_diamonds', 'images/cards/6_of_diamonds.png')
    this.load.image('6_hearts', 'images/cards/6_of_hearts.png')
    this.load.image('6_spades', 'images/cards/6_of_spades.png')

    //7
    this.load.image('7_clubs', 'images/cards/7_of_clubs.png')
    this.load.image('7_diamonds', 'images/cards/7_of_diamonds.png')
    this.load.image('7_hearts', 'images/cards/7_of_hearts.png')
    this.load.image('7_spades', 'images/cards/7_of_spades.png')

    //8
    this.load.image('8_clubs', 'images/cards/8_of_clubs.png')
    this.load.image('8_diamonds', 'images/cards/8_of_diamonds.png')
    this.load.image('8_hearts', 'images/cards/8_of_hearts.png')
    this.load.image('8_spades', 'images/cards/8_of_spades.png')

    //9
    this.load.image('9_clubs', 'images/cards/9_of_clubs.png')
    this.load.image('9_diamonds', 'images/cards/9_of_diamonds.png')
    this.load.image('9_hearts', 'images/cards/9_of_hearts.png')
    this.load.image('9_spades', 'images/cards/9_of_spades.png')

    //10
    this.load.image('10_clubs', 'images/cards/10_of_clubs.png')
    this.load.image('10_diamonds', 'images/cards/10_of_diamonds.png')
    this.load.image('10_hearts', 'images/cards/10_of_hearts.png')
    this.load.image('10_spades', 'images/cards/10_of_spades.png')

    //jack
    this.load.image('jack_clubs', 'images/cards/jack_of_clubs.png')
    this.load.image('jack_diamonds', 'images/cards/jack_of_diamonds.png')
    this.load.image('jack_hearts', 'images/cards/jack_of_hearts.png')
    this.load.image('jack_spades', 'images/cards/jack_of_spades.png')

    //queen
    this.load.image('queen_clubs', 'images/cards/queen_of_clubs.png')
    this.load.image('queen_diamonds', 'images/cards/queen_of_diamonds.png')
    this.load.image('queen_hearts', 'images/cards/queen_of_hearts.png')
    this.load.image('queen_spades', 'images/cards/queen_of_spades.png')

    //king
    this.load.image('king_clubs', 'images/cards/king_of_clubs.png')
    this.load.image('king_diamonds', 'images/cards/king_of_diamonds.png')
    this.load.image('king_hearts', 'images/cards/king_of_hearts.png')
    this.load.image('king_spades', 'images/cards/king_of_spades.png')

    //ace
    this.load.image('ace_clubs', 'images/cards/ace_of_clubs.png')
    this.load.image('ace_diamonds', 'images/cards/ace_of_diamonds.png')
    this.load.image('ace_hearts', 'images/cards/ace_of_hearts.png')
    this.load.image('ace_spades', 'images/cards/ace_of_spades.png')

    // TODO: load remaining cards here
    this.load.image('back', 'images/card_back.png')
  }

  update () {}
}
