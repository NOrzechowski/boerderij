import Card from './card'
import DropZoneData from './dropZoneData'
export default class PlayableArea {
  constructor (scene) {
    this.renderZones = () => {
      const width = 150
      const height = 2000
      const offset = 200

      this.dropZoneSpades = scene.add
        .zone(475, 0, width, height)
        .setRectangleDropZone(width, height)
      this.dropZoneSpades.setData(new DropZoneData('spades'))

      this.dropZoneHearts = scene.add
        .zone(475 + offset, 0, width, height)
        .setRectangleDropZone(width, height)
      this.dropZoneHearts.setData(new DropZoneData('hearts'))

      this.dropZoneDiamonds = scene.add
        .zone(475 + offset * 2, 0, width, height)
        .setRectangleDropZone(width, height)
      this.dropZoneDiamonds.setData(new DropZoneData('diamonds'))

      this.dropZoneClubs = scene.add
        .zone(475 + offset * 3, 0, width, height)
        .setRectangleDropZone(width, height)
      this.dropZoneClubs.setData(new DropZoneData('clubs'))

      this.dropZones = [
        this.dropZoneSpades,
        this.dropZoneHearts,
        this.dropZoneDiamonds,
        this.dropZoneClubs
      ]

      return this.dropZones
    }

    this.getDropZoneBySuit = suit => {
      return this.dropZones.find(el => el.data.list.suit == suit)
    }

    this.renderBaseCards = () => {
      // Renders the 4 base 'casa' cards.
      // TODO: potentially drive from the db?
      let card = new Card(scene)
      card.renderFixed(475, 350, 'ace_spades')
      card.renderFixed(675, 350, 'king_hearts')
      card.renderFixed(875, 350, 'queen_diamonds')
      card.renderFixed(1075, 350, 'jack_clubs')
    }
  }
}
