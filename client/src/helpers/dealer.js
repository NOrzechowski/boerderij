import Card from './card'

export default class Dealer {

    constructor(scene) {
        this.dealCards = (deck) => {
            console.log('deck: ', deck)

            for (let i = 0; i < 8; i++) {
                let playerCard = new Card(scene);
                playerCard.render(475 + (i * 75), 650, deck.nextCard());

                //     let opponentCard = new Card(scene);
                //     scene.opponentCards.push(opponentCard.render(475 + (i * 75), 125, opponentSprite).disableInteractive());
            }
        }
    }
}
