class vault extends Phaser.Scene {
    constructor() {
        
        super("vault");

    }

    init(data){
        
        this.firstVisit = data.firstVisit;
        this.goldCoins = data.goldCoins;
        this.leftEyeStatue = data.leftEyeStatue
        this.rightEyeStatue = data.rightEyeStatue
        this.originPoint = data.originPoint;
        this.keyHouse1 = data.keyHouse1
        this.enemy3defeated = data.enemy3defeated

        
        
    }
        
    preload() {

        this.load.spritesheet('gpIdle', 'assets/animations/grandPa/idleRightLight.png',
            { frameWidth: 126, frameHeight: 135 });

        this.load.spritesheet('healthFade', 'assets/healthFade.png',
            { frameWidth: 896, frameHeight: 448 });

        this.load.spritesheet('gsIdle', 'assets/animations/grandSon/idle.png',
            { frameWidth: 72.8, frameHeight: 101.3 });

        this.load.spritesheet('gsWalking', 'assets/animations/grandSon/walking.png',
            { frameWidth: 72.8, frameHeight: 101.3 });

        this.load.spritesheet('gsJumping', 'assets/animations/grandSon/jump.png',
            { frameWidth: 88.8, frameHeight: 142.3 });
            
        this.load.spritesheet('gsBigJump', 'assets/animations/grandSon/bigJump.png',
            { frameWidth: 120, frameHeight: 176 });

        this.load.spritesheet('bossIdle', 'assets/animations/boss/idle.png',
            { frameWidth: 96, frameHeight: 111 });

        this.load.spritesheet('bossAttack', 'assets/animations/boss/attack.png',
            { frameWidth: 204.5, frameHeight: 119 });


        this.load.audio('vaultTheme', ['assets/music/vault_theme.mp3']);



        this.load.image('fond', 'assets/vault/fond.png');
        this.load.image('ground', 'assets/ground.png');
        this.load.image("tilesetHouse", "tiled/tilesetIsland.png");
        this.load.tilemapTiledJSON("mapHouse", "tiled/house.json");

        


    }

