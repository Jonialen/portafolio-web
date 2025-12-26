import Phaser from 'phaser';
import { ParallaxBackground } from '../objects/ParallaxBackground';
import { playSceneMusic } from '../music/playSceneMusic';
import { showCinematicTitle } from '../utils/cinematicTitle';
import { CAMERA, UI } from '../config/constants';
import type { MusicControl } from '../types/musicTypes';

/**
 * Configuración base para todas las escenas
 */
export interface BaseSceneConfig {
  sceneKey: string;
  title?: string;
  backgroundKey: string;
  backgroundLayers: string[];
  music?: {
    introKey?: string;
    mainKey: string;
    introVolume?: number;
    mainVolume?: number;
  };
  enableCinematicTitle?: boolean;
  enableBackButton?: boolean;
  returnScene?: string;
}

/**
 * Clase base para todas las escenas del juego.
 * Proporciona funcionalidad común como:
 * - Fade in/out automático
 * - Gestión de música
 * - Background parallax
 * - Botón de regreso
 * - Título cinemático
 */
export abstract class BaseScene extends Phaser.Scene {
  protected config: BaseSceneConfig;
  protected musicControl?: MusicControl;
  protected parallaxBackground?: ParallaxBackground;
  protected backButton?: Phaser.GameObjects.Text;
  protected closeButton?: Phaser.GameObjects.Text;

  constructor(config: BaseSceneConfig) {
    super({ key: config.sceneKey });
    this.config = config;
  }

  /**
   * Hook que deben implementar las escenas hijas para inicializar su contenido
   */
  protected abstract initializeContent(): void;

  /**
   * Hook opcional para limpiar recursos al salir de la escena
   */
  protected cleanupResources(): void {
    // Las escenas hijas pueden sobrescribir esto
  }

  create() {
    this.setupBackground();
    this.setupMusic();
    this.setupCamera();

    if (this.config.enableCinematicTitle && this.config.title) {
      showCinematicTitle(this, this.config.title);
    }

    // Inicializar el contenido específico de la escena
    this.initializeContent();

    if (this.config.enableBackButton && this.config.returnScene) {
      this.createBackButton();
      this.createCloseButton();
    }

    this.setupCleanup();
  }

  /**
   * Configura el background parallax
   */
  private setupBackground() {
    this.parallaxBackground = new ParallaxBackground(
      this,
      this.config.backgroundLayers
    );
  }

  /**
   * Configura la música de la escena
   */
  private setupMusic() {
    if (this.config.music) {
      this.musicControl = playSceneMusic(this, {
        introKey: this.config.music.introKey,
        mainKey: this.config.music.mainKey,
        introVolume: this.config.music.introVolume,
        mainVolume: this.config.music.mainVolume,
        fadeDuration: 0,
      });
    }
  }

  /**
   * Configura el fade in de la cámara
   */
  private setupCamera() {
    const { r, g, b } = CAMERA.fadeIn.rgb;
    this.cameras.main.fadeIn(CAMERA.fadeIn.duration, r, g, b);
  }

  /**
   * Configura la limpieza de recursos al salir
   */
  private setupCleanup() {
    this.events.once('shutdown', () => {
      this.musicControl?.stopAll();
      this.cleanupResources();
    });
  }

  /**
   * Crea el botón de cierre (X)
   */
  protected createCloseButton() {
    const { width } = this.cameras.main;

    this.closeButton = this.add
      .text(width - 30, 30, '✕', {
        fontSize: '32px',
        fontFamily: 'Arial',
        color: UI.button.color,
        backgroundColor: UI.button.backgroundColor,
        padding: { x: 12, y: 8 },
      })
      .setOrigin(1, 0)
      .setInteractive({ useHandCursor: true })
      .setAlpha(UI.button.normalAlpha)
      .setDepth(UI.button.depth || 100);

    this.setupButtonInteractions(this.closeButton, () => this.exitScene());
  }

  /**
   * Crea el botón de regreso
   */
  protected createBackButton() {
    const { width, height } = this.cameras.main;

    this.backButton = this.add
      .text(width - 180, height - 60, '← Volver', {
        fontSize: UI.button.fontSize,
        fontFamily: 'Georgia, serif',
        backgroundColor: UI.button.backgroundColor,
        color: UI.button.color,
        padding: UI.button.padding,
      })
      .setInteractive({ useHandCursor: true })
      .setAlpha(UI.button.normalAlpha);

    this.setupButtonInteractions(this.backButton, () => this.exitScene());
  }

  /**
   * Configura las interacciones de un botón (hover, click)
   */
  private setupButtonInteractions(
    button: Phaser.GameObjects.Text,
    onClick: () => void
  ) {
    button.on('pointerover', () => {
      this.tweens.add({
        targets: button,
        alpha: UI.button.hoverAlpha,
        scale: 1.1,
        duration: 200,
        ease: 'Power2.easeOut',
      });
    });

    button.on('pointerout', () => {
      this.tweens.add({
        targets: button,
        alpha: UI.button.normalAlpha,
        scale: 1,
        duration: 200,
        ease: 'Power2.easeOut',
      });
    });

    button.on('pointerdown', onClick);
  }

  /**
   * Sale de la escena con fade out
   */
  protected exitScene() {
    this.musicControl?.stopAll();
    this.cleanupResources();

    const { r, g, b } = CAMERA.fadeOut.rgb;
    this.cameras.main.fadeOut(CAMERA.fadeOut.duration, r, g, b);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      if (this.config.returnScene) {
        this.scene.start(this.config.returnScene);
      }
    });
  }

  /**
   * Transición a otra escena
   */
  protected transitionToScene(targetScene: string) {
    this.musicControl?.stopAll();

    const { r, g, b } = CAMERA.fadeOut.rgb;
    this.cameras.main.fadeOut(CAMERA.fadeOut.duration, r, g, b);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start(targetScene);
    });
  }

  /**
   * Obtiene el tamaño de la cámara
   */
  protected getCameraSize() {
    return {
      width: this.cameras.main.width,
      height: this.cameras.main.height,
    };
  }

  /**
   * Calcula la escala óptima para una imagen
   */
  protected calculateScale(
    textureKey: string,
    maxWidthPercent = 0.6,
    maxScale = 4.5
  ): number {
    const { width } = this.getCameraSize();
    const tex = this.textures.get(textureKey).getSourceImage();
    return Math.min((width * maxWidthPercent) / tex.width, maxScale);
  }
}
