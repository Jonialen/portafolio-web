import Phaser from 'phaser';
import { ANIMATION } from '../config/constants';

/**
 * Adds a breathing (scale pulsing) animation to one or more game objects.
 * Defaults match the ANIMATION.breathing constants.
 */
export function addBreathingAnimation(
  scene: Phaser.Scene,
  targets: Phaser.GameObjects.Image | Phaser.GameObjects.Image[],
  config?: { scale?: number; duration?: number; ease?: string }
): Phaser.Tweens.Tween {
  const targetArray = Array.isArray(targets) ? targets : [targets];
  const breathScale = config?.scale ?? ANIMATION.breathing.scale;
  const duration = config?.duration ?? ANIMATION.breathing.duration;
  const ease = config?.ease ?? ANIMATION.breathing.ease;

  // Use the first target's current scale as the base scale
  const baseScale = targetArray[0].scaleX;

  return scene.tweens.add({
    targets: targetArray,
    scaleX: baseScale * breathScale,
    scaleY: baseScale * breathScale,
    duration,
    yoyo: true,
    repeat: -1,
    ease,
  });
}