    create() {


        this.cursors = this.input.keyboard.createCursorKeys();
        this.cursors2 = this.input.keyboard.addKeys('space, A, E');

        this.add.image(896, 224, 'fond').setScale(1);
        this.ground = this.physics.add.sprite(448, 435, 'ground').setScale(1).setVisible(false);
        this.ground1 = this.physics.add.sprite(800, 435, 'ground').setScale(1).setVisible(false);


        this.ground.body.setAllowGravity(false)
        this.ground.setImmovable(true)

        this.ground1.body.setAllowGravity(false)
        this.ground1.setImmovable(true)

        // Chargement et lancement du thème du caveau

        this.vaultTheme = this.sound.add('vaultTheme');

        this.vaultTheme.loop = true;


        // this.vaultTheme.play();


        //Points d'entrée des maisons 

        this.exitBox = this.physics.add.staticGroup();

        // this.house1Exit = this.exitBox.create(100,400, 'attackBox').setScale(1);

        this.cutscene = false

        this.grandPaStopped = false

        // if (this.rightEyeStatue == false){

        //     this.rightEyeItem = this.physics.add.sprite(500, 380, 'rightEye').setScrollFactor(0).setScale(0.4).setAlpha(1);
        //     this.rightEyeItem.body.setAllowGravity(false)

        // }
        
        this.boss = this.physics.add.sprite(300, 200, 'bossIdle').setScale(1).setAlpha(0);
        this.grandSon = this.physics.add.sprite(100, 380, 'gs').setScale(0.8);

        this.grandPa = this.physics.add.sprite(200, 380, 'gp').setScale(1).setSize(80,100).setOffset(15,0); 

        this.grandPaHealth = 6;




        
        this.grandPaCarry = false;

        this.grandPaThrow = false;


        this.collideBox = this.physics.add.staticGroup();

        this.bossCollideBox = this.physics.add.sprite(this.boss.x, this.boss.y, 'attackBox').setScale(0.7);

        this.bossCollideBox.body.setAllowGravity(false)
        this.bossCollideBox.setImmovable(true)


        this.activePlayer = this.grandSon;
        this.inactivePlayer = this.grandPa;

        this.exitTarget = "";
        this.originPoint = "house1"; // A passer dans le Init pour le re-spawn


        this.bossFightStart = false

        this.bosshealth = 5

        //HUD

        this.playerXtext = this.add.text(-280, -100, this.grandSon.x).setScrollFactor(0).setScale(2);

        this.playerYtext = this.add.text(-280, -50, this.grandSon.y).setScrollFactor(0).setScale(2);

        // this.goldText = this.add.text((896 - (896*2)/2) + 1250, (448 - (448*2)/2) + 600, this.goldCoins).setScrollFactor(0).setScale(2).setVisible(true);
        
        this.inputDisplayed = this.add.image(0, 0, 'e_input').setScrollFactor(1).setScale(1).setVisible(false);

        //création de la caméra, qui suit le joueur 
        this.cameras.main.setBounds(0, 0, 1000, 448);
        this.cameras.main.startFollow(this.grandSon);
        this.cameras.main.setZoom(1)
        this.physics.world.setBounds(0, 0, 1000, 448);

        this.shovelCollected = true;
        this.harpoonCollected = true;

        //Dialogues

        this.dialogueOnGoing = false;

        this.bgDialogue = this.add.image(630, 120, 'bgDialogue').setScrollFactor(0).setScale(0.6).setVisible(false);
        this.dialogueText = this.add.text(415, 30, '', { fontFamily: 'CustomFont' }).setScrollFactor(0).setVisible(false);
        
        this.nextLine = "";

        //collider

        this.physics.add.collider(this.grandSon, this.ground);
        this.physics.add.collider(this.grandPa, this.ground);

        this.physics.add.collider(this.grandSon, this.ground1);
        this.physics.add.collider(this.grandPa, this.ground1);

        this.physics.add.collider(this.boss, this.ground);
        this.physics.add.collider(this.boss, this.ground1);



        this.invisibleWall = this.physics.add.sprite(20, 100, 'invisibleWall').setScale(1).setVisible(false);
        this.invisibleWall.body.setAllowGravity(false)
        this.invisibleWall.setImmovable(true)

        this.physics.add.collider(this.grandSon, this.invisibleWall);
        this.physics.add.collider(this.grandPa, this.invisibleWall);

        this.invisibleWall1 = this.physics.add.sprite(1000, 100, 'invisibleWall').setScale(1).setVisible(false);
        this.invisibleWall1.body.setAllowGravity(false)
        this.invisibleWall1.setImmovable(true)

        this.physics.add.collider(this.grandSon, this.invisibleWall1);
        this.physics.add.collider(this.grandPa, this.invisibleWall1);
        

        this.physics.add.overlap(this.bossCollideBox, this.grandPa, this.bossAttack, null, this);

        this.physics.add.overlap(this.bossCollideBox, this.grandPa, this.hurtEnemy, null, this);


        this.triggerDiscussionBoss = this.physics.add.sprite(900, 100, 'invisibleWall').setScale(1).setVisible(false);
        this.triggerDiscussionBoss.body.setAllowGravity(false)
        this.triggerDiscussionBoss.setImmovable(true)
        

        this.physics.add.overlap(this.triggerDiscussionBoss, this.grandSon, this.bossDiscussion, null, this);


        // interactions île

        this.cutscene = false; //Empêche les contrôles
        
        this.blackScreen = this.add.image(448, 224, 'bs').setScrollFactor(0).setScale(2).setAlpha(1);

        this.fadeOut()

        this.grandPa.anims.play('gpIdle', true);

        this.anims.create({

            key: 'bossIdle',
            frames: this.anims.generateFrameNumbers('bossIdle', {start:0,end:8}),
            frameRate: 8,
            repeat: -1
            
        });

        this.anims.create({

            key: 'bossAttack',
            frames: this.anims.generateFrameNumbers('bossAttack', {start:0,end:18}),
            frameRate: 25,
            repeat: 0
            
        });

        // health 

        this.anims.create({
            key: '0out6',
            frames: this.anims.generateFrameNumbers('healthFade', {start:0,end:0}),
            frameRate: 1,
            repeat: 0
            
        });
        this.anims.create({
            key: '1out6',
            frames: this.anims.generateFrameNumbers('healthFade', {start:1,end:1}),
            frameRate: 1,
            repeat: 0
            
        });
        this.anims.create({
            key: '2out6',
            frames: this.anims.generateFrameNumbers('healthFade', {start:2,end:2}),
            frameRate: 1,
            repeat: 0
            
        });
        this.anims.create({
            key: '3out6',
            frames: this.anims.generateFrameNumbers('healthFade', {start:3,end:3}),
            frameRate: 1,
            repeat: 0
            
        });
        this.anims.create({
            key: '4out6',
            frames: this.anims.generateFrameNumbers('healthFade', {start:4,end:4}),
            frameRate: 1,
            repeat: 0
            
        });
        
        this.anims.create({
            key: '5out6',
            frames: this.anims.generateFrameNumbers('healthFade', {start:5,end:5}),
            frameRate: 1,
            repeat: 0
            
        });

        this.healthDisplay = this.add.sprite(448, 224, 'healthFade').setScale(1).setScrollFactor(0);


        this.boss.anims.play('bossIdle', true);



        this.waitingBoss = false; // pour déclencher les attaques moins rapidement 

        this.timer = 0 // health recovery 
    }

