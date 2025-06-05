export function handlePointerDown(scene: Phaser.Scene, targetScene: string) {
  scene.cameras.main.fadeOut(800, 0, 0, 0);
  scene.cameras.main.once('camerafadeoutcomplete', () => {
    scene.scene.start(targetScene);
  });
}
