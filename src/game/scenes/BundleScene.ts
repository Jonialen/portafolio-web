import { BACKGROUNDS, AUDIO_FILES, AssetLoader } from '../config/assets';
import { GRID } from '../config/constants';
import { GridDisplayScene } from './GridDisplayScene';
import type { GridDisplayConfig } from './GridDisplayScene';
import { getSkills } from '../data/skills';
import { i18n } from '../i18n';

/**
 * Escena del saco de habilidades (BundleScene)
 * Extiende GridDisplayScene para reutilizar la lógica de grid
 */
export class BundleScene extends GridDisplayScene {
  protected gridConfig: GridDisplayConfig = {
    insideImageKey: 'bundleInside',
    items: getSkills(),
    grid: GRID.bundle,
    loadIcons: (scene) => AssetLoader.loadSkillIcons(scene),
    scaleConfig: {
      maxWidthPercent: 0.6,
      maxScale: 10,
    },
  };

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

  protected initializeContent(): void {
    // Update title and items with current language
    this.config.title = i18n.t.scenes.bundle;
    this.gridConfig.items = getSkills();
    super.initializeContent();
  }
}
