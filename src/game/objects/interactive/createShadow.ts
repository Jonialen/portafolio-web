export function createShadow(
  scene: Phaser.Scene,
  x: number,
  y: number,
  width: number,
  height: number
) {
  return scene.add
    .ellipse(x, y, width, height, 0x000000, 0.6)
    .setDepth(10)
    .setScrollFactor(1);
}
