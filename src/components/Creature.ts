import * as PIXI from 'pixi.js';
import gsap from 'gsap';

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
        console.log("yo")
        // wasn't able to update position yet after on repeat.
        this.creature.position.set(this.creature.position.x, this.creature.position.y)
      }
    })
  }
}