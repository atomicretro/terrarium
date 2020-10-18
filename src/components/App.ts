import * as PIXI from 'pixi.js';

import GenghisHawk from '../creatures/GenghisHawk';
import MouthGuy from '../creatures/MouthGuy';
import DickGuy from '../creatures/DickGuy';

const App = () => {
  const PixiApp = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Load sprite and JSON files into app
  PIXI.Loader.shared
    .add('genghis_hawk', '../assets/creatures/genghis_hawk/genghis_hawk.json')
    .add('mouth_guy', '../assets/creatures/mouth_guy/mouth_guy.json')
    .add('dick_guy', '../assets/creatures/dick_guy/dick_guy.json');
  // Function that runs on load / error of each individual resource
  PIXI.Loader.shared.onProgress.add((loader: PIXI.Loader, resource: Partial<Record<string, PIXI.LoaderResource>>) => {
    console.log(`Loading ${resource.name}`);
  });
  // After all resources are loaded, create creatures
  PIXI.Loader.shared.load((loader: PIXI.Loader, resources: Partial<Record<string, PIXI.LoaderResource>>) => {
    new GenghisHawk(PixiApp, resources);
    new MouthGuy(PixiApp, resources);
    new DickGuy(PixiApp, resources);
  });

  document.body.appendChild(PixiApp.view);
}

export default App;
