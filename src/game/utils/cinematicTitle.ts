import Phaser from 'phaser';

export function showCinematicTitle(scene: Phaser.Scene, title: string) {
  const { width, height } = scene.cameras.main;

  // Fondo oscuro (ya visible)
  const overlay = scene.add
    .rectangle(width / 2, height / 2, width, height, 0x000000, 0.85)
    .setDepth(1000)
    .setAlpha(1); // Ya aparece

  // Texto del título (también visible desde el inicio)
  const titleText = scene.add
    .text(width / 2, height / 2, title, {
      fontSize: '48px',
      fontFamily: 'serif',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 6,
    })
    .setOrigin(0.5)
    .setDepth(1001)
    .setAlpha(1); // Ya aparece

  // Fade out conjunto
  scene.time.delayedCall(1200, () => {
    scene.tweens.add({
      targets: [overlay, titleText],
      alpha: 0,
      duration: 600,
      ease: 'Sine.easeInOut',
      onComplete: () => {
        overlay.destroy();
        titleText.destroy();
      },
    });
  });
}
