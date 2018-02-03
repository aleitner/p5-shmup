function defaultWeapon() {
  this.maxShots = 10;
  this.shots = [];
  this.bulletSpeed = 4;
  this.firing = false;

  this.fire = function(originx, originy, direction) {
    if (this.shots.length >= this.maxShots) {
      return;
    }

    this.shots.push(new defaultShot(originx, originy, direction));
    this.firing = true;
  }

  this.moveShots = function() {
    for (i = 0; i < this.shots.length; i++) {
      switch (this.shots[i].direction) {
        case DOWN:
          if (this.shots[i].y < height) {
            this.shots[i].y += this.bulletSpeed;
          } else {
            this.shots.splice(i, 1);
            this.firing = false;
          }
          break;
        case UP:
          if (this.shots[i].y > 0) {
            this.shots[i].y -= this.bulletSpeed;
          } else {
            this.shots.splice(i, 1);
            this.firing = false;
          }
          break;
      }
    }
  }

  this.displayShots = function() {
    for (i = 0; i < this.shots.length; i++) {
        rect(this.shots[i].x, this.shots[i].y, this.shots[i].r*2, this.shots[i].r*2);
    }
  }

}

function defaultShot(x, y, direction) {
  this.x = x;
  this.y = y;
  this.r = 2;
  this.direction = direction;
}
