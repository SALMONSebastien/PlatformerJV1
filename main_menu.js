class main_menu extends Phaser.Scene {
    constructor() {

        super("main_menu");
    }
    preload() {
        this.load.image('main', 'assets/main_menu/main.png');

        this.load.audio('mainTheme', ['assets/music/black_sam.mp3']);

        this.load.audio('sea_sound', ['assets/sounds/wave_sound.mp3']);


        this.load.image('title', 'assets/main_menu/title.png');
        this.load.image('water', 'assets/main_menu/water.png');


        this.load.image('startButton', 'assets/startButton.png');
        this.load.image('closeButton', 'assets/closeButton.png');

        this.load.spritesheet('boat', 'assets/main_menu/boat_cutscene.png',
            { frameWidth: 792, frameHeight: 512 });
        
    }

    create() {

        this.seaSound = this.sound.add('sea_sound', {volume: 0.1});

        this.seaSound.loop = true;


        this.seaSound.play();

        

        this.add.image(450, 224, 'main').setScale(1);

        this.boatmp = this.add.sprite(550, 224, 'boat').setScale(0.7);

        this.add.image(450, 240, 'water').setScale(1);

        this.add.image(300, 120, 'title').setScale(0.8);

        this.physics.world.setBounds(0, 0, 896,448)

        
        this.cursors = this.input.keyboard.createCursorKeys();

        var startButton = this.add.image(300, 250, 'startButton').setScale(0.8).setInteractive();

            startButton.on('pointerdown', function (pointer) {

                console.log('bonjour');
                this.scene.scene.start("cutsceneBeginning");
                // this.scene.scene.start("island");

        });

        var closeButton = this.add.image(300, 350, 'closeButton').setScale(0.8).setInteractive();

            closeButton.on('pointerdown', function (pointer) {

                this.scene.scene.stop("main_menu");

        });

        this.anims.create({

            key: 'boat',
            frames: this.anims.generateFrameNumbers('boat', {start:0,end:48}),
            frameRate: 8,
            repeat: -1
            
        });

        this.boatmp.anims.play('boat', true);

        
    }

    update() {


        
    }

   
    
};