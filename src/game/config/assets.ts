/**
 * Configuración centralizada de todos los assets del juego
 * Facilita el cambio de rutas y la gestión de assets
 */

const ASSET_BASE_PATH = '/assets';

export const BACKGROUNDS = {
  forestDark: {
    back: `${ASSET_BASE_PATH}/scenes/forest_dark/backDark.png`,
    middle: `${ASSET_BASE_PATH}/scenes/forest_dark/middleDark.png`,
    front: `${ASSET_BASE_PATH}/scenes/forest_dark/frontDark.png`,
    layers: ['fondo_back2', 'fondo_middle2', 'fondo_front2'],
  },
  forestLight: {
    back: `${ASSET_BASE_PATH}/scenes/forest_light/back2.png`,
    middle: `${ASSET_BASE_PATH}/scenes/forest_light/middle2.png`,
    front: `${ASSET_BASE_PATH}/scenes/forest_light/front2.png`,
    layers: ['fondo_back', 'fondo_middle', 'fondo_front'],
  },
  camp: {
    layers: Array.from({ length: 9 }, (_, i) => ({
      key: `${i + 1}`,
      path: `${ASSET_BASE_PATH}/scenes/camp/${i + 1}.png`,
    })),
  },
};

export const SPRITESHEETS = {
  chest: {
    key: 'cofre',
    path: `${ASSET_BASE_PATH}/chest/Chests.png`,
    frameConfig: { frameWidth: 48, frameHeight: 32 },
  },
  chestIdle: {
    key: 'cofre1',
    path: `${ASSET_BASE_PATH}/chest/Chests1.png`,
    frameConfig: { frameWidth: 32, frameHeight: 32 },
  },
  backpack: {
    key: 'backpack',
    path: `${ASSET_BASE_PATH}/backpack/backpack_big.png`,
    frameConfig: { frameWidth: 16, frameHeight: 16 },
  },
  bundleOpen: {
    key: 'bundleOpen',
    path: `${ASSET_BASE_PATH}/bundle/bundleOpen.png`,
    frameConfig: { frameWidth: 160, frameHeight: 160 },
  },
  bundleClose: {
    key: 'bundleClose',
    path: `${ASSET_BASE_PATH}/bundle/bundleClose.png`,
    frameConfig: { frameWidth: 120, frameHeight: 140 },
  },
  crystalBall: {
    key: 'cristalBall',
    path: `${ASSET_BASE_PATH}/crystallball/Bola_de_cristal.png`,
    frameConfig: { frameWidth: 32, frameHeight: 32 },
  },
};

export const IMAGES = {
  // Scene images
  chestInside: {
    key: 'chest_indor',
    path: `${ASSET_BASE_PATH}/chest/generic_54.png`,
  },
  bundleInside: {
    key: 'bundle_Inside',
    path: `${ASSET_BASE_PATH}/bundle/leather_expand.png`,
  },
  crystalInside: {
    key: 'cristal_inside',
    path: `${ASSET_BASE_PATH}/crystallball/Bola_de_cristal_inside.png`,
  },
  bookPage: {
    key: 'book_page',
    path: `${ASSET_BASE_PATH}/book/page.png`,
  },

  // Project icons
  bookPortfolio: {
    key: 'book_portfolio',
    path: `${ASSET_BASE_PATH}/tools/book.png`,
  },
  fruta: { key: 'fruta', path: `${ASSET_BASE_PATH}/tools/fruta.png` },
  glowStone: {
    key: 'glowStone',
    path: `${ASSET_BASE_PATH}/tools/glowStone.png`,
  },
  perl: { key: 'perl', path: `${ASSET_BASE_PATH}/tools/perl.png` },
  sword: { key: 'sword', path: `${ASSET_BASE_PATH}/tools/sword.png` },

  // Skill icons
  react: { key: 'react', path: `${ASSET_BASE_PATH}/skills/react.png` },
  java: { key: 'java', path: `${ASSET_BASE_PATH}/icons/java.png` },
  python: { key: 'python', path: `${ASSET_BASE_PATH}/icons/python.png` },
  database: { key: 'database', path: `${ASSET_BASE_PATH}/icons/sql.png` },
  android: { key: 'android', path: `${ASSET_BASE_PATH}/icons/android.png` },
  terminal: { key: 'terminal', path: `${ASSET_BASE_PATH}/icons/terminal.png` },
  docker: { key: 'docker', path: `${ASSET_BASE_PATH}/icons/docker.png` },
  gitBranch: { key: 'git-branch', path: `${ASSET_BASE_PATH}/icons/git.png` },

  // Contact icons
  email: { key: 'email_icon', path: `${ASSET_BASE_PATH}/icons/mail.png` },
  linkedin: {
    key: 'linkedin_icon',
    path: `${ASSET_BASE_PATH}/icons/linkedin.png`,
  },
  cv: { key: 'cv_icon', path: `${ASSET_BASE_PATH}/icons/cv.png` },
};

