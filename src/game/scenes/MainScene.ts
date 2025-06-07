import Phaser from 'phaser';
import { createInteractiveObject } from '../objects/interactive/InteractiveObject';
import { ParallaxBackground } from '../objects/ParallaxBackground';
import { setupAnimations } from '../animations/AnimationSetup';
import { playSceneMusic } from '../music/playSceneMusic';
import { showCinematicTitle } from '../utils/cinematicTitle';
import type { MusicControl } from '../types/musicTypes';

export class MainScene extends Phaser.Scene {
  musicControl?: MusicControl;
  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    // this.load.image(
    //   'fondo1',
    //   '/assets/scenes/oak_woods/background/background_layer_1.png'
    // );
    // this.load.image(
    //   'fondo2',
    //   '/assets/scenes/oak_woods/background/background_layer_2.png'
    // );
    // this.load.image(
    //   'fondo3',
    //   '/assets/scenes/oak_woods/background/background_layer_3.png'
    // );

    this.load.image('1', '/assets/scenes/camp/1.png');
    this.load.image('2', '/assets/scenes/camp/2.png');
    this.load.image('3', '/assets/scenes/camp/3.png');
    this.load.image('4', '/assets/scenes/camp/4.png');
    this.load.image('5', '/assets/scenes/camp/5.png');
    this.load.image('6', '/assets/scenes/camp/6.png');
    this.load.image('7', '/assets/scenes/camp/7.png');
    this.load.image('8', '/assets/scenes/camp/8.png');
    this.load.image('9', '/assets/scenes/camp/9.png');

    this.load.spritesheet('cofre', '/assets/chest/Chests.png', {
      frameWidth: 48,
      frameHeight: 32,
    });

    this.load.spritesheet('cofre1', '/assets/chest/Chests1.png', {
      frameWidth: 32,
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

    this.load.audio('main_theme', ['/songs/darkFantasy.mp3']);
  }

  create() {
    // new ParallaxBackground(this, ['fondo1', 'fondo2', 'fondo3']);
    new ParallaxBackground(this, ['1', '2', '3', '4', '5', '6', '7', '8', '9']);
    setupAnimations(this);
    this.cameras.main.fadeIn(800, 0, 0, 0);

    this.musicControl = playSceneMusic(this, {
      mainKey: 'main_theme',
      volume: 0.1,
    });

    showCinematicTitle(this, 'Campamento');

    this.events.once('shutdown', () => {
      if (this.musicControl) {
        this.musicControl.stopAll();
      }
    });

    createInteractiveObject({
      scene: this,
      x: 300,
      y: 950,
      spriteKey: 'cofre1',
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
      x: 630,
      y: 890,
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
      x: 1200,
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
      x: 1550,
      y: 940,
      spriteKey: 'cristalBall',
      altSpriteKey: '',
      idleAnim: '',
      hoverAnim: '',
      infoText: 'Contact Me',
      targetScene: 'CrystalBallScene',
      scale: 2,
      zoomOnHover: false,
    });
  }
}
