class house4 extends Phaser.Scene {
    constructor() {
        
        super("house4");

    }

    init(data){
        
        this.firstVisit = data.firstVisit;
        this.goldCoins = data.goldCoins;
        this.leftEyeStatue = data.leftEyeStatue
        this.rightEyeStatue = data.rightEyeStatue
        this.originPoint = data.originPoint;
        this.keyHouse1 = data.keyHouse1
        this.enemy3defeated = data.enemy3defeated
        this.shoreThemeIsPlaying = data.shoreThemeIsPlaying




        
    }
        
    preload() {

        this.load.spritesheet('gpIdleRightLight', 'assets/animations/grandPa/idleRightLight.png',
            { frameWidth: 126, frameHeight: 135 });

        this.load.spritesheet('gsIdle', 'assets/animations/grandSon/idle.png',
            { frameWidth: 72.8, frameHeight: 101.3 });

        this.load.spritesheet('gsWalking', 'assets/animations/grandSon/walking.png',
            { frameWidth: 72.8, frameHeight: 101.3 });

        this.load.spritesheet('gsJumping', 'assets/animations/grandSon/jump.png',
            { frameWidth: 88.8, frameHeight: 142.3 });
            
        this.load.spritesheet('gsBigJump', 'assets/animations/grandSon/bigJump.png',
            { frameWidth: 120, frameHeight: 176 });


        this.load.image('house4', 'assets/house4.png');
        this.load.image('ground', 'assets/ground.png');


        

        this.load.image("tilesetHouse", "tiled/tilesetIsland.png");

        this.load.image("key", "assets/key.png");

        this.load.tilemapTiledJSON("mapHouse", "tiled/house.json");

        this.load.image("keyObtained", "assets/messages/keyObtained.png");



    }

