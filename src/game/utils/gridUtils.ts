import Phaser from 'phaser';
import { showTooltip, hideTooltip } from './tooltipUtils';
import { projects } from '../data/projects';

export function createChestAlignedGrid(
  scene: Phaser.Scene,
  chestImage: Phaser.GameObjects.Image,
  spriteCols = 9,
  spriteRows = 3,
  cellSizeSprite = 16,
  paddingSprite = 2
) {
  const scale = chestImage.scale;
  const cellSize = cellSizeSprite * scale;
  const padding = paddingSprite * scale;

  const totalWidth = (cellSizeSprite + paddingSprite) * spriteCols - paddingSprite;
  const totalHeight = (cellSizeSprite + paddingSprite) * spriteRows - paddingSprite;

  const displayWidth = totalWidth * scale;
  const displayHeight = totalHeight * scale;

  const startX = chestImage.x - displayWidth / 2;
  const startY = chestImage.y - displayHeight - 20 * scale;

  let i = 0;

  for (let row = 0; row < spriteRows; row++) {
    for (let col = 0; col < spriteCols; col++) {
      const x = startX + col * (cellSize + padding) + cellSize / 2;
      const y = startY + row * (cellSize + padding) + cellSize / 2;

      // Fondo del slot
      scene.add
        .rectangle(x, y, cellSize, cellSize, 0x000000, 0.2)
        .setStrokeStyle(1, 0xffffff, 0.1)
        .setOrigin(0.5);

      const project = projects[i];
      if (project) {
        const icon = scene.add
          .image(x, y, project.icon)
          .setScale(scale * 0.9)
          .setOrigin(0.5)
          .setInteractive({ useHandCursor: true });

        icon.on('pointerover', () => {
          icon.setTint(0xffffcc);
          showTooltip(scene, x, y, project.name, project.description);
        });

        icon.on('pointerout', () => {
          icon.clearTint();
          hideTooltip();
        });

        icon.on('pointerdown', () => {
          project.onClick?.();
        });
      }

      i++;
    }
  }
}