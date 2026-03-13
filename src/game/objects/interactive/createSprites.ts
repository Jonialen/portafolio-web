import type { InteractiveObjectConfig } from '../../types/typesInteractive';
import { DEPTH } from '../../config/constants';

export function createSprites(config: InteractiveObjectConfig) {
  const {
    scene,
    x,
    y,
    spriteKey,
    altSpriteKey,
    scale = 1,
    flipX = false,
  } = config;

  const sprite = scene.add
    .sprite(x, y, spriteKey)
    .setInteractive({ useHandCursor: true })
    .setScale(scale)
    .setDepth(DEPTH.sprite)
    .setScrollFactor(1)
    .setFlipX(flipX);

  let altSprite: Phaser.GameObjects.Sprite | null = null;

  if (altSpriteKey) {
    altSprite = scene.add
      .sprite(x, y, altSpriteKey)
      .setAlpha(0)
      .setScale(scale)
      .setVisible(false)
      .setInteractive({ useHandCursor: true })
      .setScrollFactor(1)
      .setFlipX(flipX)
      .setDepth(DEPTH.sprite);
  }

  return { sprite, altSprite };
}
