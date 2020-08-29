class App {
  private world: string;

  constructor(world: string) {
    this.world = world;
  }

  print(): void {
    console.log(this.world);
  }
}

export default App;
