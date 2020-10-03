import * as PIXI from 'pixi.js';

import Creature from './Creature';

export default class GenghisHawk extends Creature {
  constructor(
    app: PIXI.Application,
    resources: Partial<Record<string, PIXI.LoaderResource>>,
  ) {
    const startingPosition = { x: 500, y: 100 };
    const speed = 3;
    super(app, resources, 'genghis_hawk', startingPosition, speed);
    this.resources = resources;
app.ticker.add(() => { this.move(1); });
    // this.move(this.speed);
  }
}
