

function playerControls(player,cursors) {

    
        if (this.gameOver) { return; }
            if (cursors.left.isDown) { //si la touche gauche est appuyée
                player.setVelocityX(-500); //alors vitesse négative en X
                //player.anims.play('left', true); //et animation => gauche
                player.direction = "left"
                player.walking = true
                player.jumping = false
                player.attacking = false
                




                


            }
            else if (cursors.right.isDown) { //sinon si la touche droite est appuyée
                player.setVelocityX(500); //alors vitesse positive en X
                //player.anims.play('right', true); //et animation => droite

                player.direction = "right"
                player.walking = true
                player.jumping = false
                player.attacking = false

                
            }

            
        
            else { // sinon

                player.setVelocityX(0); //vitesse nulle
                player.walking = false
                player.jumping = false
                
            
                //player.anims.play('turn'); //animation fait face caméra
            }

        if (cursors.up.isDown && player.body.onFloor()) {
            //si touche haut appuyée ET que le perso touche le sol
            player.setVelocityY(-800); //alors vitesse verticale négative
            player.jumping = true
            
            //(on saute)
        }

        if (player.body.onFloor()) {
            //si touche haut appuyée ET que le perso touche le sol
            player.angle = 0; //alors vitesse verticale négative
            //(on saute)
        }

}