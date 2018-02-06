function Ship(x, y) {
  this.x = x;
  this.y = y;
  this.r = 5
  this.speed = 3;
  this.weapons = [new defaultWeapon()];

  this.move = function(x, y) {
    this.x += x * this.speed;
    if (this.x > width) {
      this.x = width;
    }

    if (this.x < 0) {
      this.x = 0;
    }

    this.y += y * this.speed;
    if (this.y > height) {
      this.y = height;
    }

    if (this.y < 0) {
       this.y = 0;
    }
  }

  this.rotateWeapon = function() {
    this.weapons.unshift(this.weapons.pop());
  }

  this.shoot = function(direction) {
    this.weapons[0].fire(this.x, this.y, direction);
  }

  this.display = function() {
    fill(255);
    ellipse(this.x, this.y, 2*this.r, 2*this.r);
  }

  this.collidesWith = function(object) {
    var distance = dist(this.x, this.y, object.x, object.y);
    if (dist < object.r + this.r) {
      return true;
    }

    return false;
  }
}
