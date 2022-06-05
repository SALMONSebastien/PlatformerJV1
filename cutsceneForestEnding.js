class cutsceneForestEnding extends Phaser.Scene {
    constructor() {
        
        super("cutsceneForestEnding");

    }

    init(data){
        // this.health = data.health;
        
    }
        
    preload() {
        
        this.load.image('test', 'assets/test.png');

        this.load.image('bs', 'assets/blackScreen.png');

        this.load.image('gp', 'assets/testGrandPa.png');

        this.load.image('attackBox', 'assets/attackBox.png');

        this.load.image('cabinForest', 'assets/cabinForest.png');

        this.load.image('bgDialogue', 'assets/testDialogue.png');


        this.load.spritesheet('idleBig', 'assets/idleBig.png',
            { frameWidth: 303, frameHeight: 271 });


        //load de la map tiled
        this.load.image("tileset", "tiled/tileset.png");
        this.load.tilemapTiledJSON("map", "tiled/forest.json");

        //Décors

        this.load.image('tree', 'assets/Pinetree.png');

        this.load.image('cross', 'assets/cross.png');


        this.load.image('water', 'assets/main_menu/water.png');

        this.load.image('boatForest', 'assets/cutsceneSea1/boat.png');

    }
    create() {

        
        this.cursors2 = this.input.keyboard.addKeys('space, A, E');

        this.add.image(2750, 1100, 'test').setScale(1);

        this.grandSonAdult = this.add.sprite(5050, 1420, 'idleBig').setScale(0.8);

        this.add.image(5100, 1500, 'boatForest').setScale(0.7);

        
        this.add.image(5200, 1500, 'water').setScale(1);

        
        const map = this.add.tilemap("map");

        this.add.image(4720, 1500, 'cross').setScale(1.3);



        const tileset = map.addTilesetImage(
        "tileset", "tileset"
        );

        const plateformes = map.createLayer(
            "platforms",
            tileset
        );
        const details = map.createLayer(
            "details",
            tileset
        );
        
        this.threat = false;

        //Décors Foreground


        this.cabinForest = this.add.image(4100, 1300, 'cabinForest').setScale(0.65);

        this.blackFilter = this.add.image(448, 224, 'bs').setScrollFactor(0).setScale(2).setAlpha(0.15); //Assombrir un peu le background pour un effet de nuit

        this.anims.create({

            key: 'gsAdultidle',
            frames: this.anims.generateFrameNumbers('idleBig', {start:0,end:18}),
            frameRate: 7,
            repeat: -1
            
        });
    

        //création de la caméra, qui suit le joueur 
        this.cameras.main.setBounds(0, 400, 5500, 1280);
        this.cameras.main.startFollow(this.grandSonAdult);
        this.cameras.main.setZoom(1)
        this.physics.world.setBounds(0, 0, 5500, 1280);

        this.blackScreen = this.add.image(448, 224, 'bs').setScrollFactor(0).setScale(2).setAlpha(1);

        // this.fadeOut()

        this.nextLine = ""

        this.dialogueText = this.add.text(50, 150, '', { fontFamily: 'CustomFont' }).setScrollFactor(0).setScale(1.2).setVisible(true);


        this.grandSonAdult.anims.play('gsAdultidle', true);

        
        this.typewriteText('"Ne faîtes pas la même erreur que moi" nous avait imploré l’esprit de ce pêcheur. ')

        setTimeout(() => {

            this.nextLine = "cutsceneEnding2"
            
        }, 3000);


        setTimeout(() => {

            this.eButtonInfo.setVisible(true)

        }, 5000);

        this.eButtonInfo = this.add.text(550, 400, 'Appuyez sur E', { fontFamily: 'CustomFont' }).setScrollFactor(0).setScale(1.2).setVisible(true);


    }

    update(time,delta) {

        this.cutsceneEnding();

    }

    fadeOut(){

        setTimeout(() => {

            this.blackScreen.setAlpha(0.8)

            setTimeout(() => {

                this.blackScreen.setAlpha(0.6)

                setTimeout(() => {

                    this.blackScreen.setAlpha(0.4)

                    setTimeout(() => {

                        this.blackScreen.setAlpha(0.2)

                        setTimeout(() => {

                            this.blackScreen.setAlpha(0)
                
                
                        }, 100);
            
                    }, 100);
        
        
                }, 100);
    
    
            }, 100);


        }, 100);

    }


    fadeIn(){

        setTimeout(() => {

            this.blackScreen.setAlpha(0.2)

            setTimeout(() => {

                this.blackScreen.setAlpha(0.4)

                setTimeout(() => {

                    this.blackScreen.setAlpha(0.6)

                    setTimeout(() => {

                        this.blackScreen.setAlpha(0.8)

                        setTimeout(() => {

                            this.blackScreen.setAlpha(1)
                
                
                        }, 100);
            
                    }, 100);
        
        
                }, 100);
    
    
            }, 100);


        }, 100);

    }

    typewriteText(text){

        const length = text.length
        let i = 0
        this.time.addEvent({
            callback: () => {
                this.dialogueText.text += text[i]
                ++i
            },
            repeat: length - 1,
            delay: 50

	})
    }

    dialogueBox(text){
        
        this.dialogueText.setVisible(true)
        this.dialogueOnGoing = true
        

        setTimeout(() => {

            this.typewriteText(text)


        }, 200);

    }

      
    cutsceneEnding(){

        
        
        if(Phaser.Input.Keyboard.JustDown(this.cursors2.E)){


            if(this.nextLine == "cutsceneEnding2"){

                this.nextLine = "cutsceneEnding2Finish"
                    
                setTimeout(() => {

                        this.dialogueText.setText('')
                        this.eButtonInfo.setVisible(false)


                        setTimeout(() => {

                            this.typewriteText('"Pendant quelques mois, nous continuâmes à chercher le Kalastaa."')

                            setTimeout(() => {

                                this.nextLine = "cutsceneEnding3"
    
                            }, 1000);
        
                        }, 300);

                }, 1500);
            }

        }

        if(this.nextLine == "cutsceneEnding3"){

            this.nextLine = "cutsceneEnding3Finish"
                
            setTimeout(() => {
                        

                    this.dialogueText.setText('')

                    setTimeout(() => {
                        this.dialogueText. x = 350

                        this.typewriteText('"Sans succès..."')

                        setTimeout(() => {

                            this.nextLine = "cutsceneEnding4"

                        }, 1000);
    
                    }, 300);

            }, 6000);

            
        }

        if(this.nextLine == "cutsceneEnding4"){

            this.nextLine = "cutsceneEnding4Finish"
                
            setTimeout(() => {
                        

                    this.dialogueText.setText('')

                    setTimeout(() => {
                        this.dialogueText. x = 100

                        this.typewriteText('"Grand-Père est parti rejoindre les âmes des pêcheurs sur cette île."')

                        setTimeout(() => {

                            this.nextLine = "cutsceneEnding5"

                        }, 1000);
    
                    }, 300);

            }, 6000);

            
        }

        if(this.nextLine == "cutsceneEnding5"){

            this.nextLine = "cutsceneEnding5Finish"
                
            setTimeout(() => {
                        
                    this.fadeIn();
                    this.dialogueText.setText('')

                    setTimeout(() => {
                        this.dialogueText.y= 350

                        this.typewriteText('"Mais son rêve demeure toujours en mer..."')

                        setTimeout(() => {                            

                            setTimeout(() => {

                                this.scene.start("main_menu");

                            }, 7000);

                        }, 5000);
    
                    }, 300);

            }, 6000);

            
        }
    }
    
};