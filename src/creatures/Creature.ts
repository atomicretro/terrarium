import * as PIXI from 'pixi.js';
import gsap from 'gsap';

export default class Creature {
  public app: PIXI.Application;
  public resources: Partial<Record<string, PIXI.LoaderResource>>;
  private creatureName: string;
  private creature: PIXI.AnimatedSprite;

  constructor(
    app: PIXI.Application,
    resources: Partial<Record<string, PIXI.LoaderResource>>,
    creatureName: string,
  ) {
    this.app = app;
    this.resources = resources;
    this.creatureName = creatureName;

    this.setup();
  }

  setup() {
    const sheet = this.resources[this.creatureName].spritesheet;

    this.creature = new PIXI.AnimatedSprite(sheet.animations.creature);

    this.creature.animationSpeed = 8 / 60; // 6 fps
    this.creature.anchor.set(0.5);
    this.creature.position.set(this.creature.width, this.app.view.height - this.creature.height);
    this.creature.play();

    this.app.stage.addChild(this.creature);
    this.move();
  }

  move() {
    gsap.to(this.creature.position, {
      x: this.creature.position.x + 100,
      y: this.creature.position.y - 100,
      duration: 1,
      repeat: -1,
      onRepeat: () => {
        console.log('yo')
        // wasn't able to update position yet after on repeat.
        this.creature.position.set(this.creature.position.x, this.creature.position.y);
      }
    });
  }
}
