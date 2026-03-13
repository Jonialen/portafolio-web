import { BaseScene } from '../core/BaseScene';
import type { BaseSceneConfig } from '../core/BaseScene';
import { AssetLoader, IMAGES, AUDIO_FILES } from '../config/assets';
import { createAlignedGrid } from '../utils/gridUtils';
import { addBreathingAnimation } from '../utils/animationUtils';

/**
 * Configuración para las escenas que muestran un grid de items
 * sobre una imagen de fondo (cofre, saco, etc.)
 */
export interface GridDisplayConfig {
  /** Key de la imagen de fondo en IMAGES (e.g. 'chestInside', 'bundleInside') */
  insideImageKey: keyof typeof IMAGES;
  /** Items a mostrar en el grid */
  items: {
    id: string;
    name: string;
    icon: string;
    description: string;
    onClick?: () => void;
  }[];
  /** Configuración del grid */
  grid: {
    cols: number;
    rows: number;
    cellSize: number;
    padding: number;
    yOffset: number;
  };
  /** Función para cargar los iconos específicos */
  loadIcons: (scene: Phaser.Scene) => void;
  /** Parámetros opcionales para calculateScale */
  scaleConfig?: {
    maxWidthPercent?: number;
    maxScale?: number;
  };
}

/**
 * Clase base abstracta para escenas que muestran un grid de items
 * sobre una imagen contenedora (cofre de proyectos, saco de habilidades, etc.)
 */
export abstract class GridDisplayScene extends BaseScene {
  private respirationTween?: Phaser.Tweens.Tween;
  protected abstract readonly gridConfig: GridDisplayConfig;

  constructor(baseConfig: BaseSceneConfig) {
    super(baseConfig);
  }

  preload() {
    super.preload();

    // Cargar background
    AssetLoader.loadBackground(this, this.config.backgroundKey);

    // Cargar imagen contenedora
    AssetLoader.loadSceneImages(this, [this.gridConfig.insideImageKey]);

    // Cargar iconos específicos
    this.gridConfig.loadIcons(this);

    // Cargar audio (centralizado)
    AssetLoader.loadAudio(this);
  }

  protected initializeContent(): void {
    this.createGridDisplay();
  }

  private createGridDisplay() {
    const { width, height } = this.getCameraSize();
    const imageConfig = IMAGES[this.gridConfig.insideImageKey];

    // Crear imagen contenedora
    const containerImage = this.add
      .image(width / 2, height - 200, imageConfig.key)
      .setOrigin(0.5, 1);

    // Calcular escala
    const scaleConfig = this.gridConfig.scaleConfig;
    const scale = this.calculateScale(
      imageConfig.key,
      scaleConfig?.maxWidthPercent,
      scaleConfig?.maxScale
    );
    containerImage.setScale(scale);

    // Crear grid de items
    const { grid } = this.gridConfig;
    createAlignedGrid(
      this,
      containerImage,
      this.gridConfig.items,
      {
        hover: AUDIO_FILES.sfx.hover.key,
        click: AUDIO_FILES.sfx.click.key,
      },
      grid.cols,
      grid.rows,
      grid.cellSize,
      grid.padding,
      grid.yOffset
    );

    // Agregar animación de respiración (solo al fondo, no a los iconos del grid
    // que tienen su propia escala independiente via setDisplaySize)
    this.respirationTween = addBreathingAnimation(this, containerImage);
  }

  protected cleanupResources(): void {
    this.respirationTween?.destroy();
  }
}
