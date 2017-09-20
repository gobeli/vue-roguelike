import Item from './Item';

export default class Health extends Item {
  constructor(strength, health) {
    super(3);
    this.strength = strength;
    this.health = health;
  }
}