import { createSprites } from './createSprites';
import { createShadow } from './createShadow';
import { createLabel } from './createLabel';
import { createLoopTweens } from './createTweens';
import { handlePointerOver } from './handlers/handlePointerOver';
import { handlePointerOut } from './handlers/handlePointerOut';
import { handlePointerDown } from './handlers/handlePointerDown';
import type { InteractiveObjectConfig } from './types';

export function createInteractiveObject(config: InteractiveObjectConfig) {
  const { scene, x, y, scale = 1, idleAnim, hoverAnim, targetScene } = config;

  const { sprite, altSprite } = createSprites(config);

  const width = sprite.frame?.width ?? sprite.width;
  const height = sprite.frame?.height ?? sprite.height;

  const spriteWidth = width * scale;
  const spriteHeight = height * scale;

  const showPosY = spriteHeight * 0.4;
  const shadowWidth = spriteWidth * 1.4;
  const shadowHeight = 10 * scale;

  const shadow = createShadow(
    scene,
    x,
    y + showPosY,
    shadowWidth,
    shadowHeight
  );
  const label = createLabel(scene, x, y, config.infoText);

  const { shadowTween, breathingTween, floatingTween } = createLoopTweens(
    scene,
    sprite,
    shadow,
    y,
    showPosY,
    scale
  );

  if (idleAnim && sprite.anims) sprite.play(idleAnim);

  const originalCameraX = scene.cameras.main.scrollX;
  const originalCameraY = scene.cameras.main.scrollY;
  const originalZoom = scene.cameras.main.zoom;

  const state = {
    isHovering: false,
    isPlayingReverse: false,
    currentZoomTween: null as Phaser.Tweens.Tween | null,
  };

  const ctx = {
    scene,
    x,
    y,
    sprite,
    altSprite,
    shadow,
    label,
    config,
    breathingTween,
    floatingTween,
    shadowTween,
    originalCameraX,
    originalCameraY,
    originalZoom,
    state,
    shadowWidth,
    shadowHeight,
  };

  sprite.on('pointerover', () => handlePointerOver(ctx));
  sprite.on('pointerout', () => handlePointerOut(ctx));
  sprite.on('pointerdown', () => handlePointerDown(scene, targetScene));

  if (altSprite) {
    altSprite.on('pointerover', () => handlePointerOver(ctx));
    altSprite.on('pointerout', () => handlePointerOut(ctx));
    altSprite.on('pointerdown', () => handlePointerDown(scene, targetScene));
  }

  sprite.on('animationcomplete', (anim: Phaser.Animations.Animation) => {
    if (
      hoverAnim &&
      anim.key === hoverAnim &&
      state.isPlayingReverse &&
      idleAnim
    ) {
      state.isPlayingReverse = false;
      sprite.play(idleAnim);
    }
  });

  return { sprite, shadow, altSprite };
}
