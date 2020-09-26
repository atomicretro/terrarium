import * as PIXI from 'pixi.js';

import Creature from './Creature';

export default class GenghisHawk extends Creature {
  constructor(
    app: PIXI.Application,
    resources: Partial<Record<string, PIXI.LoaderResource>>,
  ) {
    const startingPosition = { x: 500, y: 100 };
    super(app, resources, 'genghis_hawk', startingPosition);
    this.resources = resources;

    this.move();
  }
}
