/// <reference path="../node_modules/phaser/typescript/phaser.d.ts"/>

import { Boot } from './states/boot';
import { Loading } from './states/loading';
import { Menu } from './states/menu';
import { Lobby } from './states/lobby';
import { Play } from "./states/play";
// Import additional states here

export class MyGame extends Phaser.Game {
    constructor() {
        super(800, 600);

        this.state.add('Boot', Boot);
        this.state.add('Loading', Loading);
        this.state.add('Menu', Menu);
        this.state.add('Lobby', Lobby);
        this.state.add('Play', Play);
        // Add additional states here

        this.state.start('Boot');
    }
}

var game = new MyGame(); // This kicks everything off
export default game;