export const AUDIO_FILES = {
  music: {
    mainTheme: {
      key: 'main_theme',
      paths: [`${ASSET_BASE_PATH}/../songs/darkFantasy.mp3`],
    },
    second: {
      key: 'second',
      paths: [`${ASSET_BASE_PATH}/../songs/second.mp3`],
    },
    introSong: {
      key: 'intro_song',
      paths: [`${ASSET_BASE_PATH}/../songs/dungeonTitle2.mp3`],
    },
  },
  sfx: {
    hover: {
      key: 'hover_sound',
      path: `${ASSET_BASE_PATH}/../songs/hoverSound.mp3`,
    },
    click: {
      key: 'click_sound',
      path: `${ASSET_BASE_PATH}/../songs/clicSound.mp3`,
    },
  },
};

/**
 * Helper para cargar un grupo de assets
 */
export class AssetLoader {
  static loadBackground(
    scene: Phaser.Scene,
    backgroundKey: keyof typeof BACKGROUNDS
  ) {
    const bg = BACKGROUNDS[backgroundKey];

    // Verificar si es el tipo 'camp' con layers como array de objetos
    if (backgroundKey === 'camp' && 'layers' in bg) {
      const campLayers = bg.layers as Array<{ key: string; path: string }>;
      campLayers.forEach((layer) => {
        scene.load.image(layer.key, layer.path);
      });
    }
    // Para backgrounds normales (forestDark, forestLight)
    else if (
      'back' in bg &&
      'middle' in bg &&
      'front' in bg &&
      'layers' in bg
    ) {
      const normalBg = bg as {
        back: string;
        middle: string;
        front: string;
        layers: string[];
      };
      scene.load.image(normalBg.layers[0], normalBg.back);
      scene.load.image(normalBg.layers[1], normalBg.middle);
      scene.load.image(normalBg.layers[2], normalBg.front);
    }
  }

  static loadSceneImages(
    scene: Phaser.Scene,
    imageKeys: (keyof typeof IMAGES)[]
  ) {
    imageKeys.forEach((key) => {
      const img = IMAGES[key];
      scene.load.image(img.key, img.path);
    });
  }

  static loadProjectIcons(scene: Phaser.Scene) {
    const iconKeys: (keyof typeof IMAGES)[] = [
      'bookPortfolio',
      'fruta',
      'glowStone',
      'perl',
      'sword',
    ];
    this.loadSceneImages(scene, iconKeys);
  }

  static loadSkillIcons(scene: Phaser.Scene) {
    const iconKeys: (keyof typeof IMAGES)[] = [
      'react',
      'java',
      'python',
      'database',
      'android',
      'terminal',
      'docker',
      'gitBranch',
    ];
    this.loadSceneImages(scene, iconKeys);
  }

  static loadContactIcons(scene: Phaser.Scene) {
    const iconKeys: (keyof typeof IMAGES)[] = ['email', 'linkedin', 'cv'];
    this.loadSceneImages(scene, iconKeys);
  }

  static loadSpritesheets(
    scene: Phaser.Scene,
    sheetKeys: (keyof typeof SPRITESHEETS)[]
  ) {
    sheetKeys.forEach((key) => {
      const sheet = SPRITESHEETS[key];
      scene.load.spritesheet(sheet.key, sheet.path, sheet.frameConfig);
    });
  }

  static loadAudio(scene: Phaser.Scene) {
    // Music
    Object.values(AUDIO_FILES.music).forEach((audio) => {
      scene.load.audio(audio.key, audio.paths);
    });

    // SFX
    Object.values(AUDIO_FILES.sfx).forEach((audio) => {
      scene.load.audio(audio.key, audio.path);
    });
  }
}

export type BackgroundKey = keyof typeof BACKGROUNDS;
export type ImageKey = keyof typeof IMAGES;
export type SpritesheetKey = keyof typeof SPRITESHEETS;
export type AudioKey =
  | keyof typeof AUDIO_FILES.music
  | keyof typeof AUDIO_FILES.sfx;
