
///<reference path="../tsDefinitions/phaser.d.ts"/>
module Tsukthemall {

    export class Game extends Phaser.Game {

        constructor() {
            super(window.innerWidth, window.innerHeight, Phaser.AUTO, 'content', null);
         
            this.state.add('Boot', Boot, false);
            this.state.add('Preloader', Preloader, false);
            this.state.add('Play', Play, false);
            this.state.add('Menu', Menu, false);
            this.state.add('GameOver', GameOver, false);
            this.state.start('Boot');
           

        }

    }

}