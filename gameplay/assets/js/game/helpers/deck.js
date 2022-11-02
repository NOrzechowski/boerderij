export default class Deck {
  constructor () {
    this.cards = [
      '2_clubs',
      '2_diamonds',
      '2_hearts',
      '2_spades',
      '3_clubs',
      '3_diamonds',
      '3_hearts',
      '3_spades',
      '4_clubs',
      '4_diamonds',
      '4_hearts',
      '4_spades',
      '5_clubs',
      '5_diamonds',
      '5_hearts',
      '5_spades',
      '6_clubs',
      '6_diamonds',
      '6_hearts',
      '6_spades',
      '7_clubs',
      '7_diamonds',
      '7_hearts',
      '7_spades',
      '8_clubs',
      '8_diamonds',
      '8_hearts',
      '8_spades',
      '9_clubs',
      '9_diamonds',
      '9_hearts',
      '9_spades',
      '10_clubs',
      '10_diamonds',
      '10_hearts',
      '10_spades',
      'jack_clubs',
      'jack_diamonds',
      'jack_hearts',
      'jack_spades',
      'queen_clubs',
      'queen_diamonds',
      'queen_hearts',
      'queen_spades',
      'king_clubs',
      'king_diamonds',
      'king_hearts',
      'king_spades',
      'ace_clubs',
      'ace_diamonds',
      'ace_hearts',
      'ace_spades'
    ]
    this.shuffledCards = []

    this.shuffle = () => {
      var array = this.cards
      var currentIndex = array.length,
        randomIndex

      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        ;[array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex]
        ]
      }

      this.shuffledCards = array
    }

    this.nextCard = () => {
      return this.shuffledCards.pop()
    }
  }
}
