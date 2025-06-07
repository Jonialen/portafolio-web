interface MusicControl {
  stopAll: () => void;
}

interface SceneWithMusic extends Phaser.Scene {
  musicControl?: MusicControl;
}

export function handlePointerDown(scene: Phaser.Scene, targetScene: string) {
  const sceneWithMusic = scene as SceneWithMusic;
  if (sceneWithMusic.musicControl) {
    sceneWithMusic.musicControl.stopAll();
  }
  scene.cameras.main.fadeOut(800, 0, 0, 0);
  scene.cameras.main.once('camerafadeoutcomplete', () => {
    scene.scene.start(targetScene);
  });
}
