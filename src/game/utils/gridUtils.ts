import Phaser from 'phaser';
import { setupIconInteractions } from './iconInteractions';

export function createAlignedGrid(
  scene: Phaser.Scene,
  Image: Phaser.GameObjects.Image,
  items: {
    id: string;
    name: string;
    icon: string;
    description: string;
    onClick: () => void;
  }[],
  spriteCols = 9,
  spriteRows = 6,
  cellSizeSprite = 16,
  paddingSprite = 2,
  yOffset = -20
): Phaser.GameObjects.GameObject[] {
  const scale = Image.scale;
  const cellSize = cellSizeSprite * scale;
  const padding = paddingSprite * scale;

  const totalWidth =
    (cellSizeSprite + paddingSprite) * spriteCols - paddingSprite;
  const totalHeight =
    (cellSizeSprite + paddingSprite) * spriteRows - paddingSprite;

  const displayWidth = totalWidth * scale;
  const displayHeight = totalHeight * scale;

  const startX = Image.x - displayWidth / 2;
  const startY = Image.y - displayHeight + yOffset * scale;

  const gridElements: Phaser.GameObjects.GameObject[] = [];
  let i = 0;

  for (let row = 0; row < spriteRows; row++) {
    for (let col = 0; col < spriteCols; col++) {
      const x = startX + col * (cellSize + padding) + cellSize / 2;
      const y = startY + row * (cellSize + padding) + cellSize / 2;

      const project = items[i];
      if (project) {
        const bg = scene.add
          .rectangle(x, y, cellSize, cellSize, 0x000000, 0.2)
          .setStrokeStyle(1, 0xffffff, 0.1)
          .setOrigin(0.5);

        const icon = scene.add
          .image(x, y, project.icon)
          .setDisplaySize(cellSize * 0.85, cellSize * 0.85)
          .setOrigin(0.5)
          .setInteractive({ useHandCursor: true });

        setupIconInteractions({
          scene,
          icon,
          project,
          hoverScale: 1.15,
          hoverDuration: 150,
          clickScale: 0.92,
        });
      }

      i++;
    }
  }
  return gridElements;
}
