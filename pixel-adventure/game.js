const gameState = {
    tiles: [],
    healthCount: 5,
    score: 0,
    isHurt: false,
};

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#ADD8E6',
    width: 1280,
    height: 768,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1500 },
            enableBody: true,
        }
    },
    scene: [GameScene]
}

const game = new Phaser.Game(config);