import Phaser from 'phaser';
import { ParallaxBackground } from '../objects/ParallaxBackground';
import { AudioManager } from './AudioManager';
import { showCinematicTitle } from '../utils/cinematicTitle';
import { CAMERA, DEPTH, UI } from '../config/constants';
import { i18n } from '../i18n';
import type { SceneMusicConfig } from '../types/musicTypes';
import type { BackgroundLayer } from '../config/assets';

/**
 * Configuracion base para todas las escenas
 */
export interface BaseSceneConfig {
  sceneKey: string;
  title?: string;
  backgroundKey: string;
  backgroundLayers: BackgroundLayer[];
  music?: SceneMusicConfig;
  enableCinematicTitle?: boolean;
  enableBackButton?: boolean;
  returnScene?: string;
}

/**
 * Clase base para todas las escenas del juego.
 * Proporciona funcionalidad comun como:
 * - Fade in/out automatico
 * - Gestion de musica via AudioManager
 * - Background parallax
 * - Boton de regreso
 * - Titulo cinematico
 */
export abstract class BaseScene extends Phaser.Scene {
  protected config: BaseSceneConfig;
  protected audioManager!: AudioManager;
  protected parallaxBackground?: ParallaxBackground;
  protected backButton?: Phaser.GameObjects.Text;
  protected closeButton?: Phaser.GameObjects.Text;
  protected muteButton?: Phaser.GameObjects.Text;

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

  preload() {
    // Handler global para errores de carga de assets
    this.load.on('loaderror', (fileObj: Phaser.Loader.File) => {
      console.error(
        `[AssetError] Error cargando: ${fileObj.key} (${fileObj.url})`
      );

      // Mostrar mensaje al usuario cuando la escena esté lista
      this.events.once('create', () => {
        const { width, height } = this.cameras.main;
        this.add
          .text(width / 2, height - 40, i18n.t.ui.loadError, {
            fontSize: '16px',
            fontFamily: 'Arial, sans-serif',
            color: '#ff4444',
            backgroundColor: '#000000cc',
            padding: { x: 12, y: 6 },
          })
          .setOrigin(0.5)
          .setDepth(1000);
      });
    });
  }

  create() {
    this.audioManager = new AudioManager(this);

    this.setupBackground();
    this.setupMusic();
    this.setupCamera();

    if (this.config.enableCinematicTitle && this.config.title) {
      showCinematicTitle(this, this.config.title);
    }

    // Inicializar el contenido especifico de la escena
    this.initializeContent();

    // Crear botón de mute/unmute
    this.createMuteButton();

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
   * Configura la musica de la escena via AudioManager
   */
  private setupMusic() {
    if (this.config.music) {
      this.audioManager.playSceneMusic(this.config.music);
    }
  }

  /**
   * Configura el fade in de la camara
   */
  private setupCamera() {
    const { r, g, b } = CAMERA.fadeIn.rgb;
    this.cameras.main.fadeIn(CAMERA.fadeIn.duration, r, g, b);
  }

  /**
   * Configura la limpieza de recursos al salir.
   * Usa destroy() (inmediato) en lugar de stopAll() (tween-based)
   * porque los tweens son destruidos cuando la escena hace shutdown.
   */
  private setupCleanup() {
    this.events.once('shutdown', () => {
      this.audioManager.destroy();
      this.cleanupResources();
    });
  }

  /**
   * Crea el boton de cierre (X)
   */
  protected createCloseButton() {
    const { width } = this.cameras.main;

    this.closeButton = this.add
      .text(width - 30, 30, '\u2715', {
        fontSize: '32px',
        fontFamily: 'Arial',
        color: UI.button.color,
        backgroundColor: UI.button.backgroundColor,
        padding: { x: 12, y: 8 },
      })
      .setOrigin(1, 0)
      .setInteractive({ useHandCursor: true })
      .setAlpha(UI.button.normalAlpha)
      .setDepth(UI.button.depth);

    this.setupButtonInteractions(this.closeButton, () => this.exitScene());
  }

  /**
   * Crea el boton de mute/unmute
   */
  protected createMuteButton() {
    const label = this.audioManager.isMuted ? '\ud83d\udd07' : '\ud83d\udd0a';

    this.muteButton = this.add
      .text(70, 30, label, {
        fontSize: '28px',
        fontFamily: 'Arial',
        backgroundColor: UI.button.backgroundColor,
        color: UI.button.color,
        padding: { x: 10, y: 6 },
      })
      .setOrigin(0.5, 0)
      .setScrollFactor(0)
      .setDepth(DEPTH.ui)
      .setInteractive({ useHandCursor: true })
      .setAlpha(UI.button.normalAlpha);

    this.muteButton.on('pointerover', () =>
      this.muteButton?.setAlpha(UI.button.hoverAlpha)
    );
    this.muteButton.on('pointerout', () =>
      this.muteButton?.setAlpha(UI.button.normalAlpha)
    );
    this.muteButton.on('pointerdown', () => {
      const muted = this.audioManager.toggleMute();
      this.muteButton?.setText(muted ? '\ud83d\udd07' : '\ud83d\udd0a');
    });
  }

  /**
   * Crea el boton de regreso
   */
  protected createBackButton() {
    const { width, height } = this.cameras.main;

    this.backButton = this.add
      .text(width - 180, height - 60, i18n.t.ui.back, {
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
   * Configura las interacciones de un boton (hover, click)
   */
  protected setupButtonInteractions(
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
   * Sale de la escena con fade out.
   * No llama stopAll() directamente — el shutdown handler usa destroy()
   * para detener el audio de forma inmediata cuando scene.start() se ejecuta.
   */
  protected exitScene() {
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
   * Transicion a otra escena.
   * El audio se detiene automaticamente en el shutdown handler.
   */
  protected transitionToScene(targetScene: string) {
    const { r, g, b } = CAMERA.fadeOut.rgb;
    this.cameras.main.fadeOut(CAMERA.fadeOut.duration, r, g, b);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start(targetScene);
    });
  }

  /**
   * Obtiene el tamano de la camara
   */
  protected getCameraSize() {
    return {
      width: this.cameras.main.width,
      height: this.cameras.main.height,
    };
  }

  /**
   * Calcula la escala optima para una imagen
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
