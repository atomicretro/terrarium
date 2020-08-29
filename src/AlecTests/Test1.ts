import * as PIXI from 'pixi.js';
import Pants from '../assets/pants.jpg';
import SwimLoop from '../assets/swim_loop.png';
import SwimLoopJson from '../assets/swim_loop.json';

//Aliases
const { Application, Loader, Rectangle, Sprite, TilingSprite } = PIXI;
const { TextureCache } = PIXI.utils;

// Create pixi canvas
const app = new Application({
  backgroundColor: 0x095fe2,
});
const sprites: any = {};

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
  let creature = new Sprite(texture);
  creature.x = 32;
  creature.y = 32;
  app.stage.addChild(creature);
  let creature2 = new Sprite(texture);
  //Position the creature sprite on the canvas
  //Add the creature to the stage
  //Render the stage
  app.renderer.render(app.stage);
});

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

const aa = () => {
  // console.log('aa')
  // document.body.appendChild(pixi.view);
}

export default aa;
