module Tsukthemall {

    export class Enemies {
        enemiesSprite: Phaser.Sprite;
        colorEnemie: any;
        position: Phaser.Point = new Phaser.Point(0,0);
        game: Phaser.Game;
        idleanimation: Phaser.Animation;
        
        constructor(game:Phaser.Game,x:number,y:number, color: any){
            this.enemiesSprite = game.add.sprite(x,y,'enemie');     
            this.enemiesSprite.tint = color;       
            game.physics.enable(this.enemiesSprite,Phaser.Physics.ARCADE);
            
            this.idleanimation = this.enemiesSprite.animations.add('idleplayer'); 
            this.enemiesSprite.animations.play('idleplayer', 6, true);
           

            this.game = game;
            this.colorEnemie = color;
            //game.physics.arcade.gravity.x = 800;
            //this.enemiesSprite.anchor.setTo(0,0.5);
            this.position.x = x;
            this.position.y = y;
            //game.add.existing(this);
            //game.debug.body(this.enemiesSprite);
            this.create();
         }

         update(){
             this.enemiesSprite.body.velocity.x = -100;
             //this.game.debug.body(this.enemiesSprite);
         }


         create(){
             
         }
        
    }
}