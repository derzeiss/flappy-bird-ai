import {CANVAS_HEIGHT, PIPE_GAP, PIPE_MARGIN, PIPE_MAX_DY, PIPE_SPAWN_TIMER} from './config';
import PipePair from "./PipePair";
import {IEntity} from "./_interfaces";
import Player from "./Player";

export default class PipeManager implements IEntity {
  private pipes: PipePair[];
  private lastPipeY: number;
  private spawnTimer: number;

  constructor() {
    this.pipes = [];
    this.lastPipeY = 0;
    this.spawnTimer = 0;
  }

  reset() {
    this.pipes = [];
    this.lastPipeY = CANVAS_HEIGHT / 2;
    this.spawnTimer = 0;
  }

  update() {
    if (--this.spawnTimer <= 0) {
      this.spawnPipe();
      this.spawnTimer = PIPE_SPAWN_TIMER;
    }
    this.pipes.forEach(p => p.update())
  }

  handleCollisions(player: Player) {
    if (this.pipes.some(pipe => pipe.collideWith(player.rect))) player.onCollision();
  }

  spawnPipe() {
    let gapY = this.lastPipeY + PIPE_MAX_DY * (Math.random() - .5);
    gapY = Math.round(Math.max(PIPE_MARGIN, Math.min(CANVAS_HEIGHT - PIPE_MARGIN - PIPE_GAP, gapY)));
    this.lastPipeY = gapY;

    const p = new PipePair(this, gapY);
    this.pipes.unshift(p);
    p.reset();
  }

  onPipeOOB() {
    this.pipes.pop();
  }

  getPipes() {
    return this.pipes;
  }
}
