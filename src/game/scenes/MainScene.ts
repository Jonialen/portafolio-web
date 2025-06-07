import Phaser from 'phaser';
import { createInteractiveObject } from '../objects/interactive/InteractiveObject';
import { ParallaxBackground } from '../objects/ParallaxBackground';
import { setupAnimations } from '../animations/AnimationSetup';

export class MainScene extends Phaser.Scene {
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

    this.load.spritesheet('bundleOpen', '/assets/bundle/bundleOpen.png', {
      frameWidth: 160,
      frameHeight: 160,
    });

    this.load.spritesheet('bundleClose', '/assets/bundle/bundleClose.png', {
      frameWidth: 120,
      frameHeight: 140,
    });

    this.load.spritesheet(
      'cristalBall',
      '/assets/crystallball/Bola_de_cristal.png',
      {
        frameWidth: 32,
        frameHeight: 32,
      }
    );
  }

  create() {
    new ParallaxBackground(this, ['fondo1', 'fondo2', 'fondo3']);
    setupAnimations(this);
    this.cameras.main.fadeIn(800, 0, 0, 0);
    // Crear cofre
    createInteractiveObject({
      scene: this,
      x: 150,
      y: 950,
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
      x: 600,
      y: 950,
      spriteKey: 'backpack',
      idleAnim: '',
      hoverAnim: '',
      infoText: 'Mi Mochila personal',
      targetScene: 'BackpackScene',
      scale: 4,
      zoomOnHover: false,
    });

    createInteractiveObject({
      scene: this,
      x: 1000,
      y: 950,
      spriteKey: 'bundleClose',
      altSpriteKey: 'bundleOpen',
      idleAnim: '',
      hoverAnim: '',
      infoText: 'Skills',
      targetScene: 'BundleScene',
      scale: 2 / 5,
      zoomOnHover: false,
    });

    createInteractiveObject({
      scene: this,
      x: 1450,
      y: 910,
      spriteKey: 'cristalBall',
      altSpriteKey: '',
      idleAnim: '',
      hoverAnim: '',
      infoText: 'Contact Me',
      targetScene: 'CrystalBallScene',
      scale: 2,
      zoomOnHover: false,
    });

    console.log('MainScene create');
  }
}
