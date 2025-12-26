import { BaseScene } from '../core/BaseScene';
import {
  AssetLoader,
  BACKGROUNDS,
  IMAGES,
  AUDIO_FILES,
} from '../config/assets';
import { GRID, ANIMATION } from '../config/constants';
import { createAlignedGrid } from '../utils/gridUtils';
import { skills } from '../data/skills';

/**
 * Escena del saco de habilidades (BundleScene)
 * Refactorizada usando BaseScene
 */
export class BundleScene extends BaseScene {
  private respirationTween?: Phaser.Tweens.Tween;

  constructor() {
    super({
      sceneKey: 'BundleScene',
      title: 'Saco de habilidades',
      backgroundKey: 'forestDark',
      backgroundLayers: [...BACKGROUNDS.forestDark.layers],
      music: {
        introKey: AUDIO_FILES.music.introSong.key,
        mainKey: AUDIO_FILES.music.second.key,
        introVolume: 0.2,
        mainVolume: 0.1,
      },
      enableCinematicTitle: true,
      enableBackButton: true,
      returnScene: 'MainScene',
    });
  }

  preload() {
    // Cargar background
    AssetLoader.loadBackground(this, 'forestDark');

    // Cargar imagen del saco
    AssetLoader.loadSceneImages(this, ['bundleInside']);

    // Cargar iconos de habilidades
    AssetLoader.loadSkillIcons(this);

    // Cargar audio
    this.load.audio(AUDIO_FILES.music.second.key, [
      ...AUDIO_FILES.music.second.paths,
    ]);
    this.load.audio(AUDIO_FILES.music.introSong.key, [
      ...AUDIO_FILES.music.introSong.paths,
    ]);
    this.load.audio(AUDIO_FILES.sfx.hover.key, AUDIO_FILES.sfx.hover.path);
    this.load.audio(AUDIO_FILES.sfx.click.key, AUDIO_FILES.sfx.click.path);
  }

  protected initializeContent(): void {
    this.createBundleDisplay();
  }

  private createBundleDisplay() {
    const { width, height } = this.getCameraSize();

    // Crear imagen del saco
    const bundleInside = this.add
      .image(width / 2, height - 200, IMAGES.bundleInside.key)
      .setOrigin(0.5, 1);

    // Calcular escala
    const scale = this.calculateScale(IMAGES.bundleInside.key, 0.6, 10);
    bundleInside.setScale(scale);

    // Crear grid de habilidades
    const gridElements = createAlignedGrid(
      this,
      bundleInside,
      skills,
      {
        hover: AUDIO_FILES.sfx.hover.key,
        click: AUDIO_FILES.sfx.click.key,
      },
      GRID.bundle.cols,
      GRID.bundle.rows,
      GRID.bundle.cellSize,
      GRID.bundle.padding,
      GRID.bundle.yOffset
    );

    // Agregar animación de respiración
    const allTargets = [bundleInside, ...gridElements];
    this.respirationTween = this.tweens.add({
      targets: allTargets,
      scaleX: scale * ANIMATION.breathing.scale,
      scaleY: scale * ANIMATION.breathing.scale,
      duration: ANIMATION.breathing.duration,
      yoyo: true,
      repeat: -1,
      ease: ANIMATION.breathing.ease,
    });
  }

  protected cleanupResources(): void {
    this.respirationTween?.destroy();
  }
}
