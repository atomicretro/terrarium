import * as PIXI from 'pixi.js';

let pixi = new PIXI.Application({
    width: 256,         // default: 800
    height: 256,        // default: 600
    antialias: true,    // default: false
    transparent: false, // default: false
    resolution: 1       // default: 1
  }
);

const aa = () => {
  console.log('aa')
  document.body.appendChild(pixi.view);
  pixi.stage.addChild(PIXI.Sprite.from('something.png'));
}

export default aa;
