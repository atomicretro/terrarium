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

  PixiApp.ticker.add((deltaMs) => gameLoop(deltaMs, creatures));

  // setTimeout(() => {
  //   PixiApp.ticker.stop()
  // }, 3000)
};

const gameLoop = (deltaMs: number, creatures:any[]) => {
  console.log('deltaMs', deltaMs)
  console.log('creatures', creatures)
};

const App = () => {
  gameLoad();
  document.body.appendChild(PixiApp.view);
};

export default App;
