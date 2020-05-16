import Game from "./Game";

const g = new Game();
g.setup().then(() => {
  g.mainloop();
});
