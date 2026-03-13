import { BaseScene } from '../core/BaseScene';
import {
  AssetLoader,
  BACKGROUNDS,
  SPRITESHEETS,
  AUDIO_FILES,
} from '../config/assets';
import { createInteractiveObject } from '../objects/interactive/InteractiveObject';
import { setupAnimations } from '../animations/AnimationSetup';
import { i18n } from '../i18n';
import { DEPTH, GAME_CONFIG, UI } from '../config/constants';

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
      backgroundLayers: [...BACKGROUNDS.camp.layers],
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
    super.preload();

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

    // Cargar audio (centralizado)
    AssetLoader.loadAudio(this);
  }

  protected initializeContent(): void {
    // Override title with current language
    this.config.title = i18n.t.scenes.camp;

    // Configurar animaciones
    setupAnimations(this);

    // Crear objetos interactivos
    this.createInteractiveObjects();

    // Crear toggle de idioma
    this.createLanguageToggle();

    // Mostrar onboarding si es la primera vez en la sesión
    this.showOnboarding();
  }

  private createLanguageToggle() {
    const lang = i18n.current === 'es' ? 'EN' : 'ES';
    const toggle = this.add
      .text(1850, 30, lang, {
        fontSize: '24px',
        fontFamily: 'Georgia, serif',
        backgroundColor: UI.button.backgroundColor,
        color: UI.button.color,
        padding: { x: 12, y: 6 },
      })
      .setOrigin(1, 0)
      .setScrollFactor(0)
      .setDepth(DEPTH.ui)
      .setInteractive({ useHandCursor: true });

    toggle.on('pointerover', () => toggle.setAlpha(1));
    toggle.on('pointerout', () => toggle.setAlpha(0.7));
    toggle.on('pointerdown', () => {
      i18n.toggle();
      this.scene.restart();
    });
    toggle.setAlpha(0.7);
  }

  private showOnboarding() {
    const shown = sessionStorage.getItem('onboarding-shown');
    if (shown) return;

    sessionStorage.setItem('onboarding-shown', 'true');

    this.time.delayedCall(3500, () => {
      const hint = this.add
        .text(
          GAME_CONFIG.width / 2,
          GAME_CONFIG.height - 80,
          i18n.t.ui.onboarding,
          {
            fontSize: '22px',
            backgroundColor: '#000000aa',
            color: '#ffffff',
            padding: { x: 20, y: 10 },
            fontFamily: 'Arial',
          }
        )
        .setOrigin(0.5)
        .setScrollFactor(0)
        .setDepth(DEPTH.ui)
        .setAlpha(0);

      this.tweens.add({
        targets: hint,
        alpha: 0.9,
        duration: 800,
        ease: 'Sine.easeIn',
        onComplete: () => {
          this.time.delayedCall(4000, () => {
            this.tweens.add({
              targets: hint,
              alpha: 0,
              duration: 1500,
              ease: 'Sine.easeOut',
              onComplete: () => hint.destroy(),
            });
          });
        },
      });
    });
  }

  private createInteractiveObjects() {
    // Cofre de proyectos
    createInteractiveObject({
      scene: this,
      x: 300,
      y: 950,
      spriteKey: SPRITESHEETS.chestIdle.key,
      idleAnim: 'chest_idle',
      hoverAnim: 'chest_hover',
      infoText: i18n.t.objects.chest,
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
      infoText: i18n.t.objects.backpack,
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
      infoText: i18n.t.objects.bundle,
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
      infoText: i18n.t.objects.crystalBall,
      targetScene: 'CrystalBallScene',
      scale: 2,
      zoomOnHover: false,
    });
  }
}
