import Phaser from 'phaser';
import { AUDIO } from '../config/constants';
import type { MusicControl, SceneMusicConfig } from '../types/musicTypes';

/**
 * Gestor centralizado de audio para el juego.
 * Reemplaza playSceneMusic.ts como fuente unica de logica de audio.
 */
export class AudioManager implements MusicControl {
  private scene: Phaser.Scene;
  private currentMusic: Phaser.Sound.BaseSound | null = null;
  private introSound: Phaser.Sound.BaseSound | null = null;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  /**
   * Reproduce musica de escena con intro opcional
   */
  playSceneMusic(config: SceneMusicConfig): void {
    const {
      introKey,
      mainKey,
      introVolume = AUDIO.volume.intro,
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

  private playMainMusic(
    key: string,
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

  private playIntroThenMain(
    introKey: string,
    mainKey: string,
    introVolume: number,
    mainVolume: number,
    delay: number,
    fadeDuration: number
  ): void {
    this.introSound = this.scene.sound.add(introKey, { volume: introVolume });
    this.introSound.play();

    this.introSound.once('complete', () => {
      this.introSound = null;
      this.scene.time.delayedCall(delay, () => {
        this.playMainMusic(mainKey, mainVolume, fadeDuration);
      });
    });
  }

  /**
   * Reproduce un efecto de sonido
   */
  playSFX(key: string, volume?: number): void {
    const sfxVolume = volume ?? AUDIO.volume.sfx.hover;
    const sound = this.scene.sound.add(key, { volume: sfxVolume });
    sound.play();

    sound.once('complete', () => {
      sound.destroy();
    });
  }

  /**
   * Detiene toda la musica con fade out (tween-based).
   * Solo usar cuando la escena seguira activa el tiempo suficiente
   * para que el tween complete (ej: fade out de camara antes de scene.start).
   */
  stopAll(fadeDuration: number = AUDIO.fadeDuration): void {
    this.stopIntro();

    if (this.currentMusic && this.currentMusic.isPlaying) {
      const musicRef = this.currentMusic;
      this.currentMusic = null;

      if (fadeDuration > 0) {
        this.scene.tweens.add({
          targets: musicRef,
          volume: 0,
          duration: fadeDuration,
          onComplete: () => {
            musicRef.stop();
            musicRef.destroy();
          },
        });
      } else {
        musicRef.stop();
        musicRef.destroy();
      }
    }
  }

  /**
   * Detiene el intro sound de forma inmediata
   */
  private stopIntro(): void {
    if (this.introSound) {
      this.introSound.stop();
      this.introSound.destroy();
      this.introSound = null;
    }
  }

  /**
   * Detiene TODOS los sonidos de forma inmediata (sin tweens).
   * Usar en shutdown handlers donde los tweens seran destruidos.
   */
  destroy(): void {
    this.stopIntro();

    if (this.currentMusic) {
      this.currentMusic.stop();
      this.currentMusic.destroy();
      this.currentMusic = null;
    }
  }
}
