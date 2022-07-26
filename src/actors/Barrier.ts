import { Circuit } from '../state/CircuitManager';
import { Point } from '../types/Point';
import { angleToRad } from '../utils/angleToRad';
import { Actor, IActor } from './Actor';

export class Barrier extends Actor {
  width: number;
  angle: number;
  actor: IActor;
  touched: boolean;
  index: number;
  constructor(
    position: Point,
    width: number,
    angle: number,
    actor: IActor,
    index: number
  ) {
    super(position);
    this.width = width;
    this.angle = angle;
    this.actor = actor;
    this.touched = false;
    this.index = index;
  }

  update(delta: number): void {
    const actorPosition = this.actor.position;
    const barrierPosition = this.position;
    const distance = Math.sqrt(
      Math.pow(barrierPosition.x - actorPosition.x, 2) +
        Math.pow(barrierPosition.y - actorPosition.y, 2)
    );

    if (distance < 30 && Circuit.touchingBarrier(this.index)) {
      this.touched = true;
    }
  }

  draw(ctx: CanvasRenderingContext2D, delta: number): void {
    // style config
    ctx.strokeStyle = this.touched ? 'red' : 'green';
    ctx.lineWidth = 1;

    // draw
    ctx.beginPath();
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(angleToRad(this.angle));
    ctx.moveTo(-this.width / 2, 0);
    ctx.lineTo(this.width / 2, 0);
    ctx.arc(0, 0, 3, 0, angleToRad(360));
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  }
}
