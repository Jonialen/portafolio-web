export function handlePointerOut(ctx: {
  sprite: any;
  altSprite: any;
  shadow: any;
  label: any;
  config: any;
  breathingTween: any;
  floatingTween: any;
  shadowTween: any;
  originalCameraX: any;
  originalCameraY: any;
  originalZoom: any;
  scene: any;
  state: any;
  shadowWidth: any;
  shadowHeight: any;
}) {
  const {
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
    scene,
    state,
    shadowWidth,
    shadowHeight,
  } = ctx;

  if (!state.isHovering) return;
  state.isHovering = false;
  state.isPlayingReverse = true;

  breathingTween.resume();
  floatingTween.resume();
  shadowTween.resume();

  if (altSprite) {
    altSprite.setVisible(false).setAlpha(0);
    sprite.setAlpha(1).setScale(config.scale);
  } else {
    scene.tweens.add({ targets: sprite, duration: 200, tint: 0xffffff });
    sprite.setScale(config.scale);
  }

  scene.tweens.add({
    targets: shadow,
    width: shadowWidth,
    height: shadowHeight,
    duration: 200,
  });

  if (config.hoverAnim && sprite.anims && !altSprite) {
    sprite.stop();
    sprite.anims.playReverse(config.hoverAnim);
  }

  scene.tweens.add({ targets: label, alpha: 0, duration: 200 });

  if (config.zoomOnHover) {
    if (state.currentZoomTween) state.currentZoomTween.stop();
    state.currentZoomTween = scene.tweens.add({
      targets: scene.cameras.main,
      scrollX: originalCameraX,
      scrollY: originalCameraY,
      zoom: originalZoom,
      duration: config.zoomDuration,
      ease: config.zoomEase,
      onComplete: () => (state.currentZoomTween = null),
    });
  }
}