    update(time,delta){

        playerControls(this.activePlayer,this.cursors);
        this.dialogueEnd()
        this.inputDisplay()
        this.bossDiscussion1()

        if(this.grandPaHealth > 0 && this.grandPaHealth < 6 ){
            this.timer += delta;
            while (this.timer > 5000) {
                this.grandPaHealth += 1;
                this.timer -= 5000;

            }
        }


        this.bossCollideBox.x = this.boss.x

        this.bossCollideBox.y = this.boss.y


        if(!this.cutscene){

            playerControls(this.activePlayer,this.cursors);

        }


        if (this.threat){

            this.switchChara1();

        }

        else if (this.threat == false){

            this.switchChara2();

        }

         //Animations GrandPa

        // this.grandPa.anims.play('gpIdle', true);  

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

        // Animations Boss

        if(this.boss.attacking == false && this.grandPaHealth > 0){
        
            this.boss.anims.play('bossIdle', true);

        }

        if(this.boss.attacking == true  && this.grandPaHealth > 0){
        
            this.boss.anims.play('bossAttack', true);

        }

        if (this.boss.x > this.activePlayer.x && this.grandPaHealth > 0){

            this.boss.flipX=false;
            

        }

        if (this.boss.x < this.activePlayer.x && this.grandPaHealth > 0){

            this.boss.flipX=true;
            
        }

        //Pattern boss 

        if (this.grandPa.x > this.boss.x && this.bossFightStart && this.bosshealth > 0){

            this.boss.setVelocityX(100)

        }

        if (this.grandPa.x < this.boss.x && this.bossFightStart && this.bosshealth > 0){

            this.boss.setVelocityX(-100)

        }

        if (this.bosshealth <= 0){

            this.bossFightStart = false

            this.boss.setVelocityX(0)
            this.boss.attacking = false;
            this.bossCollideBox.destroy();
            this.nextLine = ""


            setTimeout(() => {

                this.fadeIn();

                setTimeout(() => {

                    this.scene.start("cutsceneForestEnding")
    
                }, 500);

            }, 1500);

        }

        //health 

       

        if(this.grandPaHealth == 6){

            this.healthDisplay.anims.play('0out6', true);


        }

        else if(this.grandPaHealth == 5){

            this.healthDisplay.anims.play('1out6', true);

        }

        else if(this.grandPaHealth == 4){

            this.healthDisplay.anims.play('2out6', true);

        }

        else if(this.grandPaHealth == 3){

            this.healthDisplay.anims.play('3out6', true);

        }


        else if(this.grandPaHealth == 2){

            this.healthDisplay.anims.play('4out6', true);

        }


        else if(this.grandPaHealth <= 1){

            this.scene.start("vault", {});

        }

        // else if(this.grandPaHealth <= 0){

        //     this.scene.start("vault", {});


        // }

    

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



    }

    // exitHouse(){

    //     if(Phaser.Input.Keyboard.JustDown(this.cursors2.E)){

    //         if (this.grandSon.x < 250){

    //             this.firstVisit = 1
    //             this.originPoint = "house1"
    //             this.scene.start("island", {goldCoins : this.goldCoins, originPoint : this.originPoint, leftEyeStatue : this.leftEyeStatue, rightEyeStatue : this.rightEyeStatue, keyHouse1 : this.keyHouse1, enemy3defeated: this.enemy3defeated, firstVisit : this.firstVisit});
                
    //         }   

    //     }

    // }


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

