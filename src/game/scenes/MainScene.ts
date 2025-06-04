import Phaser from 'phaser';
import { createInteractiveObject } from '../objects/InteractiveObject';
import { createRowAnimation } from '../utils/createRowAnimation';
import { ParallaxBackground } from '../objects/ParallaxBackground';

export class MainScene extends Phaser.Scene {
  private capas: Phaser.GameObjects.Image[] = [];

  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    this.load.image(
      'fondo1',
      '/assets/scenes/oak_woods/background/background_layer_1.png'
    );
    this.load.image(
      'fondo2',
      '/assets/scenes/oak_woods/background/background_layer_2.png'
    );
    this.load.image(
      'fondo3',
      '/assets/scenes/oak_woods/background/background_layer_3.png'
    );

    this.load.spritesheet('cofre', '/assets/chest/Chests.png', {
      frameWidth: 48,
      frameHeight: 32,
    });
  }

  create() {
    new ParallaxBackground(this, ['fondo1', 'fondo2', 'fondo3']);

    // Crear animaciones del cofre
    const tex = this.textures.get('cofre').getSourceImage();
    const columnas = tex.width / 48;

    createRowAnimation(this, 'cofre_idle', 'cofre', 0, columnas, 2);
    createRowAnimation(this, 'cofre_hover', 'cofre', 1, columnas, 6, 0);

    // Crear cofre interactivo
    createInteractiveObject({
      scene: this,
      x: 150,
      y: 900,
      spriteKey: 'cofre',
      idleAnim: 'cofre_idle',
      hoverAnim: 'cofre_hover',
      infoText: 'Explora mis proyectos',
      targetScene: 'ChestScene',
      scale: 4,
      flipX: true,
      zoomOnHover: false,
      zoomAmount: 1.2, // Zoom muy sutil
      zoomDuration: 1000, // 1 segundo de duración
      zoomEase: 'Sine.easeInOut', // Easing muy natural
    });

    console.log('MainScene create');
  }
}
