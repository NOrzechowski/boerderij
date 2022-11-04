import Card from './card'
import DropZoneData from './dropZoneData'
export default class PlayableArea {
  constructor (scene) {
    const CASA_OFFSET = 350
    const starting_position = 200

    this.renderZones = () => {
      const ascendingDropzoneOffset = 100
      const descendingDropzoneOffset = 300
      const width = 150
      const height = 2000
      const offset = CASA_OFFSET

      this.dropZoneSpadesAscending = scene.add
        .zone(ascendingDropzoneOffset, 0, width, height)
        .setRectangleDropZone(width, height)
      this.dropZoneSpadesAscending.setData(new DropZoneData('spades', true))

      this.dropZoneSpadesDescending = scene.add
        .zone(descendingDropzoneOffset, 0, width, height)
        .setRectangleDropZone(width, height)
      this.dropZoneSpadesDescending.setData(new DropZoneData('spades', false))

      this.dropZoneHeartsAscending = scene.add
        .zone(ascendingDropzoneOffset + offset, 0, width, height)
        .setRectangleDropZone(width, height)
      this.dropZoneHeartsAscending.setData(new DropZoneData('hearts', true))

      this.dropZoneHeartsDescending = scene.add
        .zone(descendingDropzoneOffset + offset, 0, width, height)
        .setRectangleDropZone(width, height)
      this.dropZoneHeartsDescending.setData(new DropZoneData('hearts', false))

      this.dropZoneDiamondsAscending = scene.add
        .zone(ascendingDropzoneOffset + offset * 2, 0, width, height)
        .setRectangleDropZone(width, height)
      this.dropZoneDiamondsAscending.setData(new DropZoneData('diamonds', true))

      this.dropZoneDiamondsDescending = scene.add
        .zone(descendingDropzoneOffset + offset * 2, 0, width, height)
        .setRectangleDropZone(width, height)
      this.dropZoneDiamondsDescending.setData(
        new DropZoneData('diamonds', false)
      )

      this.dropZoneClubsAscending = scene.add
        .zone(ascendingDropzoneOffset + offset * 3, 0, width, height)
        .setRectangleDropZone(width, height)
      this.dropZoneClubsAscending.setData(new DropZoneData('clubs', true))

      this.dropZoneClubsDescending = scene.add
        .zone(descendingDropzoneOffset + offset * 3, 0, width, height)
        .setRectangleDropZone(width, height)
      this.dropZoneClubsDescending.setData(new DropZoneData('clubs', false))

      this.ascendingDropZones = [
        this.dropZoneSpadesAscending,
        this.dropZoneHeartsAscending,
        this.dropZoneDiamondsAscending,
        this.dropZoneClubsAscending
      ]

      this.descendingDropZones = [
        this.dropZoneSpadesDescending,
        this.dropZoneHeartsDescending,
        this.dropZoneDiamondsDescending,
        this.dropZoneClubsDescending
      ]
      this.dropZones = this.ascendingDropZones.concat(this.descendingDropZones)
      return this.dropZones
    }

    this.getDropZoneBySuit = (suit, isAscending) => {
      console.log('searching: ', this.dropZones)
      return this.dropZones.find(
        el =>
          el.data.list.suit == suit && el.data.list.isAscending == isAscending
      )
    }
    this.renderBaseCards = () => {
      // Renders the 4 base 'casa' cards.
      // TODO: potentially drive from the db?
      let card = new Card(scene)
      console.log(card)
      // Phaser.Display.Align.In.LeftCenter(block, pic)
      console.log('scene: ', scene)
      const startX =
        Math.floor(scene.game.config.width / CASA_OFFSET) +
        Math.floor(CASA_OFFSET / 2)
      console.log(scene.game.config.width)
      console.log(CASA_OFFSET)
      console.log(startX)
      card.renderFixed(startX, 350, 'ace_spades')
      card.renderFixed(startX + CASA_OFFSET, 350, 'king_hearts')
      card.renderFixed(startX + CASA_OFFSET * 2, 350, 'queen_diamonds')
      card.renderFixed(startX + CASA_OFFSET * 3, 350, 'jack_clubs')
    }
  }
}
