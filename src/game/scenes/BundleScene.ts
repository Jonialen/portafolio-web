import Phaser from 'phaser';
import { ParallaxBackground } from '../objects/ParallaxBackground';
import { createAlignedGrid } from '../utils/gridUtils';
import { showCinematicTitle } from '../utils/cinematicTitle';
import { skills } from '../data/skills';
import type { MusicControl } from '../types/musicTypes';
import { playSceneMusic } from '../music/playSceneMusic';

export class BundleScene extends Phaser.Scene {
  respirationTween!: Phaser.Tweens.Tween;
  musicControl?: MusicControl;
  constructor() {
    super({ key: 'BundleScene' });
  }

  preload() {
    // this.load.image('fondo_back', '/assets/scenes/forest_light/back2.png');
    // this.load.image('fondo_front', '/assets/scenes/forest_light/front2.png');
    // this.load.image('fondo_middle', '/assets/scenes/forest_light/middle2.png');
    this.load.image('fondo_back2', '/assets/scenes/forest_dark/backDark.png');
    this.load.image('fondo_front2', '/assets/scenes/forest_dark/frontDark.png');
    this.load.image(
      'fondo_middle2',
      '/assets/scenes/forest_dark/middleDark.png'
    );

    this.load.image('react', '/assets/skills/react.png');
    this.load.image('git-branch', '/assets/icons/git.png');
    this.load.image('docker', '/assets/icons/docker.png');
    this.load.image('java', '/assets/icons/java.png');
    this.load.image('database', '/assets/icons/sql.png');
    this.load.image('python', '/assets/icons/python.png');
    this.load.image('android', '/assets/icons/android.png');
    this.load.image('terminal', '/assets/icons/terminal.png');

    this.load.image('bundle_Inside', '/assets/bundle/leather_expand.png');

    this.load.audio('second', ['/songs/second.mp3']);
    this.load.audio('intro_song', ['/songs/dungeonTitle2.mp3']);

    this.load.audio('hover_sound', '/songs/hoverSound.mp3');
    this.load.audio('click_sound', '/songs/clicSound.mp3');
  }

  create() {
    const { width, height } = this.cameras.main;

    // new ParallaxBackground(this, ['fondo_back', 'fondo_middle', 'fondo_front']);
    new ParallaxBackground(this, [
      'fondo_back2',
      'fondo_middle2',
      'fondo_front2',
    ]);

    this.musicControl = playSceneMusic(this, {
      introKey: 'intro_song',
      mainKey: 'second',
      introVolume: 0.2,
      volume: 0.1,
      fadeDuration: 0,
    });

    this.events.once('shutdown', () => {
      if (this.musicControl) {
        this.musicControl.stopAll();
      }
    });

    const bundleInside = this.add
      .image(width / 2, height - 200, 'bundle_Inside')
      .setOrigin(0.5, 1);

    const tex = this.textures.get('bundle_Inside').getSourceImage();
    const scale = Math.min((width * 0.6) / tex.width, 10);
    bundleInside.setScale(scale);

    showCinematicTitle(this, 'Saco de habilidades');
    this.cameras.main.fadeIn(800, 0, 0, 0);

    const gridElements = createAlignedGrid(
      this,
      bundleInside,
      skills,
      { hover: 'hover_sound', click: 'click_sound' },
      4,
      4,
      8,
      2,
      -15
    );

    this.respirationTween = this.tweens.add({
      targets: gridElements,
      scaleX: scale * 1.01,
      scaleY: scale * 1.01,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    const backText = this.add
      .text(width - 180, height - 60, '← Volver', {
        fontSize: '28px',
        backgroundColor: '#000000aa',
        color: '#ffffff',
        padding: { x: 10, y: 5 },
      })
      .setInteractive({ useHandCursor: true });

    backText.on('pointerdown', () => {
      this.cameras.main.fadeOut(800, 0, 0, 0);

      this.time.delayedCall(850, () => {
        this.scene.start('MainScene');
      });

      if (this.musicControl) {
        this.musicControl.stopAll();
      }
    });
  }
}
