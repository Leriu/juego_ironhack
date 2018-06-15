module Tsukthemall{

    export class Player {

        playerSprite: Phaser.Sprite;
        laserSprite: Phaser.Sprite;
        health: number = 1;
        colorPlayer: any = 0x0000;
        position: Phaser.Point = new Phaser.Point(0, 0);
        game: Phaser.Game;
        viewportHeight:any = window.innerHeight;
        viewportWidth: any = window.innerWidth;
        idleAnimation: Phaser.Animation;
        atackAnimation: Phaser.Animation;
        laserAnimation: Phaser.Animation;
        isAtacking: Boolean = false;
        isred: Boolean = false;
        isgreen: Boolean = false;
        isblue: Boolean = false;
        
        red: any = 0xFF0000;
        green: any = 0x23EA68;
        blue: any = 0x009BFF;
        dred: any= 0xB30000;
        dgreen: any = 0x1A9846;
        dblue: any = 0x005F9C;

        dogatack: any;
        laserAudio: any;

        constructor(game:Phaser.Game,x:number,y:number){
           this.playerSprite = game.add.sprite(x,y,'idleplayer');
           game.physics.enable(this.playerSprite,Phaser.Physics.ARCADE);
           this.playerSprite.body.width = 320;
           this.game = game;
           //sprite y animacion del player
           //this.playerSprite.anchor.setTo(1,0.5); 
           this.idleAnimation = this.playerSprite.animations.add('idleplayer'); 
           this.playerSprite.animations.play('idleplayer', 6, true);
           //animacion de ataque
           this.playerSprite.loadTexture('atackplayer');
           this.atackAnimation = this.playerSprite.animations.add('atackplayer');
           //cargamos textura de idle para mantener animacion de idle
           this.playerSprite.loadTexture('idleplayer');
           this.playerSprite.animations.play('idleplayer', 6, true);
           //creamos animacion de laser
           this.laserSprite = game.add.sprite(x+250,y+30,'laser');
           game.physics.enable(this.laserSprite,Phaser.Physics.ARCADE);
           this.laserAnimation = this.laserSprite.animations.add('laser');
           this.laserSprite.loadTexture('laser');
           //hacemos no visible el sprite
           this.laserSprite.visible = false;
           this.position.x = x;
           this.position.y = y;
           
           
           this.create();
        }

        create(){

        this.dogatack = this.game.add.audio('dogatack');
        this.laserAudio = this.game.add.audio('laser');
        //botones
        let botonred = this.game.add.button((this.viewportWidth/2)-400,this.viewportHeight-150,'botonred',()=>{
                this.isred = true;
                this.playerSprite.tint = this.red;
                
            },this);
        let botongreen = this.game.add.button((this.viewportWidth/2)-200,this.viewportHeight-150,'botongreen',()=>{
                this.isgreen = true;
                this.playerSprite.tint = this.green;

        },this);
        let botonblue = this.game.add.button(this.viewportWidth/2,this.viewportHeight-150,'botonblue',()=>{
                this.isblue = true;
                this.playerSprite.tint = this.blue;
                
        }, this);
        let botondark = this.game.add.button((this.viewportWidth/2)+200, this.viewportHeight-150,'botondark',()=>{
            //funcion callback para activar animacion de ataque y laser
            if(this.isred){
                this.colorPlayer = this.dred;
                this.playerSprite.tint = this.dred;
                this.laserSprite.tint = this.dred;
            }else if(this.isgreen){
                this.colorPlayer = this.dgreen;
                this.playerSprite.tint = this.dgreen;
                this.laserSprite.tint = this.dgreen;
            }else if(this.isblue){
                this.colorPlayer = this.dblue;
                this.playerSprite.tint = this.dblue;
                this.laserSprite.tint = this.dblue;
            }
            
            this.isAtacking = true;
            this.dogatack.play('', 0, 0.4, false);
            this.laserAudio.play('', 0, 0.2, false);
            this.playerSprite.loadTexture('atackplayer');
            this.atackAnimation = this.playerSprite.animations.add('atackplayer');
            this.playerSprite.animations.play('atackplayer', 10, false);
            this.laserSprite.visible = true;
            this.laserSprite.loadTexture('laser');
            this.laserAnimation = this.laserSprite.animations.add('laser');
            this.laserSprite.animations.play('laser', 5, false);
            
           
            //agregamos un timeout para esperar a que termine las animacion de ataque y laser y volver a la animacion de idle
            setTimeout(()=>{

                this.playerSprite.loadTexture('idleplayer');
                this.atackAnimation = this.playerSprite.animations.add('idleplayer');
                this.playerSprite.animations.play('idleplayer', 6, true); 
                this.laserSprite.visible = false;
                this.isAtacking = false;
                this.playerSprite.tint = 0xffffff;
                this.laserSprite.tint = 0xffffff;
                this.isred = false;
                this.isgreen = false;
                this.isblue = false;
            }, 800);
                       
           ;            

        },this);

        let botonbright = this.game.add.button((this.viewportWidth/2)+400, this.viewportHeight-150, 'botonbright', ()=>{
            if(this.isred){
                this.colorPlayer = this.red;
                this.playerSprite.tint = this.red;
                this.laserSprite.tint = this.red;
            }else if(this.isgreen){
                this.colorPlayer = this.green;
                this.playerSprite.tint = this.green;
                this.laserSprite.tint = this.green;
            }else if(this.isblue){
                this.colorPlayer = this.blue;
                this.playerSprite.tint = this.blue;
                this.laserSprite.tint = this.blue;
            }
            this.isAtacking = true;
            this.dogatack.play('', 0, 0.4, false);
            this.laserAudio.play('', 0, 0.2, false);
            this.playerSprite.loadTexture('atackplayer');
            this.atackAnimation = this.playerSprite.animations.add('atackplayer');
            this.playerSprite.animations.play('atackplayer', 10, false);
            this.laserSprite.visible = true;
            this.laserSprite.loadTexture('laser');
            this.laserAnimation = this.laserSprite.animations.add('laser');
            this.laserSprite.animations.play('laser', 5, false);
            
            //agregamos un timeout para esperar a que termine las animacion de ataque y laser y volver a la animacion de idle
            setTimeout(()=>{

                this.playerSprite.loadTexture('idleplayer');
                this.atackAnimation = this.playerSprite.animations.add('idleplayer');
                this.playerSprite.animations.play('idleplayer', 6, true); 
                this.laserSprite.visible = false;
                this.isAtacking = false;
                this.playerSprite.tint = 0xffffff;
                this.laserSprite.tint = 0xffffff;
                this.isred = false;
                this.isgreen = false;
                this.isblue = false;
            }, 800);

            
            
            
            }, this);
            

        }

        update(){
            //this.game.debug.body(this.playerSprite);
            //this.game.debug.body(this.laserSprite);
        }

    }

}