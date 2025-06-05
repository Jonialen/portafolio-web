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
  altSpriteKey?: string;
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
    altSpriteKey,
  } = config;

  let isPlayingReverse = false;
  let currentZoomTween: Phaser.Tweens.Tween | null = null;
  let isHovering = false; // ← Nueva variable para controlar el estado

  const originalCameraX = scene.cameras.main.scrollX;
  const originalCameraY = scene.cameras.main.scrollY;
  const originalZoom = scene.cameras.main.zoom;

  // Crear el sprite primero para poder obtener sus dimensiones reales
  const sprite = scene.add
    .sprite(x, y, spriteKey)
    .setInteractive({ useHandCursor: true })
    .setScale(scale);

  const altSprite = altSpriteKey
    ? scene.add
        .sprite(x, y, altSpriteKey)
        .setScale(scale)
        .setAlpha(0)
        .setDepth(12)
        .setScrollFactor(1)
        .setVisible(false) // ← Inicialmente invisible
        .setInteractive({ useHandCursor: true }) // ← Hacer interactivo
    : null;

  sprite.setDepth(11);
  sprite.setScrollFactor(1);
  sprite.flipX = flipX;

  if (altSprite){
    altSprite.setInteractive(false); // Importante para que no interfiera
    altSprite.flipX = flipX;
    altSprite.setDepth(sprite.depth);  
  };

  // Obtener las dimensiones reales del sprite después de crearlo
  let spriteWidth = sprite.width * scale;
  let spriteHeight = sprite.height * scale;

  if (sprite.frame) {
    spriteWidth = sprite.frame.width * scale;
    spriteHeight = sprite.frame.height * scale;
  };

  // SOMBRA
  const showPosY = spriteHeight * 0.4;
  const shadowWidth = spriteWidth * 1.4;
  const shadowHeight = 10 * scale;
  const shadow = scene.add.ellipse(
    x,
    y + showPosY,
    shadowWidth,
    shadowHeight,
    0x000000,
    0.6
  );

  shadow.setDepth(10);
  shadow.setScrollFactor(1);

  if (idleAnim && sprite.anims) {
    sprite.play(idleAnim);
  };

  // Animaciones
  const shadowTween = scene.tweens.add({
    targets: shadow,
    scaleX: 1.01,
    scaleY: 0.99,
    duration: 2000,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut',
  });

  const breathingTween = scene.tweens.add({
    targets: sprite,
    scaleX: scale * 1.02,
    scaleY: scale * 1.02,
    duration: 2000,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut',
  });

  const floatingTween = scene.tweens.add({
    targets: sprite,
    y: y - 5,
    duration: 3000,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut',
    onUpdate: () => {
      shadow.y = sprite.y + showPosY;
    },
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

  // Función para manejar hover
  const handlePointerOver = () => {
    if (isHovering) return;
    isHovering = true;

    isPlayingReverse = false;
    breathingTween.pause();
    floatingTween.pause();
    shadowTween.pause();

    // Solo aplicar efectos visuales al sprite que se está mostrando
    const currentSprite = altSprite && altSprite.visible ? altSprite : sprite;

    if (altSprite) {
      // Cambiar sprites sin efectos adicionales
      altSprite.setVisible(true);
      altSprite.setAlpha(1);
      altSprite.setScale(scale);
      sprite.setAlpha(0);
    } else {
      // Si no hay sprite alternativo, aplicar efectos al principal
      scene.tweens.add({
        targets: sprite,
        duration: 200,
        tint: 0xffcc88,
      });
      sprite.setScale(scale + 0.2);
    }

    // Efectos de sombra
    scene.tweens.add({
      targets: shadow,
      width: shadow.width * 1.05,
      height: shadow.height * 1.05,
      duration: 200,
    });

    // Animaciones solo en el sprite principal (no en el alternativo)
    if (hoverAnim && sprite.anims && !altSprite) {
      sprite.stop();
      sprite.play(hoverAnim);
    }

    // Label
    scene.tweens.add({
      targets: label,
      alpha: 1,
      duration: 200,
    });

    // Zoom
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
  };

  // Función para manejar pointer out
  const handlePointerOut = () => {
    if (!isHovering) return;
    isHovering = false;

    isPlayingReverse = true;
    breathingTween.resume();
    floatingTween.resume();
    shadowTween.resume();

    if (altSprite) {
      // Restaurar al sprite original inmediatamente
      altSprite.setVisible(false);
      altSprite.setAlpha(0);
      sprite.setAlpha(1);
      sprite.setScale(scale);
    } else {
      // Si no hay sprite alternativo, quitar efectos del principal
      scene.tweens.add({
        targets: sprite,
        duration: 200,
        tint: 0xffffff,
      });
      sprite.setScale(scale);
    }

    // Restaurar sombra
    scene.tweens.add({
      targets: shadow,
      width: shadowWidth,
      height: shadowHeight,
      duration: 200,
    });

    // Animaciones solo si no hay sprite alternativo
    if (hoverAnim && sprite.anims && !altSprite) {
      sprite.stop();
      sprite.anims.playReverse(hoverAnim);
    }

    // Ocultar label
    scene.tweens.add({
      targets: label,
      alpha: 0,
      duration: 200,
    });

    // Restaurar zoom
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
  };

  // Función para manejar click
  const handlePointerDown = () => {
    scene.cameras.main.fadeOut(800, 0, 0, 0);
    scene.cameras.main.once('camerafadeoutcomplete', () => {
      scene.scene.start(targetScene);
    });
  };

  // Eventos del sprite principal
  sprite.on('pointerover', handlePointerOver);
  sprite.on('pointerout', handlePointerOut);
  sprite.on('pointerdown', handlePointerDown);

  // Solo agregar eventos al altSprite si existe
  if (altSprite) {
    altSprite.on('pointerover', handlePointerOver);
    altSprite.on('pointerout', handlePointerOut);
    altSprite.on('pointerdown', handlePointerDown);
  }

  sprite.on('animationcomplete', (anim: Phaser.Animations.Animation) => {
    if (hoverAnim && anim.key === hoverAnim && isPlayingReverse && idleAnim) {
      isPlayingReverse = false;
      sprite.play(idleAnim);
    }
  });

  return { sprite, shadow, altSprite };
}
