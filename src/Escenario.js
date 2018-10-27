var socket = io();
class Escenario extends Phaser.Scene {
    constructor() {
        super({ key: "Escenario" });

    }
    preload() {
        this.load.spritesheet("jugador", "./assets/nave1.png", { frameWidth: 16, frameHeight: 16 });
    }
    create() {

        // this.sprite = this.physics.add.sprite(20, 40, "jugador");
        // this.sprite.body.collideWorldBounds = true;
        // this.keys = this.input.keyboard.createCursorKeys();


        this.otherPlayers = this.physics.add.group();


        socket.on('currentPlayers', function (players) {
            Object.keys(players).forEach(function (id) {
                if (players[id].playerId === socket.id) {
                    this.addPlayer(players[id]);
                }
            });
        });
        socket.on('newPlayer', function (playerInfo) {
            this.addOtherPlayers(playerInfo);
        });

        this.arr = false;
        this.aba = false;
        this.der = false;
        this.izq = false;

        this.anims.create({
            key: 'derecha',
            frames: this.anims.generateFrameNumbers("jugador", { start: 4, end: 7 }),
            frameRate: 12,
            repeat: -1,
        });
        this.anims.create({
            key: 'izquierda',
            frames: this.anims.generateFrameNumbers("jugador", { start: 12, end: 15 }),
            frameRate: 12,
            repeat: -1,
        });
        this.anims.create({
            key: 'abajo',
            frames: this.anims.generateFrameNumbers("jugador", { start: 8, end: 11 }),
            frameRate: 12,
            repeat: -1,
        });
        this.anims.create({
            key: 'arriba',
            frames: this.anims.generateFrameNumbers("jugador", { start: 0, end: 3 }),
            frameRate: 12,
            repeat: -1,
        });



        // this.nuevoUsuario();




    }
    update() {
        if (this.sprite) {
            console.log(this.sprite);

            this.sprite.body.velocity.y = 0;
            this.sprite.body.velocity.x = 0;

            if (this.keys.up.isDown) {
                this.sprite.body.velocity.y = -48;
                this.sprite.anims.play("arriba", true);
                this.arr = true;
                this.aba = false;
                this.der = false;
                this.izq = false;


            } else
                if (this.keys.down.isDown) {
                    this.sprite.body.velocity.y = 48;
                    this.sprite.anims.play("abajo", true);
                    this.arr = false;
                    this.aba = true;
                    this.der = false;
                    this.izq = false;


                } else
                    if (this.keys.right.isDown) {
                        this.sprite.body.velocity.x = 48;
                        this.sprite.anims.play("derecha", true);
                        this.arr = false;
                        this.aba = false;
                        this.der = true;
                        this.izq = false;

                    } else
                        if (this.keys.left.isDown) {
                            this.sprite.body.velocity.x = -48;
                            this.sprite.anims.play("izquierda", true);
                            this.arr = false;
                            this.aba = false;
                            this.der = false;
                            this.izq = true;

                        } else {
                            if (this.arr === true) {
                                this.sprite.setFrame(0);
                            } else {
                                if (this.aba === true) {
                                    this.sprite.setFrame(8);
                                } else {
                                    if (this.der === true) {
                                        this.sprite.setFrame(4);
                                    } else {
                                        if (this.izq === true) {
                                            this.sprite.setFrame(12);
                                        }
                                    }
                                }
                            }
                        }
        }
    }
    addPlayer(playerInfo) {
        this.sprite = this.physics.add.image(playerInfo.x, playerInfo.y, 'jugador');

    }
    addOtherPlayers(playerInfo) {
        const otherPlayer = this.add.sprite(playerInfo.x, playerInfo.y, 'jugador');

        otherPlayer.playerId = playerInfo.playerId;
        this.otherPlayers.add(otherPlayer);
    }



}