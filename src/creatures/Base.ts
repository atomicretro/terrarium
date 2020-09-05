import * as PIXI from 'pixi.js';

import { getRandomInt } from '../utils/mathFunctions';

// Pixi Aliases
const {
  Rectangle,
  Sprite,
  TilingSprite,
} = PIXI;

class Creature {
  greeting: string; // test property
  xPos: number; // Horizontal position of creature
  yPos: number; // Vertical position of creature
  vx: number; // Horizontal velocity of creature
  vy: number; // Vertical velocity of creature
  sprite: any;

  constructor(message: string) {
    this.greeting = message;
    this.xPos = 64;
    this.xPos = 64;
    this.vx = 0;
    this.vy = 0;
  }

  greet() {
    return 'Hello, ' + this.greeting;
  }

  move() {
    const changeThreshold = 0.9;
    if (Math.random() > changeThreshold) {
      const compass = getRandomInt(4);
      switch (compass) {
        case 0:
          this.vx = 1;
          this.vy = 1;
          break;
        case 1:
          this.vx = -1;
          this.vy = -1;
          break;
        case 2:
          this.vx = 1;
          this.vy = -1;
          break;
        case 3:
          this.vx = -1;
          this.vy = 1;
          break;
        default:
        break;
      }
    }

    this.xPos += this.vx;
    this.yPos += this.vy;
  }
}

export default Creature;
