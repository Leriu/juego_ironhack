module Tsukthemall{

    export class GameOver extends Phaser.State{

        texto: Phaser.BitmapText;
        spacePress: Phaser.Key;
        yourScore: Phaser.BitmapText;
        viewportHeight:any = window.innerHeight;
        viewportWidth: any = window.innerWidth;
        playagain: Phaser.BitmapText;
        timer:any = 0;
        timeOnce:Boolean = false;

        create(){
            this.texto = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY -200, "font_bold", "Game Over");
            this.texto.alpha = 1;
            this.texto.anchor.set(0.5);
            this.texto.align = 'center';
            this.texto.fontSize = 50;
            
            
            this.yourScore = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY, "font_bold", "Your score is: " + puntos);
            this.yourScore.alpha = 1;
            this.yourScore.anchor.set(0.5);
            this.yourScore.fontSize = 40;

            this.playagain = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY+200, "font_bold", "PRESIONA [ ESPACIO ] PARA JUGAR DE NUEVO");
            this.playagain.alpha = 1;
            this.playagain.anchor.set(0.5);
            this.playagain.align = 'center';
            this.playagain.fontSize = 30;
            

            this.spacePress = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.spacePress.onDown.addOnce(this.startGame, this);
        }
        update(){
            this.timer += this.game.time.elapsed; 
            if(this.timeOnce){
            if (this.timer >= 800) {
                this.timer -= 800;
                this.playagain.visible = !this.playagain.visible;
            }
            
            }
            else {
                    this.playagain.visible = false;
                if (this.timer >= 1500) {
                    this.timer -= 1500;
                this.timeOnce = true;
                }
            }
            if(this.spacePress.isDown){
                this.startGame();
            }
        }

        startGame(){
            puntos = 0;
            this.game.state.start('Menu', true, false);
        }

    }


}