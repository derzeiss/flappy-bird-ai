import {CANVAS_HEIGHT, CANVAS_WIDTH, PIPE_GAP, PIPE_VX, PIPE_WIDTH} from './config';
import Rect from './Rect';
import PipeManager from './PipeManager';
import {IEntity} from "./_interfaces";

export default class PipePair implements IEntity {
  private readonly mgr: PipeManager;
  private rectTop: Rect;
  private rectBottom: Rect;

  constructor(mgr: PipeManager, gapY: number) {
    this.mgr = mgr;

    let pipeBottomY = gapY + PIPE_GAP;
    this.rectTop = new Rect(0, 0, PIPE_WIDTH, gapY);
    this.rectBottom = new Rect(0, pipeBottomY, PIPE_WIDTH, CANVAS_HEIGHT - pipeBottomY);

    this.reset();
  }

  update() {
    this.rectTop.moveX(-PIPE_VX);
    this.rectBottom.moveX(-PIPE_VX);
    if (this.rectTop.x1 < 0) this.mgr.onPipeOOB();
  }

  render(ctx: CanvasRenderingContext2D) {
    this.rectTop.render(ctx);
    this.rectBottom.render(ctx);
  }

  collideWith(rect: Rect): boolean {
    return this.rectTop.collideWith(rect) || this.rectBottom.collideWith(rect);
  }

  reset() {
    this.rectTop.moveToX(CANVAS_WIDTH);
    this.rectBottom.moveToX(CANVAS_WIDTH);
  }
}
