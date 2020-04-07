export interface IEntity {
  update(): void;

  render?(ctx: CanvasRenderingContext2D): void;
}
