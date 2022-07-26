import { Actor } from './Actor';
import { angleToRad } from '../utils/angleToRad';

let pacmanMap = `WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
WW............WW............WWW
WW.WWWW.WWWWW.WW.WWWWW.WWWW.WWW
WW*WWWW.WWWWW.WW.WWWWW.WWWW*WWW
WW.WWWW.WWWWW.WW.WWWWW.WWWW.WWW
WW..........................WWW
WW.WWWW.WW.WWWWWWWW.WW.WWWW.WWW
WW.WWWW.WW.WWWWWWWW.WW.WWWW.WWW
WW......WW....WW....WW......WWW
WWWWWWW.WWWWW.WW.WWWWW.WWWWWWWW
WWWWWWW.WWWWW.WW.WWWWW.WWWWWWWW
WWWWWWW.WW..........WW.WWWWWWWW
WWWWWWW.WW.WWW--WWW.WW.WWWWWWWW
WWWWWWW.WW.WooooooW.WW.WWWWWWWW
...........WooooooW............
WWWWWWW.WW.WooooooW.WW.WWWWWWWW
WWWWWWW.WW.WWWWWWWW.WW.WWWWWWWW
WWWWWWW.WW..........WW.WWWWWWWW
WWWWWWW.WW.WWWWWWWW.WW.WWWWWWWW
WWWWWWW.WW.WWWWWWWW.WW.WWWWWWWW
WW............WW............WWW
WW.WWWW.WWWWW.WW.WWWWW.WWWW.WWW
WW*WWWW.WWWWW.WW.WWWWW.WWWW*WWW
WW...WW................WW...WWW
WWWW.WW.WW.WWWWWWWW.WW.WW.WWWWW
WWWW.WW.WW.WWWWWWWW.WW.WW.WWWWW
WW......WW....WW....WW......WWW
WW.WWWWWWWWWW.WW.WWWWWWWWWW.WWW
WW.WWWWWWWWWW.WW.WWWWWWWWWW.WWW
WW..........................WWW
WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW`
  .split('\n')
  .map((f) => f.split(''));

export class Map extends Actor {
  draw(ctx: CanvasRenderingContext2D, delta: number): void {
    const totalYRatio = 1000 / pacmanMap.length;
    const totalXRatio = 1000 / pacmanMap[0].length;

    // for (let y = 0; y < pacmanMap.length; y++) {
    //   for (let x = 0; x < pacmanMap[y].length; x++) {
    //     ctx.beginPath();

    //     const char = pacmanMap[y][x];
    //     if (char === 'W') {
    //       ctx.rect(x * totalXRatio, y * totalYRatio, totalXRatio, totalYRatio);
    //     }
    //     if (char === '.') {
    //       ctx.arc(
    //         x * totalXRatio + totalXRatio / 2,
    //         y * totalYRatio + totalYRatio / 2,
    //         6,
    //         0,
    //         angleToRad(360)
    //       );
    //     }

    //     ctx.closePath();
    //     ctx.fill();
    //     ctx.stroke();
    //   }
    // }

    pacmanMap.forEach((line, y) => {
      line.forEach((char, x) => {
        ctx.beginPath();

        if (char === 'W') {
          ctx.rect(x * totalXRatio, y * totalYRatio, totalXRatio, totalYRatio);
        }
        if (char === '.') {
          ctx.arc(
            x * totalXRatio + totalXRatio / 2,
            y * totalYRatio + totalYRatio / 2,
            6,
            0,
            angleToRad(360)
          );
        }

        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      });
    });
  }
}
