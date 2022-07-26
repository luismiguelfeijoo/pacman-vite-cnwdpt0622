import { Actor } from './Actor';
import { Point } from '../types/Point';

export class FPSViewer extends Actor {
  constructor(position: Point) {
    super(position);
  }
  draw(ctx: CanvasRenderingContext2D, delta: number) {
    const fps = (1 / delta).toFixed(2);
    ctx.font = '50px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(`FPS: ${fps}`, this.position.x, this.position.y);
  }
}
