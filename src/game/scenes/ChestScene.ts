import Phaser from 'phaser';
import { ParallaxBackground } from '../objects/ParallaxBackground';
import { createAlignedGrid } from '../utils/gridUtils';
import { showCinematicTitle } from '../utils/cinematicTitle';
import { projects } from '../data/projects';

export class ChestScene extends Phaser.Scene {
  respirationTween!: Phaser.Tweens.Tween;
  constructor() {
    super({ key: 'ChestScene' });
  }

  preload() {
    this.load.image('fondo_back', '/assets/scenes/forest_light/back2.png');
    this.load.image('fondo_front', '/assets/scenes/forest_light/front2.png');
    this.load.image('fondo_middle', '/assets/scenes/forest_light/middle2.png');

    this.load.image('book_portfolio', '/assets/tools/book.png');

    this.load.image('chest_indor', '/assets/chest/generic_54.png');
  }

  create() {
    const { width, height } = this.cameras.main;

    new ParallaxBackground(this, ['fondo_back', 'fondo_middle', 'fondo_front']);

    // Agregar imagen del interior del cofre
    const chestInside = this.add
      .image(width / 2, height - 200, 'chest_indor')
      .setOrigin(0.5, 1);

    const tex = this.textures.get('chest_indor').getSourceImage();
    const scale = Math.min((width * 0.6) / tex.width, 4.5);
    chestInside.setScale(scale);

    // Fade in suave
    showCinematicTitle(this, 'Cofre de Proyectos');
    this.cameras.main.fadeIn(800, 0, 0, 0);

    const gridElements = createAlignedGrid(this, chestInside, projects, 9, 6);
    const allTargets = [chestInside, ...gridElements];

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