    create() {


        this.cursors = this.input.keyboard.createCursorKeys();
        this.cursors2 = this.input.keyboard.addKeys('space, A, E');

        this.add.image(448, 224, 'house4').setScale(1);
        this.ground = this.physics.add.sprite(448, 435, 'ground').setScale(1).setVisible(false);

        this.ground.body.setAllowGravity(false)
        this.ground.setImmovable(true)

        //Points d'entrée des maisons 

        this.exitBox = this.physics.add.staticGroup();

        this.house4Exit = this.exitBox.create(750,400, 'attackBox').setScale(1);

        if (this.keyHouse1 == false){

            this.keyItem = this.physics.add.sprite(200, 380, 'key').setScrollFactor(0).setScale(0.4).setAlpha(1);
            this.keyItem.body.setAllowGravity(false)

        }
        this.cutscene = false

        this.grandPaStopped = false
        
        this.grandSon = this.physics.add.sprite(700, 380, 'gs').setScale(0.8);

        this.grandPa = this.physics.add.sprite(800, 380, 'gp').setScale(1).setSize(80,100).setOffset(15,0); 
        
        this.grandPaCarry = false;

        this.grandPaThrow = false;


        this.activePlayer = this.grandSon;
        this.inactivePlayer = this.grandPa;

        this.exitTarget = ""
        this.originPoint = "house4" // A passer dans le Init pour le re-spawn

        //HUD

        this.playerXtext = this.add.text(-280, -100, this.grandSon.x).setScrollFactor(0).setScale(2);

        this.playerYtext = this.add.text(-280, -50, this.grandSon.y).setScrollFactor(0).setScale(2);

        this.goldText = this.add.text((896 - (896*2)/2) + 1250, (448 - (448*2)/2) + 600, this.goldCoins).setScrollFactor(0).setScale(2).setVisible(true);
        
        this.inputDisplayed = this.add.image(0, 0, 'e_input').setScrollFactor(1).setScale(1).setVisible(false);

        this.keyObtainedMessage = this.add.image(220, 350, 'keyObtained').setScrollFactor(1).setScale(0.5).setVisible(false);


        //création de la caméra, qui suit le joueur 
        this.cameras.main.setBounds(0, 0, 896, 448);
        this.cameras.main.startFollow(this.grandSon);
        this.cameras.main.setZoom(1)
        this.physics.world.setBounds(0, 0, 896, 448);

        this.shovelCollected = true;
        this.harpoonCollected = true;

        //Dialogues

        this.dialogueOnGoing = false;

        this.bgDialogue = this.add.image(930, -40, 'bgDialogue').setScrollFactor(0).setVisible(false);
        this.dialogueText = this.add.text(580, -190, '', { fontFamily: 'CustomFont' }).setScrollFactor(0).setScale(2).setVisible(false);
        
        this.nextLine = "";


        this.invisibleWall = this.physics.add.sprite(10, 100, 'invisibleWall').setScale(1).setVisible(false);
        this.invisibleWall.body.setAllowGravity(false)
        this.invisibleWall.setImmovable(true)

        this.physics.add.collider(this.grandSon, this.invisibleWall);
        this.physics.add.collider(this.grandPa, this.invisibleWall);

        this.invisibleWall1 = this.physics.add.sprite(900, 100, 'invisibleWall').setScale(1).setVisible(false);
        this.invisibleWall1.body.setAllowGravity(false)
        this.invisibleWall1.setImmovable(true)

        this.physics.add.collider(this.grandSon, this.invisibleWall1);
        this.physics.add.collider(this.grandPa, this.invisibleWall1);

        //collider

        this.physics.add.collider(this.grandSon, this.ground);
        this.physics.add.collider(this.grandPa, this.ground);
        

        this.physics.add.overlap(this.grandSon, this.exitBox, this.exitHouse, null, this);
        this.physics.add.overlap(this.grandSon, this.keyItem, this.keyCollect, null, this);


        // interactions île

        this.cutscene = false; //Empêche les contrôles
        
        this.blackScreen = this.add.image(448, 224, 'bs').setScrollFactor(0).setScale(2).setAlpha(1);

        this.fadeOut();

        this.goldText = this.add.text((896 - (896*2)/2) + 1250, (448 - (448*2)/2) + 600, this.goldCoins).setScrollFactor(0).setScale(2).setVisible(false);

        this.goldHud = this.add.image((896 - (896*2)/2) + 1180, (448 - (448*2)/2) + 600, 'hudGold').setScrollFactor(0).setScale(1).setVisible(false);

        this.grandPa.anims.play('gpIdle', true);
    }

    update(time,delta){

        playerControls(this.activePlayer,this.cursors);
        this.dialogueEnd()
        this.inputDisplay()

        if(!this.cutscene){

            playerControls(this.activePlayer,this.cursors);

        }

        if (this.goldCoins > 0){

            this.goldText.setVisible(true);
            this.goldHud.setVisible(true);

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

    exitHouse(){

        if(Phaser.Input.Keyboard.JustDown(this.cursors2.E)){

            if (this.grandSon.x > 750){

                this.firstVisit = 1
                this.originPoint = "house4"
                this.scene.start("island", {goldCoins : this.goldCoins, originPoint : this.originPoint, leftEyeStatue : this.leftEyeStatue, rightEyeStatue : this.rightEyeStatue, keyHouse1 : this.keyHouse1, enemy3defeated: this.enemy3defeated, firstVisit : this.firstVisit, shoreThemeIsPlaying : this.shoreThemeIsPlaying});


            }

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

        if (this.grandSon.x > 750){

            this.inputDisplayed.setVisible(true);
            this.inputDisplayed.x = this.grandSon.x + 50;
            this.inputDisplayed.y = this.grandSon.y - 50;

        }
        

       

        else {

            this.inputDisplayed.setVisible(false);

        }
    }

    keyCollect(){

        this.keyItem.destroy()

        this.keyHouse1 = true;

        console.log('oui')

        this.keyObtainedMessage.setVisible(true)

        setTimeout(() => {

            this.keyObtainedMessage.setVisible(false)



        }, 3000);


    }

}