import Item from './Item';

export default class Room extends Item {
  get center() {
    return { x: Math.floor((this.x1 + this.x2) / 2), y: Math.floor((this.y1 + this.y2) / 2) };
  }

  constructor(x, y, w, h) {
    super(0);
    this.x1 = x;
    this.x2 = x + w;
    this.y1 = y;
    this.y2 = y + h;
  }

  intersects(room) {
    return (this.x1 <= room.x2 && this.x2 >= room.x1 && this.y1 <= room.y2 && this.y2 >= room.y1);
  }
}
