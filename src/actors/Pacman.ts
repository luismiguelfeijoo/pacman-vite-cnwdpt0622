import { Actor } from './Actor';
import { Point } from '../types/Point';
import { angleToRad } from '../utils/angleToRad';
import sprite from '../assets/pacman.png';

export class Pacman extends Actor {
  pacmanSize: number;
  color: string;
  maxSpeed: number;
  speed: Point;
  direction: number;
  image: HTMLImageElement;
  timer: number;
  sxParameters: number[];
  xFrame: number;
  yFrame: number;

  constructor(position: Point, color = 'yellow', speed = 100) {
    super(position);
    this.pacmanSize = 100;
    this.color = color;
    this.maxSpeed = speed;
    this.speed = { x: this.maxSpeed, y: 0 };
    this.direction = 0;

    this.image = new Image();
    this.image.src = sprite;

    this.timer = 0;
    this.sxParameters = [4, 5, 6, 7, 6, 5];
    this.xFrame = 0;
    this.yFrame = 7;
  }

  update(delta: number) {
    let newPosX = this.position.x + this.speed.x * delta;
    if (newPosX + this.pacmanSize <= 1000 && newPosX - this.pacmanSize >= 0) {
      this.position.x = newPosX;
    }
    let newPosY = this.position.y + this.speed.y * delta;
    if (newPosY + this.pacmanSize <= 1000 && newPosY - this.pacmanSize >= 0) {
      this.position.y = newPosY;
    }
    this.timer += delta;
    if (this.timer >= 0.05) {
      // cambiar los frames
      this.xFrame = (this.xFrame + 1) % this.sxParameters.length;
      this.timer = 0;
    }
  }

  draw(ctx: CanvasRenderingContext2D, delta: number) {
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.fillStyle = this.color;

    ctx.translate(this.position.x, this.position.y);
    ctx.drawImage(
      this.image,
      32 * this.sxParameters[this.xFrame] + 3.5,
      31 * this.yFrame,
      25,
      25,
      0,
      0,
      this.pacmanSize,
      this.pacmanSize
    );
  }

  keyboard_event_down(key: string) {
    switch (key) {
      case 'ArrowDown':
        this.speed.x = 0;
        this.speed.y = this.maxSpeed;
        this.yFrame = 6;
        this.sxParameters = [0, 1, 2, 3, 2, 1];
        break;
      case 'ArrowUp':
        this.speed.x = 0;
        this.speed.y = -this.maxSpeed;
        this.yFrame = 7;
        this.sxParameters = [0, 1, 2, 3, 2, 1];
        break;
      case 'ArrowLeft':
        this.speed.x = -this.maxSpeed;
        this.speed.y = 0;
        this.direction = 180;
        this.yFrame = 6;
        this.sxParameters = [4, 5, 6, 7, 6, 5];
        break;
      case 'ArrowRight':
        this.speed.x = this.maxSpeed;
        this.speed.y = 0;
        this.yFrame = 7;
        this.sxParameters = [4, 5, 6, 7, 6, 5];
        this.direction = 0;
        break;
      default:
        console.log('Key not valid');
        break;
    }
  }
}
