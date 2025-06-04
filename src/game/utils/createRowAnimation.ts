export function createRowAnimation(
  scene: Phaser.Scene,
  key: string,
  spriteKey: string,
  fila: number,
  columnas: number,
  frameRate: number,
  repeat: number = -1
) {
  if (scene.anims.exists(key)) return;

  scene.anims.create({
    key,
    frames: scene.anims.generateFrameNumbers(spriteKey, {
      start: fila * columnas,
      end: fila * columnas + columnas - 1,
    }),
    frameRate,
    repeat,
  });
}
