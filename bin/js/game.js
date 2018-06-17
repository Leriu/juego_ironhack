var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
window.onload = function () {
    var game = new Tsukthemall.Game();
};
var Tsukthemall;
(function (Tsukthemall) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Boot.prototype.preload = function () {
            this.game.load.image('preloadBar', 'assets/loadbar.png');
        };
        Boot.prototype.create = function () {
            this.game.state.start('Preloader', true, false);
        };
        return Boot;
    }(Phaser.State));
    Tsukthemall.Boot = Boot;
})(Tsukthemall || (Tsukthemall = {}));
var Tsukthemall;
(function (Tsukthemall) {
    var Enemies = (function () {
        function Enemies(game, x, y, color) {
            this.position = new Phaser.Point(0, 0);
            this.enemiesSprite = game.add.sprite(x, y, 'enemie');
            this.enemiesSprite.tint = color;
            game.physics.enable(this.enemiesSprite, Phaser.Physics.ARCADE);
            this.idleanimation = this.enemiesSprite.animations.add('idleplayer');
            this.enemiesSprite.animations.play('idleplayer', 6, true);
            this.game = game;
            this.colorEnemie = color;
            this.position.x = x;
            this.position.y = y;
            this.create();
        }
        Enemies.prototype.update = function () {
            this.enemiesSprite.body.velocity.x = -100;
        };
        Enemies.prototype.create = function () {
        };
        return Enemies;
    }());
    Tsukthemall.Enemies = Enemies;
})(Tsukthemall || (Tsukthemall = {}));
var Tsukthemall;
(function (Tsukthemall) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = _super.call(this, window.innerWidth, window.innerHeight, Phaser.AUTO, 'content', null) || this;
            _this.state.add('Boot', Tsukthemall.Boot, false);
            _this.state.add('Preloader', Tsukthemall.Preloader, false);
            _this.state.add('Play', Tsukthemall.Play, false);
            _this.state.add('Menu', Tsukthemall.Menu, false);
            _this.state.add('GameOver', Tsukthemall.GameOver, false);
            _this.state.start('Boot');
            return _this;
        }
        return Game;
    }(Phaser.Game));
    Tsukthemall.Game = Game;
})(Tsukthemall || (Tsukthemall = {}));
var Tsukthemall;
(function (Tsukthemall) {
    var GameOver = (function (_super) {
        __extends(GameOver, _super);
        function GameOver() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.viewportHeight = window.innerHeight;
            _this.viewportWidth = window.innerWidth;
            _this.timer = 0;
            _this.timeOnce = false;
            return _this;
        }
        GameOver.prototype.create = function () {
            this.texto = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY - 200, "font_bold", "Game Over");
            this.texto.alpha = 1;
            this.texto.anchor.set(0.5);
            this.texto.align = 'center';
            this.texto.fontSize = 50;
            this.yourScore = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY, "font_bold", "Your score is: " + puntos);
            this.yourScore.alpha = 1;
            this.yourScore.anchor.set(0.5);
            this.yourScore.fontSize = 40;
            this.playagain = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY + 200, "font_bold", "PRESIONA [ ESPACIO ] PARA JUGAR DE NUEVO");
            this.playagain.alpha = 1;
            this.playagain.anchor.set(0.5);
            this.playagain.align = 'center';
            this.playagain.fontSize = 30;
            this.spacePress = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.spacePress.onDown.addOnce(this.startGame, this);
        };
        GameOver.prototype.update = function () {
            this.timer += this.game.time.elapsed;
            if (this.timeOnce) {
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
            if (this.spacePress.isDown) {
                this.startGame();
            }
        };
        GameOver.prototype.startGame = function () {
            puntos = 0;
            this.game.state.start('Menu', true, false);
        };
        return GameOver;
    }(Phaser.State));
    Tsukthemall.GameOver = GameOver;
})(Tsukthemall || (Tsukthemall = {}));
var Tsukthemall;
(function (Tsukthemall) {
    var Menu = (function (_super) {
        __extends(Menu, _super);
        function Menu() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.timer = 0;
            _this.timeOnce = false;
            _this.viewportHeight = window.innerHeight;
            _this.viewportWidth = window.innerWidth;
            return _this;
        }
        Menu.prototype.create = function () {
            this.game.world.bounds.setTo(0, 0, this.viewportWidth, this.viewportHeight);
            this.background = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'background');
            this.background.alpha = 1;
            this.background.anchor.set(0.5, 0.5);
            this.background.scale.set(this.viewportWidth / this.background.width, this.viewportHeight / this.background.height);
            this.logo = this.add.sprite(this.world.centerX, -300, 'logo');
            this.logo.anchor.set(0.5, 0.5);
            this.add.tween(this.background).to({ alpha: 1 }, 2000, Phaser.Easing.Bounce.InOut, true);
            this.add.tween(this.logo).to({ y: 290 }, 2000, Phaser.Easing.Elastic.Out, true, 2000);
            this.texto = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY + 200, "font_bold", "PRESIONA [ ESPACIO ] PARA JUGAR");
            this.texto.alpha = 1;
            this.texto.anchor.set(0.5);
            this.texto.align = 'center';
            this.texto.fontSize = 30;
            this.spacePress = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        };
        Menu.prototype.update = function () {
            this.timer += this.game.time.elapsed;
            if (this.timeOnce) {
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
            if (this.spacePress.isDown) {
                this.startGame();
            }
        };
        Menu.prototype.startGame = function () {
            this.game.state.start('Play', true, false);
        };
        return Menu;
    }(Phaser.State));
    Tsukthemall.Menu = Menu;
})(Tsukthemall || (Tsukthemall = {}));
var puntos = 0;
var Tsukthemall;
(function (Tsukthemall) {
    var Play = (function (_super) {
        __extends(Play, _super);
        function Play() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.viewportHeight = window.innerHeight;
            _this.viewportWidth = window.innerWidth;
            _this.groupenemies = new Array();
            _this.colorArray = [0xB30000, 0x1A9846, 0x005F9C, 0xFF0000, 0x23EA68, 0x009BFF];
            _this.isPause = false;
            return _this;
        }
        Play.prototype.create = function () {
            var _this = this;
            this.fondo = this.game.add.audio('fondo');
            this.fondo.play('', 0, 0.3, true);
            this.catDead = this.game.add.audio('catdead');
            this.game.world.bounds.setTo(0, 0, this.viewportWidth, this.viewportHeight);
            this.background = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'backplay');
            this.background.alpha = 0;
            this.background.anchor.set(0.5, 0.5);
            this.background.scale.set(this.viewportWidth / this.background.width, this.viewportHeight / this.background.height);
            this.add.tween(this.background).to({ alpha: 1 }, 2000, Phaser.Easing.Bounce.InOut, true);
            this.enemieGroup = this.game.add.group();
            for (var i = 0; i < 18; i++) {
                setTimeout(function () {
                    var newEnemie = new Tsukthemall.Enemies(_this.game, _this.viewportWidth - 400, _this.viewportHeight - 520, _this.colorArray[_this.getRandomInt(0, _this.colorArray.length - 1)]);
                    _this.enemieGroup.add(newEnemie.enemiesSprite);
                    _this.groupenemies.push(newEnemie);
                }, this.getRandomInt(5, 20) * 1000);
            }
            this.player = new Tsukthemall.Player(this.game, 70, this.viewportHeight - 560);
            this.playerGroup = this.game.add.group();
            this.playerGroup.add(this.player.playerSprite);
            var laserGroup = this.game.add.group();
            laserGroup.add(this.player.laserSprite);
            this.score = this.game.add.bitmapText(this.viewportWidth / 2, 50, "font_bold", "Score: " + puntos);
            this.score.fontSize = 30;
            this.score.alpha = 1;
            this.score.anchor.set(0.5);
            this.add.tween(this.score).to({ alpha: 1 }, 2000, Phaser.Easing.Bounce.InOut, true);
        };
        Play.prototype.getRandomInt = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        Play.prototype.update = function () {
            var _this = this;
            this.player.update();
            this.groupenemies.forEach(function (enemie) {
                _this.game.physics.arcade.collide(_this.player.playerSprite, enemie.enemiesSprite, _this.gameOver, null, _this);
                _this.game.physics.arcade.collide(_this.player.laserSprite, enemie.enemiesSprite, _this.killenemie, null, _this);
                enemie.update();
            });
            this.score.text = 'Score: ' + puntos;
        };
        Play.prototype.gameOver = function () {
            this.fondo.stop();
            var id = window.setTimeout(function () { }, 0);
            while (id--) {
                window.clearTimeout(id);
            }
            this.groupenemies = new Array();
            this.game.state.start('GameOver', true, false);
        };
        Play.prototype.killenemie = function () {
            var _this = this;
            if (this.player.isAtacking) {
                this.groupenemies.forEach(function (enemie) {
                    if (enemie.colorEnemie == _this.player.colorPlayer) {
                        if (enemie.enemiesSprite.alive) {
                            enemie.enemiesSprite.kill();
                            puntos += 10;
                            _this.catDead.play('', 0, 0.2, false);
                            enemie.enemiesSprite.position.set(_this.viewportWidth - 400, _this.viewportHeight - 520);
                            setTimeout(function () {
                                var randomcolor = _this.colorArray[_this.getRandomInt(0, _this.colorArray.length - 1)];
                                enemie.enemiesSprite.tint = randomcolor;
                                enemie.colorEnemie = randomcolor;
                                enemie.enemiesSprite.revive();
                            }, _this.getRandomInt(5, 20) * 1000);
                        }
                    }
                });
            }
        };
        return Play;
    }(Phaser.State));
    Tsukthemall.Play = Play;
})(Tsukthemall || (Tsukthemall = {}));
var Tsukthemall;
(function (Tsukthemall) {
    var Player = (function () {
        function Player(game, x, y) {
            this.health = 1;
            this.colorPlayer = 0x0000;
            this.position = new Phaser.Point(0, 0);
            this.viewportHeight = window.innerHeight;
            this.viewportWidth = window.innerWidth;
            this.isAtacking = false;
            this.isred = false;
            this.isgreen = false;
            this.isblue = false;
            this.red = 0xFF0000;
            this.green = 0x23EA68;
            this.blue = 0x009BFF;
            this.dred = 0xB30000;
            this.dgreen = 0x1A9846;
            this.dblue = 0x005F9C;
            this.playerSprite = game.add.sprite(x, y, 'idleplayer');
            game.physics.enable(this.playerSprite, Phaser.Physics.ARCADE);
            this.playerSprite.body.width = 320;
            this.game = game;
            this.idleAnimation = this.playerSprite.animations.add('idleplayer');
            this.playerSprite.animations.play('idleplayer', 6, true);
            this.playerSprite.loadTexture('atackplayer');
            this.atackAnimation = this.playerSprite.animations.add('atackplayer');
            this.playerSprite.loadTexture('idleplayer');
            this.playerSprite.animations.play('idleplayer', 6, true);
            this.laserSprite = game.add.sprite(x + 250, y + 30, 'laser');
            game.physics.enable(this.laserSprite, Phaser.Physics.ARCADE);
            this.laserAnimation = this.laserSprite.animations.add('laser');
            this.laserSprite.loadTexture('laser');
            this.laserSprite.visible = false;
            this.position.x = x;
            this.position.y = y;
            this.create();
        }
        Player.prototype.create = function () {
            var _this = this;
            this.dogatack = this.game.add.audio('dogatack');
            this.laserAudio = this.game.add.audio('laser');
            var botonred = this.game.add.button((this.viewportWidth / 2) - 400, this.viewportHeight - 150, 'botonred', function () {
                _this.isred = true;
                _this.playerSprite.tint = _this.red;
            }, this);
            var botongreen = this.game.add.button((this.viewportWidth / 2) - 200, this.viewportHeight - 150, 'botongreen', function () {
                _this.isgreen = true;
                _this.playerSprite.tint = _this.green;
            }, this);
            var botonblue = this.game.add.button(this.viewportWidth / 2, this.viewportHeight - 150, 'botonblue', function () {
                _this.isblue = true;
                _this.playerSprite.tint = _this.blue;
            }, this);
            var botondark = this.game.add.button((this.viewportWidth / 2) + 200, this.viewportHeight - 150, 'botondark', function () {
                if (_this.isred) {
                    _this.colorPlayer = _this.dred;
                    _this.playerSprite.tint = _this.dred;
                    _this.laserSprite.tint = _this.dred;
                }
                else if (_this.isgreen) {
                    _this.colorPlayer = _this.dgreen;
                    _this.playerSprite.tint = _this.dgreen;
                    _this.laserSprite.tint = _this.dgreen;
                }
                else if (_this.isblue) {
                    _this.colorPlayer = _this.dblue;
                    _this.playerSprite.tint = _this.dblue;
                    _this.laserSprite.tint = _this.dblue;
                }
                _this.isAtacking = true;
                _this.dogatack.play('', 0, 0.7, false);
                _this.laserAudio.play('', 0, 0.2, false);
                _this.playerSprite.loadTexture('atackplayer');
                _this.atackAnimation = _this.playerSprite.animations.add('atackplayer');
                _this.playerSprite.animations.play('atackplayer', 10, false);
                _this.laserSprite.visible = true;
                _this.laserSprite.loadTexture('laser');
                _this.laserAnimation = _this.laserSprite.animations.add('laser');
                _this.laserSprite.animations.play('laser', 5, false);
                setTimeout(function () {
                    _this.playerSprite.loadTexture('idleplayer');
                    _this.atackAnimation = _this.playerSprite.animations.add('idleplayer');
                    _this.playerSprite.animations.play('idleplayer', 6, true);
                    _this.laserSprite.visible = false;
                    _this.isAtacking = false;
                    _this.playerSprite.tint = 0xffffff;
                    _this.laserSprite.tint = 0xffffff;
                    _this.isred = false;
                    _this.isgreen = false;
                    _this.isblue = false;
                }, 800);
            }, this);
            var botonbright = this.game.add.button((this.viewportWidth / 2) + 400, this.viewportHeight - 150, 'botonbright', function () {
                if (_this.isred) {
                    _this.colorPlayer = _this.red;
                    _this.playerSprite.tint = _this.red;
                    _this.laserSprite.tint = _this.red;
                }
                else if (_this.isgreen) {
                    _this.colorPlayer = _this.green;
                    _this.playerSprite.tint = _this.green;
                    _this.laserSprite.tint = _this.green;
                }
                else if (_this.isblue) {
                    _this.colorPlayer = _this.blue;
                    _this.playerSprite.tint = _this.blue;
                    _this.laserSprite.tint = _this.blue;
                }
                _this.isAtacking = true;
                _this.dogatack.play('', 0, 0.7, false);
                _this.laserAudio.play('', 0, 0.2, false);
                _this.playerSprite.loadTexture('atackplayer');
                _this.atackAnimation = _this.playerSprite.animations.add('atackplayer');
                _this.playerSprite.animations.play('atackplayer', 10, false);
                _this.laserSprite.visible = true;
                _this.laserSprite.loadTexture('laser');
                _this.laserAnimation = _this.laserSprite.animations.add('laser');
                _this.laserSprite.animations.play('laser', 5, false);
                setTimeout(function () {
                    _this.playerSprite.loadTexture('idleplayer');
                    _this.atackAnimation = _this.playerSprite.animations.add('idleplayer');
                    _this.playerSprite.animations.play('idleplayer', 6, true);
                    _this.laserSprite.visible = false;
                    _this.isAtacking = false;
                    _this.playerSprite.tint = 0xffffff;
                    _this.laserSprite.tint = 0xffffff;
                    _this.isred = false;
                    _this.isgreen = false;
                    _this.isblue = false;
                }, 800);
            }, this);
        };
        Player.prototype.update = function () {
        };
        return Player;
    }());
    Tsukthemall.Player = Player;
})(Tsukthemall || (Tsukthemall = {}));
var Tsukthemall;
(function (Tsukthemall) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.viewportHeight = window.innerHeight;
            _this.viewportWidth = window.innerWidth;
            return _this;
        }
        Preloader.prototype.preload = function () {
            this.load.bitmapFont('font_bold', 'assets/fonts/font_bold.png', 'assets/fonts/font_bold.xml');
            this.preloadBar = this.add.sprite((this.viewportWidth / 2) - 200, this.viewportHeight / 2, 'preloadBar');
            this.preloadBar.position.set((this.viewportWidth / 2) - 200, this.viewportHeight / 2);
            this.load.image('background', 'assets/background.jpg');
            this.load.image('logo', 'assets/logo.png');
            this.load.spritesheet('idleplayer', 'assets/idlePlayer.png', 400, 354, 4);
            this.load.spritesheet('atackplayer', 'assets/atackPlayer.png', 400, 354, 3);
            this.load.spritesheet('laser', 'assets/laser.png', 1553, 142, 4);
            this.load.image('botonred', 'assets/botonred.png');
            this.load.image('botongreen', 'assets/botongreen.png');
            this.load.image('botonblue', 'assets/botonblue.png');
            this.load.image('botondark', 'assets/botondark.png');
            this.load.image('botonbright', 'assets/botonbright.png');
            this.load.spritesheet('enemie', 'assets/enemie.png', 420, 247, 8);
            this.load.image('backplay', 'assets/backplay.png');
            this.load.audio('catdead', ['assets/catdead.mp3', 'assets/catdead.ogg'], false);
            this.load.audio('dogatack', ['assets/dogatack.mp3', 'assets/dogatac.ogg'], false);
            this.load.audio('laser', ['assets/laser.mp3', 'assets/laser.ogg'], false);
            this.load.audio('fondo', 'assets/fondo.mp3', true);
            this.load.spritesheet('botonPause', 'assets/pause.png', 100, 100, 2);
        };
        Preloader.prototype.create = function () {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMenu, this);
        };
        Preloader.prototype.startMenu = function () {
            this.game.state.start('Menu', true, false);
        };
        return Preloader;
    }(Phaser.State));
    Tsukthemall.Preloader = Preloader;
})(Tsukthemall || (Tsukthemall = {}));
//# sourceMappingURL=game.js.map