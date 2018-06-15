module Tsukthemall{

    export class GameOver extends Phaser.State{

        texto: Phaser.BitmapText;
        spacePress: Phaser.Key;
        yourScore: Phaser.BitmapText;
        

        create(){
            this.texto = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY, "font_bold", "Game Over");
            this.texto.alpha = 1;
            this.texto.anchor.set(0.5);
            this.texto.align = 'center';
            this.texto.fontSize = 40;
            this.spacePress = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            /*
            this.yourScore = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY + 200, "font_bold", "Score: ");
            this.yourScore.alpha = 1;
            this.yourScore.anchor.set(0.5);
            this.yourScore.fontSize = 40;
            */
           this.spacePress.onDown.addOnce(this.startGame, this);
        }

        startGame(){
            this.game.state.start('Play', true, false);
        }

    }


}