export function handlePointerOver(ctx: { sprite: any; altSprite: any; shadow: any; label: any; config: any; breathingTween: any; floatingTween: any; shadowTween: any; originalCameraX: any; originalCameraY: any; originalZoom: any; scene: any; x: any; y: any; state: any; }) {
  const {
    sprite, altSprite, shadow, label, config,
    breathingTween, floatingTween, shadowTween,
    originalCameraX, originalCameraY, originalZoom,
    scene, x, y,
    state
  } = ctx;

  if (state.isHovering) return;
  state.isHovering = true;
  state.isPlayingReverse = false;

  breathingTween.pause();
  floatingTween.pause();
  shadowTween.pause();

  const currentSprite = altSprite && altSprite.visible ? altSprite : sprite;

  if (altSprite) {
    altSprite.setVisible(true).setAlpha(1).setScale(config.scale);
    sprite.setAlpha(0);
  } else {
    scene.tweens.add({ targets: sprite, duration: 200, tint: 0xffcc88 });
    sprite.setScale(config.scale + 0.2);
  }

  scene.tweens.add({
    targets: shadow,
    width: shadow.width * 1.05,
    height: shadow.height * 1.05,
    duration: 200,
  });

  if (config.hoverAnim && sprite.anims && !altSprite) {
    sprite.stop();
    sprite.play(config.hoverAnim);
  }

  scene.tweens.add({ targets: label, alpha: 1, duration: 200 });

  if (config.zoomOnHover) {
    if (state.currentZoomTween) state.currentZoomTween.stop();
    const targetCameraX = x - scene.cameras.main.width / 2 / config.zoomAmount;
    const targetCameraY = y - scene.cameras.main.height / 2 / config.zoomAmount;
    state.currentZoomTween = scene.tweens.add({
      targets: scene.cameras.main,
      scrollX: targetCameraX,
      scrollY: targetCameraY,
      zoom: config.zoomAmount,
      duration: config.zoomDuration,
      ease: config.zoomEase,
      onComplete: () => state.currentZoomTween = null,
    });
  }
}
