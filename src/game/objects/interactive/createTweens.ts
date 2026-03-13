import type Phaser from 'phaser';
import { ANIMATION } from '../../config/constants';

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
    scaleX: ANIMATION.breathing.scale,
    scaleY: 1 / ANIMATION.breathing.scale,
    duration: ANIMATION.breathing.duration,
    yoyo: true,
    repeat: -1,
    ease: ANIMATION.breathing.ease,
  });

  const breathingTween = scene.tweens.add({
    targets: sprite,
    scaleX: scale * ANIMATION.breathing.scale,
    scaleY: scale * ANIMATION.breathing.scale,
    duration: ANIMATION.breathing.duration,
    yoyo: true,
    repeat: -1,
    ease: ANIMATION.breathing.ease,
  });

  const floatingTween = scene.tweens.add({
    targets: sprite,
    y: y - ANIMATION.floating.offset,
    duration: ANIMATION.floating.duration,
    yoyo: true,
    repeat: -1,
    ease: ANIMATION.floating.ease,
    onUpdate: () => {
      shadow.y = sprite.y + showPosY;
    },
  });

  return { shadowTween, breathingTween, floatingTween };
}
