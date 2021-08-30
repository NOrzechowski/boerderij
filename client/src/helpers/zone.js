import Card from './card'

export default class Zone {
    constructor(scene) {

        this.renderZones = () => {
            const width = 150
            const height = 2000
            const offset = 200

            let dropZoneSpades = scene.add.zone(475, 0, width, height).setRectangleDropZone(width, height);
            dropZoneSpades.setData({ suit: 'spades', pennies: 0, cards: [] })

            let dropZoneHearts = scene.add.zone(475 + offset, 0, width, height).setRectangleDropZone(width, height);
            dropZoneHearts.setData({ suit: 'hearts', pennies: 0, cards: [] })

            let dropZoneDiamonds = scene.add.zone(475 + offset * 2, 0, width, height).setRectangleDropZone(width, height);
            dropZoneDiamonds.setData({ suit: 'diamonds', pennies: 0, cards: [] })

            let dropZoneClubs = scene.add.zone(475 + offset * 3, 0, width, height).setRectangleDropZone(width, height);
            dropZoneClubs.setData({ suit: 'clubs', pennies: 0, cards: [] })

            return [dropZoneSpades, dropZoneHearts, dropZoneDiamonds, dropZoneClubs];
        };


        this.renderBaseCards = () => {
            let card = new Card(scene);
            card.renderFixed(475, 350, 'ace_spades');
            card.renderFixed(675, 350, 'king_hearts');
            card.renderFixed(875, 350, 'queen_diamonds');
            card.renderFixed(1075, 350, 'jack_clubs');
        }

    }
}
