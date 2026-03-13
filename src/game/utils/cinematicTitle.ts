import Phaser from 'phaser';
import { UI, DEPTH } from '../config/constants';

export function showCinematicTitle(scene: Phaser.Scene, title: string) {
  const { width, height } = scene.cameras.main;
  const { overlay: overlayConfig, title: titleConfig } = UI.cinematic;

  const overlay = scene.add
    .rectangle(
      width / 2,
      height / 2,
      width,
      height,
      overlayConfig.color,
      overlayConfig.alpha
    )
    .setDepth(DEPTH.overlay)
    .setAlpha(1);

  const titleText = scene.add
    .text(width / 2, height / 2, title, {
      fontSize: titleConfig.fontSize,
      fontFamily: titleConfig.fontFamily,
      color: titleConfig.color,
      stroke: titleConfig.stroke,
      strokeThickness: titleConfig.strokeThickness,
    })
    .setOrigin(0.5)
    .setDepth(DEPTH.overlay + 1)
    .setAlpha(1);

  scene.time.delayedCall(UI.cinematic.displayDuration, () => {
    scene.tweens.add({
      targets: [overlay, titleText],
      alpha: 0,
      duration: UI.cinematic.fadeOutDuration,
      ease: 'Sine.easeInOut',
      onComplete: () => {
        overlay.destroy();
        titleText.destroy();
      },
    });
  });
}
