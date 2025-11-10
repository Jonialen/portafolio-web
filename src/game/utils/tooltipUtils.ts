import Phaser from 'phaser';

interface RectangleWithCorners extends Phaser.GameObjects.Rectangle {
  corners?: Phaser.GameObjects.Rectangle[];
}

let tooltipBox: RectangleWithCorners;
let tooltipText: Phaser.GameObjects.Text;
let innerBorder: Phaser.GameObjects.Rectangle;
let outerBorder: Phaser.GameObjects.Rectangle;
let descriptionText: Phaser.GameObjects.Text;

export function showTooltip(
  scene: Phaser.Scene,
  x: number,
  y: number,
  title: string,
  desc: string
) {
  hideTooltip();
  const padding = 16;
  const titleText = title;
  const mainText = scene.add
    .text(x + padding, y + padding, titleText, {
      fontSize: '18px',
      color: '#ffff00',
      fontFamily: 'monospace',
      fontStyle: 'bold',
      wordWrap: { width: 300 },
      lineSpacing: 4,
    })
    .setDepth(1002);

  if (desc) {
    descriptionText = scene.add
      .text(x + padding, y + padding + mainText.height + 10, desc, {
        fontSize: '16px',
        color: '#e0e0e0',
        fontFamily: 'monospace',
        wordWrap: { width: 300 },
        lineSpacing: 4,
      })
      .setDepth(1002);
  }

  const totalHeight = descriptionText
    ? mainText.height + descriptionText.height + 10
    : mainText.height;
  const totalWidth = Math.max(mainText.width, descriptionText?.width || 0);

  const box: RectangleWithCorners = scene.add
    .rectangle(
      x,
      y,
      totalWidth + padding * 2,
      totalHeight + padding * 2,
      0x2a2a2a,
      1.0
    )
    .setOrigin(0, 0)
    .setDepth(999);

  const outerBorderRect = scene.add
    .rectangle(
      x - 2,
      y - 2,
      totalWidth + padding * 2 + 4,
      totalHeight + padding * 2 + 4,
      0x000000,
      0
    )
    .setOrigin(0, 0)
    .setDepth(998)
    .setStrokeStyle(2, 0x000000);

  const innerBorderRect = scene.add
    .rectangle(
      x + 1,
      y + 1,
      totalWidth + padding * 2 - 2,
      totalHeight + padding * 2 - 2,
      0x000000,
      0
    )
    .setOrigin(0, 0)
    .setDepth(1000)
    .setStrokeStyle(1, 0x666666);

  tooltipBox = box;
  tooltipText = mainText;
  innerBorder = innerBorderRect;
  outerBorder = outerBorderRect;
}

export function hideTooltip() {
  tooltipBox?.destroy();
  if (tooltipBox && tooltipBox.corners) {
    tooltipBox.corners.forEach((c) => c.destroy());
  }
  tooltipText?.destroy();
  innerBorder?.destroy();
  outerBorder?.destroy();
  descriptionText?.destroy();
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
    pixelPerfect?: boolean;
  }
) {
  const defaultStyle = {
    backgroundColor: 0x2a2a2a,
    textColor: '#ffffff',
    borderColor: 0x666666,
    fontSize: '17px',
    pixelPerfect: true,
  };

  const finalStyle = { ...defaultStyle, ...style };
  hideTooltip();
  const padding = finalStyle.pixelPerfect ? 16 : 20;

  const titleConfig = {
    fontSize: finalStyle.fontSize,
    color: '#ffff00',
    fontFamily: finalStyle.pixelPerfect ? 'monospace' : 'Arial, sans-serif',
    fontStyle: 'bold',
    wordWrap: { width: finalStyle.pixelPerfect ? 280 : 250 },
    lineSpacing: finalStyle.pixelPerfect ? 4 : 6,
  };

  const descConfig = {
    fontSize: parseInt(finalStyle.fontSize) + 1 + 'px',
    color: '#e0e0e0',
    fontFamily: finalStyle.pixelPerfect ? 'monospace' : 'Arial, sans-serif',
    wordWrap: { width: finalStyle.pixelPerfect ? 300 : 250 },
    lineSpacing: finalStyle.pixelPerfect ? 4 : 6,
  };

  const mainText = scene.add
    .text(x + padding, y + padding, title, titleConfig)
    .setDepth(1002);

  if (desc) {
    descriptionText = scene.add
      .text(x + padding, y + padding + mainText.height + 8, desc, descConfig)
      .setDepth(1002);
  }

  const totalHeight = descriptionText
    ? mainText.height + descriptionText.height + 8
    : mainText.height;
  const totalWidth = Math.max(mainText.width, descriptionText?.width || 0);

  const box: RectangleWithCorners = scene.add
    .rectangle(
      x,
      y,
      totalWidth + padding * 2,
      totalHeight + padding * 2,
      finalStyle.backgroundColor,
      finalStyle.pixelPerfect ? 1.0 : 0.95
    )
    .setOrigin(0, 0)
    .setDepth(999);

  if (finalStyle.pixelPerfect) {
    const outerBorderRect = scene.add
      .rectangle(
        x - 2,
        y - 2,
        totalWidth + padding * 2 + 4,
        totalHeight + padding * 2 + 4,
        0x000000,
        0
      )
      .setOrigin(0, 0)
      .setDepth(998)
      .setStrokeStyle(2, 0x000000);

    const innerBorderRect = scene.add
      .rectangle(
        x + 1,
        y + 1,
        totalWidth + padding * 2 - 2,
        totalHeight + padding * 2 - 2,
        0x000000,
        0
      )
      .setOrigin(0, 0)
      .setDepth(1000)
      .setStrokeStyle(1, finalStyle.borderColor);

    outerBorder = outerBorderRect;
    innerBorder = innerBorderRect;
  } else {
    box.setStrokeStyle(2, finalStyle.borderColor);
  }

  tooltipBox = box;
  tooltipText = mainText;
}

