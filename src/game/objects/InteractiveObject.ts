type InteractiveObjectConfig = {
  scene: Phaser.Scene;
  x: number;
  y: number;
  spriteKey: string;
  idleAnim: string;
  hoverAnim: string;
  infoText: string;
  targetScene: string;
  scale?: number;
  flipX?: boolean;
  zoomOnHover?: boolean;
  zoomAmount?: number;
  zoomDuration?: number;
  zoomEase?: string;
};

export function createInteractiveObject(config: InteractiveObjectConfig) {
  const {
    scene,
    x,
    y,
    spriteKey,
    idleAnim,
    hoverAnim,
    infoText,
    targetScene,
    scale = 1,
    flipX = false,
    zoomOnHover,
    zoomAmount = 1.3,
    zoomDuration = 800,
    zoomEase = 'Power2.easeInOut',
  } = config;

  let isPlayingReverse = false;
  let currentZoomTween: Phaser.Tweens.Tween | null = null;

  const originalCameraX = scene.cameras.main.scrollX;
  const originalCameraY = scene.cameras.main.scrollY;
  const originalZoom = scene.cameras.main.zoom;
  const showPosY = 10 * scale
  const widthSprite = scene.textures.get('spriteKey')?.getSourceImage().width;

  // SOMBRA PRIMERO (se dibuja antes que el sprite)
  const shadow = scene.add.ellipse(x, y + showPosY, widthSprite * scale, 10 * scale, 0x000000, 0.6);
  
  // Asegurar que la sombra esté visible
  shadow.setDepth(10); // Depth más alto que el fondo
  shadow.setScrollFactor(1); // Seguir la cámara
  
  console.log('Sombra creada en:', x, y + showPosY, 'con escala:', scale);

  const sprite = scene.add
    .sprite(x, y, spriteKey)
    .setInteractive({ useHandCursor: true })
    .setScale(scale);

  // Sprite encima de la sombra
  sprite.setDepth(11);
  sprite.setScrollFactor(1);
  sprite.flipX = flipX;
  
  if (idleAnim && sprite.anims) {
    sprite.play(idleAnim);
  }

  // Animación de la sombra - solo respiración muy sutil
  const shadowTween = scene.tweens.add({
    targets: shadow,
    scaleX: 1.01,
    scaleY: 0.99,
    duration: 2000,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut',
  });

  // Respiración (escala suave)
  const breathingTween = scene.tweens.add({
    targets: sprite,
    scaleX: scale * 1.02,
    scaleY: scale * 1.02,
    duration: 2000,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut',
  });

  // Flotación (oscilación vertical) - también mover la sombra
  const floatingTween = scene.tweens.add({
    targets: sprite,
    y: y - 5,
    duration: 3000,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut',
    onUpdate: () => {
      // Mantener la sombra siempre arriba del sprite
      shadow.y = sprite.y + showPosY;
    }
  });

  const label = scene.add
    .text(x + 60, y - 20, infoText, {
      fontSize: '24px',
      fontFamily: 'Arial',
      color: '#ffffff',
      backgroundColor: '#000000aa',
      padding: { x: 10, y: 5 },
    })
    .setAlpha(0)
    .setDepth(12);

  // Hover
  sprite.on('pointerover', () => {
    isPlayingReverse = false;
    breathingTween.pause();
    floatingTween.pause();
    shadowTween.pause();

    scene.tweens.add({
      targets: sprite,
      duration: 200,
      tint: 0xffcc88,
    });

    // Sombra apenas más grande en hover
    scene.tweens.add({
      targets: shadow,
      scaleX: 1.05,
      scaleY: 1.05,
      duration: 200,
    });

    sprite.setScale(scale + 0.2);

    if (hoverAnim && sprite.anims) {
      sprite.stop();
      sprite.play(hoverAnim);
    }

    scene.tweens.add({
      targets: label,
      alpha: 1,
      duration: 200,
    });

    if (zoomOnHover) {
      if (currentZoomTween) currentZoomTween.stop();

      const camera = scene.cameras.main;
      const gameWidth = camera.width;
      const gameHeight = camera.height;

      const targetCameraX = x - gameWidth / 2 / zoomAmount;
      const targetCameraY = y - gameHeight / 2 / zoomAmount;

      currentZoomTween = scene.tweens.add({
        targets: camera,
        scrollX: targetCameraX,
        scrollY: targetCameraY,
        zoom: zoomAmount,
        duration: zoomDuration,
        ease: zoomEase,
        onComplete: () => {
          currentZoomTween = null;
        },
      });
    }
  });

  // Pointer out
  sprite.on('pointerout', () => {
    isPlayingReverse = true;
    breathingTween.resume();
    floatingTween.resume();
    shadowTween.resume();

    scene.tweens.add({
      targets: sprite,
      duration: 200,
      tint: 0xffffff,
    });

    scene.tweens.add({
      targets: shadow,
      scaleX: 1,
      scaleY: 1,
      duration: 200,
    });

    sprite.setScale(scale);

    if (hoverAnim && sprite.anims) {
      sprite.stop();
      sprite.anims.playReverse(hoverAnim);
    }

    scene.tweens.add({
      targets: label,
      alpha: 0,
      duration: 200,
    });

    if (zoomOnHover) {
      if (currentZoomTween) currentZoomTween.stop();

      currentZoomTween = scene.tweens.add({
        targets: scene.cameras.main,
        scrollX: originalCameraX,
        scrollY: originalCameraY,
        zoom: originalZoom,
        duration: zoomDuration,
        ease: zoomEase,
        onComplete: () => {
          currentZoomTween = null;
        },
      });
    }
  });

  sprite.on('animationcomplete', (anim: Phaser.Animations.Animation) => {
    if (hoverAnim && anim.key === hoverAnim && isPlayingReverse && idleAnim) {
      isPlayingReverse = false;
      sprite.play(idleAnim);
    }
  });

  sprite.on('pointerdown', () => {
    scene.cameras.main.fadeOut(800, 0, 0, 0);
    scene.cameras.main.once('camerafadeoutcomplete', () => {
      scene.scene.start(targetScene);
    });
  });

  return { sprite, shadow }; // Devolver ambos para debugging
}