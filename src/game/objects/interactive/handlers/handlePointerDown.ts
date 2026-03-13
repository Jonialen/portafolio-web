import { CAMERA } from '../../../config/constants';
import type { BaseScene } from '../../../core/BaseScene';

export function handlePointerDown(scene: Phaser.Scene, targetScene: string) {
  if ('stopAudio' in scene) {
    (scene as BaseScene).stopAudio();
  }

  const { r, g, b } = CAMERA.fadeOut.rgb;
  scene.cameras.main.fadeOut(CAMERA.fadeOut.duration, r, g, b);
  scene.cameras.main.once('camerafadeoutcomplete', () => {
    scene.scene.start(targetScene);
  });
}
