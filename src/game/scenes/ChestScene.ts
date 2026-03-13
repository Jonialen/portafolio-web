import { BACKGROUNDS, AUDIO_FILES, AssetLoader } from '../config/assets';
import { GRID } from '../config/constants';
import { GridDisplayScene } from './GridDisplayScene';
import type { GridDisplayConfig } from './GridDisplayScene';
import { projects } from '../data/projects';

/**
 * Escena del cofre de proyectos
 * Extiende GridDisplayScene para reutilizar la lógica de grid
 */
export class ChestScene extends GridDisplayScene {
  protected readonly gridConfig: GridDisplayConfig = {
    insideImageKey: 'chestInside',
    items: projects,
    grid: GRID.chest,
    loadIcons: (scene) => AssetLoader.loadProjectIcons(scene),
  };

  constructor() {
    super({
      sceneKey: 'ChestScene',
      title: 'Cofre de Proyectos',
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
}
