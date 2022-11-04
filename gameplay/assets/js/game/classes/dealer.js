import Card from './card'

export default class Dealer {
  constructor (scene) {
    this.MAX_CARDS_DEALT = 52 // can change for testing purposes... will be variable eventually.
    this.ONLY_DEAL_SPADES = false // test flag, will be removed
    const CARD_OFFSET = 30
    const START_POSITION = 100
    this.dealCards = deck => {
      let index = 0
      for (let i = 0; i < this.MAX_CARDS_DEALT; i++) {
        let playerCard = new Card(scene)
        const sprite = deck.nextCard()
        const suit = sprite.split('_')[1]
        if (this.ONLY_DEAL_SPADES && suit === 'spades') {
          playerCard.render(START_POSITION + index++ * CARD_OFFSET, 650, sprite)
        } else if (!this.ONLY_DEAL_SPADES) {
          playerCard.render(START_POSITION + i * CARD_OFFSET, 650, sprite)
        }

        //     let opponentCard = new Card(scene);
        //     scene.opponentCards.push(opponentCard.render(475 + (i * 75), 125, opponentSprite).disableInteractive());
      }
    }
  }
}
