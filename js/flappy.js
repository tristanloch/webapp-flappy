// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)





var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var image;
var score = 0;
var player;
var labelScore;
var pipes = [];
/*
 * Loads all resources for the game and gives them names.
 */
function preload() {game.load.image("playerImg", "../assets/flappy.png");
game.load.image("pipeBlock", "../assets/pipe.png");


}

function clickHandler(event) {
  image.kill();
  image = game.add.sprite(event.x, event.y, "playerImg");

}


/*
  Initialises the game. This function is only called once.
 */
function create() {game.input.onDown.add(clickHandler);

   game.physics.startSystem(Phaser.Physics.ARCADE);
    // set the background colour of the scene
    game.stage.setBackgroundColor("#7DE4A9");
    game.add.text(70,0,"Hope you have fun playing my game",{font:"30px Arial", fill: "#3D8B8C"});
    player = game.add.sprite(100, 200, "playerImg");

    game.physics.arcade.enable(player);

    player.body.gravity.y = 300;
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    .onDown.add(playerJump);
    /*game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
    .onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
    .onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.UP)
    .onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
    .onDown.add(moveDown);*/
    var pipeInterval = 1.75 * Phaser.Timer.SECOND;
game.time.events.loop(
    pipeInterval,
    generatePipe
);
    labelScore = game.add.text(20, 20, "0");
    labelScore.setText(score.toString());
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
game.physics.arcade.overlap(
        player,
		  pipes,
		  gameOver);
}

function gameOver(){
    location.reload();
}




function changeScore() { score = score +1; labelScore.setText(score.toString());

}

function playerJump() {
    player.body.velocity.y = -200;
}

function moveRight() {
  player.x = player.x + 10;
}

function moveLeft() {
  player.x = player.x - 10;
}

function moveUp() {
  player.y = player.y - 10;
}

function moveDown() {
  player.y = player.y + 10;
}

function generatePipe() {

  var gap = game.rnd.integerInRange(1 ,5);
    for (var count=0; count<8; count++) {
        if(count != gap && count != gap+1) {
            addPipeBlock(750, count * 50);
        }
    }
    changeScore();
}

function addPipeBlock(x, y) {
  var pipeBlock = game.add.sprite(x,y,"pipeBlock");
  pipes.push(pipeBlock);
  game.physics.arcade.enable(pipeBlock);
  pipeBlock.body.velocity.x = -200;
}
