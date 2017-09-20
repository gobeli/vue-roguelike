import Weapon from './models/Weapon';
import Room from './models/Room';

export const levels = [
  60, 140, 250, 390, 999999
]

export const weapons = [
  new Weapon('Stick', 7),
  new Weapon('Speer', 13),
  new Weapon('Sword', 22),
]

export const items = {
  EMPTY: 0,
  WALL: 1,
  PLAYER: 2,
  HEALTH: 3,
  WEAPON: 4,
  ENEMY: 5
}

export const itemClasses = [
  'empty', 'wall', 'player', 'health', 'weapon', 'enemy'
]
