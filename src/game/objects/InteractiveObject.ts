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

  // Guardar posición original de la cámara
  const originalCameraX = scene.cameras.main.scrollX;
  const originalCameraY = scene.cameras.main.scrollY;
  const originalZoom = scene.cameras.main.zoom;

  const sprite = scene.add
    .sprite(x, y, spriteKey)
    .setInteractive({ useHandCursor: true })
    .setScale(scale);

  sprite.flipX = flipX;
  sprite.play(idleAnim);

  const label = scene.add
    .text(x + 60, y - 20, infoText, {
      fontSize: '24px',
      fontFamily: 'Arial',
      color: '#ffffff',
      backgroundColor: '#000000aa',
      padding: { x: 10, y: 5 },
    })
    .setAlpha(0);

  // Hover
  sprite.on('pointerover', () => {
    isPlayingReverse = false;
    sprite.setScale(scale + 0.2);
    sprite.stop();
    sprite.play(hoverAnim);

    scene.tweens.add({
      targets: label,
      alpha: 1,
      duration: 200,
    });

    if (zoomOnHover) {
      // Detener tween anterior si existe
      if (currentZoomTween) {
        currentZoomTween.stop();
      }

      // Calcular la nueva posición de la cámara para centrar el objeto
      const camera = scene.cameras.main;
      const gameWidth = camera.width;
      const gameHeight = camera.height;

      // Calcular dónde debe estar la cámara para centrar el objeto
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

  // Salir del hover
  sprite.on('pointerout', () => {
    isPlayingReverse = true;
    sprite.setScale(scale);
    sprite.stop();
    sprite.anims.playReverse(hoverAnim);

    scene.tweens.add({
      targets: label,
      alpha: 0,
      duration: 200,
    });

    if (zoomOnHover) {
      // Detener tween anterior si existe
      if (currentZoomTween) {
        currentZoomTween.stop();
      }

      // Volver a la posición y zoom originales
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

  // Cuando termina animación
  sprite.on('animationcomplete', (anim: Phaser.Animations.Animation) => {
    if (anim.key === hoverAnim && isPlayingReverse) {
      isPlayingReverse = false;
      sprite.play(idleAnim);
    }
  });

  // Clic para cambiar de escena
  sprite.on('pointerdown', () => {
    scene.cameras.main.fadeOut(800, 0, 0, 0);
    scene.cameras.main.once('camerafadeoutcomplete', () => {
      scene.scene.start(targetScene);
    });
  });

  return sprite;
}
