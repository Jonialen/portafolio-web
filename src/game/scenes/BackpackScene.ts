import { BaseScene } from '../core/BaseScene';
import { AssetLoader, BACKGROUNDS, AUDIO_FILES } from '../config/assets';
import { FontLoader } from '../utils/FontLoader';
import { DiaryBook } from '../objects/DiaryBook';
import { diaryPages } from '../data/diaryPages';

/**
 * Escena del diario personal (BackpackScene)
 * Usa los botones de BaseScene en vez de crear los propios
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
      enableBackButton: true,
      returnScene: 'MainScene',
    });
  }

  preload() {
    AssetLoader.loadBackground(this, 'forestDark');
    AssetLoader.loadSceneImages(this, ['bookPage']);

    // Cargar audio (centralizado)
    AssetLoader.loadAudio(this);
  }

  async create() {
    super.create();

    try {
      await FontLoader.loadGoogleFont('Shadows Into Light', this);
    } catch {
      // Font loading failed, fallback fonts will be used
    }
  }

  protected initializeContent(): void {
    this.diaryBook = new DiaryBook(this, diaryPages);
  }

  protected cleanupResources(): void {
    this.diaryBook?.destroy();
  }
}
