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

  drawRoom(room) {
    for (let x = room.x1; x <= room.x2; x++) {
      for (let y = room.y1; y <= room.y2; y++) {
        this.map[x][y] = new Item(items.EMPTY, x, y);
      }
    }
  }

  /**
   * Generates a empty map with rooms
   * https://gamedevelopment.tutsplus.com/tutorials/create-a-procedurally-generated-dungeon-cave-system--gamedev-10099
   * @param {number} size
   */
   generateMap(size) {
    this.map = Array(...Array(size)).map((_, x) => Array(size).fill().map((_, y) => new Item(items.WALL, x, y)));
    console.log(this.map)
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
        this.drawRoom(newRoom);
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
}