import type Phaser from 'phaser';
import type { InteractiveObjectConfig } from './typesInteractive';

export type InteractiveObjectContext = {
  sprite: Phaser.GameObjects.Sprite;
  altSprite: Phaser.GameObjects.Sprite | null;
  shadow: Phaser.GameObjects.Ellipse;
  label: Phaser.GameObjects.Text;
  config: InteractiveObjectConfig;
  breathingTween: Phaser.Tweens.Tween;
  floatingTween: Phaser.Tweens.Tween;
  shadowTween: Phaser.Tweens.Tween;
  originalCameraX: number;
  originalCameraY: number;
  originalZoom: number;
  scene: Phaser.Scene;
  x: number;
  y: number;
  state: {
    isHovering: boolean;
    isPlayingReverse: boolean;
    currentZoomTween: Phaser.Tweens.Tween | null;
  };
  shadowWidth: number;
  shadowHeight: number;
};
