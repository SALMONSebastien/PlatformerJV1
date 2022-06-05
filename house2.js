class house2 extends Phaser.Scene {
    constructor() {
        
        super("house2");

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

        this.load.spritesheet('gpIdle', 'assets/animations/grandPa/idle.png',
            { frameWidth: 126, frameHeight: 135 });

        this.load.spritesheet('gsIdle', 'assets/animations/grandSon/idle.png',
            { frameWidth: 72.8, frameHeight: 101.3 });

        this.load.spritesheet('gsWalking', 'assets/animations/grandSon/walking.png',
            { frameWidth: 72.8, frameHeight: 101.3 });

        this.load.spritesheet('gsJumping', 'assets/animations/grandSon/jump.png',
            { frameWidth: 88.8, frameHeight: 142.3 });
            
        this.load.spritesheet('gsBigJump', 'assets/animations/grandSon/bigJump.png',
            { frameWidth: 120, frameHeight: 176 });

        this.load.spritesheet('idleMerchant', 'assets/animations/merchant/idleMerchant.png',
            { frameWidth: 184, frameHeight: 189 });



        this.load.image('house2', 'assets/house2.png');
        this.load.image('ground', 'assets/ground.png');

        this.load.image('choiceCursor', 'assets/choice.png');


        this.load.image("leftEyeObtained", "assets/messages/leftEyeObtained.png");

        

        this.load.image("tilesetHouse", "tiled/tilesetIsland.png");
        this.load.tilemapTiledJSON("mapHouse", "tiled/house.json");


    }

    create() {

        this.cursors = this.input.keyboard.createCursorKeys();
        this.cursors2 = this.input.keyboard.addKeys('space, A, E, Z, S');

        this.add.image(448, 224, 'house2').setScale(1);
        this.ground = this.physics.add.sprite(448, 435, 'ground').setScale(1).setVisible(false);

        this.ground.body.setAllowGravity(false);
        this.ground.setImmovable(true);

        //Points d'entrée des maisons 

        this.exitBox = this.physics.add.staticGroup();

        this.house2Exit = this.exitBox.create(100,400, 'attackBox').setScale(1);

        //personnage marchande

        this.merchant = this.add.sprite(600, 360, 'idleMerchant').setScale(0.7);

        this.merchantBox = this.exitBox.create(this.merchant.x,this.merchant.y, 'attackBox').setScale(1);

        this.merchantFirstEncounter = true; // empêche de trigger la discussion de rencontre avec la marchande

        this.cutscene = false;

        this.grandPaStopped = false;
        
        this.grandSon = this.physics.add.sprite(100, 380, 'gs').setScale(0.8);

        this.grandPa = this.physics.add.sprite(200, 380, 'gp').setScale(1).setSize(80,100).setOffset(15,0); 
        
        this.grandPaCarry = false;

        this.grandPaThrow = false;


        this.activePlayer = this.grandSon;
        this.inactivePlayer = this.grandPa;

        this.exitTarget = "";
        this.originPoint = "house2" // A passer dans le Init pour le re-spawn

        //HUD

        this.playerXtext = this.add.text(-280, -100, this.grandSon.x).setScrollFactor(0).setScale(2);

        this.playerYtext = this.add.text(-280, -50, this.grandSon.y).setScrollFactor(0).setScale(2);

        // this.goldText = this.add.text((896 - (896*2)/2) + 1250, (448 - (448*2)/2) + 600, this.goldCoins).setScrollFactor(0).setScale(2).setVisible(true);
        
        this.inputDisplayed = this.add.image(0, 0, 'e_input').setScrollFactor(1).setScale(1).setVisible(false);

        //création de la caméra, qui suit le joueur 
        this.cameras.main.setBounds(0, 0, 896, 448);
        this.cameras.main.startFollow(this.grandSon);
        this.cameras.main.setZoom(1)
        this.physics.world.setBounds(0, 0, 896, 448);

        this.shovelCollected = true;
        this.harpoonCollected = true;

        //Dialogues

        this.dialogueOnGoing = false;

        this.bgDialogue = this.add.image(620, 120, 'bgDialogue').setScrollFactor(0).setScale(0.6).setVisible(false);
        this.dialogueText = this.add.text(400, 25, '', { fontFamily: 'CustomFont' }).setScrollFactor(0).setScale(1).setVisible(false);

        this.choiceYes = this.add.text(420, 60, 'Oui', { fontFamily: 'CustomFont' }).setScrollFactor(0).setScale(1).setVisible(false);

        this.choiceYesBg = this.add.image(this.choiceYes.x + 12,this.choiceYes.y + 10, 'bgDialogue').setScrollFactor(0).setScale(0.05).setAlpha(0).setVisible(false).setInteractive();
        this.choiceNo = this.add.text(420, 85, 'Non', { fontFamily: 'CustomFont' }).setScrollFactor(0).setScale(1).setVisible(false);

        this.choiceNoBg = this.add.image(this.choiceNo.x + 12,this.choiceNo.y + 10, 'bgDialogue').setScrollFactor(0).setScale(0.05).setAlpha(0).setVisible(false).setInteractive();

        this.cursorChoice = this.add.image(this.choiceYes.x + 30,this.choiceYes.y + 10, 'choiceCursor').setScrollFactor(0).setScale(0.7).setVisible(false);

        this.cursorChoicePosition = 1;

        this.choiceAvailable = false;
        this.buyAnswer = "";

        this.leftEyeObtainedMessage = this.add.image(220, 350, 'leftEyeObtained').setScrollFactor(1).setScale(0.5).setVisible(false);

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

        this.nextLine = "";

        //collider

        this.physics.add.collider(this.grandSon, this.ground);
        this.physics.add.collider(this.grandPa, this.ground);

        
        

        this.physics.add.overlap(this.grandSon, this.house2Exit, this.exitHouse, null, this);
        this.physics.add.overlap(this.grandSon, this.merchantBox, this.merchantDiscovery, null, this);
        this.physics.add.overlap(this.grandSon, this.merchantBox, this.merchantRepeatOffer, null, this);
        this.physics.add.overlap(this.grandSon, this.merchantBox, this.bu, null, this);




        // interactions île

        this.cutscene = false; //Empêche les contrôles
        
        this.blackScreen = this.add.image(448, 224, 'bs').setScrollFactor(0).setScale(2).setAlpha(1);

        this.fadeOut();

        this.anims.create({

            key: 'idleMerchant',
            frames: this.anims.generateFrameNumbers('idleMerchant', {start:0,end:8}),
            frameRate: 4,
            repeat: -1
            
        });

        this.merchant.anims.play('idleMerchant', true);

    

        this.choiceNoBg.on('pointerdown', function (pointer) {


            this.buyAnswer = "leave";
            this.merchantRepeatOffer();


        });


        this.goldText = this.add.text((0,0, this.goldCoins)).setScale(2).setVisible(false);

        this.goldHud = this.add.image((100,100, 'hudGold')).setScale(1).setVisible(false);
        
        this.grandPa.anims.play('gpIdle', true);  
        
    }

    update(time,delta){

        playerControls(this.activePlayer,this.cursors);
        this.dialogueEnd()
        this.inputDisplay()

        this.merchantRepeatOffer()


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


        this.merchantFirstChat();

        //Placement curseur de choix achat 

        if (this.cursorChoicePosition == 1 && this.choiceAvailable){

            this.cursorChoice.x = this.choiceYes.x + 40
            this.cursorChoice.y = this.choiceYes.y + 10

        }

        if (this.cursorChoicePosition == 2 && this.choiceAvailable){

            this.cursorChoice.x = this.choiceNo.x + 40
            this.cursorChoice.y = this.choiceNo.y + 10


        }

        if(Phaser.Input.Keyboard.JustDown(this.cursors2.S) && this.cursorChoicePosition == 1){

            this.cursorChoicePosition +=1

        }


        if(Phaser.Input.Keyboard.JustDown(this.cursors2.Z) && this.cursorChoicePosition == 2){

            this.cursorChoicePosition -=1

        }

        // if(Phaser.Input.Keyboard.JustDown(this.cursors2.E)){

        //     if (this.grandSon.x < 250){

        //         this.firstVisit = 1
        //         this.originPoint = "house2"
        //         this.scene.start("island",{originPoint : this.originPoint, firstVisit : this.firstVisit, goldCoins : this.goldCoins});


        //     }

        // }
    }

    exitHouse(){

        if(Phaser.Input.Keyboard.JustDown(this.cursors2.E)){

            if (this.grandSon.x < 250){

                this.firstVisit = 1
                this.originPoint = "house2"
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

        if (this.grandSon.x < 250){

            this.inputDisplayed.setVisible(true);
            this.inputDisplayed.x = this.grandSon.x + 50;
            this.inputDisplayed.y = this.grandSon.y - 50;

        }

        if (this.grandSon.x > 500){

            this.inputDisplayed.setVisible(true);
            this.inputDisplayed.x = this.grandSon.x + 50;
            this.inputDisplayed.y = this.grandSon.y - 50;

        }
        


        else {

            this.inputDisplayed.setVisible(false);

        }
    }

    merchantDiscovery(){
        
        if(this.nextLine == "" && this.merchantFirstEncounter == true){
                if(Phaser.Input.Keyboard.JustDown(this.cursors2.E)){

                    this.dialogueOnGoing = true;
                    this.dialogueBox('"Nom d’un Kalastaa vert ! Je n’aurais jamais cru revoir\ndes gens vivants un jour !"')
                    // this..destroy()
                    

                    setTimeout(() => {

                        this.grandPaStopped = false
                        this.nextLine = "merchantDiscovery";
                
                    }, 300);

            
                
                }
            }

    }

    merchantFirstChat(){
        
        if(this.nextLine == "merchantDiscovery"){
                if(Phaser.Input.Keyboard.JustDown(this.cursors2.E)){

                    this.dialogueText.setText('')
                    

                    setTimeout(() => {


                        this.dialogueBox('"Moi ? Je ne suis pas comme ces barbares que vous\ntrouverez dehors, non ! Je suis une marchande !"')

                        this.nextLine = "merchantDiscovery1";
                
                    }, 300);

            
                
                }
        }

        if(this.nextLine == "merchantDiscovery1"){
            if(Phaser.Input.Keyboard.JustDown(this.cursors2.E)){

                this.dialogueText.setText('')
                

                setTimeout(() => {


                    this.dialogueBox('"Héhé, ce n’est pas parce que je suis un esprit que je ne\nvais pas essayer de m’enrichir ! Alors les jeunots,\nqu’est-ce qui vous amène sur cette île ?"')

                    this.nextLine = "merchantDiscovery2";
            
                }, 300);

        
            
            }

        }

        if(this.nextLine == "merchantDiscovery2"){
            if(Phaser.Input.Keyboard.JustDown(this.cursors2.E)){

                this.dialogueText.setText('')
                

                setTimeout(() => {


                    this.dialogueBox('"Hmm... Je vois ! Vous cherchez le Kalastaa ?\nRien que ça !"')

                    this.nextLine = "merchantDiscovery3";
            
                }, 300);

            }
        }

        if(this.nextLine == "merchantDiscovery3"){
                if(Phaser.Input.Keyboard.JustDown(this.cursors2.E)){
    
                    this.dialogueText.setText('')
                    
    
                    setTimeout(() => {
    
    
                        this.dialogueBox('"Vous avez vu la statue à côté de cette maison ?\nSi ça ne suffit pas à vous arrêtez, rien ne le fera !"')
    
                        this.nextLine = "merchantDiscovery4";
                
                    }, 300);
    
            
                
                }

        }

        if(this.nextLine == "merchantDiscovery4"){
            if(Phaser.Input.Keyboard.JustDown(this.cursors2.E)){

                this.dialogueText.setText('')
                

                setTimeout(() => {


                    this.dialogueBox('"Hmm..."')

                    this.nextLine = "merchantDiscovery5";
            
                }, 300);

        
            
            }

        }

        if(this.nextLine == "merchantDiscovery5"){
            if(Phaser.Input.Keyboard.JustDown(this.cursors2.E)){

                this.dialogueText.setText('')
                

                setTimeout(() => {


                    this.dialogueBox('"Je vais vous dire, je suis de bonne humeur.\nEt je vais vous aider. Enfin, moyennant finance.\nCela va sans dire !"')

                    this.nextLine = "merchantDiscovery6";
            
                }, 300);

        
            
            }

        }

        if(this.nextLine == "merchantDiscovery6"){
            if(Phaser.Input.Keyboard.JustDown(this.cursors2.E)){

                this.dialogueText.setText('')
                

                setTimeout(() => {


                    this.dialogueBox('"Si vous avez vu la statue, vous avez pu remarquer\nque celle-ci est incomplète, non ? "')

                    this.nextLine = "merchantDiscovery7";
            
                }, 300);

        
            
            }

        }

        if(this.nextLine == "merchantDiscovery7"){
            if(Phaser.Input.Keyboard.JustDown(this.cursors2.E)){

                this.dialogueText.setText('')
                

                setTimeout(() => {


                    this.dialogueBox('"Les yeux de la statue sont manquants, tout à fait, petit !\nEt j’ai justement l’une de ces gemmes avec moi.\nQui sait ce qu’il se passera une fois les deux gemmes\nà leur place ?"')

                    this.nextLine = "merchantDiscovery8";
                    this.merchantFirstEncounter = false;
            
                }, 300);

        
            
            }

        }

        if(this.nextLine == "merchantDiscovery8"){
            if(Phaser.Input.Keyboard.JustDown(this.cursors2.E)){

                this.dialogueText.setText('')
                

                setTimeout(() => {


                    this.dialogueBox('"40 pièces d’or et cet objet est à vous. Alors ?"')

                    this.nextLine = "";
                    this.merchantFirstEncounter = false;

                }, 300);
            
            }

        }
       
    }

    merchantRepeatOffer(){
        
        if(this.nextLine == "" && this.merchantFirstEncounter == false && this.dialogueOnGoing == false){
            if(Phaser.Input.Keyboard.JustDown(this.cursors2.E)){

                this.dialogueOnGoing = true;

                this.dialogueBox('"40 pièces d’or et cet objet est à vous. Alors ?"')
                this.nextLine = "buyAnswer"

                
                setTimeout(() => {

                    this.choiceYes.setVisible(true);
                    this.choiceYesBg.setVisible(true);
                    this.choiceNo.setVisible(true);
                    this.choiceNoBg.setVisible(true);

                    this.choiceAvailable = true;
                    this.cursorChoice.setVisible(true);
            
                }, 300);

            
            }
        }

        if(this.nextLine == "buyAnswer" && this.merchantFirstEncounter == false && this.cursorChoicePosition == 1 && this.goldCoins >= 40){
            if(Phaser.Input.Keyboard.JustDown(this.cursors2.E)){

                this.dialogueText.setText('');

                setTimeout(() => {


                    this.dialogueBox('"Excellente idée !"')
                    this.choiceYes.setVisible(false);
                    this.choiceYesBg.setVisible(false);
                    this.choiceNo.setVisible(false);
                    this.choiceNoBg.setVisible(false);

                    this.choiceAvailable = false;
                    this.cursorChoice.setVisible(false);
                    this.nextLine = ""
                    this.leftEyeStatue = true;

                    this.goldCoins -= 40;

                    this.leftEyeObtainedMessage.setVisible(true)

                        setTimeout(() => {

                        this.leftEyeObtainedMessage.setVisible(false)



                        }, 3000);
            
                }, 300);

            
            }
        }


        if(this.nextLine == "buyAnswer" && this.merchantFirstEncounter == false && this.cursorChoicePosition == 1 && this.goldCoins < 40){
            if(Phaser.Input.Keyboard.JustDown(this.cursors2.E)){

                this.dialogueText.setText('');

                
                setTimeout(() => {


                    this.dialogueBox('"Revenez me voir quand vous aurez assez d’or."')
                    this.choiceYes.setVisible(false);
                    this.choiceYesBg.setVisible(false);
                    this.choiceNo.setVisible(false);
                    this.choiceNoBg.setVisible(false);

                    this.choiceAvailable = false;
                    this.cursorChoice.setVisible(false);
                    this.nextLine = ""

            
                }, 300);

            
            }
        }

        if(this.nextLine == "buyAnswer" && this.merchantFirstEncounter == false && this.cursorChoicePosition == 2){
            if(Phaser.Input.Keyboard.JustDown(this.cursors2.E)){

                this.dialogueText.setText('');

                
                setTimeout(() => {


                    this.dialogueBox('"Comme vous voudrez, l’offre tient toujours !"')
                    this.choiceYes.setVisible(false);
                    this.choiceYesBg.setVisible(false);
                    this.choiceNo.setVisible(false);
                    this.choiceNoBg.setVisible(false);

                    this.choiceAvailable = false;
                    this.cursorChoice.setVisible(false);
                    this.nextLine = ""
            
                }, 300);

            
            }
        }

    }

}






    

    


