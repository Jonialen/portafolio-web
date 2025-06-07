// scenes/BackpackScene.ts
import Phaser from 'phaser';
import { ParallaxBackground } from '../objects/ParallaxBackground';
import { showCinematicTitle } from '../utils/cinematicTitle';
import { FontLoader } from '../utils/FontLoader';
import { DiaryBook } from '../objects/DiaryBook';
import { diaryPages } from '../data/diaryPages';

export class BackpackScene extends Phaser.Scene {
  private diaryBook!: DiaryBook;

  constructor() {
    super({ key: 'BackpackScene' });
  }

  preload() {
    this.load.image('fondo_back', '/assets/scenes/forest_light/back2.png');
    this.load.image('fondo_front', '/assets/scenes/forest_light/front2.png');
    this.load.image('fondo_middle', '/assets/scenes/forest_light/middle2.png');
    this.load.image('book_page', '/assets/book/page.png');
  }

  async create() {
    try {
      // Cargar la fuente primero
      await FontLoader.loadGoogleFont('Shadows Into Light', this);
      this.initScene();
    } catch (error) {
      console.warn('Font loading failed, using fallback:', error);
      this.initScene();
    }
  }

  private initScene() {
    // parallax
    new ParallaxBackground(this, ['fondo_back', 'fondo_middle', 'fondo_front']);

    this.cameras.main.fadeIn(800, 0, 0, 0);
    showCinematicTitle(this, 'Diario Personal');

    this.diaryBook = new DiaryBook(this, diaryPages);

    this.createExitButton();
  }

  private createExitButton() {
    const { width, height } = this.cameras.main;

    const backText = this.add
      .text(width - 30, 30, '✕', {
        fontSize: '32px',
        fontFamily: 'Arial',
        color: '#ffffff',
        backgroundColor: '#00000088',
        padding: { x: 12, y: 8 },
      })
      .setOrigin(1, 0)
      .setInteractive({ useHandCursor: true })
      .setAlpha(0.7)
      .setDepth(100);

    // Efectos hover
    backText.on('pointerover', () => {
      this.tweens.add({
        targets: backText,
        alpha: 1,
        scale: 1.1,
        duration: 200,
        ease: 'Power2.easeOut',
      });
    });

    backText.on('pointerout', () => {
      this.tweens.add({
        targets: backText,
        alpha: 0.7,
        scale: 1,
        duration: 200,
        ease: 'Power2.easeOut',
      });
    });

    backText.on('pointerdown', () => {
      this.exitScene();
    });

    // También crear un botón de texto más tradicional
    const exitButton = this.add
      .text(width - 180, height - 60, 'Cerrar Diario', {
        fontSize: '24px',
        fontFamily: 'Georgia, serif',
        backgroundColor: '#8B4513aa',
        color: '#ffffff',
        padding: { x: 15, y: 8 },
      })
      .setInteractive({ useHandCursor: true })
      .setAlpha(0.8);

    exitButton.on('pointerover', () => {
      this.tweens.add({
        targets: exitButton,
        alpha: 1,
        y: height - 65,
        duration: 200,
      });
    });

    exitButton.on('pointerout', () => {
      this.tweens.add({
        targets: exitButton,
        alpha: 0.8,
        y: height - 60,
        duration: 200,
      });
    });

    exitButton.on('pointerdown', () => {
      this.exitScene();
    });
  }

  private exitScene() {
    if (this.diaryBook) {
      this.diaryBook.destroy();
    }

    this.cameras.main.fadeOut(800, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('MainScene');
    });
  }

  public getCurrentPage(): number {
    return this.diaryBook?.getCurrentPage() || 0;
  }

  public getTotalPages(): number {
    return this.diaryBook?.getTotalPages() || 0;
  }
}
