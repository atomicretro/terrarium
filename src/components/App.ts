import * as PIXI from 'pixi.js';

import DickGuy from '../creatures/DickGuy';
import GenghisHawk from '../creatures/GenghisHawk';
import HissGuy from '../creatures/HissGuy';
import MouthGuy from '../creatures/MouthGuy';
import SpermMan from '../creatures/SpermMan';

const PixiApp = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x986ef,
});

const gameLoad = () => {
  // Load sprite and JSON files into app
  PIXI.Loader.shared
    .add('dick_guy', '../assets/creatures/dick_guy/dick_guy.json')
    .add('genghis_hawk', '../assets/creatures/genghis_hawk/genghis_hawk.json')
    .add('hiss_guy', '../assets/creatures/hiss_guy/hiss_guy.json')
    .add('mouth_guy', '../assets/creatures/mouth_guy/mouth_guy.json')
    .add('sperm_man', '../assets/creatures/sperm_man/sperm_man.json');
  // Function that runs on load / error of each individual resource
  PIXI.Loader.shared.onProgress.add(onProgress);
  // After all resources are loaded, create creatures
  PIXI.Loader.shared.load(gameSetup);
}

const onProgress = (loader: PIXI.Loader, resource: Partial<Record<string, PIXI.LoaderResource>>) => {
  console.log(`Loading ${resource.name}`);
};

const gameSetup = (loader: PIXI.Loader, resources: Partial<Record<string, PIXI.LoaderResource>>) => {
  const creatures = [
    new DickGuy(PixiApp, resources),
    new GenghisHawk(PixiApp, resources),
    new HissGuy(PixiApp, resources),
    new MouthGuy(PixiApp, resources),
    new SpermMan(PixiApp, resources),
  ];
  
  // const dickGuy =  new DickGuy(PixiApp, resources);
  // const genghisHawk =  new GenghisHawk(PixiApp, resources);
  // const hissGuy =  new HissGuy(PixiApp, resources);
  // const mouthGuy =  new MouthGuy(PixiApp, resources);
  // const spermMan =  new SpermMan(PixiApp, resources);

  // const creatures = new PIXI.Container();
  // creatures.addChild(dickGuy);
  // creatures.addChild(genghisHawk);
  // creatures.addChild(hissGuy);
  // creatures.addChild(mouthGuy);
  // creatures.addChild(spermMan);

  const ticker = PixiApp.ticker.add((delta) => gameLoop(delta, creatures));
  console.log('fps', ticker.FPS)
  console.log('count', ticker.count)
  console.log('deltaMS', ticker.deltaMS)
  console.log('deltaTime', ticker.deltaTime)

  // setTimeout(() => {
  //   PixiApp.ticker.stop()
  // }, 3000)
};

const gameLoop = (delta: number, creatures:any[]) => {
  // console.log('delta', delta)
  // console.log('position', `${creatures[0].position.x}, ${creatures[0].position.y}`)
  console.log('sprite', `${creatures[0].sprite.x}, ${creatures[0].sprite.y}`)
  console.log('toGlobal', PixiApp.stage.toGlobal(creatures[0].sprite.position))
  console.log('---')
};

const App = () => {
  gameLoad();
  document.body.appendChild(PixiApp.view);
};

export default App;


// NO BUILT IN PIXI COLLISION DETECTION
// DO THAT FOUR QUADRANT THING TO SEE IF ANYTHING IS CLOSE TO EACH OTHER
// THEN IMPLEMENT THE BELOW
// GO GO GOOOOO
function hitTestRectangle(r1:any, r2:any) {

  //Define the variables we'll need to calculate
  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

  //hit will determine whether there's a collision
  hit = false;

  //Find the center points of each sprite
  r1.centerX = r1.x + r1.width / 2;
  r1.centerY = r1.y + r1.height / 2;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;

  //Find the half-widths and half-heights of each sprite
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  //Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {

    //A collision might be occurring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {

      //There's definitely a collision happening
      hit = true;
    } else {

      //There's no collision on the y axis
      hit = false;
    }
  } else {

    //There's no collision on the x axis
    hit = false;
  }

  //`hit` will be either `true` or `false`
  return hit;
};
