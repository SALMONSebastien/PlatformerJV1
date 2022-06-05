class cutsceneBeginning extends Phaser.Scene {
    constructor() {
        
        super("cutsceneBeginning");

    }
        
    preload() {

        // this.load.image('backgroundSea', 'assets/cutsceneSea1/test.png');  
        // this.load.image('boatImage', 'assets/cutsceneSea1/boat.png');   
        
        this.load.image('bs', 'assets/blackScreen.png');

        this.load.image('fish1', 'assets/cutsceneBeginning/fish.png');





        this.load.spritesheet('effect1', 'assets/cutsceneBeginning/effect1.png',
            { frameWidth: 544, frameHeight: 306 });


       
    }

    create() {

        this.mainTheme = this.sound.add('mainTheme');

        this.mainTheme.loop = true;


        this.mainTheme.play();



        this.cursors2 = this.input.keyboard.addKeys('space, A, E, enter');


        this.effect1 = this.add.sprite(400,224,'effect1').setScale(2).setAlpha(0);


        this.fish1 = this.add.sprite(135,600,'fish1').setScale(0.8).setAlpha(0.8);




        this.cameras.main.setBounds(0, 0, 896, 448);
        this.cameras.main.setZoom(1)
        this.physics.world.setBounds(0, 0, 896, 448);



        this.blackScreen = this.add.image(448, 224, 'bs').setScrollFactor(0).setScale(2).setAlpha(1);

        this.fadeOut()

        //Animation effets

        this.anims.create({

            key: 'effect1',
            frames: this.anims.generateFrameNumbers('effect1', {start:0,end:73}),
            frameRate: 15,
            repeat: 0            
        });


        this.dialogueOnGoing = false;

        // this.bgDialogue = this.add.image(790, 40, 'bgDialogue').setScrollFactor(0).setVisible(false);
        this.dialogueText = this.add.text(150, 150, '', { fontFamily: 'CustomFont' }).setScrollFactor(0).setScale(1).setVisible(true);
        this.nextLine = "cutsceneBeginning1";

        this.blackScreen = this.add.image(448, 224, 'bs').setScrollFactor(0).setScale(2).setAlpha(1);
         
        this.fishDisappear = false;


    }

    update(time,delta){
        this.dialogueEnd();

        this.cutsceneBeginning()

        if (Phaser.Input.Keyboard.JustDown(this.cursors2.enter)){

            
            this.mainTheme.stop();
            this.scene.start('forest')

        }

        if (this.fishDisappear == true){

            this.fish1.y -= 2    

        }

    
    }

    cutsceneBeginning(){

        if (this.nextLine == "cutsceneBeginning1"){

            this.nextLine = "cutsceneBeginning1finish"

            setTimeout(() => {

                this.typewriteText('Dans une contrée lointaine, vivaient un vieux pêcheur et son petit-fils.')
                console.log(this.nextLine)

                setTimeout(() => {

                    this.nextLine = "cutsceneBeginning2"
                    
                }, 1000);
                
            }, 300);
        
        }

        if(this.nextLine == "cutsceneBeginning2"){

            this.nextLine = "cutsceneBeginning2finish"
                
            setTimeout(() => {

                    this.dialogueText.setText('')

                    setTimeout(() => {

                        this.typewriteText('Fort respecté en son temps, ce vieil homme était réputé pour sa combativité\net ses prises légendaires.')

                        setTimeout(() => {

                            this.nextLine = "cutsceneBeginning3"
                            this.seaSound.setVolume(0.2)

                            
                        }, 1000);
    
                    }, 300);

            }, 6000);
        }


        if(this.nextLine == "cutsceneBeginning3"){

            this.nextLine = "cutsceneBeginning3finish"
                
            setTimeout(() => {

                    this.dialogueText.setText('')
                    this.fadeOut();

                    this.dialogueText.x = 100


                    setTimeout(() => {

                        this.typewriteText('Monstres marins et autres créatures étaient tombés des mains de ce pêcheur habile.')

                        setTimeout(() => {

                            this.nextLine = "cutsceneBeginning4"

                            setTimeout(() => {

                                this.effect1.setAlpha(0.2)

                                setTimeout(() => {

                                    this.effect1.setAlpha(0.4)
                                    this.fishDisappear = true;


                                    setTimeout(() => {

                                        this.effect1.setAlpha(0.6)

                                        
                                    }, 100);
                                    
                                }, 100);
                                
                                
                            }, 100);
                            
                        }, 1000);
    
                    }, 300);

            }, 8000);
        }

        if(this.nextLine == "cutsceneBeginning4"){

            this.nextLine = "cutsceneBeginning4finish"
                
            setTimeout(() => {

                    this.dialogueText.setText('')
                    this.dialogueText.x = 125


                    setTimeout(() => {

                        this.typewriteText('Mais une légende mentionnait l’existence d’un poisson légendaire.')

                        setTimeout(() => {

                            this.nextLine = "cutsceneBeginning5"
                            
                        }, 1000);
    
                    }, 300);

            }, 6000);
        }

        if(this.nextLine == "cutsceneBeginning5"){

            this.nextLine = "cutsceneBeginning5finish"
                
            setTimeout(() => {

                    this.dialogueText.setText('')
                    this.dialogueText.x = 100


                    setTimeout(() => {

                        this.typewriteText('Un poisson mythique que ce pêcheur n’avait jamais réussi à voir...')
                        this.effect1.anims.play('effect1', true);


                        setTimeout(() => {

                            // this.fadeIn()
                            this.nextLine = "cutsceneBeginning6"

        
                        }, 4000);
    
                    }, 300);

            }, 4000);
        }

        if(this.nextLine == "cutsceneBeginning6"){

            this.nextLine = "cutsceneBeginning6finish"
                
            setTimeout(() => {

                    this.dialogueText.setText('')
                    this.dialogueText.x = 400


                    setTimeout(() => {

                        this.typewriteText('Le Kalastaa')


                        setTimeout(() => {

                            this.nextLine = "cutsceneBeginning7"
        
                        }, 2500);
    
                    }, 300);

            }, 3000);
        }


        if(this.nextLine == "cutsceneBeginning7"){

            this.nextLine = "cutsceneBeginning7finish"
                
            setTimeout(() => {

                    this.dialogueText.x = 100
                    this.dialogueText.setText('')


                    setTimeout(() => {

                        this.typewriteText('Un jour, jugeant son petit-fils prêt à l’accompagner,\nil décida de partir à l’aventure avec celui-ci.')


                        setTimeout(() => {

                            this.fadeIn()

                            setTimeout(() => {

                                this.mainTheme.stop();
                                this.seaSound.setVolume(0.1);

                                this.scene.start('forest');
                                
                            }, 3000);
            
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