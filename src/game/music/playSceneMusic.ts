import Phaser from 'phaser';

type SceneMusicOptions = {
  introKey?: string;
  mainKey: string;
  introVolume?: number;
  mainVolume?: number;
  volume?: number;
  delay?: number;
  fadeDuration?: number;
};

interface MusicControl {
  stopAll: () => void;
}

export function playSceneMusic(
  scene: Phaser.Scene,
  options: SceneMusicOptions
): MusicControl {
  const {
    introKey,
    mainKey,
    introVolume,
    mainVolume,
    volume = 0.6,
    delay = 50,
    fadeDuration = 1000,
  } = options;

  const finalIntroVolume = introVolume ?? volume;
  const finalMainVolume = mainVolume ?? volume;

  scene.sound.stopAll();

  let mainMusic: Phaser.Sound.BaseSound | null = null;

  const stopAll = () => {
    if (mainMusic && mainMusic.isPlaying) {
      scene.tweens.add({
        targets: mainMusic,
        volume: 0,
        duration: fadeDuration,
        onComplete: () => {
          mainMusic?.stop();
        },
      });
    }
    scene.sound.stopByKey(introKey || '');
  };

  const playMainMusic = () => {
    mainMusic = scene.sound.add(mainKey, { loop: true, volume: 0 });
    mainMusic.play();
    scene.tweens.add({
      targets: mainMusic,
      volume: finalMainVolume,
      duration: fadeDuration,
    });
  };

  if (introKey) {
    const intro = scene.sound.add(introKey, { volume: finalIntroVolume });
    intro.play();
    intro.once('complete', () => {
      scene.time.delayedCall(delay, () => {
        playMainMusic();
      });
    });
  } else {
    playMainMusic();
  }

  return { stopAll };
}
