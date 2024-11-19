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
    }

    create() {
        for (let i = 0; i <= this.scale.height; i+=64) {
            for (let j = 0; j <= this.scale.width; j+=64) {
                gameState.tiles.push(this.add.tileSprite(j, i, 64, 64, 'bg'));
            }
        }

        this.add.image(this.scale.width/2-150, this.scale.height/2-100, 'letterP').setScale(5);
        this.add.image(this.scale.width/2-100, this.scale.height/2-100, 'letterI').setScale(5);
        this.add.image(this.scale.width/2-50, this.scale.height/2-100, 'letterX').setScale(5);
        this.add.image(this.scale.width/2, this.scale.height/2-100, 'letterE').setScale(5);
        this.add.image(this.scale.width/2+50, this.scale.height/2-100, 'letterL').setScale(5);
        this.add.image(this.scale.width/2-200, this.scale.height/2, 'letterA').setScale(5);
        this.add.image(this.scale.width/2-150, this.scale.height/2, 'letterD').setScale(5);
        this.add.image(this.scale.width/2-100, this.scale.height/2, 'letterV').setScale(5);
        this.add.image(this.scale.width/2-50, this.scale.height/2, 'letterE').setScale(5);
        this.add.image(this.scale.width/2, this.scale.height/2, 'letterN').setScale(5);
        this.add.image(this.scale.width/2+50, this.scale.height/2, 'letterT').setScale(5);
        this.add.image(this.scale.width/2+100, this.scale.height/2, 'letterU').setScale(5);
        this.add.image(this.scale.width/2+150, this.scale.height/2, 'letterR').setScale(5);
        this.add.image(this.scale.width/2+200, this.scale.height/2, 'letterE').setScale(5);

        this.add.text(this.scale.width/2-200, this.scale.height/2+100, 'Click to Start', {
            fill: 'black',
            fontSize: 36
        });
        this.input.on('pointerup', () => {
            this.scene.stop();
            gameState.tiles = [];
            this.scene.start("LevelOne");
        });
    }

    update() {
        for (const tile of gameState.tiles) {
            tile.tilePositionY += 0.5;
        }
    }
}