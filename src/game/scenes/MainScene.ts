import Phaser from 'phaser';
import { createInteractiveObject } from '../objects/InteractiveObject';
import { ParallaxBackground } from '../objects/ParallaxBackground';
import { setupAnimations } from '../animations/AnimationSetup';

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

    this.load.spritesheet('backpack', '/assets/backpack/backpack_big.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
  }

  create() {
    const parallaxBg = new ParallaxBackground(this, ['fondo1', 'fondo2', 'fondo3']);
    setupAnimations(this);
    this.cameras.main.fadeIn(800, 0, 0, 0);
    // Crear cofre
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
      zoomAmount: 1.2,
      zoomDuration: 1000,
      zoomEase: 'Sine.easeInOut',
    });

    createInteractiveObject({
      scene: this,
      x: 500,
      y: 900,
      spriteKey: 'backpack',
      idleAnim: '', // <- sin animaciones
      hoverAnim: '',
      infoText: 'Mi Mochila de Recursos',
      targetScene: 'BackpackScene', // o la que definas
      scale: 4,
      zoomOnHover: false,
    });

    console.log('MainScene create');
  }
}
