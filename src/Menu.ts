module Tsukthemall{

    export class Menu extends Phaser.State{
        background: Phaser.Sprite;
        logo: Phaser.Sprite;
        spacePress: Phaser.Key;
        texto: Phaser.BitmapText;

        timer:any = 0;
        timeOnce:Boolean = false;
        viewportHeight:any = window.innerHeight;
        viewportWidth: any = window.innerWidth;

        create(){
            this.game.world.bounds.setTo(0,0,this.viewportWidth,this.viewportHeight);
            this.background = this.add.sprite(this.game.world.centerX, this.game.world.centerY,'background');
            this.background.alpha = 1;
            this.background.anchor.set(0.5, 0.5);
            this.background.scale.set(this.viewportWidth/this.background.width, this.viewportHeight/this.background.height);

            this.logo = this.add.sprite(this.world.centerX, -300, 'logo');
            this.logo.anchor.set(0.5, 0.5);

            this.add.tween(this.background).to({ alpha: 1}, 2000, Phaser.Easing.Bounce.InOut, true);
            this.add.tween(this.logo).to({ y: 290 }, 2000, Phaser.Easing.Elastic.Out, true, 2000);

            this.texto = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY+200, "font_bold", "PRESIONA [ ESPACIO ] PARA JUGAR");
            this.texto.alpha = 1;
            this.texto.anchor.set(0.5);
            this.texto.align = 'center';
            this.texto.fontSize = 30;
            this.spacePress = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

            
        }

        update(){
            this.timer += this.game.time.elapsed; 
            if(this.timeOnce){
            if (this.timer >= 800) {
                this.timer -= 800;
                this.texto.visible = !this.texto.visible;
            }
            
            }
            else {
                    this.texto.visible = false;
                if (this.timer >= 1500) {
                    this.timer -= 1500;
                this.timeOnce = true;
                }
            }
            if(this.spacePress.isDown){
                this.startGame();
            }
            
        }

            
        startGame() {
            
            this.game.state.start('Play', true, false);
       }

    }
}