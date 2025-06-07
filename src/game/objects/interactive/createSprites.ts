import type { InteractiveObjectConfig } from '../../types/typesInteractive';

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
    .setDepth(11)
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
      .setDepth(11);
  }

  return { sprite, altSprite };
}
