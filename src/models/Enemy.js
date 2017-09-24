import Item from './Item';

export default class Enemy extends Item {
  constructor(attack, health, xp) {
    super(5);
    this.attack = attack;
    this.health = health;
    this.xp = xp;
  }
}
