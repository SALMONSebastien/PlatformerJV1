class forest extends Phaser.Scene {
    constructor() {
        
        super("forest");

    }

    init(data){
        // this.health = data.health;
        
    }
        
    preload() {
        
        this.load.image('test', 'assets/test.png');
        this.load.image('wallTrigger', 'assets/trigger.png');

        this.load.image('bs', 'assets/blackScreen.png');

        this.load.image('e_input', 'assets/e_input.png');


        this.load.image('gs', 'assets/testPlayer.png');


        this.load.image('gp', 'assets/testGrandPa.png');

        this.load.image('enemy', 'assets/testEnemy.png');

        this.load.image('detectionBox', 'assets/DetectionBox.png');

        this.load.image('attackBox', 'assets/attackBox.png');

        this.load.image('cabinForest', 'assets/cabinForest.png');

        this.load.image('shovel', 'assets/shovel.png');

        this.load.image('bgDialogue', 'assets/testDialogue.png');

        this.load.audio('forestTheme', ['assets/music/forest_theme.mp3']);





        //load de la map tiled
        this.load.image("tileset", "tiled/tileset.png");
        this.load.tilemapTiledJSON("map", "tiled/forest.json");

        this.load.image('combatMessage', 'assets/messages/combat.png');
        this.load.image('sautMessage', 'assets/messages/sautduo.png');



        //Décors

        this.load.image('tree', 'assets/Pinetree.png');

        this.load.image('water', 'assets/main_menu/water.png');

        this.load.image('boatForest', 'assets/cutsceneSea1/boat.png');



        //Animations

        this.load.spritesheet('diggingP', 'assets/animations/ParticlesDigging.png',
            { frameWidth: 64, frameHeight: 64 });

        this.load.spritesheet('throwP', 'assets/animations/ParticlesThrow.png',
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

        this.load.spritesheet('wolfIdle', 'assets/animations/wolfIdle.png',
            { frameWidth: 232, frameHeight: 186 });



        
    }
    create() {

        this.forestTheme = this.sound.add('forestTheme');

        this.forestTheme.loop = true;


        this.forestTheme.play();


        this.cursors = this.input.keyboard.createCursorKeys();
        this.cursors2 = this.input.keyboard.addKeys('space, A, E');

        

        this.colliders = this.physics.add.staticGroup();
        
        this.add.image(2750, 1100, 'test').setScale(1);

        this.add.image(5100, 1500, 'boatForest').setScale(0.7);


        this.add.image(5200, 1500, 'water').setScale(1);



        this.shovelItem = this.add.image(600, 1485, 'shovel').setScale(0.8).setAngle(-20).setVisible(true);
        
        //Décors Background 

        this.pinetree = this.add.group();

        this.pinetree.create(2100, 1274, 'tree').setScale(1).setVisible(true);

        this.pinetree.create(3500, 1274, 'tree').setScale(1).setVisible(true);


        
        const map = this.add.tilemap("map");


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



        // this.particleDig1 = this.add.sprite(3175, 1475, 'diggingP').setScale(1);
        this.particleDig2 = this.add.sprite(this.shovelItem.x - 370, this.shovelItem.y, 'diggingP').setScale(1);

        this.particleDig3 = this.add.sprite(2110, 1175, 'throwP').setScale(1);



        

        //characters

        this.grandSon = this.physics.add.sprite(3900, 1450, 'gs').setScale(1);

        this.grandPa = this.physics.add.sprite(3700, 1350, 'gp').setScale(1.2).setSize(80,100).setOffset(15,0);    

        // this.grandSon = this.physics.add.sprite(200, 1450, 'gs').setScale(1);

        // this.grandPa = this.physics.add.sprite(200, 1350, 'gp').setScale(1.2).setSize(80,100).setOffset(15,0);  

        this.enemy = this.physics.add.staticGroup();

        this.detectionBox = this.physics.add.staticGroup();

        this.attackHitbox = this.physics.add.sprite(this.grandPa.x, this.grandPa.y, 'attackBox').setScale(1);
        this.warp = this.physics.add.sprite(5000, 1300, 'attackBox').setScale(3);


        this.enemy1 = this.enemy.create(1650, 1470, 'wolfIdle').setScale(1).setVisible(false);

        //Detection Box

        this.shovelCollider = this.detectionBox.create(this.shovelItem.x, this.shovelItem.y, 'attackBox').setScale(1);

        this.diggingHole1 = this.detectionBox.create(this.shovelItem.x - 355, this.shovelItem.y, 'attackBox').setScale(1).setSize(150,200); //harpon = compétence combat
        this.diggingHole2 = this.detectionBox.create(3175, 1475, 'attackBox').setScale(1).setSize(150,200); // loot = argent ?


        this.treeTrigger = this.detectionBox.create(2390, 1500, 'wallTrigger').setScale(1).setVisible(false);

        this.particleTrigger = this.detectionBox.create(this.particleDig3.x, 700, 'wallTrigger').setScale(1).setVisible(false);
        
        this.digHoleFinish1 = false;
        this.digHoleFinish2 = false;


        this.enemy1.pv = 3;

        this.playerReady = false;
        
        

        //Compétences 

        this.grandPaCarry = false;

        this.grandPaThrow = false;


        this.activePlayer = this.grandSon;
        this.inactivePlayer = this.grandPa;

        this.enemy1DB = this.detectionBox.create(this.enemy1.x, this.enemy1.y - 150, 'detectionBox').setSize(500,300);


        this.enemy1DiscoveryBox = this.detectionBox.create(this.enemy1.x, this.enemy1.y - 150, 'detectionBox').setSize(500,300);

        plateformes.setCollisionByProperty({isSolid: true})
       
        this.physics.add.collider(this.grandSon, plateformes);
        this.physics.add.collider(this.enemy1DB, plateformes);
        this.physics.add.collider(this.attackHitbox, plateformes);
        this.physics.add.collider(this.grandPa, plateformes);

        this.physics.add.overlap(this.activePlayer, this.detectionBox,this.threatTrigger,null,this);

        this.physics.add.overlap(this.attackHitbox, this.enemy1, this.hurtEnemy, null, this);
        this.physics.add.overlap(this.grandSon, this.shovelCollider, this.shovelCollect, null, this);
        this.physics.add.overlap(this.grandSon, this.diggingHole1, this.digging1, null, this);
        this.physics.add.overlap(this.grandSon, this.diggingHole2, this.digging2, null, this);
        this.physics.add.overlap(this.grandSon, this.warp, this.warpIsland, null, this);

        this.physics.add.overlap(this.grandSon, this.treeTrigger, this.throwDiscovery, null, this);

        this.physics.add.overlap(this.grandSon, this.enemy1DiscoveryBox, this.enemyDiscovery, null, this);


        this.physics.add.overlap(this.grandSon, this.particleTrigger, this.partcleKill, null, this);




    
        //Lancer le petit fils
        this.physics.add.overlap(this.attackHitbox, this.activePlayer, this.throwGrandSon, null, this);

        //warp vers une autre zone
        // this.physics.add.overlap(this.warp, this.activePlayer, this.warpNewArea, null, this);


        this.nextArea = "island";
        
    
        //HUD

        // this.playerXtext = this.add.text(-280, -100, this.grandSon.x).setScrollFactor(0).setScale(2);

        // this.playerYtext = this.add.text(-280, -50, this.grandSon.y).setScrollFactor(0).setScale(2);
        
        // this.helpText = this.add.text(this.grandSon.x + 200, this.grandSon.y, '').setScrollFactor(1).setScale(2);

        
        this.inputDisplayed = this.add.image(0, 0, 'e_input').setScrollFactor(1).setScale(1).setVisible(false);



        //création de la caméra, qui suit le joueur 
        this.cameras.main.setBounds(0, 400, 5500, 1280);
        this.cameras.main.startFollow(this.grandSon);
        this.cameras.main.setZoom(0.6)
        this.physics.world.setBounds(0, 0, 5500, 1280);

        //Variables Trigger 

        this.shovelCollected = false;
        this.harpoonCollected = false;

        //Dialogues


        this.bgDialogue = this.add.image(790, 40, 'bgDialogue').setScrollFactor(0).setVisible(false);
        this.dialogueText = this.add.text(450, -100, '', { fontFamily: 'CustomFont' }).setScrollFactor(0).setScale(2).setVisible(false);
        
        this.cutscene = false;

        // this.typewriteText('Je suis un test de texte')



        //Animations 


        this.anims.create({

            key: 'glow',
            frames: this.anims.generateFrameNumbers('diggingP', {start:0,end:3}),
            frameRate: 7,
            repeat: -1
            
        });

        this.anims.create({

            key: 'glow1',
            frames: this.anims.generateFrameNumbers('throwP', {start:0,end:3}),
            frameRate: 7,
            repeat: -1
            
        });

        this.anims.create({

            key: 'wolfIdle',
            frames: this.anims.generateFrameNumbers('wolfIdle', {start:0,end:8}),
            frameRate: 6,
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

            key: 'throwing',
            frames: this.anims.generateFrameNumbers('gpIdleRightLight', {start:0,end:18}),
            frameRate: 12,
            repeat: 0
            
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

        
        //Black screen (fade in and out)

        this.blackScreen = this.add.image(448, 224, 'bs').setScrollFactor(0).setScale(2).setAlpha(1);

        this.fadeOut()

        this.warp.body.setAllowGravity(false);

        this.particleDig3.anims.play('glow1', true);  


        this.combatMessage = this.add.image(100, 400, 'combatMessage').setScrollFactor(0).setScale(1).setAlpha(2).setVisible(false);
        this.sautMessage = this.add.image(100, 400, 'sautMessage').setScrollFactor(0).setScale(1).setAlpha(2).setVisible(false);



        setTimeout(() => {
            
            this.dialogueBox('"Ne perdons pas de temps ! \n Mon équipement est dans cette direction"')
            this.nextLine = ""
            

            this.grandPa.flipX=true;
            this.grandSon.flipX=true;

            setTimeout(() => {
            
                this.helpClose = this.add.text(this.bgDialogue.x - 100, this.bgDialogue.y +100, 'Appuyez sur E pour fermer ce dialogue', { fontFamily: 'CustomFont' }).setScrollFactor(0).setScale(1.5).setVisible(true);

            }, 1000);
    


        }, 200);

        this.helpFight = this.add.text(this.grandPa.x + 30 , this.grandPa.y - 30, 'Appuyez sur A pour attaquer', { fontFamily: 'CustomFont' }).setScale(1.5).setVisible(false);

        this.grandPa.anims.play('gpIdle', true);

    }

    update(time,delta) {


        this.dialogueEnd()
        this.treeCutscene()
        this.inputDisplay()

        this.helpFight.x = this.grandPa.x + 30
        this.helpFight.y = this.grandPa.y - 100


        // 



        if(!this.cutscene){

            playerControls(this.activePlayer,this.cursors);

        }
        
        


        // this.playerXtext.setText(this.activePlayer.x); 
        // this.playerYtext.setText(this.activePlayer.y);

        this.enemy1DB.x = this.enemy1.x;
        this.enemy1DB.y = this.enemy1.y - 150;

        this.enemy1StartFight = false

        this.attackHitbox.x = this.grandPa.x;
        this.attackHitbox.y = this.grandPa.y - 50;


        this.attackHitbox.body.setAllowGravity(false)

        //Animations 
        // if (this.digHoleFinish2 == false){

        //     this.particleDig1.anims.play('glow', true);  

        // }
        
        if(this.digHoleFinish1 == false){

            this.particleDig2.anims.play('glow', true);  


        }

        //Animations GrandPa


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

        if(this.activePlayer.walking == true && this.activePlayer.jumping == false){
        
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

        if (this.enemy1.pv <= 0){


            this.enemy1.destroy();
            this.enemy1DB.destroy();

            this.threat = false;

        
        }

        //reset placement si l'active player tombe 

        if (this.activePlayer.y <= -1000){

            this.activePlayer.y = 1500

        }


        if (this.activePlayer.direction == "left"){
            this.tweens.add({
                targets: this.inactivePlayer,
                x: this.activePlayer.x + 100,
                duration: 2000,
                ease: 'Power2',
                completeDelay: 3000
            });
        }

        else if (this.activePlayer.direction == "right"){
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


    }

    threatTrigger(){
        if(this.harpoonCollected == true){
   
            this.threat = true;
            this.playerReady = true;
            
            this.enemy1.setVisible(true)
            

        }
    }

    enemyDiscovery(){
        
        if(this.nextLine == "" && this.playerReady == true){
                this.dialogueOnGoing = true;
                this.dialogueBox('"Attention petit, recule ! Un loup !\nDésolé mon grand, mais je vais devoir te\nchasser de là !"')
                //bruit de loup
                this.nextLine = "triggerCombat"
                this.enemy1DiscoveryBox.destroy();
                
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
       if(this.playerReady){

        this.forestTheme.stop();
        this.scene.start("cutsceneSea1");

       }


    }

    shovelCollect(hitbox,item){
        if(Phaser.Input.Keyboard.JustDown(this.cursors2.E)){

            this.shovelCollider.destroy();
            this.shovelItem.setVisible(false);
            this.shovelCollected = true;

            this.dialogueOnGoing = true;
            this.dialogueBox('"Cette pelle nous sera utile pour récupérer\nmon équipement"')

        
        }

    }


    digging1(){

        if(Phaser.Input.Keyboard.JustDown(this.cursors2.E) && this.shovelCollected){

            this.diggingHole1.destroy();
            this.grandPa.anims.play('gpDigging', true);

            
            this.harpoonCollected = true;
            this.digHoleFinish1 = true;

            this.dialogueOnGoing = true;
            this.dialogueBox('"Ah mon harpon. Nous voilà prêts à rejoindre\nla mer."')
            

            setTimeout(() => {

                this.particleDig2.destroy();

            }, 200);

        }

    }
    
    digging2(){

        if(Phaser.Input.Keyboard.JustDown(this.cursors2.E) && this.shovelCollected){

            this.diggingHole2.destroy();
            this.digHoleFinish2 = true;

            setTimeout(() => {

                this.particleDig1.destroy();
                // Loot à ajouter


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
            delay: 30

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
                    this.helpClose.setVisible(false);
        
                }, 100);
            }

        }

        if(this.dialogueOnGoing && this.nextLine == "triggerCombat"){
            if(Phaser.Input.Keyboard.JustDown(this.cursors2.E)){

                setTimeout(() => {

                    this.nextLine = ""
                    this.dialogueOnGoing = false;
                    this.bgDialogue.setVisible(false)
                    this.dialogueText.setVisible(false)
                    this.dialogueText.setText(''); 
                    this.helpFight.setVisible(true);
                    this.enemy1StartFight = true; // début du combat, empêche l'ennemi d'attaquer pendant le dialogue

                    setTimeout(() => {

                        this.helpFight.setVisible(false);

                    }, 5000);

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

    throwDiscovery(){

        this.dialogueOnGoing = true;
        this.dialogueBox('"Mon garçon, attends."')
        this.treeTrigger.destroy()
        this.cutscene = true;
        this.grandSon.setVelocityX(0);
        this.grandPa.setVelocityX(0);
        this.grandSon.anims.play('gsIdle', true);
        this.nextLine = "throw1";
    
    }

    treeCutscene(){

        if(this.dialogueOnGoing && this.nextLine == "throw1"){

            if(Phaser.Input.Keyboard.JustDown(this.cursors2.E)){

                setTimeout(() => {

                    this.dialogueText.setText(''); 

                    setTimeout(() => {

                        this.dialogueBox('On dirait que quelque chose se trouve\ndans cet arbre, non ?')
                        this.nextLine = "throw2"
    
                    }, 100);

                }, 100);
            }

            

        }

        if(this.dialogueOnGoing && this.nextLine == "throw2"){

            if(Phaser.Input.Keyboard.JustDown(this.cursors2.E)){

                setTimeout(() => {

                    this.dialogueText.setText(''); 

                    setTimeout(() => {

                        this.dialogueBox('Je pense que je pourrais te lancer assez\nhaut pour que tu attrapes ça !')
                        this.nextLine = ""
                        this.cutscene = false;

                        setTimeout(() => {

                            this.sautMessage.setVisible(true)

                            setTimeout(() => {

                                this.sautMessage.setVisible(false)

            
                            }, 10000);
        
                        }, 3000);
    
    
                    }, 100);

                }, 100);
            }


        }

    }



    partcleKill(){

        this.particleDig3.destroy()
        this.particleTrigger.destroy()

        this.dialogueOnGoing = true;
        this.dialogueBox('"Hmm.. Étrange, j’aurais juré qu’il y avait\nquelque\nchose ici"')
       
        
        this.grandSon.anims.play('gsIdle', true);
        this.nextLine = "";
    


    }

    messageDisplay(image){

        image.setVisible(true);

    }

    inputDisplay(){


        // shovel
        if(this.grandSon.x > 450 &&   this.grandSon.x < 750 ){

            this.inputDisplayed.setVisible(true);
            this.inputDisplayed.x = this.grandSon.x + 50;
            this.inputDisplayed.y = this.grandSon.y - 50;


        }

        else if(this.grandSon.x > 165 &&   this.grandSon.x < 315 && this.shovelCollected){

            this.inputDisplayed.setVisible(true);
            this.inputDisplayed.x = this.grandSon.x + 50;
            this.inputDisplayed.y = this.grandSon.y - 50;


        }

        else if(this.grandSon.x > 165 &&   this.grandSon.x < 315 && this.shovelCollected){

            this.inputDisplayed.setVisible(true);
            this.inputDisplayed.x = this.grandSon.x + 50;
            this.inputDisplayed.y = this.grandSon.y - 50;


        }

        else {

            this.inputDisplayed.setVisible(false);

        }

        
    }
    
    
};