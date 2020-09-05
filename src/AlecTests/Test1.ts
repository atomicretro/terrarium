import * as PIXI from 'pixi.js';
import Pants from '../assets/pants.jpg';
import SwimLoop from '../assets/swim_loop.png';
import SwimLoopJson from '../assets/swim_loop.json';

import MouthGuy from '../creatures/MouthGuy';

import { getRandomInt } from '../utils/mathFunctions';

let monster = new MouthGuy('worldzzz');
console.log(monster.greet())

//Aliases
const { Application, Loader, Rectangle, Sprite, TilingSprite } = PIXI;
const { TextureCache } = PIXI.utils;

// Create pixi canvas
const app = new Application({
  backgroundColor: 0x095fe2,
});
const sprites: any = {};
let creature: any;

// Append pixi canvas to DOM
document.body.appendChild(app.view);

// Create loader
const loader = new Loader();
// Add sprite sheets to loader
loader.add([
  { name: 'swimLoop', url: SwimLoop },
  { name: 'swimLoopJson', url: SwimLoopJson },
]);
// Define load method: "loads queue of resources and runs callback once everything loaded"
loader.load((loader, resources) => {
  sprites.swimLoop = new Sprite(resources.swimLoop.texture);
});
// called once per loaded/errored file
loader.onProgress.add((loader, resource) => {
  //Display the file `url` currently being loaded
  console.log(`loading: ${resource.name}`);
  //Display the percentage of files currently loaded
  console.log(`progress: ${loader.progress}%`);
});
// called once when the queued resources all load
loader.onComplete.add((loader, resources) => {
  console.log('all files loaded');
  // NOTE: I Don't know if this is actually the proper way to add loaded resources to the app
  // app.stage.addChild(sprites.swimLoop);

  let sheet = resources;
  console.log('sheet', sheet)
  // let animatedSprite = new PIXI.AnimatedSprite(sheet.animations["image_sequence"]);

  //Create the `tileset` sprite from the texture
  let texture = TextureCache.swimLoop; // '.swimLoop' taken from name key in loader.add
  // Create a rectangle to cut from the spritesheet: Rectangle(x, y, w, h)
  // let rectangle = new Rectangle(0, 0, 32, 32);
  //Tell the texture to use that rectangular section
  texture.frame = new Rectangle(0, 0, 32, 32);
  //Create the sprite from the texture
  monster.sprite = new Sprite(texture);
  // creature = new Sprite(texture);
  // creature.x = 200;
  // creature.y = 200;
  // creature.vx = 0; // horizontal velocity
  // creature.vy = 0; // vertical velocity

  app.stage.addChild(monster.sprite);
  // app.stage.addChild(creature);
  app.ticker.add(() => gameLoop());

  // let creature2 = new Sprite(texture);
  //Position the creature sprite on the canvas
  //Add the creature to the stage
  //Render the stage
  app.renderer.render(app.stage);
});

function gameLoop() {

  //Update the cat's velocity

  // creature.vx = 1;
  // creature.vy = 1;

  monster.move(); // ALEC ALEC ALEC LOOK HERE: I THINK THIS DOESN'T WORK
                  // BECAUSE YOU ARE ADDING monster.sprite TO THE APP ON LINE 69
                  // INSTEAD OF monster -- PERHAPS YOU NEED TO HAVE THE CREATURE EXTEND NOT ONLY
                  // A BASE CLASS BUT ALSO A SPRITE CLASS FROM pixi??????

  // const changeThreshold = 0.9;
  // const changeChance = Math.random();
  //
  // if (changeChance > changeThreshold) {
  //   const compass = getRandomInt(4);
  //   switch (compass) {
  //     case 0:
  //     creature.vx = 1;
  //     creature.vy = 1;
  //     break;
  //     case 1:
  //     creature.vx = -1;
  //     creature.vy = -1;
  //     break;
  //     case 2:
  //     creature.vx = 1;
  //     creature.vy = -1;
  //     break;
  //     case 3:
  //     creature.vx = -1;
  //     creature.vy = 1;
  //     break;
  //     default:
  //     break;
  //   }
  // }
  //
  // creature.x += creature.vx;
  // creature.y += creature.vy;
}

// // load the texture we need
// app.loader.add('loop', SwimLoop).load((loader: any, resources: any) => {
//   // This creates a texture from a 'bunny.png' image
//   const bunny = new PIXI.Sprite(resources.loop.texture);

//   // Setup the position of the bunny
//   bunny.x = app.renderer.width / 2;
//   bunny.y = app.renderer.height / 2;

//   // Rotate around the center
//   bunny.anchor.x = 0.5;
//   bunny.anchor.y = 0.5;

//   // Add the bunny to the scene we are building
//   app.stage.addChild(bunny);

//   // Listen for frame updates
//   app.ticker.add(() => {
//      // each frame we spin the bunny around a bit
//     bunny.rotation += 0.01;
//   });
// });

// app.loader.add('sheet', SwimLoop)
// let spritesheet = new PIXI.Spritesheet(app.sheet, SwimLoopJson);

const aa = async () => {
  // console.log('aa')
  // document.body.appendChild(pixi.view);
  // for (let idx = 0; idx < 100000000; idx++) {
  //   monster.move();
  //   console.log(monster.xPos, monster.yPos)
  //   await sleep(1000);
  // }
}

function sleep(ms:number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default aa;
