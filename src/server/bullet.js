const shortid = require('shortid');
const ObjectClass = require('./object');
const Constants = require('../shared/constants');

class Bullet extends ObjectClass {
  constructor(parentID,init_x,init_y, x, y, dir) {
    super(shortid(), x, y, dir, Constants.BULLET_SPEED);
    this.parentID = parentID;
    this.init_x = init_x;
    this.init_y = init_y
  }

  // Returns true if the bullet should be destroyed
  update(dt) {
    super.update(dt);
    this.dist = ((this.x -this.init_x)**2 + (this.y - this.init_y)**2)**0.5;
    return this.x < 0 || this.x > Constants.MAP_SIZE || this.y < 0 || this.y > Constants.MAP_SIZE || this.dist > 1000.0;
  }
}

module.exports = Bullet;
