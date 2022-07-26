import { Point } from '../types/Point';

export interface IActor {
  position: Point;
  draw: (ctx: CanvasRenderingContext2D, delta: number) => void;
  update: (delta: number) => void;
  keyboard_event_down: (key: string) => void;
  keyboard_event_up: (key: string) => void;
}

export class Actor implements IActor {
  position: Point;
  constructor(position: Point) {
    this.position = position;
  }

  update(delta: number) {}

  draw(ctx: CanvasRenderingContext2D, delta: number) {}

  keyboard_event_down(key: string) {}
  keyboard_event_up(key: string) {}
}
