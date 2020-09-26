import Creature from './Base';
import SpriteSheet from '../assets/creatures/sprites/mouth_guy.png';

class MouthGuy extends Creature {
  name: string;
  spriteSheet: any;

  public constructor(greeting: string) {
    super(greeting);
    this.name = 'Mouth Guy';
  }
}

export default MouthGuy;
