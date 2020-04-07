import {
  CANVAS_HEIGHT,
  DEBUG,
  PLAYER_GRAVITY,
  PLAYER_HEIGHT,
  PLAYER_VY_FLAP,
  PLAYER_VY_MAX,
  PLAYER_WIDTH,
  PLAYER_X0,
  PLAYER_Y0
} from "./config";
import Rect from "./Rect";
import {IEntity} from "./_interfaces";
import Game from "./Game";

export default class Player implements IEntity {
  public rect: Rect;
  public isAlive: boolean;
  private readonly game: Game;
  private vy: number;

  constructor(game: Game) {
    this.game = game;
    this.rect = new Rect(0, 0, PLAYER_WIDTH, PLAYER_HEIGHT);
    this.vy = 0;
    this.isAlive = true;

    this._respawn();
  }

  update() {
    //update vy
    this.vy = Math.min(PLAYER_VY_MAX, this.vy + PLAYER_GRAVITY);

    // check screen bounds
    if (this.rect.y0 >= CANVAS_HEIGHT) this.onCollision();
    if (this.rect.y0 < 0) {
      this.rect.moveToY(0);
      this.vy = 0;
    }
    this.rect.moveY(this.vy);
  }

  render(ctx: CanvasRenderingContext2D) {
    this.rect.render(ctx)
  }

  flap() {
    this.vy = PLAYER_VY_FLAP;
  }

  _respawn() {
    this.rect.moveTo(PLAYER_X0, PLAYER_Y0);
    this.vy = 0;
    this.isAlive = true;
  }

  onCollision() {
    if (DEBUG) return this._respawn();

    this.isAlive = false;
    this.game.onPlayerDeath();
  }
}
