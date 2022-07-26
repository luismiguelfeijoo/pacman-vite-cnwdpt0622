import { Point } from '../types/Point';

export const checkLimits = (position: Point): boolean => {
  return (
    position.x < 1000 && position.x > 0 && position.y < 1000 && position.y > 0
  );
};
