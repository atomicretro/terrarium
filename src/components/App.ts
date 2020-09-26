import * as PIXI from 'pixi.js';
import Creature from '../creatures/Creature';
import GenghisHawk from '../creatures/GenghisHawk';

const App = () => {
  const PixiApp = new PIXI.Application({width: window.innerWidth, height: window.innerHeight});
  const genghisHawk = new GenghisHawk(PixiApp);
  document.body.appendChild(PixiApp.view);
}

export default App;
