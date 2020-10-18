import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import PixiPlugin from 'gsap/PixiPlugin';

PixiPlugin.registerPIXI(PIXI);
gsap.registerPlugin(PixiPlugin);
// https://greensock.com/docs/v2/Plugins/PixiPlugin

export default class Creature {
  public app: PIXI.Application;
  public resources: Partial<Record<string, PIXI.LoaderResource>>;
  public position: { x: number, y: number };

  protected creatureName: string;
  protected creature: PIXI.AnimatedSprite;

  constructor(
    app: PIXI.Application,
    resources: Partial<Record<string, PIXI.LoaderResource>>,
    creatureName: string,
    startingPosition: { x: number, y: number },
  ) {
    this.app = app;
    this.resources = resources;
    this.creatureName = creatureName;
    this.position = startingPosition;

    this.setup();
  }

  setup() {
    const sheet = this.resources[this.creatureName].spritesheet;

    this.creature = new PIXI.AnimatedSprite(sheet.animations.creature);

    this.creature.animationSpeed = 8 / 60; // 6 fps
    this.creature.anchor.set(0.5);
    this.creature.position.set(this.position.x, this.position.y);
    this.creature.play();

    this.app.stage.addChild(this.creature);
  }

  move() {
    gsap.to(this.creature, {
      pixi: {
        x: this.creature.position.x + 100,
        y: this.creature.position.y + 100,
      },
      duration: 3,
      repeat: -1,
      onRepeat: () => {
        if (this.creatureName === 'mouth_guy') {
          console.log(this.creatureName, this.creature.position)
          console.log('---')
        }
        // wasn't able to update position yet after on repeat.
        // ALEC: i think we might have to use gsap timelines for this
        // create maybe a master timeline that different movements / animations get slotted into?
        // not sure, need to keep researching
        this.creature.position.set(this.creature.position.x, this.creature.position.y);
      },
    });
  }
}
