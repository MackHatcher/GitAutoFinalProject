'use strict';

window.onload = alert("Help Cuphead rescue his pal Mugman from the castle! Collect the magic gems to open the doors, and avoid those pesky baddies!");

// Sets an initial player score of 0.
var score = 0;
var scoreElement = document.getElementById('playerScore');
scoreElement.innerHTML = score;

//Track which level the player is on
var level = 1;
var levelElement = document.getElementById('level');
levelElement.innerHTML = level;

//function to increase/change the level
checkScore = function checkScore() {
    if (score == 3) {}
    if (score == 4) {
        level = 2;
        levelElement.innerHTML = level;
    }
};

//track the player's total lives
var lives = 3;
var livesElement = document.getElementById('playerLives');
livesElement.innerHTML = lives;

//function that resets the gem locations, the score, lives and level counter; as well as slow down the enemies if a game over has occured
var resetGame = function resetGame() {
    lives = 3;
    score = 0;
    level = 1;
    player.reset();
    livesElement.innerHTML = lives;
    scoreElement.innerHTML = score;
    allEnemies.forEach(function (element) {
        if (score <= 1) {
            element.speed /= 1.25;
        } else if (score == 2) {
            element.speed /= 2.5;
        } else if (score == 3) {
            element.speed /= 3.75;
        }
    });
    orangeGem.x = 385;
    orangeGem.y = 420;
    blueGem.x = 385;
    blueGem.y = 175;
    greenGem.x = 80;
    greenGem.y = 175;
    starGem.x = 190;
    starGem.y = 10;
    mainDoor.x = 202;
    mainDoor.y = 55;
};

//function keeping track of the player's total number of remaining attempts
checkLives = function checkLives() {
    livesElement.innerHTML = lives;
    if (lives === 0) {
        alert('You failed to save your friend, but managed to earn a high score of ' + score + '. At least that\'s something! Press okay to try again!');
        resetGame();
    }
};

// Enemies our player must avoid
var Enemy = function Enemy(x, y, speed) {
    this.sprite = 'images/assets/Mudman_sprite.png';
    //x and y coordinates:
    this.x = x;
    this.y = y;
    this.speed = speed;
};

Enemy.prototype.update = function (dt) {

    if (this.x < 940) {
        this.x += this.speed * dt;
    } else {
        this.x = -90;
    }

    // If the enemy and the player collide.
    if (this.x < player.x + 30 && this.x + 60 > player.x && this.y < player.y + 60 && this.y + 40 > player.y) {
        player.reset();
        lives--;
        checkLives();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//create player
var Player = function Player() {
    if (score < 4) {
        this.sprite = 'images/assets/cup_idle.png';
        this.x = 200;
        this.y = 520;
    }
};

//all gem functions and methods
var Gem = function Gem(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
};

var orangeGem = new Gem(385, 420, 'images/assets/gem-orange.png');
var blueGem = new Gem(385, 175, 'images/assets/gem-blue.png');
var greenGem = new Gem(80, 175, 'images/assets/gem-green.png');
var starGem = new Gem(190, 10, 'images/assets/star-gem.png');

var allGems = [orangeGem, blueGem, greenGem, starGem];

Gem.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.update();
};

Gem.prototype.update = function () {
    if (this.x < player.x + 30 && this.x + 60 > player.x && this.y < player.y + 60 && this.y + 40 > player.y) {
        this.x = -200;
        this.y = -200;
        score++;
        allEnemies.forEach(function (element) {
            element.speed *= 1.15;
        });
        document.getElementById('playerScore').innerHTML = score;
        trigger = 1;
    }
    if (level == 2) {
        orangeGem.x = 885;
        orangeGem.y = 340;
        blueGem.x = 485;
        blueGem.y = 255;
        greenGem.x = 85;
        greenGem.y = 100;
        starGem.x = 600;
        starGem.y = -13;
    }
};
//all door functions and methods
var Door = function Door(x, y) {
    this.sprite = 'images/assets/door-tall-closed.png';
    this.x = x;
    this.y = y;
};

var mainDoor = new Door(202, 55);

Door.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Door.prototype.update = function () {
    if (score == 3) {
        this.x = -200;
        this.y = -200;
    }
    if (score >= 4) {
        this.x = 605;
        this.y = -13;
    }
    if (score >= 7) {
        this.x = -200;
        this.y = -200;
    }
};
var trigger = 0;

// Is called every time the player position is updated
Player.prototype.update = function () {

    if (score >= 4 && trigger == 1) {
        this.sprite = 'images/assets/cup_idle.png';
        this.x = 612;
        this.y = 620;
        trigger = 0;
    }
    checkScore();
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput1 = function (direction) {
    if (score < 4) {
        if (direction == 'left' && this.x > 0) {
            this.x -= 50;
            this.sprite = 'images/assets/cup_running_left.png';
        }
        if (direction == 'right' && this.x < 400) {
            this.x += 50;
            this.sprite = 'images/assets/cup_running_right.png';
        }
        if (direction == 'up' && this.y > 3) {
            this.y -= 50;
        }
        if (direction == 'down' && this.y < 500) {
            this.y += 50;
        }
    } else if (score >= 4) {

        if (direction == 'left' && this.x > 0) {
            this.x -= 50;

            this.sprite = 'images/assets/cup_running_left.png';
        }
        if (direction == 'right' && this.x < 902) {
            this.x += 50;

            this.sprite = 'images/assets/cup_running_right.png';
        }
        if (direction == 'up' && player.y > 70) {
            player.y = player.y - 50;
        }
        if (direction == 'down' && this.y < 620) {
            this.y += 50;
        }
    }
};

// Is called when the player is reset to the starting point
Player.prototype.reset = function () {
    if (score < 4) {
        this.x = 200;
        this.y = 520;
    }
    if (score >= 4) {
        this.x = 612;
        this.y = 620;
    }
};

// Now instantiate your objects.

var enemy1 = new Enemy(-390, 150, 100);
var enemy2 = new Enemy(-490, 350, 250);
var enemy3 = new Enemy(-490, 220, 180);
var enemy4 = new Enemy(-590, 200, 80);
var enemy5 = new Enemy(-990, 300, 230);
var enemy6 = new Enemy(-990, 400, 200);

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];

// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
document.addEventListener('keydown', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput1(allowedKeys[e.keyCode]);
});

document.addEventListener('keyup', function (e) {
    if (e.keyCode == 37) {
        player.sprite = 'images/assets/cup_idle_left.png';
    } else {
        player.sprite = 'images/assets/cup_idle_right.png';
    }
});