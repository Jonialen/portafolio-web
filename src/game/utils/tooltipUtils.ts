import Phaser from 'phaser';

let tooltipBox: Phaser.GameObjects.Rectangle;
let tooltipText: Phaser.GameObjects.Text;

export function showTooltip(scene: Phaser.Scene, x: number, y: number, title: string, desc: string) {
  hideTooltip();

  const padding = 10;
  const text = scene.add
    .text(x + 12, y - 12, `${title}\n${desc}`, {
      fontSize: '14px',
      color: '#ffffff',
      wordWrap: { width: 200 },
    })
    .setDepth(1000);

  const box = scene.add
    .rectangle(
      text.x - padding,
      text.y - padding,
      text.width + padding * 2,
      text.height + padding * 2,
      0x000000,
      0.8
    )
    .setOrigin(0, 0)
    .setDepth(999)
    .setStrokeStyle(1, 0xffffff);

  tooltipBox = box;
  tooltipText = text;
}

export function hideTooltip() {
  tooltipBox?.destroy();
  tooltipText?.destroy();
}