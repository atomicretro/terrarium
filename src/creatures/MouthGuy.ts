import * as PIXI from 'pixi.js';

import Creature from './Creature';

export default class MouthGuy extends Creature {
  constructor(
    app: PIXI.Application,
    resources: Partial<Record<string, PIXI.LoaderResource>>,
  ) {
    super(app, resources, 'mouth_guy');
    this.resources = resources;
  }
}
