import { BaseScene } from '../core/BaseScene';
import {
  AssetLoader,
  BACKGROUNDS,
  SPRITESHEETS,
  AUDIO_FILES,
} from '../config/assets';
import { createInteractiveObject } from '../objects/interactive/InteractiveObject';
import { setupAnimations } from '../animations/AnimationSetup';

/**
 * Escena principal del juego (MainScene)
 * Refactorizada usando BaseScene
 */
export class MainScene extends BaseScene {
  constructor() {
    super({
      sceneKey: 'MainScene',
      title: 'Campamento',
      backgroundKey: 'camp',
      backgroundLayers: BACKGROUNDS.camp.layers.map((layer) => layer.key),
      music: {
        mainKey: AUDIO_FILES.music.mainTheme.key,
        mainVolume: 0.1,
      },
      enableCinematicTitle: true,
      enableBackButton: false, // Escena principal no necesita botón de volver
      returnScene: '',
    });
  }

  preload() {
    // Cargar background del campamento
    AssetLoader.loadBackground(this, 'camp');

    // Cargar spritesheets
    AssetLoader.loadSpritesheets(this, [
      'chest',
      'chestIdle',
      'backpack',
      'bundleOpen',
      'bundleClose',
      'crystalBall',
    ]);

    // Cargar audio
    this.load.audio(AUDIO_FILES.music.mainTheme.key, [
      ...AUDIO_FILES.music.mainTheme.paths,
    ]);
  }

  protected initializeContent(): void {
    // Configurar animaciones
    setupAnimations(this);

    // Crear objetos interactivos
    this.createInteractiveObjects();
  }

  private createInteractiveObjects() {
    // Cofre de proyectos
    createInteractiveObject({
      scene: this,
      x: 300,
      y: 950,
      spriteKey: SPRITESHEETS.chestIdle.key,
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

    // Mochila personal (diario)
    createInteractiveObject({
      scene: this,
      x: 630,
      y: 890,
      spriteKey: SPRITESHEETS.backpack.key,
      idleAnim: '',
      hoverAnim: '',
      infoText: 'Mi Mochila personal',
      targetScene: 'BackpackScene',
      scale: 4,
      zoomOnHover: false,
    });

    // Saco de habilidades
    createInteractiveObject({
      scene: this,
      x: 1200,
      y: 950,
      spriteKey: SPRITESHEETS.bundleClose.key,
      altSpriteKey: SPRITESHEETS.bundleOpen.key,
      idleAnim: '',
      hoverAnim: '',
      infoText: 'Skills',
      targetScene: 'BundleScene',
      scale: 2 / 5,
      zoomOnHover: false,
    });

    // Bola de cristal (contacto)
    createInteractiveObject({
      scene: this,
      x: 1550,
      y: 940,
      spriteKey: SPRITESHEETS.crystalBall.key,
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
