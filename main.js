var config = {
    type: Phaser.AUTO,
    width: 896 , height: 448,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1500 },
            debug: false,
            
        }
    },
    

    // scene: [main_menu,cabin,forest,island],
    scene: [main_menu,cutsceneBeginning,cutsceneEnding,cutsceneForestEnding,forest,cutsceneSea1,island,house1,house2,house4,vault],
    input:{gamepad:true},
};
new Phaser.Game(config);

