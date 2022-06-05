class cutsceneEnding extends Phaser.Scene {
    constructor() {
        
        super("cutsceneEnding");

    }
        
    preload() {

        this.load.image('bs', 'assets/blackScreen.png');
    }

    create() {

        this.cursors2 = this.input.keyboard.addKeys('space, A, E, enter');
        this.cameras.main.setBounds(0, 0, 896, 448);
        this.cameras.main.setZoom(1)
        this.physics.world.setBounds(0, 0, 896, 448);
        this.fadeOut()
        this.dialogueOnGoing = false;
        this.dialogueText = this.add.text(150, 150, '', { fontFamily: 'CustomFont' }).setScrollFactor(0).setScale(1).setVisible(true);
        this.nextLine = "cutsceneEnding1";
        this.blackScreen = this.add.image(448, 224, 'bs').setScrollFactor(0).setScale(2).setAlpha(1);


    }

    update(time,delta){

        this.dialogueEnd();
        this.cutsceneEnding();
    
    }

    cutsceneEnding(){

        if (this.nextLine == "cutsceneEnding1"){

            this.nextLine = "cutsceneEnding1finish"

            setTimeout(() => {

                this.typewriteText('"Ne faîtes pas la même erreur que moi" nous avait imploré l’esprit de ce pêcheur. ')

                setTimeout(() => {

                    this.nextLine = "cutsceneEnding2"
                    
                }, 3000);
                
            }, 300);
        
        }

        if(this.nextLine == "cutsceneEnding2"){

            this.nextLine = "cutsceneEnding2Finish"
                
            setTimeout(() => {

                    this.dialogueText.setText('')

                    setTimeout(() => {

                        this.typewriteText('"Pendant quelques mois, nous continuâmes à chercher le Kalastaa."')

                        setTimeout(() => {

                            this.nextLine = "cutsceneEnding3"
 
                        }, 1000);
    
                    }, 300);

            }, 6000);
        }

        if(this.nextLine == "cutsceneEnding3"){

            this.nextLine = "cutsceneEnding3Finish"
                
            setTimeout(() => {

                    this.dialogueText.setText('')

                    setTimeout(() => {

                        this.typewriteText('"Sans succès..."')

                        setTimeout(() => {

                            this.nextLine = ""

                        }, 1000);
    
                    }, 300);

            }, 6000);
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