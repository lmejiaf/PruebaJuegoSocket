const config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    parent: "container",
    physics: {
        default: "arcade",
    },
    background: "#fff",
    scene: [Escenario]

}
var game = new Phaser.Game(config);
