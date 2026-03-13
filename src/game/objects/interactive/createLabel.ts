import { INTERACTIVE_OBJECT, DEPTH } from '../../config/constants';

export function createLabel(
  scene: Phaser.Scene,
  x: number,
  y: number,
  infoText: string
) {
  const { offset, fontSize, color, backgroundColor, padding } =
    INTERACTIVE_OBJECT.label;

  return scene.add
    .text(x + offset.x, y + offset.y, infoText, {
      fontSize,
      fontFamily: 'Arial',
      color,
      backgroundColor,
      padding,
    })
    .setAlpha(0)
    .setDepth(DEPTH.label);
}
