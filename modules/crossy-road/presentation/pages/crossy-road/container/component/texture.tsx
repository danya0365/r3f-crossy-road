'use client';

import { CanvasTexture } from 'three';

export const Texture = (
  width: number,
  height: number,
  rects: { x: number; y: number; w: number; h: number }[]
) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d')!;
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, width, height);
  context.fillStyle = 'rgba(0,0,0,0.6)';
  rects.forEach((rect) => {
    context.fillRect(rect.x, rect.y, rect.w, rect.h);
  });
  return new CanvasTexture(canvas);
};

export default Texture;

export const truckFrontTexture = Texture(30, 30, [
  { x: 15, y: 0, w: 10, h: 30 }
]);
export const truckRightSideTexture = Texture(25, 30, [
  { x: 0, y: 15, w: 10, h: 10 }
]);
export const truckLeftSideTexture = Texture(25, 30, [
  { x: 0, y: 5, w: 10, h: 10 }
]);
