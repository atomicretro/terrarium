import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import PixiPlugin from 'gsap/PixiPlugin';

import { getRandomInt } from '../utils/mathFunctions';

PixiPlugin.registerPIXI(PIXI);
gsap.registerPlugin(PixiPlugin);
// https://greensock.com/docs/v2/Plugins/PixiPlugin

export default class Creature {
  public app: PIXI.Application;
  public resources: Partial<Record<string, PIXI.LoaderResource>>;
  public velocity: { x: number, y: number };
  // public timeline: AnimationTimeline;
  public timeline: any;
  public speed: number;

  private creatureName: string;
  private sprite: PIXI.AnimatedSprite;

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
    this.timeline = gsap.timeline({ repeat: -1 });
    this.speed = speed;
    this.velocity = { x: 1, y: 1 };

    this.setup(startingPosition);
  }

  setup(startingPosition: { x: number, y: number }) {
    const sheet = this.resources[this.creatureName].spritesheet;

    this.sprite = new PIXI.AnimatedSprite(sheet.animations.creature);

    this.sprite.animationSpeed = 8 / 60; // 6 fps
    this.sprite.anchor.set(0.5);
    this.sprite.position.set(startingPosition.x, startingPosition.y);
    this.sprite.play();

    this.app.stage.addChild(this.sprite);
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

    gsap.to(this.sprite, {
      pixi: {
        x: this.sprite.x + this.velocity.x,
        y: this.sprite.y + this.velocity.y,
      },
      duration: 0.5, // actual movement speed seems to be speed / duration (5 / 0.5 = 10)
    });
  }
}
