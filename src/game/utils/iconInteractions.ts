import Phaser from 'phaser';
import { showTooltip, hideTooltip } from './tooltipUtils';

export interface IconInteractionConfig {
  scene: Phaser.Scene;
  icon: Phaser.GameObjects.Image;
  project: {
    name: string;
    description: string;
    onClick?: () => void;
  };
  soundKeys?: {
    hover?: string;
    click?: string;
  };
  hoverScale?: number; // default: 1.1
  hoverDuration?: number; // default: 200ms
  clickScale?: number; // default: 0.95 (bump)
}

export function setupIconInteractions({
  scene,
  icon,
  project,
  soundKeys = {},
  hoverScale = 1.1,
  hoverDuration = 200,
  clickScale = 0.95,
}: IconInteractionConfig) {
  icon.setInteractive({ useHandCursor: true });

  const originalScale = icon.scale;

  icon.on('pointerover', () => {
    scene.tweens.add({
      targets: icon,
      scale: originalScale * hoverScale,
      duration: hoverDuration,
      ease: 'Sine.easeOut',
    });

    icon.setTint(0xffffcc);
    showTooltip(scene, icon.x, icon.y, project.name, project.description);
    if (soundKeys.hover) scene.sound.play(soundKeys.hover, { volume: 0.3 });
  });

  icon.on('pointerout', () => {
    scene.tweens.add({
      targets: icon,
      scale: originalScale,
      duration: hoverDuration,
      ease: 'Sine.easeIn',
    });
    icon.clearTint();
    hideTooltip();
  });

  icon.on('pointerdown', () => {
    // Mini bump al hacer clic
    scene.tweens.add({
      targets: icon,
      scale: originalScale * clickScale,
      duration: 80,
      yoyo: true,
      ease: 'Quad.easeOut',
    });

    if (soundKeys.click) scene.sound.play(soundKeys.click, { volume: 0.5 });
    project.onClick?.();
  });
}
