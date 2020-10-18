import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import PixiPlugin from 'gsap/PixiPlugin';

PixiPlugin.registerPIXI(PIXI);
gsap.registerPlugin(PixiPlugin);

import Creature from './Creature';

export default class GenghisHawk extends Creature {
  private timeline: GSAPTimeline;

  constructor(
    app: PIXI.Application,
    resources: Partial<Record<string, PIXI.LoaderResource>>,
  ) {
    const startingPosition = { x: 500, y: 800 };
    super(app, resources, 'genghis_hawk', startingPosition);
    this.resources = resources;
    this.timeline = gsap.timeline({repeat: -1})

    // app.ticker.add(() => this.move());
    this.draw();
  }

  checkHorizonalEdge(y: number): number {
    if (y < 0) {
      y = 0
    }

    if (y > this.app.view.height) {
      y = this.app.view.height
    }

    return y;
  }

  movePosition() {
    const finalY = this.creature.position.y - 40;
    const x = this.creature.position.x;
    const y = this.checkHorizonalEdge(finalY);

    return {
      x,
      y
    }
  }

  move() {
    gsap.to(this.creature, {
      pixi: {
        ...this.movePosition()
      },
      ease: "back.inOut(4)",
      duration: 0.75,
      delay: 0.25,
      onComplete: () => {
        this.move();
      },
    });
  }

  draw() {
    this.move();
  }
}
