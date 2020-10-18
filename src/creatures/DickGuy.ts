import * as PIXI from 'pixi.js';

import Creature from './Creature';

export default class DickGuy extends Creature {
  constructor(
    app: PIXI.Application,
    resources: Partial<Record<string, PIXI.LoaderResource>>,
  ) {
    const startingPosition = { x: 100, y: 100 };
    const speed = 2;
    super(app, resources, 'dick_guy', startingPosition, speed);
    this.resources = resources;

    app.ticker.add(() => { this.move(2); });
  }
}
