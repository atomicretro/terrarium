import * as PIXI from 'pixi.js';

import Creature from './Creature';

export default class GenghisHawk extends Creature {
  constructor(app: PIXI.Application) {
    super(app, 'genghis_hawk');
    this.app = app;
  }
}
