import * as PIXI from 'pixi.js';
import Creature from "./Creature";

const App = () => {
  const PixiApp = new PIXI.Application({width: 800, height: 450});
  const genghisHawk = new Creature(PixiApp, '../assets/creatures/genghis_hawk/genghis_hawk.json');
  document.body.appendChild(PixiApp.view);
}

export default App;