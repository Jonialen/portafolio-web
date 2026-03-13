import { CAMERA } from '../../../config/constants';

interface SceneWithAudio extends Phaser.Scene {
  stopAudio?: () => void;
}

export function handlePointerDown(scene: Phaser.Scene, targetScene: string) {
  const sceneWithAudio = scene as SceneWithAudio;
  sceneWithAudio.stopAudio?.();

  const { r, g, b } = CAMERA.fadeOut.rgb;
  scene.cameras.main.fadeOut(CAMERA.fadeOut.duration, r, g, b);
  scene.cameras.main.once('camerafadeoutcomplete', () => {
    scene.scene.start(targetScene);
  });
}
