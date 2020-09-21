import * as PIXI from 'pixi.js';

export default class Creature {
  private app: PIXI.Application;
  private creature: PIXI.AnimatedSprite;

  constructor(app: PIXI.Application, spritesheetName: any) {
    this.app = app;
    PIXI.Loader.shared.add('creature', spritesheetName).load(this.setup.bind(this))
  }

  setup() {
    let sheet = PIXI.Loader.shared.resources.creature.spritesheet;

    this.creature = new PIXI.AnimatedSprite(sheet.animations.creature)

    this.creature.animationSpeed = 0.167; // 6 fps
    this.creature.position.set(0, 0);
    this.creature.play();

    this.app.stage.addChild(this.creature);
  }
}