import {
  CANVAS_HEIGHT,
  CANVAS_ID,
  CANVAS_WIDTH,
  COL_BG,
  COL_DEAD,
  COL_PIPE,
  COL_PLAYER,
  DEBUG,
  KEY_FLAP,
  KEY_PAUSE
} from "./config";
import * as InputHandler from "./InputHandler";
import PipeManager from "./PipeManager";
import Player from "./Player";
import {IEntity} from "./_interfaces";

interface IGameEntities {
  all: IEntity[],
  humanPlayers: Player[],
  players: Player[]
}

export default class Game {
  private entities: IGameEntities;
  private pipeManager: PipeManager;
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private running: boolean;
  private pause: boolean;

  constructor() {
    this.entities = {
      all: [],
      humanPlayers: [],
      players: [],
    };
    this.pipeManager = this._getPipeManager();

    this.canvas = this._getCanvas();
    this.ctx = this.canvas.getContext('2d');
    this.running = true;
    this.pause = false;

    InputHandler.addBinding(KEY_FLAP, () => this.entities.humanPlayers.forEach(e => e.flap()));
    InputHandler.addBinding(KEY_PAUSE, this.togglePause.bind(this));
    InputHandler.register();
  }

  setup() {
    this.addPlayer(new Player(this));
    this.pipeManager.reset();
  }

  mainloop() {
    this.update();
    this.handleCollisions();
    this.render();
    if (this.running) window.requestAnimationFrame(this.mainloop.bind(this));
  }

  update() {
    this.entities.all.forEach(e => e.update())
  }

  handleCollisions() {
    this.entities.players.forEach(p => this.pipeManager.handleCollisions(p));
  }

  render() {
    // draw bg
    this.ctx.fillStyle = COL_BG;
    this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // draw entities
    this._renderGroup(COL_PIPE, this.pipeManager.getPipes());
    this._renderGroup(this.running ? COL_PLAYER : COL_DEAD, this.entities.players);
  }

  gameOver() {
    this.running = false;
    InputHandler.deregister();
    console.log('game over');
  }

  addPlayer(player: Player, humanControlled = true) {
    this.entities.all.push(player);
    this.entities.players.push(player);
    if (humanControlled) this.entities.humanPlayers.push(player);
  }

  onPlayerDeath() {
    if (this.entities.players.every(p => !p.isAlive)) this.gameOver();
  }

  togglePause() {
    if (!this.pause) {
      this.running = false;
      this.pause = true;
      if (DEBUG) console.log(this);
    } else {
      this.running = true;
      this.pause = false;
      this.mainloop();
    }
  }

  _renderGroup(color: string, entities: IEntity[]) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    entities.forEach(e => e.render(this.ctx));
    this.ctx.fill();
  }

  _getCanvas() {
    let canvas = <HTMLCanvasElement>document.getElementById(CANVAS_ID);
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    return canvas;
  }

  _getPipeManager(): PipeManager {
    let mgr = new PipeManager();
    this.entities.all.push(mgr);
    return mgr;
  }
}
