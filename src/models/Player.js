import Item from './Item';
import { levels, weapons } from '../constants';

export default class Player extends Item {
  constructor() {
    super(2);
    this.health = 100;
    this.level = levels[0];
    this.weapon = weapons[0];
    this.xp = 0;
  }

  get nextLevel() {
    // index of the next level equals the level of the current
    let nextLevel = levels[this.level + 1];
    if (this.xp > nextLevel) {
      this.level++;
      nextLevel = levels[nextLevel + 1];
    }
    return nextLevel - this.xp
  }
}
