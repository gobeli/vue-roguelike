import Weapon from './models/Weapon';

export const levels = [
  0, 50, 110, 180, 250, 999999,
];

export const weapons = [
  new Weapon('Stick', 7),
  new Weapon('Speer', 12),
  new Weapon('Sword', 18),
  new Weapon('Katana', 24),
  new Weapon('Morning star', 30),
];

export const items = {
  EMPTY: 0,
  WALL: 1,
  PLAYER: 2,
  HEALTH: 3,
  WEAPON: 4,
  ENEMY: 5,
  PORTAL: 6,
};

export const itemClasses = [
  'empty', 'wall', 'player', 'health', 'weapon', 'enemy', 'portal',
];
