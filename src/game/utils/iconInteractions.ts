import Phaser from 'phaser';
import { showTooltip, hideTooltip } from './tooltipUtils';
import { ANIMATION, AUDIO } from '../config/constants';

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
  hoverScale?: number;
  hoverDuration?: number;
  clickScale?: number;
}

export function setupIconInteractions({
  scene,
  icon,
  project,
  soundKeys = {},
  hoverScale = ANIMATION.hover.scale,
  hoverDuration = ANIMATION.hover.duration,
  clickScale = ANIMATION.click.scale,
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

    icon.setTint(ANIMATION.hover.tint);
    showTooltip(scene, icon.x, icon.y, project.name, project.description);
    if (soundKeys.hover)
      scene.sound.play(soundKeys.hover, { volume: AUDIO.volume.sfx.hover });
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
    scene.tweens.add({
      targets: icon,
      scale: originalScale * clickScale,
      duration: ANIMATION.click.duration,
      yoyo: true,
      ease: ANIMATION.click.ease,
    });

    if (soundKeys.click)
      scene.sound.play(soundKeys.click, { volume: AUDIO.volume.sfx.click });
    project.onClick?.();
  });
}
