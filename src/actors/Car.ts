import { Actor } from './Actor';
import { Point } from '../types/Point';
import { Size } from '../types/Size';
import { angleToRad } from '../utils/angleToRad';
import { checkLimits } from '../utils/checkLimits';
import ferrariImg from '../assets/ferrari.png';
import { CarKeys, KeyboardMap } from '../utils/keyboardMap';

export class Car extends Actor {
  carSize: Size;
  color: string;
  angle: number;
  angleSpeed: number;

  carSpeed: number;
  carAcceleration: number;

  image: HTMLImageElement;

  keyboardMap: KeyboardMap;

  constructor(position: Point, size: Size, keyboardMap: KeyboardMap) {
    super(position);
    this.carSize = size;
    this.color = 'red';
    this.angle = 45;
    this.angleSpeed = 0;
    this.carSpeed = 0;
    this.carAcceleration = 0;
    this.image = new Image();
    this.image.src = ferrariImg;
    this.keyboardMap = keyboardMap;
  }
  update(delta: number): void {
    this.angle += this.angleSpeed * delta;
    this.angleSpeed *= 0.9;
    this.carSpeed = this.carSpeed * 0.9 + this.carAcceleration;
    let newPos: Point = {
      x:
        this.position.x +
        Math.cos(angleToRad(this.angle)) * this.carSpeed * delta,
      y:
        this.position.y +
        Math.sin(angleToRad(this.angle)) * this.carSpeed * delta,
    };

    if (checkLimits(newPos)) {
      this.position = newPos;
    }
  }

  draw(ctx: CanvasRenderingContext2D, delta: number): void {
    ctx.fillStyle = this.color;
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(angleToRad(this.angle));
    ctx.rotate(angleToRad(180)); // this is for the ferrari orientation
    ctx.drawImage(
      this.image,
      -this.carSize.height / 2,
      -this.carSize.width / 2,
      this.carSize.height,
      this.carSize.width
    );
  }

  keyboard_event_down(key: string): void {
    const mappedKey = this.keyboardMap[key];
    if (mappedKey === CarKeys.LEFT) {
      this.angleSpeed = -300;
    } else if (mappedKey === CarKeys.RIGHT) {
      this.angleSpeed = 300;
    } else if (mappedKey === CarKeys.UP) {
      this.carAcceleration = 100;
    } else if (mappedKey === CarKeys.DOWN) {
      this.carAcceleration = -100;
    }
  }
  keyboard_event_up(key: string): void {
    const mappedKey = this.keyboardMap[key];
    if (mappedKey === CarKeys.LEFT) {
      this.angleSpeed = -100;
    } else if (mappedKey === CarKeys.RIGHT) {
      this.angleSpeed = 100;
    } else if (mappedKey === CarKeys.UP || mappedKey === CarKeys.DOWN) {
      this.carAcceleration = 0;
    }
  }
}
