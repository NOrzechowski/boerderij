export default class Card {
  constructor (scene) {
    const CARD_SIZE_RATIO = 0.2
    this.render = (x, y, sprite) => {
      let card = scene.add
        .image(x, y, sprite)
        .setScale(CARD_SIZE_RATIO, CARD_SIZE_RATIO)
        .setInteractive()
      scene.input.setDraggable(card)
      return card
    }

    this.renderFixed = (x, y, sprite) => {
      let card = scene.add
        .image(x, y, sprite)
        .setScale(CARD_SIZE_RATIO, CARD_SIZE_RATIO)
        .setInteractive()
      return card
    }
  }
}
