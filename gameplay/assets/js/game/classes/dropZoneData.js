export default class DropZoneData {
  constructor (suit, isAscending) {
    this.suit = suit
    this.isAscending = isAscending
    this.isDescending = !isAscending
    this.cards = []
    this.current = 0

    this.isPlayableCard = (cardSuit, card) => {
      const cardNumber = this.convertCard(card)
      const validNumber =
        cardNumber == (this.isAscending && this.current + 1) ||
        cardNumber == (this.isDescending && this.current - 1)

      return this.suit == cardSuit && (validNumber || cardNumber == 7)
    }

    this.convertCard = card => {
      let cardNumber = card
      if (card == 'ace') {
        cardNumber = '14'
      }
      if (card == 'king') {
        cardNumber = '13'
      }
      if (card == 'queen') {
        cardNumber = '12'
      }
      if (card == 'jack') {
        cardNumber = '11'
      }
      return parseInt(cardNumber)
    }

    this.updateCurrent = (cardSuit, card) => {
      this.current = this.convertCard(card)
    }
  }
}
