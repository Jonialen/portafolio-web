export type InteractiveObjectConfig = {
  scene: Phaser.Scene;
  x: number;
  y: number;
  spriteKey: string;
  idleAnim: string;
  hoverAnim: string;
  infoText: string;
  targetScene: string;
  scale?: number;
  flipX?: boolean;
  zoomOnHover?: boolean;
  zoomAmount?: number;
  zoomDuration?: number;
  zoomEase?: string;
  altSpriteKey?: string;
};
