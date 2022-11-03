export default class DropZoneData {
  constructor (suit, isAscending) {
    this.suit = suit
    this.isAscending = isAscending
    this.isDescending = !isAscending
    this.cards = []
    this.current = 0

    this.isPlayableCard = (cardSuit, cardNumber) => {
      let validNumber =
        cardNumber == (this.isAscending && this.current + 1) ||
        cardNumber == (this.isDescending && this.current - 1)

      return this.suit == cardSuit && (validNumber || cardNumber == 7)
    }

    this.updateCurrent = (cardSuit, cardNumber) => {
      this.current = parseInt(cardNumber)
    }
  }
}
