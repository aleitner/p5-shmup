var player;
var enemies = [];
var stars = [];
var starCount = 400;
var currentLevel = 1;
var level = new Level(currentLevel);

function preload() {
}

function setup() {
  createCanvas(400, 400);
  player = new Player(width/2,height*0.8);
  createStarfield();
}

function draw() {

  if (player.health <= 0) {
    textSize(32);
    text('You Lose', 130, 200);
    return;
  }

  background(0);
  moveStarField();

  if (keyIsDown(LEFT_ARROW)) {
    player.move(LEFT);
  }

  if (keyIsDown(RIGHT_ARROW)) {
    player.move(RIGHT);
  }

  if (keyIsDown(UP_ARROW)) {
    player.move(UP);
  }

  if (keyIsDown(DOWN_ARROW)) {
    player.move(DOWN);
  }

  spawn();
  checkCollisions();
  automateEnemies();

  player.display();

}

function keyPressed() {
  switch (keyCode) {
    case SPACEBAR:
      player.shoot();
      break;
    case SKEY:
      player.rotateWeapon();
      break;
  }

}

function createStarfield() {
  for (var i = 0; i < starCount; i++) {
    stars[i] = new Star();
  }
}

function moveStarField() {
  for (var i = 0; i < starCount; i++) {
    stars[i].move();
    stars[i].display();
  }
}

function spawn() {
  if (level.loaded === false) {
    for (i=0; i < level.position.length; i++) {
      let x = level.position[i].x;
      let y = level.position[i].y;

      enemies.push(new Enemy(x, y));
    }
    level.loaded = true;
  }
}

function automateEnemies() {
  enemies.forEach(enemy => enemy.automateMovement());
  enemies.forEach(enemy => enemy.display());
  enemies.forEach(enemy => {
    enemy.ship.weapons.forEach(weapon => {
      if (weapon.firing === false) {
        enemy.shoot();
      }
    });
  });
}

function checkCollisions() {
  for (h = 0; h < enemies.length; h++) {
    if (player.ship.collidesWith(enemies[h].ship)) {
      player.health -= 10;
      enemies[h].health -= 10;

      if (enemies[h].health <= 0) {
        enemies.splice(h, 1);
      }
    }
  }

  for (i = 0; i < player.ship.weapons.length; i++ ) {
    for (j = 0; j < player.ship.weapons[i].shots.length; j++) {
      for (k = 0; k < enemies.length; k++) {
        if (player.ship.weapons[i].shots[j].collidesWith(enemies[k].ship)) {
          enemies[k].health -= 10;

          if (enemies[k].health <= 0 && enemies[k].ship.weapons[i].shots.length == 0) {
            enemies.splice(k, 1);
          }
        }
      }
    }
  }

  for (l = 0; l < enemies.length; l++) {
    for (m = 0; m < enemies[l].ship.weapons.length; m++ ) {
      for (n = 0; n < enemies[l].ship.weapons[m].shots.length; n++) {
        if (enemies[l].ship.weapons[m].shots[n].collidesWith(player.ship)) {
          player.health -= 10;
        }
      }
    }
  }
}
