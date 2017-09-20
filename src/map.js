import { items } from './constants'
import Room from './models/Room';

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function generateMap(size) {
  const map = Array(...Array(size)).map(() => Array(size).fill(1));
  const minRoomSize = 5, maxRoomSize = 15, rooms = [];
  while (rooms.length < 15) {
    const w = randomInt(maxRoomSize, minRoomSize);
    const h = randomInt(maxRoomSize, minRoomSize);
    const x = randomInt(size - w - 1, 1);
    const y = randomInt(size - h - 1, 1);
    const newRoom = new Room(x, y, w, h);
    if (!rooms.some(r => newRoom.intersects(r))) {
      rooms.push(newRoom);
      newRoom.draw(map);
    }
  }
  return map;
}

export function placeObject(map, objectIndex) {
  let placed = false;
  while (!placed) {
    const x = randomInt(map.length - 1, 1);
    const y = randomInt(map.length - 1, 1);
    if (map[x][y] === items.EMPTY) {
      map[x][y] = objectIndex;
      placed = true;
      return {x, y};
    }
  }
}

export function placeObjects(map, objectIndex, amount) {
  for (let i = 0; i < amount; i++) {
    placeObject(map, objectIndex);
  }
}