module Tsukthemall {

    export class Preloader extends Phaser.State {

        preloadBar: Phaser.Sprite;
        viewportHeight:any = window.innerHeight;
        viewportWidth: any = window.innerWidth;

        preload() {

            /* Before this put your asset inside /assets */
            this.load.bitmapFont('font_bold', 'assets/fonts/font_bold.png', 'assets/fonts/font_bold.xml');
            this.preloadBar = this.add.sprite((this.viewportWidth/2)-200, this.viewportHeight/2, 'preloadBar');
            this.preloadBar.position.set((this.viewportWidth/2)-200, this.viewportHeight/2);
            this.load.image('background', 'assets/background.jpg');
            this.load.image('logo', 'assets/logo.png');
            //this.load.image('player', 'assets/player.png');
            this.load.spritesheet('idleplayer', 'assets/idlePlayer.png', 400, 354, 4);
            this.load.spritesheet('atackplayer', 'assets/atackPlayer.png', 400, 354, 3);
            this.load.spritesheet('laser', 'assets/laser.png',1553,142,4);
            this.load.image('botonred', 'assets/botonred.png');
            this.load.image('botongreen','assets/botongreen.png');
            this.load.image('botonblue', 'assets/botonblue.png');
            this.load.image('botondark', 'assets/botondark.png');
            this.load.image('botonbright', 'assets/botonbright.png');
            this.load.spritesheet('enemie', 'assets/enemie.png', 420 ,247, 8);
            this.load.image('backplay', 'assets/backplay.png');
            this.load.audio('catdead', ['assets/catdead.mp3', 'assets/catdead.ogg'], false);
            this.load.audio('dogatack', ['assets/dogatack.mp3', 'assets/dogatac.ogg'], false);
            this.load.audio('laser', ['assets/laser.mp3', 'assets/laser.ogg'], false);
            this.load.audio('fondo', 'assets/fondo.mp3', true);
        }

        create() {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMenu , this);
        }

        startMenu() {

            this.game.state.start('Menu', true, false);

        }
    }

}