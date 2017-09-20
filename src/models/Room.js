export default class Room {
  constructor(x, y, w, h) {
    this.x1 = x;
    this.x2 = x + w;
    this.y1 = y;
    this.y2 = y + h;
  }

  draw(map) {
    for (let x = this.x1; x <= this.x2; x++) {
      for (let y = this.y1; y <= this.y2; y++) {
          map[x][y] = 0;
      }
    }
  }

  intersects(room) {
    return (this.x1 <= room.x2 && this.x2 >= room.x1 && this.y1 <= room.y2 && this.y2 >= room.y1);
  }
}