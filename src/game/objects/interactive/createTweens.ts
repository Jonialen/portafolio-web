import type Phaser from 'phaser';

export function createLoopTweens(
  scene: Phaser.Scene,
  sprite: Phaser.GameObjects.Sprite,
  shadow: Phaser.GameObjects.Ellipse,
  y: number,
  showPosY: number,
  scale: number
) {
  const shadowTween = scene.tweens.add({
    targets: shadow,
    scaleX: 1.01,
    scaleY: 0.99,
    duration: 2000,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut',
  });

  const breathingTween = scene.tweens.add({
    targets: sprite,
    scaleX: scale * 1.02,
    scaleY: scale * 1.02,
    duration: 2000,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut',
  });

  const floatingTween = scene.tweens.add({
    targets: sprite,
    y: y - 5,
    duration: 3000,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut',
    onUpdate: () => {
      shadow.y = sprite.y + showPosY;
    },
  });

  return { shadowTween, breathingTween, floatingTween };
}
