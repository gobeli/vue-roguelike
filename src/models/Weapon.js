import Item from './Item';

export default class Weapon extends Item {
  constructor(attack, name) {
    super(4);
    this.name = name;
    this.attack = attack;
  }
}
