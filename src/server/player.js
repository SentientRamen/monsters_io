const ObjectClass = require('./object');
const Bullet = require('./bullet');
const Constants = require('../shared/constants');

class Player extends ObjectClass {
  constructor(id, username, x, y,type) {
    super(id, x, y, type,Math.random() * 2 * Math.PI, Constants.PLAYER_SPEED);
    this.username = username;
    this.maxHp = Constants.PLAYER_MAX_HP;
    this.hp = Constants.PLAYER_MAX_HP;
    this.lvl = 1;
    this.fireCooldown = 0;
    this.score = 0;
    this.exp = 2;
    this.currMaxExp = 0;
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
      return new Bullet(this.id, this.x, this.y, this.x, this.y, this.direction,this.type,this.lvl);
    }

    return null;
  }

  takeBulletDamage(val) {
    this.hp -= Math.round(Constants.BULLET_DAMAGE * val);
  }

  getMaxLevel(lvl) {
    let level = lvl + 1;
    let currMaxExp = 0;
    if (level > 100) {
        level = 100;
    }
    if (level <= 50) {
        currMaxExp = (level ** 3 * (100 - level)) / 50;
    } else if (level <= 68) {
        currMaxExp = (level ** 3 * (150 - level)) / 100;
    } else if (level <= 98) {
        currMaxExp = (level ** 3 * ((1911 - 10 * level) / 3)) / 500;
    } else {
        currMaxExp = (level ** 3 * (160 - level)) / 100;
    }

    return currMaxExp;
  }

  onDealtDamage(val) {
    let currExp = this.getMaxLevel(this.lvl);
    this.score += Math.round(Constants.SCORE_BULLET_HIT * val);
    if (this.lvl < 100) {
      this.exp += 20 * (1 / (val + 1));
    }
    if(this.exp > currExp && this.lvl < 100) {
      this.lvl += 1;
      this.hp = Constants.PLAYER_MAX_HP * Math.round(1+ this.lvl/20);
      this.maxHp = Constants.PLAYER_MAX_HP * Math.round(1+ this.lvl/20);
    }
    this.currMaxExp = this.getMaxLevel(this.lvl);
  }

  serializeForUpdate() {
    return {
      ...(super.serializeForUpdate()),
      direction: this.direction,
      maxHp: this.maxHp,
      hp: this.hp,
      lvl: this.lvl,
      experience: this.exp,
      currMaxExp: this.currMaxExp,
    };
  }
}

module.exports = Player;
