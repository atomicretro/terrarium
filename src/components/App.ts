import * as PIXI from 'pixi.js';

import DickGuy from '../creatures/DickGuy';
import GenghisHawk from '../creatures/GenghisHawk';
import HissGuy from '../creatures/HissGuy';
import MouthGuy from '../creatures/MouthGuy';
import SpermMan from '../creatures/SpermMan';

const App = () => {
  const PixiApp = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x986ef,
  });

  // Load sprite and JSON files into app
  PIXI.Loader.shared
    .add('dick_guy', '../assets/creatures/dick_guy/dick_guy.json')
    .add('genghis_hawk', '../assets/creatures/genghis_hawk/genghis_hawk.json')
    .add('hiss_guy', '../assets/creatures/hiss_guy/hiss_guy.json')
    .add('mouth_guy', '../assets/creatures/mouth_guy/mouth_guy.json')
    .add('sperm_man', '../assets/creatures/sperm_man/sperm_man.json');
  // Function that runs on load / error of each individual resource
  PIXI.Loader.shared.onProgress.add((loader: PIXI.Loader, resource: Partial<Record<string, PIXI.LoaderResource>>) => {
    console.log(`Loading ${resource.name}`);
  });
  // After all resources are loaded, create creatures
  PIXI.Loader.shared.load((loader: PIXI.Loader, resources: Partial<Record<string, PIXI.LoaderResource>>) => {
    new DickGuy(PixiApp, resources);
    new GenghisHawk(PixiApp, resources);
    new HissGuy(PixiApp, resources);
    new MouthGuy(PixiApp, resources);
    new SpermMan(PixiApp, resources);
  });

  document.body.appendChild(PixiApp.view);
}

export default App;
