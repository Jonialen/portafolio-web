import Phaser from 'phaser';
import { ParallaxBackground } from '../objects/ParallaxBackground';
import { createAlignedGrid } from '../utils/gridUtils';
import { showCinematicTitle } from '../utils/cinematicTitle';
import { skills } from '../data/skills';

export class BundleScene extends Phaser.Scene {
  respirationTween!: Phaser.Tweens.Tween;
  constructor() {
    super({ key: 'BundleScene' });
  }

  preload() {
    this.load.image('fondo_back', '/assets/scenes/forest_light/back2.png');
    this.load.image('fondo_front', '/assets/scenes/forest_light/front2.png');
    this.load.image('fondo_middle', '/assets/scenes/forest_light/middle2.png');

    this.load.image('react', '/assets/skills/react.png');
    this.load.image('git-branch', '/assets/icons/git.png');
    this.load.image('docker', '/assets/icons/docker.png');
    this.load.image('java', '/assets/icons/java.png');
    this.load.image('database', '/assets/icons/sql.png');
    this.load.image('python', '/assets/icons/python.png');
    this.load.image('android', '/assets/icons/android.png');
    this.load.image('terminal', '/assets/icons/terminal.png');

    this.load.image('bundle_Inside', '/assets/bundle/leather_expand.png');
  }

  create() {
    const { width, height } = this.cameras.main;

    new ParallaxBackground(this, ['fondo_back', 'fondo_middle', 'fondo_front']);

    // Agregar imagen del interior del cofre
    const bundleInside = this.add
      .image(width / 2, height - 200, 'bundle_Inside')
      .setOrigin(0.5, 1);

    const tex = this.textures.get('bundle_Inside').getSourceImage();
    const scale = Math.min((width * 0.6) / tex.width, 10);
    bundleInside.setScale(scale);

    // Fade in suave
    showCinematicTitle(this, 'Saco de habilidades');
    this.cameras.main.fadeIn(800, 0, 0, 0);

    const gridElements = createAlignedGrid(
      this,
      bundleInside,
      skills,
      4,
      4,
      8,
      2,
      -15
    );
    const allTargets = [bundleInside, ...gridElements];

    // Animación: "respiración"
    this.respirationTween = this.tweens.add({
      targets: allTargets,
      scaleX: scale * 1.01,
      scaleY: scale * 1.01,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Botón para volver (ejemplo simple con texto)
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
    });
  }
}
