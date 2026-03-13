export interface MusicControl {
  stopAll: () => void;
}

export interface SceneMusicConfig {
  introKey?: string;
  mainKey: string;
  introVolume?: number;
  mainVolume?: number;
  delay?: number;
  fadeDuration?: number;
}
