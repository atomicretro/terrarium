import * as PIXI from 'pixi.js';

import Creature from './Creature';

export default class SpermMan extends Creature {
  constructor(
    app: PIXI.Application,
    resources: Partial<Record<string, PIXI.LoaderResource>>,
  ) {
    const startingPosition = { x: 200, y: 200 };
    const speed = 2;
    super(app, resources, 'sperm_man', startingPosition, speed);
    this.resources = resources;

    app.ticker.add(() => { this.move(2); });
  }
}
