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
          }
          break;
        case UP:
          if (this.shots[i].y > 0) {
            this.shots[i].y -= this.bulletSpeed;
          } else {
            this.shots.splice(i, 1);
          }
          break;
      }

      if (this.shots.length == 0) {
        this.firing = false;
      }
    }
  }

  this.displayShots = function() {
    for (i = 0; i < this.shots.length; i++) {
      fill(255, 204, 0);
      rect(this.shots[i].x, this.shots[i].y, this.shots[i].r*2, this.shots[i].r*2);
    }
  }

}

function defaultShot(x, y, direction) {
  this.x = x;
  this.y = y;
  this.r = 2;
  this.direction = direction;

  this.collidesWith = function(object) {
    var distance = dist(this.x, this.y, object.x, object.y);

    if (distance < object.r + this.r) {
      return true;
    }

    return false;
  }
}
