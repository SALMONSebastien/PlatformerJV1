class cutsceneSea1 extends Phaser.Scene {
    constructor() {
        
        super("cutsceneSea1");

    }
        
    preload() {

        this.load.image('backgroundSea', 'assets/cutsceneSea1/test.png');  
        this.load.image('boatImage', 'assets/cutsceneSea1/boat.png');   
        this.load.image('bs', 'assets/blackScreen.png');


        this.load.spritesheet('boat', 'assets/main_menu/boat_cutscene.png',
            { frameWidth: 792, frameHeight: 512 });


       
    }

    create() {

        this.cursors2 = this.input.keyboard.addKeys('space, A, E, enter');

        this.add.image(448,224,'backgroundSea').setScale(0.7);

        this.boat = this.add.sprite(400,224,'boat').setScale(0.8);



        this.cameras.main.setBounds(0, 0, 896, 448);
        this.cameras.main.setZoom(1)
        this.physics.world.setBounds(0, 0, 896, 448);



        this.blackScreen = this.add.image(448, 224, 'bs').setScrollFactor(0).setScale(2).setAlpha(1);

        this.fadeOut()

        //Animations - boat

        this.anims.create({

            key: 'boat',
            frames: this.anims.generateFrameNumbers('boat', {start:0,end:48}),
            frameRate: 15,
            repeat: -1
            
        });


        this.dialogueOnGoing = false;

        // this.bgDialogue = this.add.image(790, 40, 'bgDialogue').setScrollFactor(0).setVisible(false);
        this.dialogueText = this.add.text(150, 320, '', { fontFamily: 'CustomFont' }).setScrollFactor(0).setScale(1).setVisible(true);
        this.nextLine = "cutscene1.1";

        this.boat.anims.play('boat', true); 



    }

    update(time,delta){
        this.dialogueEnd();

        this.cutsceneSea1Story()

        if (Phaser.Input.Keyboard.JustDown(this.cursors2.enter)){

            this.scene.start('island')

        }

    
    }

    cutsceneSea1Story(){

        if (this.nextLine == "cutscene1.1"){

            this.nextLine = "cutscene1.1finish"

            setTimeout(() => {

                this.typewriteText('Le grand-père et son petit-fils partirent en quête de ce poisson mythique...')
                console.log(this.nextLine)

                setTimeout(() => {

                    this.nextLine = "cutscene1.2"
                    
                }, 1000);
                
            }, 300);
        
        }

        if(this.nextLine == "cutscene1.2"){

            this.nextLine = "cutscene1.2finish"
                
            setTimeout(() => {

                    this.dialogueText.setText('')

                    setTimeout(() => {

                        this.typewriteText('Mais après des heures de recherche, ils ne trouvèrent rien. Quand soudain...')

                        setTimeout(() => {

                            this.nextLine = "cutscene1.3"
                            
                        }, 1000);
    
                    }, 300);

            }, 6000);
        }


        if(this.nextLine == "cutscene1.3"){

            this.nextLine = "cutscene1.3finish"
                
            setTimeout(() => {

                    this.dialogueText.setText('')
                    this.fadeIn();
                    this.dialogueText.x = 200

                    setTimeout(() => {

                        this.typewriteText('"Grand-Père ! Tu vois ce que je vois ?" le garçon hurla de surprise.')

                        setTimeout(() => {

                            this.nextLine = "cutscene1.4"
                            
                        }, 1000);
    
                    }, 300);

            }, 6000);
        }

        if(this.nextLine == "cutscene1.4"){

            this.nextLine = "cutscene1.4finish"
                
            setTimeout(() => {

                    this.dialogueText.setText('')

                    setTimeout(() => {

                        this.typewriteText('Une minuscule île se trouvait devant les deux compères.')

                        setTimeout(() => {

                            this.nextLine = "cutscene1.5"
                            
                        }, 1000);
    
                    }, 300);

            }, 4000);
        }

        if(this.nextLine == "cutscene1.5"){

            this.nextLine = "cutscene1.5finish"
                
            setTimeout(() => {

                    this.dialogueText.setText('')
                    this.dialogueText.x = 80


                    setTimeout(() => {

                        this.typewriteText('Abasourdi, le grand-père se rapprocha de cette île lugubre et acosta sur la plage de celle-ci...')

                        setTimeout(() => {

                            this.scene.start('island')
        
                        }, 6000);
    
                    }, 300);

            }, 5000);
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
        
        // this.bgDialogue.setVisible(true)
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

    

}