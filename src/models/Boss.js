import Enemy from './Enemy';

export default class Boss extends Enemy {
  constructor() {
    super(25, 60, 99);
    this.boss = true;
    this.x2 = 0;
    this.y2 = 0;
  }
}