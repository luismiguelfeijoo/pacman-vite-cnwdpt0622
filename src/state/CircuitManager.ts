import { Actor, IActor } from '../actors/Actor';
import { Barrier } from '../actors/Barrier';
import { Point } from '../types/Point';
import { angleToRad } from '../utils/angleToRad';

class CircuitManager extends Actor {
  barriers: Barrier[];
  currentBarrier: number;
  currentLap: number;
  constructor(actor: Actor) {
    super({ x: 700, y: 50 });
    let barriers: Barrier[] = [];
    let center: Point = { x: 500, y: 500 };
    let radius: number = 400;
    const num = 4;
    for (let i = 0; i < num; i++) {
      let angle = (360 / num) * i;
      barriers.push(
        new Barrier(
          {
            x: center.x + Math.cos(angleToRad(angle)) * radius,
            y: center.y + Math.sin(angleToRad(angle)) * radius,
          },
          100,
          angle,
          actor,
          i
        )
      );
    }
    this.barriers = barriers;
    this.currentBarrier = 0;
    this.currentLap = 0;
  }

  touchingBarrier(barrierIndex: number): boolean {
    if (this.currentBarrier === barrierIndex) {
      this.currentBarrier++;
      if (this.currentBarrier === this.barriers.length) {
        this.addLap();
        return false;
      }
      return true;
    }
    return false;
  }

  addLap() {
    this.currentLap++;
    this.currentBarrier = 0;
    this.barriers.forEach((barrier) => (barrier.touched = false));
    if (this.currentLap > 2) {
      alert(`You won`);
    }
  }

  draw(ctx: CanvasRenderingContext2D, delta: number): void {
    ctx.font = '50px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(
      `LAPS: ${this.currentLap}/3`,
      this.position.x,
      this.position.y
    );
  }
}

export let Circuit: CircuitManager;

export const createCircuit = (actor: IActor) => {
  Circuit = new CircuitManager(actor);
};
