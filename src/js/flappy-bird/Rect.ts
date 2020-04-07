export default class Rect {
  public x0: number;
  public y0: number;
  public x1: number;
  public y1: number;
  private readonly width: number;
  private readonly height: number;

  constructor(x0: number, y0: number, width: number, height: number) {
    this.width = width;
    this.height = height;
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x0 + width;
    this.y1 = y0 + height;
  }

  moveX(x: number) {
    this.x0 += x;
    this.x1 += x;
  }

  moveY(y: number) {
    this.y0 += y;
    this.y1 += y;
  }

  move(x: number, y: number) {
    this.moveX(x);
    this.moveY(y);
  }

  moveToX(x: number) {
    this.x0 = x;
    this.x1 = x + this.width;
  }

  moveToY(y: number) {
    this.y0 = y;
    this.y1 = y + this.height;
  }

  moveTo(x: number, y: number) {
    this.moveToX(x);
    this.moveToY(y);
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.rect(this.x0, this.y0, this.width, this.height);
  }

  collideWith(rect: Rect) {
    return !(this.x1 < rect.x0 || rect.x1 < this.x0 || this.y1 < rect.y0 || rect.y1 < this.y0);
  }
}
