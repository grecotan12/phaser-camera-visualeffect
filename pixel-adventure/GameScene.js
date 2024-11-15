class GameScene extends Phaser.Scene {
    constructor() {
        super({key: 'GameScene'})
    }

    preload() {
        this.load.image('bg', 'assets/Yellow.png');
        this.load.image('terrain1', 'assets/terrain1.png');
        this.load.image('terrain2', 'assets/terrain2.png');
        this.load.spritesheet('playerOneIdle', 'assets/charOneIdle.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('playerOneRun', 'assets/charOneRun.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('playerOneJump', 'assets/charOneJump.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('playerOneHurt', 'assets/charOneHurt.png', {
            frameWidth: 32,
            frameHeight: 32
        });
    }

    create() {
        for (let i = 0; i <= this.scale.height; i+=64) {
            for (let j = 0; j <= this.scale.width; j+=64) {
                gameState.tiles.push(this.add.tileSprite(j, i, 64, 64, 'bg'));
            }
        }
        
        const platforms = this.physics.add.staticGroup();
        platforms.create(0, this.scale.height-58, 'terrain1').setOrigin(0, 0).setScale(3).refreshBody();
        platforms.create(144, this.scale.height-58, 'terrain1').setOrigin(0, 0).setScale(3).refreshBody();
        platforms.create(400, this.scale.height-200, 'terrain2').setOrigin(0, 0).setScale(2.5).refreshBody();

        gameState.player = this.physics.add.sprite(32, this.scale.height-120, 'playerOneIdle').setScale(2);
        gameState.player.setCollideWorldBounds(true);

        this.physics.add.collider(gameState.player, platforms);

        this.createAnimation();
        gameState.player.anims.play("playerOneIdle", true);

        gameState.cursors = this.input.keyboard.createCursorKeys();
    }
    
    update() {
        for (const tile of gameState.tiles) {
            tile.tilePositionY += 0.5;
        }
        this.manageInput();

        if (gameState.player.y === this.scale.height - gameState.player.height) {
            gameState.player.setVelocityY(-600);
            gameState.player.anims.play("playerOneHurt", true);
        }
    }

    manageInput() {
        if (gameState.cursors.right.isDown) {
            gameState.player.setVelocityX(150);
            gameState.player.flipX = false;
            gameState.player.anims.play("playerOneRun", true);
        } else if (gameState.cursors.left.isDown) {
            gameState.player.setVelocityX(-150);
            gameState.player.flipX = true;
            gameState.player.anims.play("playerOneRun", true);
        }
        else {
            gameState.player.setVelocityX(0);
            gameState.player.anims.play("playerOneIdle", true);
        }
        if (gameState.cursors.space.isDown && gameState.player.body.touching.down) {
            gameState.player.setVelocityY(-600);
            gameState.player.anims.play("playerOneJump", true);
        }
    }
    createAnimation() {
        this.anims.create({
            key: "playerOneIdle",
            frames: this.anims.generateFrameNames("playerOneIdle", {start: 0, end: 10}),
            delay: 0.5,
            frameRate: 20,
            repeat: -1,
        });
        this.anims.create({
            key: "playerOneRun",
            frames: this.anims.generateFrameNames("playerOneRun", {start: 0, end: 11}),
            delay: 0.5,
            frameRate: 20,
            repeat: -1,
        });
        this.anims.create({
            key: "playerOneJump",
            frames: this.anims.generateFrameNames("playerOneJump", {start: 0, end: 1}),
            delay: 0.5,
            frameRate: 20,
            repeat: -1,
        });
        this.anims.create({
            key: "playerOneHurt",
            frames: this.anims.generateFrameNames("playerOneHurt", {start: 0, end: 6}),
            delay: 0.5,
            frameRate: 20,
            repeat: -1,
        });
    }
}