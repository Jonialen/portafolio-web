import { BaseScene } from '../core/BaseScene';
import {
  AssetLoader,
  BACKGROUNDS,
  IMAGES,
  AUDIO_FILES,
} from '../config/assets';
import { GRID, ANIMATION } from '../config/constants';
import { createAlignedGrid } from '../utils/gridUtils';
import { projects } from '../data/projects';

/**
 * Escena del cofre de proyectos
 * Refactorizada usando BaseScene para eliminar código duplicado
 */
export class ChestScene extends BaseScene {
  private respirationTween?: Phaser.Tweens.Tween;

  constructor() {
    super({
      sceneKey: 'ChestScene',
      title: 'Cofre de Proyectos',
      backgroundKey: 'forestDark',
      backgroundLayers: [...BACKGROUNDS.forestDark.layers], // Spread para crear copia mutable
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

    // Cargar imagen del cofre
    AssetLoader.loadSceneImages(this, ['chestInside']);

    // Cargar iconos de proyectos
    AssetLoader.loadProjectIcons(this);

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
    this.createChestDisplay();
  }

  private createChestDisplay() {
    const { width, height } = this.getCameraSize();

    // Crear imagen del cofre
    const chestInside = this.add
      .image(width / 2, height - 200, IMAGES.chestInside.key)
      .setOrigin(0.5, 1);

    // Calcular escala
    const scale = this.calculateScale(IMAGES.chestInside.key);
    chestInside.setScale(scale);

    // Crear grid de proyectos
    const gridElements = createAlignedGrid(
      this,
      chestInside,
      projects,
      {
        hover: AUDIO_FILES.sfx.hover.key,
        click: AUDIO_FILES.sfx.click.key,
      },
      GRID.chest.cols,
      GRID.chest.rows,
      GRID.chest.cellSize,
      GRID.chest.padding,
      GRID.chest.yOffset
    );

    // Agregar animación de respiración
    const allTargets = [chestInside, ...gridElements];
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
