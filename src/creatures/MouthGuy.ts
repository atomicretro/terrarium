import * as PIXI from 'pixi.js';

import Creature from './Creature';

export default class MouthGuy extends Creature {
  constructor(
    app: PIXI.Application,
    resources: Partial<Record<string, PIXI.LoaderResource>>,
  ) {
    const startingPosition = { x: 100, y: 100 };
    super(app, resources, 'mouth_guy', startingPosition);
    this.resources = resources;

    this.move();
  }
}
