export default class DropZoneData {
  constructor (suit) {
    this.suit = suit
    this.pennies = 0
    this.cards = []
    this.current = { lowest: 0, highest: 0 }

    this.isPlayableCard = (cardSuit, cardNumber) => {
      let validNumber = true
      if (this.cards.length === 0) {
        validNumber = cardNumber == 7
      } else {
        console.log('current: ', this.current)
        console.log(
          ' cardNumber == this.current.highest + 1? ',
          cardNumber == this.current.highest + 1
        )
        console.log(
          ' cardNumber == this.current.lowest - 1? ',
          cardNumber == this.current.lowest - 1
        )
        validNumber =
          cardNumber == this.current.lowest - 1 ||
          cardNumber == this.current.highest + 1
      }

      return this.suit == cardSuit && validNumber
    }

    this.updateCurrent = (cardSuit, cardNumber) => {
      console.log('updating current: ', this)
      if (cardNumber == 7) {
        this.current.lowest = parseInt(cardNumber)
        this.current.highest = parseInt(cardNumber)
      } else {
        if (cardNumber == this.current.lowest - 1) {
          console.log('updating lowest')
          this.current.lowest = parseInt(cardNumber)
        } else {
          console.log('updating highest')
          this.current.highest = parseInt(cardNumber)
        }
      }
    }
  }
}
