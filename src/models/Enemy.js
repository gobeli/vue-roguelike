import Item from './Item';

export default class Enemy extends Item {
  constructor(strength, health) {
    super(5);
    this.strength = strength;
    this.health = health;
  }
}