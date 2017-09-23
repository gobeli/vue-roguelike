import Item from './Item';
import { levels, weapons } from '../constants';

export default class Player extends Item {
  constructor() {
    super(2);
    this.health = 100;
    this.weapon = weapons[0];
    this.xp = 0;
    this._level = 0;
  }

  get level() {
    // index of the next level equals the level of the current
    let nextLevel = levels[this._level + 1];
    if (this.xp > nextLevel) {
      this._level++;
    }
    return this._level;
  }

  set level(value) {
    this._level = value;
  }
}
