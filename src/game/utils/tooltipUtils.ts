import Phaser from 'phaser';

let tooltipBox: Phaser.GameObjects.Rectangle;
let tooltipText: Phaser.GameObjects.Text;
let tooltipShadow: Phaser.GameObjects.Text;
let innerBorder: Phaser.GameObjects.Rectangle;

export function showTooltip(
  scene: Phaser.Scene,
  x: number,
  y: number,
  title: string,
  desc: string
) {
  hideTooltip();

  const padding = 20;
  const textContent = `${title}\n${desc}`;

  const shadowText = scene.add
    .text(x + 15, y - 13, textContent, {
      fontSize: '16px',
      color: '#000000',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold',
      wordWrap: { width: 250 },
      lineSpacing: 6,
    })
    .setDepth(1001);

  const mainText = scene.add
    .text(x + 14, y - 14, textContent, {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold',
      wordWrap: { width: 250 },
      lineSpacing: 6,
    })
    .setDepth(1002);

  const box = scene.add
    .rectangle(
      mainText.x - padding,
      mainText.y - padding,
      mainText.width + padding * 2,
      mainText.height + padding * 2,
      0x1a1a1a,
      0.95
    )
    .setOrigin(0, 0)
    .setDepth(999)
    .setStrokeStyle(2, 0xcccccc);

  const innerBorderRect = scene.add
    .rectangle(
      mainText.x - padding + 1,
      mainText.y - padding + 1,
      mainText.width + padding * 2 - 2,
      mainText.height + padding * 2 - 2,
      0x2a2a2a,
      0
    )
    .setOrigin(0, 0)
    .setDepth(1000)
    .setStrokeStyle(1, 0x404040);

  tooltipBox = box;
  tooltipText = mainText;
  tooltipShadow = shadowText;
  innerBorder = innerBorderRect;
}

export function hideTooltip() {
  tooltipBox?.destroy();
  tooltipText?.destroy();
  tooltipShadow?.destroy();
  innerBorder?.destroy();
}

export function showStyledTooltip(
  scene: Phaser.Scene,
  x: number,
  y: number,
  title: string,
  desc: string,
  style?: {
    backgroundColor?: number;
    textColor?: string;
    borderColor?: number;
    fontSize?: string;
  }
) {
  const defaultStyle = {
    backgroundColor: 0x1a1a1a,
    textColor: '#ffffff',
    borderColor: 0xcccccc,
    fontSize: '16px',
  };

  const finalStyle = { ...defaultStyle, ...style };

  hideTooltip();

  const padding = 20;
  const textContent = `${title}\n${desc}`;

  const shadowText = scene.add
    .text(x + 15, y - 13, textContent, {
      fontSize: finalStyle.fontSize,
      color: '#000000',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold',
      wordWrap: { width: 250 },
      lineSpacing: 6,
    })
    .setDepth(1001);

  // Texto principal
  const mainText = scene.add
    .text(x + 14, y - 14, textContent, {
      fontSize: finalStyle.fontSize,
      color: finalStyle.textColor,
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold',
      wordWrap: { width: 250 },
      lineSpacing: 6,
    })
    .setDepth(1002);

  const box = scene.add
    .rectangle(
      mainText.x - padding,
      mainText.y - padding,
      mainText.width + padding * 2,
      mainText.height + padding * 2,
      finalStyle.backgroundColor,
      0.95
    )
    .setOrigin(0, 0)
    .setDepth(999)
    .setStrokeStyle(2, finalStyle.borderColor);

  tooltipBox = box;
  tooltipText = mainText;
  tooltipShadow = shadowText;
}
