import { IActor } from './actors/Actor';
import { Car } from './actors/Car';
import { FPSViewer } from './actors/FPSViewer';
import { Map } from './actors/Map';
import { Pacman } from './actors/Pacman';
import { Circuit, createCircuit } from './state/CircuitManager';
import { MAP_A, MAP_B } from './utils/keyboardMap';

window.onload = () => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const car = new Car({ x: 100, y: 100 }, { width: 50, height: 100 }, MAP_A);
  createCircuit(car);
  const actors: IActor[] = [
    // new FPSViewer({ x: 0, y: 60 }),
    // ...Circuit.barriers,
    // car,
    // Circuit,
    new Pacman({ x: 100, y: 100 }),
  ];

  let lastFrame = 0;
  const render = (time: number) => {
    let delta = (time - lastFrame) / 1000;
    lastFrame = time;
    actors.forEach((actor) => actor.update(delta));
    ctx.clearRect(0, 0, 1024, 1024);
    actors.forEach((actor) => {
      ctx.save();
      actor.draw(ctx, delta);
      ctx.restore();
    });
    window.requestAnimationFrame(render);
  };

  window.requestAnimationFrame(render);

  document.body.addEventListener('keydown', (e) => {
    actors.forEach((actor) => {
      actor.keyboard_event_down(e.key);
    });
  });

  document.body.addEventListener('keyup', (e) => {
    actors.forEach((actor) => {
      actor.keyboard_event_up(e.key);
    });
  });
};
