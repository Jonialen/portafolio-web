// src/objects/createBundleInteractive.ts

import Phaser from 'phaser';
import { showTooltip, hideTooltip } from '../utils/tooltipUtils';

export type BundleConfig = {
  scene: Phaser.Scene;
  x: number;
  y: number;
  scale?: number;
  project: {
    name: string;
    description: string;
    onClick?: () => void;
  };
  soundKeys?: {
    hover?: string;
    click?: string;
  };
};

export function createBundleInteractive(config: BundleConfig) {
  const { scene, x, y, scale = 1, project, soundKeys = {} } = config;

  const hoverScale = 1.1;
  const hoverDuration = 200;
  const clickScale = 0.95;
  const originalScale = scale;

  const bundleClose = scene.add
    .image(x, y, 'bundleClose')
    .setScale(scale)
    .setInteractive({ useHandCursor: true })
    .setDepth(11);

  const bundleOpen = scene.add
    .image(x, y, 'bundleOpen')
    .setScale(scale)
    .setAlpha(0)
    .setDepth(11);

  const doHoverIn = () => {
    scene.tweens.add({ targets: bundleClose, alpha: 0, duration: 200 });
    scene.tweens.add({ targets: bundleOpen, alpha: 1, duration: 200 });

    scene.tweens.add({
      targets: [bundleClose, bundleOpen],
      scale: originalScale * hoverScale,
      duration: hoverDuration,
      ease: 'Sine.easeOut',
    });

    bundleClose.setTint(0xffffcc);
    bundleOpen.setTint(0xffffcc);

    showTooltip(scene, x, y, project.name, project.description);

    if (soundKeys.hover) scene.sound.play(soundKeys.hover, { volume: 0.3 });
  };

  const doHoverOut = () => {
    scene.tweens.add({ targets: bundleClose, alpha: 1, duration: 200 });
    scene.tweens.add({ targets: bundleOpen, alpha: 0, duration: 200 });

    scene.tweens.add({
      targets: [bundleClose, bundleOpen],
      scale: originalScale,
      duration: hoverDuration,
      ease: 'Sine.easeIn',
    });

    bundleClose.clearTint();
    bundleOpen.clearTint();
    hideTooltip();
  };

  const doClick = () => {
    scene.tweens.add({
      targets: [bundleClose, bundleOpen],
      scale: originalScale * clickScale,
      duration: 80,
      yoyo: true,
      ease: 'Quad.easeOut',
    });

    if (soundKeys.click) scene.sound.play(soundKeys.click, { volume: 0.5 });

    project.onClick?.();
  };

  [bundleClose, bundleOpen].forEach((sprite) => {
    sprite.on('pointerover', doHoverIn);
    sprite.on('pointerout', doHoverOut);
    sprite.on('pointerdown', doClick);
  });

  return { bundleClose, bundleOpen };
}
