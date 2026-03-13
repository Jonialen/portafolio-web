import { INTERACTIVE_OBJECT, DEPTH } from '../../config/constants';

export function createShadow(
  scene: Phaser.Scene,
  x: number,
  y: number,
  width: number,
  height: number
) {
  return scene.add
    .ellipse(x, y, width, height, 0x000000, INTERACTIVE_OBJECT.shadow.opacity)
    .setDepth(DEPTH.shadow)
    .setScrollFactor(1);
}
