function Enemy(x, y, stats) {
  const _stats = Object.assign({}, stats);
  this.ship = new Ship(x, y);
  this.health = _stats.health || 100;
  this.direction = LEFT;

  this.move = function(direction) {
    let x = 0;
    let y = 0;
    switch (direction) {
      case LEFT:
        x = -1;
        break;
      case RIGHT:
        x = 1;
        break;
      case UP:
        y = -1;
        break;
      case DOWN:
        y = 1;
        break;
    }

    this.ship.move(x, y);
  }

  this.display = function() {
    // Display the player's bullets at this level so that if the player is dead you can still see the bullets
    for (weaponi = 0; weaponi < this.ship.weapons.length; weaponi++ ) {
      if (this.ship.weapons[weaponi].firing == true) {
          this.ship.weapons[weaponi].moveShots();
          this.ship.weapons[weaponi].displayShots();
      }
    }

    if (this.health > 0) {
      this.ship.display();
    }
  }

  this.shoot = function() {
    this.ship.shoot(DOWN);
  }

  this.rotateWeapon = function() {
    this.ship.rotateWeapon();
  }

  this.automateMovement = function () {
    if (this.direction === LEFT) {
      if (this.ship.x <= 10) {
        this.direction = RIGHT;
      } else {
        this.move(LEFT);
      }
    } else {
      this.move(RIGHT);

      if (this.ship.x >= 390) {
        this.direction = LEFT;
      }
    }
  }

  this.setDirection = function (dir) {
    this.direction = dir;
  }
}
