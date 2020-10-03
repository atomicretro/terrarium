import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import PixiPlugin from 'gsap/PixiPlugin';

import { getRandomInt, getRandomIntWithNegative } from '../utils/mathFunctions';

PixiPlugin.registerPIXI(PIXI);
gsap.registerPlugin(PixiPlugin);
// https://greensock.com/docs/v2/Plugins/PixiPlugin

export default class Creature {
  public app: PIXI.Application;
  public resources: Partial<Record<string, PIXI.LoaderResource>>;
  public position: { x: number, y: number };
  public velocity: { x: number, y: number };
  // public timeline: AnimationTimeline;
  public timeline: any;
  public speed: number;

  private creatureName: string;
  private creature: PIXI.AnimatedSprite;

  constructor(
    app: PIXI.Application,
    resources: Partial<Record<string, PIXI.LoaderResource>>,
    creatureName: string,
    startingPosition: { x: number, y: number },
    speed: number,
  ) {
    this.app = app;
    this.resources = resources;
    this.creatureName = creatureName;
    this.position = startingPosition;
    this.timeline = gsap.timeline({ repeat: -1 });
    this.speed = speed;
    this.velocity = { x: 1, y: 1 };

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

  move(speed:number) {
    const changeThreshold = 0.9;
    if (Math.random() > changeThreshold) {
      const compass = getRandomInt(4);
      switch (compass) {
        case 0:
          this.velocity.x = speed;
          this.velocity.y = speed;
          break;
        case 1:
          this.velocity.x = -speed;
          this.velocity.y = -speed;
          break;
        case 2:
          this.velocity.x = speed;
          this.velocity.y = -speed;
          break;
        case 3:
          this.velocity.x = -speed;
          this.velocity.y = speed;
          break;
        default:
        break;
      }
    }

    gsap.to(this.creature, {
      pixi: {
        x: this.creature.position.x + this.velocity.x,
        y: this.creature.position.y + this.velocity.y,
      },
      duration: 0.5, // actual movement speed seems to be speed / duration (5 / 0.5 = 10)
    });
  }
}
