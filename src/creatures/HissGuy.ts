import * as PIXI from 'pixi.js';

import Creature from './Creature';

export default class HissGuy extends Creature {
  constructor(
    app: PIXI.Application,
    resources: Partial<Record<string, PIXI.LoaderResource>>,
  ) {
    const startingPosition = { x: 550, y: 100 };
    const speed = 3;
    super(app, resources, 'hiss_guy', startingPosition, speed);
    this.resources = resources;

    app.ticker.add(() => { this.move(5); });
  }
}
