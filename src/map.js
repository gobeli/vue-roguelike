import { items } from './constants'
import Room from './models/Room';
import Item from './models/Item';

export default class Map {
  constructor(size) {
    this.generateMap(size);
  }

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  generateHCorridor(x1, x2, y) {
    for (let x = Math.min(x1, x2); x < Math.max(x1, x2) + 1; x++) {
      this.map[x][y] = new Item(items.EMPTY, x, y);
    }
  }

  generateVCorridor(y1, y2, x) {
    for (let y = Math.min(y1, y2); y < Math.max(y1, y2) + 1; y++) {
      this.map[x][y] = new Item(items.EMPTY, x, y);
    }
  }

  /**
   * Generates a empty map with rooms
   * https://gamedevelopment.tutsplus.com/tutorials/create-a-procedurally-generated-dungeon-cave-system--gamedev-10099
   * @param {number} size
   */
   generateMap(size) {
    this.map = Array(...Array(size)).map((_, x) => Array(size).fill().map((_, y) => new Item(items.WALL, x, y)));
    const minRoomSize = 5, maxRoomSize = 15, rooms = [];
    while (rooms.length < 10) {
      // generate random room width and height
      const w = this.randomInt(maxRoomSize, minRoomSize);
      const h = this.randomInt(maxRoomSize, minRoomSize);
      // generate random room position
      const x = this.randomInt(size - w - 1, 1);
      const y = this.randomInt(size - h - 1, 1);
      const newRoom = new Room(x, y, w, h);
      // if the room doesn't intersect with another, draw it and the necessary corridors
      if (!rooms.some(r => newRoom.intersects(r))) {
        rooms.push(newRoom);
        this.placeBigObject(newRoom, false);
        if (rooms.length > 1) {
          const prevCenter = rooms[rooms.indexOf(newRoom) - 1].center;
          // randomly start with horizontal or vertical corridors
          if (Math.random() > 0.5) {
            this.generateHCorridor(prevCenter.x, newRoom.center.x, newRoom.center.y);
            this.generateVCorridor(prevCenter.y, newRoom.center.y, prevCenter.x);
          } else {
            this.generateVCorridor(prevCenter.y, newRoom.center.y, prevCenter.x);
            this.generateHCorridor(prevCenter.x, newRoom.center.x, newRoom.center.y);
          }
        }
      }
    }
  }

  /**
   * @param {* extends Item} obj
   */
  placeObject(obj) {
    let placed = false;
    while (!placed) {
      const x = this.randomInt(this.map.length - 1, 1);
      const y = this.randomInt(this.map.length - 1, 1);
      if (this.map[x][y].id === items.EMPTY) {
        obj.x = x;
        obj.y = y;
        this.map[x][y] = obj;
        placed = true;
        return obj;
      }
    }
  }

  placeBoss(boss) {
    let placed = false, w = 2, h = 2;
    while (!placed) {
      const x1 = this.randomInt(this.map.length - w - 1, 1);
      const y1 = this.randomInt(this.map.length - h - 1, 1);
      const x2 = x1 + 1;
      const y2 = y1 + 1;
      const space = [[x1, y1], [x2, y1], [x1, y2], [x2, y2]];
      console.log(space)
      if (space.every(s => this.map[s[0]][s[1]].id === items.EMPTY)) {
        boss = { ...boss, x1, y1, x2, y2 };
        this.placeBigObject(boss, true);
        placed = true;
      }
    }
  }

  /**
   * Places and object bigger than 1 Pixel
   * @param {* extends Item} obj
   * @param {boolean} useObj determines if the object is used or a new Object per pixel is generated
   */
  placeBigObject(obj, useObj) {
    for (let x = obj.x1; x <= obj.x2; x++) {
      for (let y = obj.y1; y <= obj.y2; y++) {
        this.map[x][y] = useObj ? obj : new Item(obj.id, x, y);
      }
    }
  }
}