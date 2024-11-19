class StartGame extends Phaser.Scene {
    constructor() {
        super({key: 'StartGame'})
    }

    preload() {
        this.load.image('bg', 'assets/background/Green.png');
        this.load.image('letterP', 'assets/letters-black/tile015.png');
        this.load.image('letterI', 'assets/letters-black/tile008.png');
        this.load.image('letterX', 'assets/letters-black/tile023.png');
        this.load.image('letterE', 'assets/letters-black/tile004.png');
        this.load.image('letterL', 'assets/letters-black/tile011.png');
        this.load.image('letterA', 'assets/letters-black/tile000.png');
        this.load.image('letterD', 'assets/letters-black/tile003.png');
        this.load.image('letterV', 'assets/letters-black/tile021.png');
        this.load.image('letterN', 'assets/letters-black/tile013.png');
        this.load.image('letterT', 'assets/letters-black/tile019.png');
        this.load.image('letterU', 'assets/letters-black/tile020.png');
        this.load.image('letterR', 'assets/letters-black/tile017.png');

        this.load.image('nextButton', 'assets/items-effects/Next.png');
        this.load.image('previousButton', 'assets/items-effects/Previous.png');

        this.load.spritesheet('charTwoIdle', 'assets/character/charTwoIdle.png', {
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

        this.add.image(this.scale.width/2-150, this.scale.height/2-200, 'letterP').setScale(5);
        this.add.image(this.scale.width/2-100, this.scale.height/2-200, 'letterI').setScale(5);
        this.add.image(this.scale.width/2-50, this.scale.height/2-200, 'letterX').setScale(5);
        this.add.image(this.scale.width/2, this.scale.height/2-200, 'letterE').setScale(5);
        this.add.image(this.scale.width/2+50, this.scale.height/2-200, 'letterL').setScale(5);
        this.add.image(this.scale.width/2-200, this.scale.height/2-100, 'letterA').setScale(5);
        this.add.image(this.scale.width/2-150, this.scale.height/2-100, 'letterD').setScale(5);
        this.add.image(this.scale.width/2-100, this.scale.height/2-100, 'letterV').setScale(5);
        this.add.image(this.scale.width/2-50, this.scale.height/2-100, 'letterE').setScale(5);
        this.add.image(this.scale.width/2, this.scale.height/2-100, 'letterN').setScale(5);
        this.add.image(this.scale.width/2+50, this.scale.height/2-100, 'letterT').setScale(5);
        this.add.image(this.scale.width/2+100, this.scale.height/2-100, 'letterU').setScale(5);
        this.add.image(this.scale.width/2+150, this.scale.height/2-100, 'letterR').setScale(5);
        this.add.image(this.scale.width/2+200, this.scale.height/2-100, 'letterE').setScale(5);

        gameState.nextButton = this.add.image(this.scale.width/2+150, this.scale.height/2+100, 'nextButton').setScale(3);
        gameState.previousButton = this.add.image(this.scale.width/2-150, this.scale.height/2+100, 'previousButton').setScale(3);

        const character = this.physics.add.staticSprite(this.scale.width/2, this.scale.height/2+75, 'charTwoIdle').setScale(3);
        this.createAnimation();
        character.anims.play("charTwoIdle");

        gameState.nextButton.setInteractive();
        gameState.nextButton.on("pointerdown", () => {
            console.log("test");
        });
    }

    update() {
        for (const tile of gameState.tiles) {
            tile.tilePositionY += 0.5;
        }
    }

    createAnimation() {
        this.anims.create({
            key: "charTwoIdle",
            frames: this.anims.generateFrameNames("charTwoIdle", {start: 0, end: 10}),
            delay: 0.5,
            frameRate: 20,
            repeat: -1,
        });
    }
}