import Phaser from "phaser";
import Game from "./scenes/game"

const config = {
    type: Phaser.AUTO,
    parent: "boerderij",
    width: 4000,
    height: 1560,
    scene: [
        Game
    ]
};

const game = new Phaser.Game(config);
