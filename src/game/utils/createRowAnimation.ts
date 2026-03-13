export function createRowAnimation(
  scene: Phaser.Scene,
  key: string,
  spriteKey: string,
  row: number,
  columns: number,
  frameRate: number,
  repeat: number = -1
) {
  if (scene.anims.exists(key)) return;

  scene.anims.create({
    key,
    frames: scene.anims.generateFrameNumbers(spriteKey, {
      start: row * columns,
      end: row * columns + columns - 1,
    }),
    frameRate,
    repeat,
  });
}
