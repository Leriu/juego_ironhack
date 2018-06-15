module Tsukthemall {

    export class Play extends Phaser.State {
        background: Phaser.Sprite;
        player: Tsukthemall.Player;
        enemie: Tsukthemall.Enemies;
        viewportHeight:any = window.innerHeight;
        viewportWidth: any = window.innerWidth;
        groupenemies: Array<Enemies> = new Array<Enemies>();
        colorArray: Array<any> = [0xB30000, 0x1A9846, 0x005F9C, 0xFF0000, 0x23EA68, 0x009BFF];
        enemieGroup: Phaser.Group;
        playerGroup: Phaser.Group;
        score: Phaser.BitmapText;
        puntos: any = 0;
        catDead: any;
        fondo: any;


        create() {
            this.fondo = this.game.add.audio('fondo');
            this.fondo.play('', 0, 0.3, true);
            this.catDead = this.game.add.audio('catdead');
            this.game.world.bounds.setTo(0,0,this.viewportWidth,this.viewportHeight);
            this.background = this.add.sprite(this.game.world.centerX, this.game.world.centerY,'backplay');
            this.background.alpha = 0;
            this.background.anchor.set(0.5, 0.5);
            this.background.scale.set(this.viewportWidth/this.background.width, this.viewportHeight/this.background.height);
            this.add.tween(this.background).to({ alpha: 1}, 2000, Phaser.Easing.Bounce.InOut, true);
            //this.enemie = new Enemies(this.game, this.viewportWidth-400, this.viewportHeight-350, 0x606060);
            
            this.enemieGroup = this.game.add.group();
        
            for(let i=0; i < 10; i++ ){
                
                setTimeout(()=>{
                    let newEnemie = new Enemies(this.game, this.viewportWidth-400, this.viewportHeight-520, this.colorArray[this.getRandomInt(0,this.colorArray.length-1)]);
                    this.enemieGroup.add(newEnemie.enemiesSprite);
                    this.groupenemies.push(newEnemie);
                    
                }, this.getRandomInt(3,10)*1000);
            }
            this.player = new Player(this.game, 70, this.viewportHeight-560);
            this.playerGroup = this.game.add.group();
            this.playerGroup.add(this.player.playerSprite);
            let laserGroup = this.game.add.group();
            laserGroup.add(this.player.laserSprite);
            //this.game.world.swap(this.player.playerSprite, this.player.laserSprite);
            this.score = this.game.add.bitmapText(this.viewportWidth/2, 50, "font_bold", "Score: " + this.puntos);
            this.score.fontSize = 30;
            this.score.alpha = 1;
            this.score.anchor.set(0.5);
            this.add.tween(this.score).to({alpha : 1},2000, Phaser.Easing.Bounce.InOut, true);

        }

        getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        update() {
            this.player.update();
            //this.enemie.update();
           
            this.groupenemies.forEach((enemie)=>{
                this.game.physics.arcade.collide(this.player.playerSprite,enemie.enemiesSprite,this.gameOver,null,this);
                this.game.physics.arcade.collide(this.player.laserSprite,enemie.enemiesSprite,this.killenemie,null,this);

                enemie.update();
            });
            this.score.text = 'Score: ' + this.puntos;
            

        }

        gameOver(){
            this.fondo.stop();
            let id = window.setTimeout(()=>{},0);
            while(id--){
                window.clearTimeout(id);
            }
            this.game.state.start('GameOver', true, false);
        }
        killenemie(){
            
            if(this.player.isAtacking){
                this.groupenemies.forEach((enemie)=>{
                    if(enemie.colorEnemie == this.player.colorPlayer){  
                        if(enemie.enemiesSprite.alive){
                            enemie.enemiesSprite.kill();
                            this.puntos+= 10;
                            this.catDead.play('', 0, 0.2, false);
                            //reutilizamos el enemigo
                            enemie.enemiesSprite.position.set(this.viewportWidth-400, this.viewportHeight-520);
                            setTimeout(() => {
                                let randomcolor = this.colorArray[this.getRandomInt(0, this.colorArray.length-1)];
                                enemie.enemiesSprite.tint = randomcolor;
                                enemie.colorEnemie = randomcolor;
                                enemie.enemiesSprite.revive();
                            }, this.getRandomInt(5,10)*1000);
                        }
                    }
                    
                });
                
            }
        }
    }

}