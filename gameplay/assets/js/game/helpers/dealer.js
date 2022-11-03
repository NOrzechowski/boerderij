import Card from './card'

export default class Dealer {
  constructor (scene) {
    this.MAX_CARDS_DEALT = 52 // can change for testing purposes... will be variable eventually.
    this.ONLY_DEAL_SPADES = true // test flag, will be removed
    this.dealCards = deck => {
      console.log('deck: ', deck)

      let index = 0
      for (let i = 0; i < this.MAX_CARDS_DEALT; i++) {
        let playerCard = new Card(scene)
        const sprite = deck.nextCard()
        const suit = sprite.split('_')[1]
        console.log('suit: *' + suit + '*')
        if (this.ONLY_DEAL_SPADES && suit === 'spades') {
          console.log('here!!')
          playerCard.render(475 + index++ * 75, 650, sprite)
        } else {
          //playerCard.render(475 + i * 75, 650, sprite)
        }

        //     let opponentCard = new Card(scene);
        //     scene.opponentCards.push(opponentCard.render(475 + (i * 75), 125, opponentSprite).disableInteractive());
      }
    }
  }
}
