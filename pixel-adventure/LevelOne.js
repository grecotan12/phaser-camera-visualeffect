class LevelOne extends Phaser.Scene {
    constructor() {
        super({key: 'LevelOne'})
    }

    preload() {
        this.load.image('bgOne', 'assets/background/Yellow.png');
        this.load.image('terrain1', 'assets/terrain1.png');
        this.load.image('terrain2', 'assets/terrain2.png');
        this.load.image('terrain3', 'assets/terrain3.png');
        this.load.image('spikes', 'assets/spikes.png');
        this.load.image('dust', 'assets/dust.png');
        this.load.image('shadow', 'assets/Shadow.png');
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
        this.load.spritesheet('playerOneFall', 'assets/charOneFall.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('playerOneDoubleJump', 'assets/charOneDoubleJump.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('disappear', 'assets/disappear.png', {
            frameWidth: 96,
            frameHeight: 96
        });
        this.load.spritesheet('health', 'assets/Strawberry.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('pineapple', 'assets/Pineapple.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('orange', 'assets/Orange.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('arrow', 'assets/arrow.png', {
            frameWidth: 18,
            frameHeight: 18
        });
        this.load.spritesheet('rock', 'assets/rockIdle.png', {
            frameWidth: 42,
            frameHeight: 42
        });
        this.load.spritesheet('startCheckPoint', 'assets/startCheckPoint.png', {
            frameWidth: 64,
            frameHeight: 40
        });
        this.load.spritesheet('endCheckPoint', 'assets/endCheckPoint.png', {
            frameWidth: 64,
            frameHeight: 64
        });
    }

    create() {
        for (let i = 0; i <= this.scale.height; i+=64) {
            for (let j = 0; j <= this.scale.width; j+=64) {
                gameState.tiles.push(this.add.tileSprite(j, i, 64, 64, 'bgOne'));
            }
        }
        gameState.textScore = this.add.text(10, 20, `Score: ${gameState.score}`, {
            fill: 'black',
            fontSize: 24
        })
        this.add.text(this.scale.width- 420, 20, "Health", {
            fill: "black",
            fontSize: 24
        });

        gameState.health = this.add.group();
        for (let i = 50; i <= 300; i+=50) {
            gameState.health.create(this.scale.width-i, 32, "health").setScale(2);
        }

        gameState.reward = this.physics.add.staticGroup();
        
        const platforms = this.physics.add.staticGroup();
        platforms.create(0, this.scale.height-58, 'terrain1').setOrigin(0, 0).setScale(3).refreshBody();
        platforms.create(144, this.scale.height-58, 'terrain1').setOrigin(0, 0).setScale(3).refreshBody();
        platforms.create(400, this.scale.height-200, 'terrain2').setOrigin(0, 0).setScale(2.5).refreshBody();
        platforms.create(520, this.scale.height-200, 'terrain2').setOrigin(0, 0).setScale(2.5).refreshBody();
        platforms.create(0, this.scale.height-350, 'terrain1').setOrigin(0, 0).setScale(3).refreshBody();
        platforms.create(144, this.scale.height-350, 'terrain1').setOrigin(0, 0).setScale(3).refreshBody();
        platforms.create(550, this.scale.height-500, 'terrain3').setOrigin(0, 0).setScale(3).refreshBody();
        platforms.create(680, this.scale.height-500, 'terrain3').setOrigin(0, 0).setScale(3).refreshBody();
        platforms.create(0, 125, 'terrain3').setOrigin(0, 0).setScale(3).refreshBody();
        platforms.create(144, 125, 'terrain3').setOrigin(0, 0).setScale(3).refreshBody();
        platforms.create(400, 90, 'terrain2').setOrigin(0, 0).setScale(1.5).refreshBody();

        platforms.create(400, 90, 'terrain2').setOrigin(0, 0).setScale(1.5).refreshBody();

        platforms.create(900, this.scale.height-600, 'terrain3').setOrigin(0, 0).setScale(3).refreshBody();
        platforms.create(1100, this.scale.height-400, 'terrain3').setOrigin(0, 0).setScale(3).refreshBody();
        platforms.create(800, this.scale.height-250, 'terrain3').setOrigin(0, 0).setScale(3).refreshBody();

        platforms.create(this.scale.width-144, this.scale.height-58, 'terrain1').setOrigin(0, 0).setScale(3).refreshBody();

        gameState.traps = this.physics.add.group();
        gameState.traps.create(130, this.scale.height-370, 'spikes').setScale(2.5);
        gameState.traps.create(170, this.scale.height-370, 'spikes').setScale(2.5);

        const arrowX = 675;
        const arrowY = this.scale.height-520;
        gameState.traps.create(arrowX, arrowY, 'arrow').setScale(2.5);
        const rockX = 50;
        const rockY = 50;
        gameState.traps.create(rockX, rockY, 'rock').setScale(1.5);


        for (let i = 450; i < 650; i+=50) {
            gameState.reward.create(i, this.scale.height - 225, 'pineapple').setScale(2);
        }
        let upper = 1;
        for (let i = 350; i < 550; i+=50) {
            gameState.reward.create(i, (this.scale.height-350) - (35 * upper), 'orange').setScale(2);
            upper++;
        }
        
        gameState.reward.create(430, 60, 'orange').setScale(2);
        gameState.reward.create(180, 100, 'pineapple').setScale(2);
        gameState.reward.create(240, 100, 'pineapple').setScale(2);
        
        gameState.reward.create(30, this.scale.height-375, 'pineapple').setScale(2);
        gameState.reward.create(70, this.scale.height-375, 'pineapple').setScale(2);
        gameState.reward.create(925, this.scale.height-625, 'orange').setScale(2);
        gameState.reward.create(965, this.scale.height-625, 'orange').setScale(2);
        gameState.reward.create(1000, this.scale.height-625, 'orange').setScale(2);
        
        gameState.reward.create(1125, this.scale.height-425, 'pineapple').setScale(2);
        gameState.reward.create(1165, this.scale.height-425, 'pineapple').setScale(2);
        gameState.reward.create(1200, this.scale.height-425, 'pineapple').setScale(2);

        gameState.reward.create(825, this.scale.height-275, 'orange').setScale(2);
        gameState.reward.create(865, this.scale.height-275, 'orange').setScale(2);
        gameState.reward.create(900, this.scale.height-275, 'orange').setScale(2);
        
        gameState.player = this.physics.add.sprite(32, this.scale.height-120, 'playerOneIdle').setScale(2).refreshBody();
        gameState.player.setCollideWorldBounds(true);
        
        this.physics.add.collider(gameState.player, platforms);
        
        this.createAnimation();
        for (const each of gameState.health.getChildren()) {
            each.anims.play("health", true);
        }
        
        for (const each of gameState.reward.getChildren()) {
            if (each.texture.key === "pineapple") {
                each.anims.play("pineapple", true);
            }
            if (each.texture.key === "orange") {
                each.anims.play("orange", true);
            }
        }
        
        for (const each of gameState.traps.getChildren()) {
            if (each.texture.key === 'arrow') {
                each.anims.play("arrow", true);
            }
            if (each.texture.key === 'rock') {
                each.anims.play('rock', true);
            }
        }
        
        this.playTrapTweens();
        
        gameState.player.anims.play("playerOneIdle", true);
        gameState.cursors = this.input.keyboard.createCursorKeys();
        
        this.physics.add.collider(gameState.reward, platforms);
        this.physics.add.collider(gameState.traps, platforms);
        this.physics.add.overlap(gameState.player, gameState.reward, (player, each) => {
            each.destroy();
            gameState.score += 10;
            gameState.textScore.setText(`Score: ${gameState.score}`);
        });
        this.physics.add.collider(gameState.player, gameState.traps, (player, trap) => {
            gameState.isHurt = true;
            setTimeout(() => {
                gameState.isHurt = false;
            }, 100);
            const x = trap.x;
            const y = trap.y;
            const key = trap.texture.key;
            trap.destroy();
            if (gameState.health.getChildren().length > 1) {
                gameState.health.getChildren()[0].destroy();
                setTimeout(() => {
                    if (key === 'rock') {
                        const respawnTrap = gameState.traps.create(rockX, rockY, key).setScale(1.5);
                        respawnTrap.anims.play(key, true);
                        this.rockTween(respawnTrap);
                    } else if (key === 'arrow') {
                        const respawnTrap = gameState.traps.create(arrowX, arrowY, key).setScale(2.5);
                        respawnTrap.anims.play(key, true);
                        this.arrowTween(respawnTrap);
                    } else {
                        const respawnTrap = gameState.traps.create(x, y, key).setScale(2.5);
                        respawnTrap.anims.play(key, true);
                    }
                }, 500);
            }
            else {
                gameState.score = 0;
                this.scene.restart();
            }
        });
        
        
        gameState.startCheckPoint = this.add.sprite(200, this.scale.height-100, "startCheckPoint").setScale(2);
        gameState.startCheckPoint.anims.play("startCheckPoint");
        gameState.endCheckPoint = this.physics.add.staticSprite(this.scale.width-64, this.scale.height-105, "endCheckPoint").setScale(1.5);
        gameState.endCheckPoint.anims.play("endCheckPoint");

        this.physics.add.overlap(gameState.player, gameState.endCheckPoint, () => {
            this.scene.restart();
        })
        gameState.dust = this.add.sprite(gameState.player.x, gameState.player.y, "dust").setScale(2).setAlpha(0);
        gameState.shadow = this.add.sprite(gameState.player.x, gameState.player.y, "shadow").setScale(2);
    }
    
    playTrapTweens() {
        Phaser.Actions.Call(gameState.traps.getChildren(), child => {
            this.arrowTween(child);
            this.rockTween(child);
        });
    }

    rockTween(child) {
        if (child.texture.key === 'rock') {
            child.setCollideWorldBounds(true);
            this.tweens.add({
                targets: child,
                x: child.x + 200,
                ease: 'Linear',
                duration: 1800,
                repeat: -1,
                yoyo: true,
            });
        }
    }
    
    arrowTween(child) {
        if (child.texture.key === 'arrow') {
            this.tweens.add({
                targets: child,
                y: child.y - 100,
                ease: 'Linear',
                duration: 800,
                loop: -1
            });
        }
    }
    
    update() {
        gameState.dust.x = gameState.player.x-25;
        gameState.dust.y = gameState.player.y+20;
        if (!gameState.player.flipX) {
            gameState.shadow.x = gameState.player.x-30;
        } else {
            gameState.shadow.x = gameState.player.x+30;
        }
        gameState.shadow.y = gameState.player.y+20;
        for (const tile of gameState.tiles) {
            tile.tilePositionY += 0.5;
        }

        this.manageInput();
        if (gameState.player.y === this.scale.height - gameState.player.height) {
            gameState.player.setVelocityY(-600);
            gameState.player.anims.play("playerOneHurt", true);
            if (gameState.health.getChildren().length > 1) {
                gameState.health.getChildren()[0].destroy();
            }
            else {
                gameState.score = 0;
                this.scene.restart();
            }
        } 
        if (gameState.isHurt) {
            gameState.player.anims.play("playerOneHurt", true);
        }

    }

    manageInput() {
        if (gameState.cursors.right.isDown) {
            gameState.player.setVelocityX(300);
            gameState.player.flipX = false;
            gameState.player.anims.play("playerOneRun", true);
            gameState.dust.setAlpha(1);
        } else if (gameState.cursors.left.isDown) {
            gameState.player.setVelocityX(-300);
            gameState.player.flipX = true;
            gameState.player.anims.play("playerOneRun", true);
            gameState.dust.setAlpha(1);
            gameState.dust.x = gameState.player.x+25;
        }
        else {
            gameState.player.setVelocityX(0);
            gameState.player.anims.play("playerOneIdle", true);
            gameState.dust.setAlpha(0);
        }
        if (gameState.cursors.space.isDown && gameState.player.body.touching.down) {
            gameState.player.setVelocityY(-600);
            gameState.player.anims.play("playerOneJump", true);
            gameState.dust.y = gameState.player.y+25;
            gameState.shadow.y = gameState.player.y+20;
            setTimeout(() => {
                if (gameState.cursors.space.isDown && !gameState.player.body.touching.down) {
                    gameState.player.setVelocityY(-800);
                    gameState.player.anims.stop();
                    gameState.player.anims.play("playerOneDoubleJump", true);
                }
            }, 500)
        } 
        if (!gameState.cursors.space.isDown && !gameState.player.body.touching.down && !gameState.isActive) {
            gameState.player.anims.play("playerOneFall", true);
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
            frames: this.anims.generateFrameNames("playerOneJump", {start: 0, end: 0}),
            delay: 0.5,
            frameRate: 20,
            repeat: -1,
        });
        this.anims.create({
            key: "playerOneFall",
            frames: this.anims.generateFrameNames("playerOneFall", {start: 0, end: 0}),
            delay: 0.5,
            frameRate: 20,
            repeat: -1,
        });
        this.anims.create({
            key: "playerOneHurt",
            frames: this.anims.generateFrameNames("playerOneHurt", {start: 0, end: 6}),
            delay: 0.5,
            frameRate: 20,
        });
        this.anims.create({
            key: "playerOneDoubleJump",
            frames: this.anims.generateFrameNames("playerOneDoubleJump", {start: 0, end: 5}),
            delay: 0.5,
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "disappear",
            frames: this.anims.generateFrameNames("disappear", {start: 0, end: 6}),
            delay: 0.5,
            frameRate: 5,
        });
        this.anims.create({
            key: "health",
            frames: this.anims.generateFrameNames("health", {start: 0, end: 16}),
            delay: 0.5,
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "pineapple",
            frames: this.anims.generateFrameNames("pineapple", {start: 0, end: 16}),
            delay: 0.5,
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "orange",
            frames: this.anims.generateFrameNames("orange", {start: 0, end: 16}),
            delay: 0.5,
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "arrow",
            frames: this.anims.generateFrameNames("arrow", {start: 0, end: 9}),
            delay: 0.5,
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "rock",
            frames: this.anims.generateFrameNames("rock", {start: 0, end: 3}),
            delay: 0.5,
            frameRate: 3,
            repeat: -1
        });
        this.anims.create({
            key: "startCheckPoint",
            frames: this.anims.generateFrameNames("startCheckPoint", {start: 0, end: 16}),
            delay: 0.5,
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "endCheckPoint",
            frames: this.anims.generateFrameNames("endCheckPoint", {start: 0, end: 7}),
            delay: 0.5,
            frameRate: 20,
            repeat: -1
        });
    }
}