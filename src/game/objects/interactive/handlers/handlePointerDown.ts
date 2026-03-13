import { CAMERA } from '../../../config/constants';

export function handlePointerDown(scene: Phaser.Scene, targetScene: string) {
  // No llamar stopAudio() aqui: el fade tween seria destruido por scene.start()
  // antes de completar. El shutdown handler de BaseScene llama audioManager.destroy()
  // que detiene todo de forma inmediata cuando la escena se apaga.

  const { r, g, b } = CAMERA.fadeOut.rgb;
  scene.cameras.main.fadeOut(CAMERA.fadeOut.duration, r, g, b);
  scene.cameras.main.once('camerafadeoutcomplete', () => {
    scene.scene.start(targetScene);
  });
}
