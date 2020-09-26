import * as PIXI from 'pixi.js';

import GenghisHawk from '../creatures/GenghisHawk';
import MouthGuy from '../creatures/MouthGuy';

const App = () => {
  const PixiApp = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  PIXI.Loader.shared
    .add('genghis_hawk', '../assets/creatures/genghis_hawk/genghis_hawk.json')
    .add('mouth_guy', '../assets/creatures/mouth_guy/mouth_guy.json')
    .load((loader: PIXI.Loader, resources: Partial<Record<string, PIXI.LoaderResource>>) => {
      console.log('loader', loader);
      console.log('resources', resources);
      new GenghisHawk(PixiApp, resources);
      new MouthGuy(PixiApp, resources);
    });

  document.body.appendChild(PixiApp.view);
}

export default App;
