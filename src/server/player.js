const ObjectClass = require('./object');
const Bullet = require('./bullet');
const Constants = require('../shared/constants');

class Player extends ObjectClass {
  constructor(id, username, x, y,type) {
    super(id, x, y, type,Math.random() * 2 * Math.PI, Constants.PLAYER_SPEED);
    this.username = username;
    this.hp = Constants.PLAYER_MAX_HP;
    this.fireCooldown = 0;
    this.score = 0;
  }

  // Returns a newly created bullet, or null.
  update(dt) {
    super.update(dt);

    // Update score
    this.score += dt * Constants.SCORE_PER_SECOND;

    // Make sure the player stays in bounds
    this.x = Math.max(0, Math.min(Constants.MAP_SIZE, this.x));
    this.y = Math.max(0, Math.min(Constants.MAP_SIZE, this.y));

    // Fire a bullet, if needed
    this.fireCooldown -= dt;
    if (this.fireCooldown <= 0) {
      this.fireCooldown += Constants.PLAYER_FIRE_COOLDOWN;
      return new Bullet(this.id, this.x, this.y, this.x, this.y, this.direction,this.type);
    }

    return null;
  }

  takeBulletDamage(val) {
    this.hp -= Math.round(Constants.BULLET_DAMAGE * val);
  }

  onDealtDamage(val) {
    this.score += Math.round(Constants.SCORE_BULLET_HIT * val);
  }

  serializeForUpdate() {
    return {
      ...(super.serializeForUpdate()),
      direction: this.direction,
      hp: this.hp,
    };
  }
}

module.exports = Player;
