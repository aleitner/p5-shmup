function Player(x, y) {
  this.ship = new Ship(x, y);
  this.lives = 3;
  this.health = 10;

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
    if (this.health > 0) {
      this.ship.shoot(UP);
    }
  }

  this.rotateWeapon = function() {
    this.ship.rotateWeapon();
  }
}
