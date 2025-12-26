import { BaseScene } from '../core/BaseScene';
import { AssetLoader, BACKGROUNDS, AUDIO_FILES } from '../config/assets';
import { FontLoader } from '../utils/FontLoader';
import { DiaryBook } from '../objects/DiaryBook';
import { diaryPages } from '../data/diaryPages';

/**
 * Escena del diario personal (BackpackScene)
 * Refactorizada usando BaseScene
 */
export class BackpackScene extends BaseScene {
  private diaryBook?: DiaryBook;

  constructor() {
    super({
      sceneKey: 'BackpackScene',
      title: 'Diario Personal',
      backgroundKey: 'forestDark',
      backgroundLayers: [...BACKGROUNDS.forestDark.layers],
      music: {
        introKey: AUDIO_FILES.music.introSong.key,
        mainKey: AUDIO_FILES.music.second.key,
        introVolume: 0.2,
        mainVolume: 0.1,
      },
      enableCinematicTitle: true,
      enableBackButton: false, // Usamos botones custom
      returnScene: 'MainScene',
    });
  }

  preload() {
    // Cargar background
    AssetLoader.loadBackground(this, 'forestDark');

    // Cargar imagen del libro
    AssetLoader.loadSceneImages(this, ['bookPage']);

    // Cargar audio
    this.load.audio(AUDIO_FILES.music.second.key, [
      ...AUDIO_FILES.music.second.paths,
    ]);
    this.load.audio(AUDIO_FILES.music.introSong.key, [
      ...AUDIO_FILES.music.introSong.paths,
    ]);
  }

  async create() {
    // Llamar al create de BaseScene para configuración base
    super.create();

    // Cargar fuente y luego inicializar
    try {
      await FontLoader.loadGoogleFont('Shadows Into Light', this);
    } catch (error) {
      console.warn('Font loading failed, using fallback:', error);
    }
  }

  protected initializeContent(): void {
    this.diaryBook = new DiaryBook(this, diaryPages);
    this.createCustomButtons();
  }

  /**
   * Crea botones personalizados para el diario
   */
  private createCustomButtons() {
    const { width, height } = this.getCameraSize();

    // Botón de cierre (X)
    const closeButton = this.add
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

    this.setupButtonInteraction(closeButton);

    // Botón de cerrar diario
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

    this.setupButtonInteraction(exitButton);
  }

  /**
   * Configura interacciones para botones del diario
   */
  private setupButtonInteraction(button: Phaser.GameObjects.Text) {
    button.on('pointerover', () => {
      this.tweens.add({
        targets: button,
        alpha: 1,
        y: button.y - 5,
        duration: 200,
      });
    });

    button.on('pointerout', () => {
      this.tweens.add({
        targets: button,
        alpha: button.alpha === 1 ? 0.8 : 0.7,
        y: button.y + 5,
        duration: 200,
      });
    });

    button.on('pointerdown', () => {
      this.exitScene();
    });
  }

  protected cleanupResources(): void {
    this.diaryBook?.destroy();
  }

  // Métodos públicos para acceder al diario
  public getCurrentPage(): number {
    return this.diaryBook?.getCurrentPage() || 0;
  }

  public getTotalPages(): number {
    return this.diaryBook?.getTotalPages() || 0;
  }
}