export function showPixelTooltip(
  scene: Phaser.Scene,
  x: number,
  y: number,
  title: string,
  desc: string,
  colors?: {
    bg?: number;
    text?: string;
    border?: number;
    shadow?: number;
  }
) {
  const defaultColors = {
    bg: 0x1a1a2e,
    text: '#ffffff',
    border: 0x16213e,
    shadow: 0x0f0f23,
  };

  const finalColors = { ...defaultColors, ...colors };
  hideTooltip();
  const padding = 14;

  const titleText = scene.add
    .text(x + padding, y + padding, title, {
      fontSize: '17px',
      color: '#ffff00',
      fontFamily: 'monospace',
      fontStyle: 'bold',
      wordWrap: { width: 270 },
      lineSpacing: 3,
    })
    .setDepth(1002);

  if (desc) {
    descriptionText = scene.add
      .text(x + padding, y + padding + titleText.height + 8, desc, {
        fontSize: '15px',
        color: '#e0e0e0',
        fontFamily: 'monospace',
        wordWrap: { width: 270 },
        lineSpacing: 3,
      })
      .setDepth(1002);
  }

  const totalHeight = descriptionText
    ? titleText.height + descriptionText.height + 8
    : titleText.height;
  const totalWidth = Math.max(titleText.width, descriptionText?.width || 0);

  const boxWidth = totalWidth + padding * 2;
  const boxHeight = totalHeight + padding * 2;

  const box: RectangleWithCorners = scene.add
    .rectangle(x, y, boxWidth, boxHeight, finalColors.bg, 1.0)
    .setOrigin(0, 0)
    .setDepth(999);

  const cornerSize = 3;
  const corners = [
    scene.add
      .rectangle(x, y, cornerSize, cornerSize, finalColors.border)
      .setOrigin(0, 0)
      .setDepth(1001),
    scene.add
      .rectangle(
        x + boxWidth - cornerSize,
        y,
        cornerSize,
        cornerSize,
        finalColors.border
      )
      .setOrigin(0, 0)
      .setDepth(1001),
    scene.add
      .rectangle(
        x,
        y + boxHeight - cornerSize,
        cornerSize,
        cornerSize,
        finalColors.border
      )
      .setOrigin(0, 0)
      .setDepth(1001),
    scene.add
      .rectangle(
        x + boxWidth - cornerSize,
        y + boxHeight - cornerSize,
        cornerSize,
        cornerSize,
        finalColors.border
      )
      .setOrigin(0, 0)
      .setDepth(1001),
  ];

  const borderRect = scene.add
    .rectangle(x - 1, y - 1, boxWidth + 2, boxHeight + 2, 0x000000, 0)
    .setOrigin(0, 0)
    .setDepth(998)
    .setStrokeStyle(1, finalColors.border);

  tooltipBox = box;
  tooltipText = titleText;
  outerBorder = borderRect;
  box.corners = corners;
}