    throwGrandSon(){

        if (Phaser.Input.Keyboard.JustDown(this.cursors.space)){
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

        if(this.dialogueOnGoing && this.nextLine == "bossTalk6"){
            if(Phaser.Input.Keyboard.JustDown(this.cursors2.E)){

                setTimeout(() => {

                    this.dialogueOnGoing = false;
                    this.bgDialogue.setVisible(false)
                    this.dialogueText.setVisible(false)
                    this.dialogueText.setText(''); 
                    this.nextLine = ""

                    this.cutscene = false
                    this.bossFightStart = true
                    this.threat = true

                }, 100);
            }

        }

        if(this.dialogueOnGoing && this.nextLine == "bossDefeated2"){
            if(Phaser.Input.Keyboard.JustDown(this.cursors2.E)){

                setTimeout(() => {

                    this.dialogueOnGoing = false;
                    this.bgDialogue.setVisible(false)
                    this.dialogueText.setVisible(false)
                    this.dialogueText.setText(''); 
                    this.nextLine = "";

                    setTimeout(() => {

                        this.fadeIn()
    
                        
                    }, 1000);

                }, 100);
            }

        }

        

        
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

    inputDisplay(){

        if (this.grandSon.x >= 850){

            this.inputDisplayed.setVisible(true);
            this.inputDisplayed.x = this.grandSon.x + 50;
            this.inputDisplayed.y = this.grandSon.y - 50;

        }
    
        else {

            this.inputDisplayed.setVisible(false);

        }
    }


    bossAttack(){

    
        if (this.waitingBoss == false && this.bossFightStart){
                this.boss.attacking = true
                this.waitingBoss = true
                this.grandPaHealth -= 1;


                setTimeout(() => {

                    this.boss.attacking = false

                    
                }, 1000);

                setTimeout(() => {

                    this.waitingBoss = false

                    
                }, 2500);
        }
        
    }

    bossDiscussion(){

        if(Phaser.Input.Keyboard.JustDown(this.cursors2.E)){
                
            this.dialogueBox('"C’est le tombeau de ce Oscar.\nIl semblait vraiment être considéré comme une\nlégende ici."')
            this.nextLine = "bossTalk1";
            this.triggerDiscussionBoss.destroy()
            this.cutscene = true

        }

    }


    bossDiscussion1(){

        if(this.dialogueOnGoing && this.nextLine == "bossTalk1"){

            if(Phaser.Input.Keyboard.JustDown(this.cursors2.E)){

                setTimeout(() => {

                    this.boss.setAlpha(1)
                    this.dialogueText.setText(''); 

                    setTimeout(() => {

                        this.dialogueBox('"Oui, en effet. Ces gens m’ont vénéré\nlorsque j’ai affronté le Kalastaa, il y a plus de 60 ans."')
                        this.nextLine = "bossTalk2";
                    
                    
                    }, 100);

                }, 100);
            }
        }

        if(this.dialogueOnGoing && this.nextLine == "bossTalk2"){

            if(Phaser.Input.Keyboard.JustDown(this.cursors2.E)){

                setTimeout(() => {

                    this.dialogueText.setText(''); 

                    setTimeout(() => {

                        this.dialogueBox('"Mais je n’ai jamais pu le vaincre, et j’ai manqué de périr\négalement."')
                        this.nextLine = "bossTalk3";
                    
                    
                    }, 100);

                }, 100);
            }
        }

        if(this.dialogueOnGoing && this.nextLine == "bossTalk3"){

            if(Phaser.Input.Keyboard.JustDown(this.cursors2.E)){

                setTimeout(() => {

                    this.dialogueText.setText(''); 

                    setTimeout(() => {

                        this.dialogueBox('"Et pour une raison que j’ignore, il est devenu une\nobsession pour moi."')
                        this.nextLine = "bossTalk4";
                    
                    
                    }, 100);

                }, 100);
            }
        }

        if(this.dialogueOnGoing && this.nextLine == "bossTalk4"){

            if(Phaser.Input.Keyboard.JustDown(this.cursors2.E)){

                setTimeout(() => {

                    this.dialogueText.setText(''); 

                    setTimeout(() => {

                        this.dialogueBox('"..."')
                        this.nextLine = "bossTalk5";
                    
                    
                    }, 100);

                }, 100);
            }
        }


        if(this.dialogueOnGoing && this.nextLine == "bossTalk5"){

            if(Phaser.Input.Keyboard.JustDown(this.cursors2.E)){

                setTimeout(() => {

                    this.dialogueText.setText(''); 

                    setTimeout(() => {

                        this.dialogueBox('"C’est pour cela que je dois vous arrêter aujourd’hui.\nEn garde !')
                        this.nextLine = "bossTalk6"

                    }, 100);

                }, 100);
            }
        }

        
    }

    hurtEnemy(){
        if (Phaser.Input.Keyboard.JustDown(this.cursors2.A)){

            this.grandPa.anims.play('gpAttack1', true);
            this.grandPa.attacking = true
            this.bosshealth -= 1; 

            this.boss.tint = ('0xff0000')

            setTimeout(() => {

                this.boss.clearTint()

            }, 300);

            
        }

    }

    
   

}