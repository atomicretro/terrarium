import * as PIXI from 'pixi.js';

import Creature from './Creature';

export default class GenghisHawk extends Creature {
  constructor(
    app: PIXI.Application,
    resources: Partial<Record<string, PIXI.LoaderResource>>,
  ) {
    super(app, resources, 'genghis_hawk');
    this.resources = resources;
  }
}
