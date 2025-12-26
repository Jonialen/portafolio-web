import Phaser from 'phaser';
import { AUDIO } from '../config/constants';

export type AudioKey = string;

export interface AudioConfig {
  key: AudioKey;
  volume?: number;
  loop?: boolean;
  fadeDuration?: number;
}

export interface MusicConfig {
  introKey?: AudioKey;
  mainKey: AudioKey;
  introVolume?: number;
  mainVolume?: number;
  delay?: number;
  fadeDuration?: number;
}

/**
 * Gestor centralizado de audio para el juego
 * Maneja música de fondo, efectos de sonido y transiciones
 */
export class AudioManager {
  private scene: Phaser.Scene;
  private currentMusic: Phaser.Sound.BaseSound | null = null;
  private activeSounds: Map<string, Phaser.Sound.BaseSound> = new Map();

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  /**
   * Reproduce música de escena con intro opcional
   */
  playSceneMusic(config: MusicConfig): void {
    const {
      introKey,
      mainKey,
      introVolume = AUDIO.volume.music,
      mainVolume = AUDIO.volume.music,
      delay = 50,
      fadeDuration = AUDIO.fadeDuration,
    } = config;

    this.stopAll();

    if (introKey) {
      this.playIntroThenMain(
        introKey,
        mainKey,
        introVolume,
        mainVolume,
        delay,
        fadeDuration
      );
    } else {
      this.playMainMusic(mainKey, mainVolume, fadeDuration);
    }
  }

  /**
   * Reproduce música principal con fade in
   */
  private playMainMusic(
    key: AudioKey,
    volume: number,
    fadeDuration: number
  ): void {
    this.currentMusic = this.scene.sound.add(key, { loop: true, volume: 0 });
    this.currentMusic.play();

    this.scene.tweens.add({
      targets: this.currentMusic,
      volume: volume,
      duration: fadeDuration,
    });
  }

  /**
   * Reproduce intro y luego música principal
   */
  private playIntroThenMain(
    introKey: AudioKey,
    mainKey: AudioKey,
    introVolume: number,
    mainVolume: number,
    delay: number,
    fadeDuration: number
  ): void {
    const intro = this.scene.sound.add(introKey, { volume: introVolume });
    intro.play();

    intro.once('complete', () => {
      this.scene.time.delayedCall(delay, () => {
        this.playMainMusic(mainKey, mainVolume, fadeDuration);
      });
    });
  }

  /**
   * Reproduce un efecto de sonido
   */
  playSFX(key: AudioKey, volume?: number): void {
    const sfxVolume = volume ?? AUDIO.volume.sfx.hover;
    const sound = this.scene.sound.add(key, { volume: sfxVolume });
    sound.play();

    // Limpiar después de reproducir
    sound.once('complete', () => {
      sound.destroy();
    });
  }

  /**
   * Detiene toda la música con fade out
   */
  stopAll(fadeDuration: number = AUDIO.fadeDuration): void {
    if (this.currentMusic && this.currentMusic.isPlaying) {
      this.scene.tweens.add({
        targets: this.currentMusic,
        volume: 0,
        duration: fadeDuration,
        onComplete: () => {
          this.currentMusic?.stop();
          this.currentMusic?.destroy();
          this.currentMusic = null;
        },
      });
    }

    // Detener todos los sonidos activos
    this.scene.sound.stopAll();
    this.activeSounds.clear();
  }

  /**
   * Pausa la música actual
   */
  pauseMusic(): void {
    if (this.currentMusic && this.currentMusic.isPlaying) {
      (this.currentMusic as Phaser.Sound.WebAudioSound).pause();
    }
  }

  /**
   * Reanuda la música pausada
   */
  resumeMusic(): void {
    if (this.currentMusic && this.currentMusic.isPaused) {
      (this.currentMusic as Phaser.Sound.WebAudioSound).resume();
    }
  }

  /**
   * Cambia el volumen de la música actual
   */
  setMusicVolume(volume: number, duration: number = 500): void {
    if (this.currentMusic) {
      this.scene.tweens.add({
        targets: this.currentMusic,
        volume: volume,
        duration: duration,
        ease: 'Linear',
      });
    }
  }

  /**
   * Verifica si hay música reproduciéndose
   */
  isMusicPlaying(): boolean {
    return this.currentMusic !== null && this.currentMusic.isPlaying;
  }

  /**
   * Obtiene el volumen actual de la música
   */
  getCurrentVolume(): number {
    if (!this.currentMusic) return 0;

    // Type assertion seguro: BaseSound siempre tiene volume
    const sound = this.currentMusic as
      | Phaser.Sound.WebAudioSound
      | Phaser.Sound.HTML5AudioSound;
    return sound.volume;
  }

  /**
   * Limpia todos los recursos de audio
   */
  destroy(): void {
    this.stopAll(0);
    this.activeSounds.clear();
    this.currentMusic = null;
  }
}

/**
 * Hook para usar AudioManager en escenas
 */
export function useAudioManager(scene: Phaser.Scene): AudioManager {
  return new AudioManager(scene);
}
