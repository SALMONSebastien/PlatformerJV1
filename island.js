class island extends Phaser.Scene {
    constructor() {
        
        super("island");

    }

    init(data){
        // this.health = data.health;
        this.originPoint = data.originPoint;
        this.firstVisit = data.firstVisit;
        this.goldCoins = data.goldCoins;
        this.leftEyeStatue = data.leftEyeStatue
        this.rightEyeStatue = data.rightEyeStatue
        this.keyHouse1 = data.keyHouse1
        this.enemy3defeated = data.enemy3defeated
        this.shoreThemeIsPlaying = data.shoreThemeIsPlaying


        
    }
        
    preload() {
        
        this.load.image('bgIsland', 'assets/bgIsland1.png');

        this.load.image('bs', 'assets/blackScreen.png');

        this.load.image('e_input', 'assets/e_input.png');

        this.load.image('invisibleWall', 'assets/invisibleWall.png');

        this.load.image('trigger', 'assets/trigger.png');

        this.load.image('gs', 'assets/testPlayer.png');

        this.load.image('gp', 'assets/testGrandPa.png');

        this.load.image('enemy', 'assets/testEnemy.png');

        this.load.image('detectionBox', 'assets/DetectionBox.png');

        this.load.image('attackBox', 'assets/attackBox.png');

        this.load.image('cabinForest', 'assets/cabinForest.png');

        this.load.image('rockIsland', 'assets/rockP.png');
        
        this.load.image('balcony', 'assets/balcony.png');

        this.load.image('bgDialogue', 'assets/testDialogue.png');

        this.load.image('hudGold', 'assets/hudGold.png');

        this.load.audio('shoreTheme', ['assets/music/shore_theme.mp3']);


        //load de la map tiled

        this.load.image("tilesetIsland", "tiled/tilesetIsland.png");
        this.load.tilemapTiledJSON("mapIsland", "tiled/island.json");

        //Décors

        this.load.image('tree', 'assets/Pinetree.png');
        this.load.image('statue', 'assets/statue.png');

        this.load.image('barrel', 'assets/barrel.png');



        //Animations

        this.load.spritesheet('diggingP', 'assets/animations/ParticlesDigging.png',
            { frameWidth: 64, frameHeight: 64 });

        this.load.spritesheet('gpIdle', 'assets/animations/grandPa/idleRightLight.png',
            { frameWidth: 126, frameHeight: 135 });

        this.load.spritesheet('gpAttack1', 'assets/animations/grandPa/attack1armed1.png',
            { frameWidth: 277.85, frameHeight: 135.6 });

        this.load.spritesheet('gpDigging', 'assets/animations/grandPa/rightDigging.png',
            { frameWidth: 232, frameHeight: 125 });

        this.load.spritesheet('gpWalking', 'assets/animations/grandPa/walkingRightLight.png',
            { frameWidth: 135.4444, frameHeight: 133 });

        this.load.spritesheet('gsIdle', 'assets/animations/grandSon/idle.png',
            { frameWidth: 72.8, frameHeight: 101.3 });

        this.load.spritesheet('gsWalking', 'assets/animations/grandSon/walking.png',
            { frameWidth: 72.8, frameHeight: 101.3 });

        this.load.spritesheet('gsJumping', 'assets/animations/grandSon/jump.png',
            { frameWidth: 88.8, frameHeight: 142.3 });
            
        this.load.spritesheet('gsBigJump', 'assets/animations/grandSon/bigJump.png',
            { frameWidth: 120, frameHeight: 176 });

        this.load.spritesheet('fmAttack', 'assets/animations/fisherman/attack.png',
            { frameWidth: 368, frameHeight: 238 });

        this.load.spritesheet('fmDamage', 'assets/animations/fisherman/damage.png',
            { frameWidth: 312, frameHeight: 252 });

        this.load.spritesheet('fmIdle', 'assets/animations/fisherman/idle.png',
            { frameWidth: 305, frameHeight: 250 });



    }

    
    create() {

        this.cursors = this.input.keyboard.createCursorKeys();
        this.cursors2 = this.input.keyboard.addKeys('space, A, E');

        this.colliders = this.physics.add.staticGroup();
        
        this.add.image(3000, 1650, 'bgIsland').setScale(1);
        
        //Décors Background 

        this.pinetree = this.add.group();

        // Chargement et lancement du thème de l'île

        this.shoreTheme = this.sound.add('shoreTheme');

        this.shoreTheme.loop = true;
        

        if(this.shoreThemeIsPlaying != true){

            this.shoreThemeIsPlaying = false

        }


        if(this.shoreThemeIsPlaying == false){

            this.shoreTheme.play();
            this.shoreThemeIsPlaying = true



        }

        const mapIsland = this.add.tilemap("mapIsland");


        const tilesetIsland = mapIsland.addTilesetImage(
        "tilesetIsland", "tilesetIsland"
        );

        const plateformes1 = mapIsland.createLayer(
            "platformsIsland",
            tilesetIsland
        );
        
        // this.statue = this.add.image(3200, 2550, 'statue').setScale(0.7);

        
        this.threat = false;


        //Décors Foreground

        this.rockIsland = this.physics.add.sprite(1900, 2600, 'rockIsland').setScale(1);
        this.blackFilter = this.add.image(448, 224, 'bs').setScrollFactor(0).setScale(3).setAlpha(0.15); //Assombrir un peu le background pour un effet de nuit
        this.particleDig3 = this.add.sprite(550, 2800, 'diggingP').setScale(1);

        this.particleDig4 = this.add.sprite(5500, 2550, 'diggingP').setScale(1);

        //enemies

        this.enemyFisherman = this.physics.add.staticGroup();
        // this.enemyCrow = this.physics.add.staticGroup(); // à l'origine, l'ennemi devait être un corbeau fantôme

        // this.crowDefeated = false;

        this.enemy2 = this.enemyFisherman.create(1050, 2820, 'fmIdle').setScale(0.6).setVisible(true);


        this.enemy3 = this.enemyFisherman.create(3600, 2560, 'fmIdle').setScale(0.6).setVisible(false);

        this.enemy2.pv = 3;

        this.enemy3.pv = 3;

        this.enemy3.action = "idle";


        //gold 

        this.barrel1 = this.add.image(2100, 2580, 'barrel').setScale(1);
        
        //characters

        
        if(this.firstVisit != 1) {

            this.firstVisit = 0;

        }

        if(this.firstVisit == 0) {

            this.firstVisit = 1;
            this.originPoint = "";

        }

    
            if(this.originPoint == "") { // spawn sur la plage par défaut
                this.grandSon = this.physics.add.sprite(290, 2800, 'gs').setScale(1);

                // this.grandSon = this.physics.add.sprite(2000, 2500, 'gs').setScale(1);

                this.grandPa = this.physics.add.sprite(260, 2800, 'gp').setScale(1.2).setSize(80,100).setOffset(15,0);
            } 

            else if (this.originPoint == "house1"){

                this.grandSon = this.physics.add.sprite(2685, 2585, 'gs').setScale(1);
                this.grandPa = this.physics.add.sprite(2700, 2585, 'gp').setScale(1.2).setSize(80,100).setOffset(15,0);

            }

            else if (this.originPoint == "house2"){

                this.grandSon = this.physics.add.sprite(3950, 2580, 'gs').setScale(1);
                this.grandPa = this.physics.add.sprite(3970, 2580, 'gp').setScale(1.2).setSize(80,100).setOffset(15,0);

            }

            else if (this.originPoint == "house4"){

                this.grandSon = this.physics.add.sprite(3650, 1815, 'gs').setScale(1);
                this.grandPa = this.physics.add.sprite(3630, 1815, 'gp').setScale(1.2).setSize(80,100).setOffset(15,0);

            }

            else if (this.originPoint == "vault"){

                this.grandSon = this.physics.add.sprite(3220, 2580, 'gs').setScale(1);
                this.grandPa = this.physics.add.sprite(3200, 2580, 'gp').setScale(1.2).setSize(80,100).setOffset(15,0);

            }


        
        this.detectionBox = this.physics.add.staticGroup();

        this.attackHitbox = this.physics.add.sprite(this.grandPa.x, this.grandPa.y, 'attackBox').setScale(1);
        // this.warp = this.physics.add.sprite(5000, 1300, 'attackBox').setScale(3);

        this.statueColliderDiscovery = this.detectionBox.create(3200, 2550, 'attackBox').setScale(3);

        if (this.enemy3defeated){

            this.statueColliderEyes = this.detectionBox.create(3200, 2550, 'attackBox').setScale(3);

        }

        if (this.originPoint == ""){

            this.goldCoins = 0; //Monnaie de l'île
            this.keyHouse1 = false;
            this.leftEyeStatue = false;
            this.rightEyeStatue = false;
            this.enemy3defeated = false


        }

        this.vaultAccess = false

        if (this.leftEyeStatue && this.rightEyeStatue){

            this.vaultAccess = true
            this.statueColliderDiscovery.destroy()
            this.shoreTheme.stop();

        }

       

        this.stopGrandPaRock = this.detectionBox.create(this.rockIsland.x - 200, this.rockIsland.y + 150, 'attackBox').setScale(1);


        this.grandPaStopped = false;
        
        this.digHoleFinish3 = false;

        this.digHoleFinish4 = false;


        this.diggingHole3 = this.detectionBox.create(this.particleDig3.x, this.particleDig3.y, 'attackBox').setScale(1).setSize(150,200); //pièces d'or

        this.diggingHole4 = this.detectionBox.create(this.particleDig4.x, this.particleDig4.y, 'attackBox').setScale(1).setSize(150,200); //pièces d'or



        //Points d'entrée des maisons 

        this.entranceBox = this.physics.add.staticGroup();

        this.villageHouseEntrance1 = this.entranceBox.create(2750,2580, 'attackBox').setScale(1);
        this.villageHouseEntrance2 = this.entranceBox.create(3950,2580, 'attackBox').setScale(1);
        this.villageHouseEntrance3 = this.entranceBox.create(4800,2580, 'attackBox').setScale(1);

        this.villageHouseEntrance4 = this.entranceBox.create(3600,1750, 'attackBox').setScale(1);

        
        this.add.image(4847, 2145, 'balcony').setScale(1);

        

        this.house1Locked = true


        //Objets statues 

        


        // Murs invisibles 

        this.invisibleWall = this.physics.add.sprite(1400, 2600, 'invisibleWall').setScale(1).setVisible(false);
        this.invisibleWall.body.setAllowGravity(false)
        this.invisibleWall.setImmovable(true)

        this.invisibleWall2 = this.physics.add.sprite(3850, 2590, 'invisibleWall').setScale(1).setVisible(false);
        this.invisibleWall2.body.setAllowGravity(false)
        this.invisibleWall2.setImmovable(true)

        this.invisibleWall3 = this.physics.add.sprite(3040, 1600, 'invisibleWall').setScale(1).setVisible(false);
        this.invisibleWall3.body.setAllowGravity(false)
        this.invisibleWall3.setImmovable(true)


        // trigger progression

        this.trigger1 = this.detectionBox.create(850, 2600, 'trigger').setScale(1).setVisible(false);
        this.trigger2 = this.detectionBox.create(this.rockIsland.x + 50, this.rockIsland.y, 'trigger').setScale(1).setVisible(false); // Déplace le 'mur invisible' pour empêcher le retour sur la plage 

        

        //Compétences 

        this.grandPaCarry = false;

        this.grandPaThrow = false;


        this.activePlayer = this.grandSon;
        this.inactivePlayer = this.grandPa;

        

        this.enemy2DB = this.detectionBox.create(this.enemy2.x, this.enemy2.y - 150, 'detectionBox').setSize(500,300);

        this.enemy3DB = this.detectionBox.create(this.enemy3.x, this.enemy3.y - 150, 'detectionBox').setSize(500,300);

        
        plateformes1.setCollisionByProperty({isSolid: true})
       
        this.physics.add.collider(this.grandSon, plateformes1);
        this.physics.add.collider(this.enemy2DB, plateformes1);
        this.physics.add.collider(this.attackHitbox, plateformes1);
        this.physics.add.collider(this.grandPa, plateformes1);
        this.physics.add.collider(this.rockIsland, plateformes1);
        
        this.physics.add.collider(this.grandSon, this.invisibleWall);
        this.physics.add.collider(this.grandPa, this.invisibleWall);

        if(this.enemy3defeated == false){

            this.physics.add.collider(this.grandSon, this.invisibleWall2);
            this.physics.add.collider(this.grandPa, this.invisibleWall2);

        }

        this.physics.add.collider(this.grandSon, this.invisibleWall3);
        this.physics.add.collider(this.grandPa, this.invisibleWall3);

        
        // this.physics.add.overlap(this.activePlayer, this.detectionBox,this.threatTrigger,null,this);
        this.physics.add.overlap(this.attackHitbox, this.enemy2, this.hurtEnemy, null, this);
        this.physics.add.overlap(this.attackHitbox, this.enemy3, this.hurtEnemy, null, this);
        this.physics.add.overlap(this.grandSon, this.diggingHole3, this.digging3, null, this);
        this.physics.add.overlap(this.grandSon, this.diggingHole4, this.digging4, null, this);

        this.physics.add.overlap(this.grandSon, this.statueColliderDiscovery, this.statueDiscovery, null, this);

        this.physics.add.overlap(this.grandSon, this.statueColliderEyes, this.statueOpening, null, this);


        // this.physics.add.overlap(this.grandSon, this.warp, this.warpIsland, null, this);

        this.physics.add.overlap(this.grandSon, this.stopGrandPaRock, this.stopGrandPa, null, this);
        this.physics.add.overlap(this.grandSon, this.stopGrandPaRock, this.stopGrandPaRockDialogue, null, this);

        // Maisons 

        this.physics.add.overlap(this.grandSon, this.villageHouseEntrance1, this.entranceHouse, null, this);
        this.physics.add.overlap(this.grandSon, this.villageHouseEntrance2, this.entranceHouse, null, this);
        this.physics.add.overlap(this.grandSon, this.villageHouseEntrance3, this.entranceHouse, null, this);
        this.physics.add.overlap(this.grandSon, this.villageHouseEntrance4, this.entranceHouse, null, this);




        


        //Triggers

        this.physics.add.overlap(this.grandSon, this.trigger1,this.threatTrigger,null,this);
        this.physics.add.overlap(this.grandSon, this.trigger2,this.wallMovement2,null,this);


        // Décors 

        this.physics.add.collider(this.grandSon, this.rockIsland);
        this.physics.add.collider(this.grandPa, this.rockIsland);



        //Lancer le petit fils
        this.physics.add.overlap(this.attackHitbox, this.activePlayer, this.throwGrandSon, null, this);

        //warp vers une autre zone
        // this.physics.add.overlap(this.warp, this.activePlayer, this.warpNewArea, null, this);


        // this.nextArea = "island";
        
    
        //HUD

        // this.playerXtext = this.add.text(-280, -100, this.grandSon.x).setScrollFactor(0).setScale(2);

        // this.playerYtext = this.add.text(-280, -50, this.grandSon.y).setScrollFactor(0).setScale(2);

        this.goldText = this.add.text((896 - (896*2)/2) + 1250, (448 - (448*2)/2) + 600, this.goldCoins).setScrollFactor(0).setScale(2).setVisible(false);

        this.goldHud = this.add.image((896 - (896*2)/2) + 1180, (448 - (448*2)/2) + 600, 'hudGold').setScrollFactor(0).setScale(1).setVisible(false);

        
        this.inputDisplayed = this.add.image(0, 0, 'e_input').setScrollFactor(1).setScale(1).setVisible(false);
        


        //création de la caméra, qui suit le joueur 
        this.cameras.main.setBounds(0, 400, 6000, 3000);
        this.cameras.main.startFollow(this.grandSon);
        this.cameras.main.setZoom(0.5)
        this.cameras.main.followOffset.y = -100;
        this.physics.world.setBounds(0, 200, 6000, 3000);

        //Variables Trigger 

        this.shovelCollected = true;
        this.harpoonCollected = true;

        //Dialogues

        this.dialogueOnGoing = false;

        this.bgDialogue = this.add.image(930, -10, 'bgDialogue').setScrollFactor(0).setVisible(false);
        this.dialogueText = this.add.text(580, -160, '', { fontFamily: 'CustomFont' }).setScrollFactor(0).setScale(2).setVisible(false);
        
        this.nextLine = "";

        // this.typewriteText('Je suis un test de texte')
        
        // if(this.originPoint == "") { // tp de tests
        //     this.grandSon.y = 2200
        //     this.grandSon.x = 2200

        //     this.grandPa.y = 2100
        //     this.grandPa.x = this.grandSon.x - 20
        // }

        //Animations 


        this.anims.create({

            key: 'glow',
            frames: this.anims.generateFrameNumbers('diggingP', {start:0,end:3}),
            frameRate: 7,
            repeat: -1
            
        });


        //Animations - GrandPa

        this.anims.create({

            key: 'gpIdle',
            frames: this.anims.generateFrameNumbers('gpIdle', {start:0,end:17}),
            frameRate: 12,
            repeat: -1
            
        });

        this.anims.create({

            key: 'gpWalking',
            frames: this.anims.generateFrameNumbers('gpWalking', {start:0,end:18}),
            frameRate: 12,
            repeat: -1
            
        });

        this.anims.create({

            key: 'gpDigging',
            frames: this.anims.generateFrameNumbers('gpDigging', {start:0,end:11}),
            frameRate: 7,
            repeat: 0
            
        });

        this.anims.create({

            key: 'gpAttack1',
            frames: this.anims.generateFrameNumbers('gpAttack1', {start:0,end:18}),
            frameRate: 25,
            repeat: 0
            
        });

        //Animations - GrandSon

        this.anims.create({

            key: 'gsIdle',
            frames: this.anims.generateFrameNumbers('gsIdle', {start:0,end:18}),
            frameRate: 12,
            repeat: -1
            
        });

        this.anims.create({

            key: 'gsWalking',
            frames: this.anims.generateFrameNumbers('gsWalking', {start:0,end:18}),
            frameRate: 25,
            repeat: -1
            
        });

        this.anims.create({

            key: 'gsJumping',
            frames: this.anims.generateFrameNumbers('gsJumping', {start:0,end:18}),
            frameRate: 20,
            repeat: 0
            
        });

        this.anims.create({

            key: 'gsBigJump',
            frames: this.anims.generateFrameNumbers('gsBigJump', {start:0,end:18}),
            frameRate: 20,
            repeat: 0
            
        });

        this.anims.create({

            key: 'fmIdle',
            frames: this.anims.generateFrameNumbers('fmIdle', {start:0,end:22}),
            frameRate: 20,
            repeat: -1
            
        });

        this.anims.create({

            key: 'fmAttack',
            frames: this.anims.generateFrameNumbers('fmAttack', {start:0,end:10}),
            frameRate: 20,
            repeat: 0
            
        });

        this.anims.create({

            key: 'fmDamage',
            frames: this.anims.generateFrameNumbers('fmDamage', {start:0,end:10}),
            frameRate: 20,
            repeat: 0
            
        });

        
        //Black screen (fade in and out)

        this.blackScreen = this.add.image(448, 224, 'bs').setScrollFactor(0).setScale(3).setAlpha(1);

        this.fadeOut()

        this.rockIsland.setImmovable(true)




        // interactions île

        this.cutscene = false; //Empêche les contrôles 

        this.statueDiscovery = false; //Check si GrandSon a déjà vu la statue ou non

        // coins (empêche de re-looter ces barils)

        if (this.barrel1Looted != true) {

            this.barrel1Looted = false;

        }

        if (this.barrel2Looted != true) {

            this.barrel2Looted = false;

        }

        if (this.barrel3Looted != true) {

            this.barrel3Looted = false;

        }


        this.grandPa.anims.play('gpIdle', true);

        if(this.keyHouse1 == true){

            console.log('Vous avez la clé')

        }

        if(this.keyHouse1 == false){

            console.log('Vous n’avez pas la clé')

        }

        if(this.leftEyeStatue == true){

            console.log('Vous avez l’oeil gauche')

        }

        if(this.leftEyeStatue == false){

            console.log('Vous n’avez pas l’oeil gauche')

        }

        if(this.rightEyeStatue == true){

            console.log('Vous avez l’oeil droit')

        }

        if(this.rightEyeStatue == false){

            console.log('Vous n’avez pas l’oeil droit')

        }
        
    }

    update(time,delta) { 

        this.cutsceneStatue()
        this.inputDisplay()
        this.stopGrandPaRockDialogue2()

        this.cameras.main.followOffset.y = 150;

        // Barrel 1

        if(this.grandSon.x > 2040 &&   this.grandSon.x < 2170 && this.grandSon.y > 2500 && this.grandSon.y < 2600){

            this.inputDisplayed.setVisible(true);
            this.inputDisplayed.x = this.grandSon.x + 50;
            this.inputDisplayed.y = this.grandSon.y - 50;

        }

        //Barrel 2

        if(this.grandSon.x > 4750 &&   this.grandSon.x < 4850 && this.grandSon.y > 2000 && this.grandSon.y < 2150){

            this.inputDisplayed.setVisible(true);
            this.inputDisplayed.x = this.grandSon.x + 50;
            this.inputDisplayed.y = this.grandSon.y - 50;

        }


        //Barrel 3

        if(this.grandSon.x > 3820 &&   this.grandSon.x < 3920 && this.grandSon.y > 1700 && this.grandSon.y < 1830){

            this.inputDisplayed.setVisible(true);
            this.inputDisplayed.x = this.grandSon.x + 50;
            this.inputDisplayed.y = this.grandSon.y - 50;

        }


        //coins collected

        if(this.grandSon.x > 2040 &&   this.grandSon.x < 2170 && this.grandSon.y > 2500 && this.grandSon.y < 2600){

            if (Phaser.Input.Keyboard.JustDown(this.cursors2.E)){

                if(this.barrel1Looted == false){

                    this.goldCoins += 10
                    this.barrel1Looted = true;
                
                }
                
            } 
        }

        if(this.grandSon.x > 4750 &&   this.grandSon.x < 4850 && this.grandSon.y > 2000 && this.grandSon.y < 2150){

            if (Phaser.Input.Keyboard.JustDown(this.cursors2.E)){

                if(this.barrel2Looted == false){

                    this.goldCoins += 15
                    this.barrel2Looted = true;
                
                }
                
            }
        }


        if(this.grandSon.x > 3820 &&   this.grandSon.x < 3920 && this.grandSon.y > 1700 && this.grandSon.y < 1830){

            if (Phaser.Input.Keyboard.JustDown(this.cursors2.E)){

                if(this.barrel3Looted == false){

                    this.goldCoins += 10
                    this.barrel3Looted = true;
                
                }
            }
        }
       
       


        this.dialogueEnd()

        this.passageDescription()


        if(!this.cutscene){

            playerControls(this.activePlayer,this.cursors);

        }

        this.goldText.setText(this.goldCoins); 


        // this.playerXtext.setText(this.activePlayer.x); 
        // this.playerYtext.setText(this.activePlayer.y);

        this.enemy2DB.x = this.enemy2.x;
        this.enemy2DB.y = this.enemy2.y - 150;

        this.attackHitbox.x = this.grandPa.x;
        this.attackHitbox.y = this.grandPa.y - 50;


        // this.warp.body.setAllowGravity(false);
        this.attackHitbox.body.setAllowGravity(false)

        //Animations 
        if (this.digHoleFinish3 == false){

            this.particleDig3.anims.play('glow', true);  

        }


        if (this.digHoleFinish4 == false){

            this.particleDig4.anims.play('glow', true);  

        }
        
        //Animations Fisherman 

        if(this.enemy3.pv > 0 && this.enemy3.action == "idle"){
        
            this.enemy3.anims.play('fmIdle', true); 
             

        }

        if(this.enemy3.pv > 0 && this.enemy3.action == "attack"){
        
            this.enemy3.anims.play('fmAttack', true); 
             

        }

        if(this.enemy3.pv > 0 && this.enemy3.action == "damage"){
        
            this.enemy3.anims.play('fmDamage', true); 
             

        }


        //Animations GrandPa

        // this.grandPa.anims.play('gpIdleRightLight', true);  

        if (this.activePlayer.direction == "left"){

            this.grandPa.flipX=true;
            

        }

        else if (this.activePlayer.direction == "right"){

            this.grandPa.flipX=false;
            

        }

    
        if (this.grandPa.walking == false && this.grandPa.attacking == false && this.grandPa.digging == false){

            this.grandPa.anims.play('gpIdle', true);

        }

        if(this.activePlayer.walking == true){
        
            this.grandPa.anims.play('gpWalking', true);  

        }

        if( Phaser.Input.Keyboard.JustDown(this.cursors2.A) && this.activePlayer == this.grandPa){
        
            this.grandPa.anims.play('gpAttack1', true);
            this.grandPa.attacking = true

        }

        

        
        //Animations GrandSon

    

        if (this.activePlayer.direction == "left"){

            this.grandSon.flipX=true;

        }

        if (this.activePlayer.direction == "right"){

            this.grandSon.flipX=false;

        }

        if(this.activePlayer.walking == true && this.activePlayer.jumping == false ){
        
            this.grandSon.anims.play('gsWalking', true); 
             

        }

        if(this.activePlayer.walking == true && this.activePlayer.jumping == true){
        
            this.grandSon.anims.play('gsJumping', true);  

        }

        if(this.activePlayer.walking == false && this.activePlayer.jumping == true){
        
            this.grandSon.anims.play('gsJumping', true);  

        }


        if(this.activePlayer.walking == false && this.activePlayer.jumping == false){
        
            this.grandSon.anims.play('gsIdle', true);  

        }

        




        //Mort ennemi

        if (this.enemy2.pv <= 0 && this.enemy2.alpha != 0){


            this.enemy2.setAlpha(0);
            this.enemy2DB.destroy();
            this.wallMovement1()

            this.threat = false;
            this.cameras.main.followOffset.y = 150;

            
        }

        if (this.enemy3.pv <= 0){


            this.enemy3.setAlpha(0);
            this.enemy3DB.destroy();

            this.threat = false;
            this.cameras.main.followOffset.y = 150;
            this.invisibleWall2.destroy();
            this.enemy3defeated = true;


        
        }

        //reset placement si l'active player tombe 

        if (this.activePlayer.y <= -1000){

            this.activePlayer.y = 1500

        }


        if (this.activePlayer.direction == "left"  && this.cutscene == false && this.grandPaStopped == false){
            this.tweens.add({
                targets: this.inactivePlayer,
                x: this.activePlayer.x + 100,
                duration: 2000,
                ease: 'Power2',
                completeDelay: 3000
            });
        }

        else if (this.activePlayer.direction == "right" && this.cutscene == false && this.grandPaStopped == false){
            this.tweens.add({
                targets: this.inactivePlayer,
                x: this.activePlayer.x - 100,
                duration: 2000,
                ease: 'Power2',
                completeDelay: 3000
            });
        }


        if (this.threat){

            this.switchChara1();

        }

        else if (this.threat == false){

            this.switchChara2();

        }

        //Compétences triggered

        //Porter le petit fils sur ses épaules

        if (Phaser.Input.Keyboard.JustDown(this.cursors.shift)){

            if (this.grandPaCarry == false){
                this.grandPaCarry = true;
                this.grandSon.body.setAllowGravity(false)
                this.threat = true;
            }

            else {

                this.grandPaCarry = false;
                this.grandSon.body.setAllowGravity(true)
                this.threat = false;

            }
        }


        if (this.grandPaCarry == true){

            this.grandSon.x = this.grandPa.x
            this.grandSon.y = this.grandPa.y - 100;
            

        }

        if(this.dialogueOnGoing && this.dialogueText == "La porte semble fermée à clé"){

            if(Phaser.Input.Keyboard.JustDown(this.cursors2.E)){

                setTimeout(() => {

                    this.dialogueText.setText(''); 
                    this.dialogueOnGoing = false;

                }, 100);
            }

        }


        if (this.goldCoins > 0){

            this.goldText.setVisible(true);
            this.goldHud.setVisible(true);

        }


        if (Phaser.Input.Keyboard.JustDown(this.cursors2.A)){

            this.grandPa.attacking = true

            setTimeout(() => {

                this.grandPa.attacking = false

            }, 1200);

        }

        // console.log(this.dialogueOnGoing)
        // console.log(this.nextLine)


    }

    threatTrigger(){

        if (this.enemy2.pv > 0){
        
            this.cameras.main.followOffset.y = 150;

            this.threat = true;

        }

    }

    switchChara1(){
        if (this.activePlayer == this.grandSon){

            this.grandSon.setVelocityX(0);
            this.activePlayer = this.grandPa;
            this.inactivePlayer = this.grandSon;
            this.cameras.main.startFollow(this.grandPa);
            this.grandSon.body.setAllowGravity(false) //A tester

        }

    }

    switchChara2(){
        if (this.activePlayer == this.grandPa){

            this.grandSon.setVelocityX(0);
            this.activePlayer = this.grandSon;
            this.inactivePlayer = this.grandPa;
            this.cameras.main.startFollow(this.grandSon);
            this.grandSon.body.setAllowGravity(true) //A tester


        }


    }

    
    hurtEnemy(hitbox, enemy){
        if (Phaser.Input.Keyboard.JustDown(this.cursors2.A)){

            this.grandPa.anims.play('gpAttack1', true);
            this.grandPa.attacking = true
            enemy.pv -= 1; 
            
        }

    }

    throwGrandSon(){
        

        if (Phaser.Input.Keyboard.JustDown(this.cursors.space) && this.activePlayer == this.grandSon){
            if (this.grandPaThrow == false){
                this.grandPaThrow = true;
                
                setTimeout(() => {

                    this.activePlayer.setVelocityY(-1200)
                    this.activePlayer.angle -= 40
                    

                    this.grandSon.anims.play('gsBigJump', true);
                     
                    setTimeout(() => {

                        this.activePlayer.setVelocityY(-700)
                        this.grandPaThrow = false;
                        
                    }, 200);

                }, 300);
                
            }
        }
    }

    warpIsland(){
        // if(this.harpoonCollected == true){

        //     // area = this.nextArea
        //     this.scene.start("island");

        // }

        this.scene.start("island");
    }


    digging3(){

        if(Phaser.Input.Keyboard.JustDown(this.cursors2.E) && this.shovelCollected){

            this.diggingHole3.destroy();

            this.grandPa.anims.play('gpDigging', true);
            
            this.grandPa.digging = true
            this.goldCoins += 10;
            
            
            this.digHoleFinish3 = true;

            this.dialogueOnGoing = true;
            this.dialogueBox('Ces pièces... Elles sont très anciennes...')
            

            setTimeout(() => {

                this.particleDig3.destroy();

                

            }, 200);

        }

    }

    digging4(){

        if(Phaser.Input.Keyboard.JustDown(this.cursors2.E) && this.shovelCollected){

            this.diggingHole4.destroy();

            this.grandPa.anims.play('gpDigging', true);
            
            this.grandPa.digging = true
            this.goldCoins += 15;
            
            
            this.digHoleFinish4 = true;

            setTimeout(() => {

                this.particleDig4.destroy();

                

            }, 200);
        }

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
        
        this.bgDialogue.setVisible(true)
        this.dialogueText.setVisible(true)
        this.dialogueOnGoing = true
        

        setTimeout(() => {

            this.typewriteText(text)


        }, 200);

    }

    dialogueEnd(){
        if(this.dialogueOnGoing && this.nextLine == ""){
            if(Phaser.Input.Keyboard.JustDown(this.cursors2.E)){

                setTimeout(() => {

                    this.dialogueOnGoing = false;
                    this.bgDialogue.setVisible(false)
                    this.dialogueText.setVisible(false)
                    this.dialogueText.setText(''); 

                }, 100);
            }

        }

        else {
            if(!this.dialogueOnGoing){
                if(Phaser.Input.Keyboard.JustDown(this.cursors2.E)){

                    setTimeout(() => {

                        // console.log('aucun dialogue détecté')
            
                    }, 100);
                }
            }

        }

        
    }


    // interaction île

    statueDiscovery(){
        
        

        if(Phaser.Input.Keyboard.JustDown(this.cursors2.E) && this.vaultAccess == false){

            this.dialogueOnGoing = true;
            this.dialogueBox('"Oscar le redoutable, faisant face au Kalastaa.\nLe dévoreur des mers."')
            this.statueColliderDiscovery.destroy()
            

            setTimeout(() => {

                this.grandPa.x = this.grandSon.x - 1000 
                this.grandPa.y = 2400

                setTimeout(() => {

                    this.grandPaStopped = false
                    this.nextLine = "Kalastaa";

                    
                    setTimeout(() => {

                        this.cutscene = true;
                        
        
                    }, 800);
        
                }, 300);

    
            }, 300);
        
        }

        
    }

    statueOpening(){
        
        

        if(Phaser.Input.Keyboard.JustDown(this.cursors2.E) && this.vaultAccess == true){

            this.dialogueText.setText('')

            this.shoreTheme.stop();

            this.dialogueOnGoing = true;
            this.dialogueBox('Vous insérez les gemmes dans la statue')
            this.statueColliderEyes.destroy()
            this.nextLine = "passageSecret"


            

            setTimeout(() => {

                this.cameras.main.shake(1500, 0.05);    
                this.shoreTheme.stop();
            
                console.log('salut')

    
            }, 3000);
        
        }

    }

    passageDescription(){

        if(this.dialogueOnGoing && this.nextLine == "passageSecret"){

            if(Phaser.Input.Keyboard.JustDown(this.cursors2.E)){
                this.shoreTheme.stop();


                this.dialogueText.setText(''); 
                this.nextLine = ""


                setTimeout(() => {

                    this.dialogueBox('Un passage souterrain s’est révélé sous la\nstatue !')

                    setTimeout(() => {

                        this.scene.start("vault", {goldCoins : this.goldCoins, originPoint : this.originPoint, leftEyeStatue : this.leftEyeStatue, rightEyeStatue : this.rightEyeStatue, keyHouse1 : this.keyHouse1, enemy3defeated: this.enemy3defeated, firstVisit : this.firstVisit});
    
                    }, 3000);
        
                }, 100);
               
            }

        }

    }




    stopGrandPa(){

        setTimeout(() => {

            this.grandPaStopped = true;
            
        }, 300);

    }

    

    cutsceneStatue(){

        if(this.dialogueOnGoing && this.nextLine == "Kalastaa"){

            if(Phaser.Input.Keyboard.JustDown(this.cursors2.E)){

                setTimeout(() => {

                    this.dialogueText.setText(''); 

                    setTimeout(() => {

                        this.dialogueBox('"Le voilà... Le Kalastaa. Les habitants de cette\nîle semblent avoir combattu cette créature\nautrefois"')
                        this.nextLine = "Kalastaa2"
    
                    }, 100);

                }, 100);
            }

        }

        if(this.dialogueOnGoing && this.nextLine == "Kalastaa2"){

            if(Phaser.Input.Keyboard.JustDown(this.cursors2.E)){

                setTimeout(() => {

                    this.dialogueText.setText(''); 

                    setTimeout(() => {

                        this.dialogueBox('Il semble que les yeux du poisson aient été\nretirés')
                        this.nextLine = "Kalastaa3";
                        this.enemy3.setVisible(true);
                        //bruit


                    }, 100);

                }, 100);
            }

        }

        if(this.dialogueOnGoing && this.nextLine == "Kalastaa3"){

            if(Phaser.Input.Keyboard.JustDown(this.cursors2.E)){

                setTimeout(() => {

                    this.dialogueText.setText(''); 

                    setTimeout(() => {

                        this.dialogueBox('"Attention petit, un esprit !"')
                        this.nextLine = "fishermanAngry";
                        this.enemy3.setVisible(true);


                    }, 100);

                }, 100);
            }

        }


        if(this.dialogueOnGoing && this.nextLine == "fishermanAngry"){

            if(Phaser.Input.Keyboard.JustDown(this.cursors2.E)){

                setTimeout(() => {

                    this.dialogueText.setText(''); 

                    setTimeout(() => {

                        this.dialogueBox('Vous allez périr.\nSi notre chef n’a pas pu vaincre cette créature,\n nous ne vous laisserons pas y arriver !')
                        this.nextLine = "";
                        this.cutscene = false;
                        this.threat = true;
                        this.cameras.main.followOffset.y = 150;
                        
                    }, 100);

                }, 100);
            }

        }
    }

    wallMovement1(){

        this.invisibleWall.x = 0;

    }

    wallMovement2(){

        this.invisibleWall.x = this.grandSon.x - 100;

    }

    entranceHouse(){

        if(Phaser.Input.Keyboard.JustDown(this.cursors2.E)){
            if (this.grandSon.x >2600 && this.grandSon.x < 2900){

                // accès refusé 
                if(this.keyHouse1 == false && this.villageHouseEntrance1.visible == true && this.house1Locked == true){

                    this.dialogueOnGoing = true;
                    this.villageHouseEntrance1.setVisible(false)
                    this.dialogueBox('La porte semble fermée à clé')

                    setTimeout(() => {

                        this.villageHouseEntrance1.setVisible(true)

                        
                    }, 1000);

                }

                if(this.keyHouse1 == true && this.house1Locked == true){

                    this.dialogueOnGoing = true;
                    this.dialogueBox('Vous utilisez la Clé rouillée')
                    this.house1Locked = false

                }
            
            }

            if (this.grandSon.x > 2600 && this.grandSon.x < 2850 && this.grandSon.y > 2500 && this.grandSon.y < 2600 && this.house1Locked == false){

                this.scene.start("house1", {goldCoins : this.goldCoins, originPoint : this.originPoint, leftEyeStatue : this.leftEyeStatue, rightEyeStatue : this.rightEyeStatue, keyHouse1 : this.keyHouse1, enemy3defeated: this.enemy3defeated, firstVisit : this.firstVisit, shoreThemeIsPlaying : this.shoreThemeIsPlaying});
            }

            if (this.grandSon.x > 3820 && this.grandSon.x < 4100 && this.grandSon.y > 2500 && this.grandSon.y < 2600){

                this.scene.start("house2", {goldCoins : this.goldCoins, originPoint : this.originPoint, leftEyeStatue : this.leftEyeStatue, rightEyeStatue : this.rightEyeStatue, keyHouse1 : this.keyHouse1, enemy3defeated: this.enemy3defeated, firstVisit : this.firstVisit, shoreThemeIsPlaying : this.shoreThemeIsPlaying});
            }

            if (this.grandSon.x > 3540 && this.grandSon.x < 3750 && this.grandSon.y > 1700 && this.grandSon.y < 1850){

                this.scene.start("house4", {goldCoins : this.goldCoins, originPoint : this.originPoint, leftEyeStatue : this.leftEyeStatue, rightEyeStatue : this.rightEyeStatue, keyHouse1 : this.keyHouse1, enemy3defeated: this.enemy3defeated, firstVisit : this.firstVisit, shoreThemeIsPlaying : this.shoreThemeIsPlaying});
            }
            //Clé à faire passer


            if (this.grandSon.x > 4650 && this.grandSon.x < 4930){

                this.grandSon.y = 2100
                this.grandSon.x = 4950

                this.grandPa.y = 2100
                this.grandPa.x = this.grandSon.x - 20


            }

        }



    }

    stopGrandPaRockDialogue(){

        

        this.dialogueBox('Hmm... ce rocher est sur notre chemin...')
        this.nextLine = "rockDialogue2";
        this.stopGrandPaRock.destroy()
        this.cutscene = true


        

    }

    stopGrandPaRockDialogue2(){

        if(this.dialogueOnGoing && this.nextLine == "rockDialogue2"){

            if(Phaser.Input.Keyboard.JustDown(this.cursors2.E)){

                setTimeout(() => {

                    this.dialogueText.setText(''); 

                    setTimeout(() => {

                        this.dialogueBox('Je vais t’aider à passer.')
                        this.nextLine = "rockDialogue3";
                       


                    }, 100);

                }, 100);
            }
        }

        if(this.dialogueOnGoing && this.nextLine == "rockDialogue3"){

            if(Phaser.Input.Keyboard.JustDown(this.cursors2.E)){

                setTimeout(() => {

                    this.dialogueText.setText(''); 

                    setTimeout(() => {

                        this.dialogueBox('Ne t’inquiète pas pour moi. Je vais trouver un\nautre chemin')
                        this.nextLine = "";
                        this.cutscene = false
                       


                    }, 100);

                }, 100);
            }
        }

    }
    


    inputDisplay(){

        if(this.grandSon.x > 480 &&   this.grandSon.x < 625 && this.grandSon.y > 2800 && this.grandSon.y < 2900){

            this.inputDisplayed.setVisible(true);
            this.inputDisplayed.x = this.grandSon.x + 50;
            this.inputDisplayed.y = this.grandSon.y - 50;


        }
        // entrance1
        if(this.grandSon.x > 2630 &&   this.grandSon.x < 2830 && this.grandSon.y > 2500 && this.grandSon.y < 2600){

            this.inputDisplayed.setVisible(true);
            this.inputDisplayed.x = this.grandSon.x + 50;
            this.inputDisplayed.y = this.grandSon.y - 50;


        }

        //statue

        else if(this.grandSon.x > 3060 && this.grandSon.x < 3370 && this.grandSon.y > 2500 && this.grandSon.y < 2600){

            this.inputDisplayed.setVisible(true);
            this.inputDisplayed.x = this.grandSon.x + 50;
            this.inputDisplayed.y = this.grandSon.y - 50;


        }

        //entrance 2

        else if(this.grandSon.x > 3820 &&   this.grandSon.x < 4100 && this.grandSon.y > 2500 && this.grandSon.y < 2600){

            this.inputDisplayed.setVisible(true);
            this.inputDisplayed.x = this.grandSon.x + 50;
            this.inputDisplayed.y = this.grandSon.y - 50;


        }

        //entrance 3


        else if(this.grandSon.x > 4660 &&   this.grandSon.x < 4900 && this.grandSon.y > 2500 && this.grandSon.y < 2600){

            this.inputDisplayed.setVisible(true);
            this.inputDisplayed.x = this.grandSon.x + 50;
            this.inputDisplayed.y = this.grandSon.y - 50;


        }

        else if(this.grandSon.x > 3540 && this.grandSon.x < 3750 && this.grandSon.y > 1700 && this.grandSon.y < 1850){

            this.inputDisplayed.setVisible(true);
            this.inputDisplayed.x = this.grandSon.x + 50;
            this.inputDisplayed.y = this.grandSon.y - 50;


        }

        else {

            this.inputDisplayed.setVisible(false);

        }
    }
    
};