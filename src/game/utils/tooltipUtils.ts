import Phaser from 'phaser';
import { UI, DEPTH } from '../config/constants';

export interface TooltipStyle {
  backgroundColor?: number;
  titleColor?: string;
  descriptionColor?: string;
  borderColor?: number;
  titleFontSize?: string;
  descFontSize?: string;
  fontFamily?: string;
  maxWidth?: number;
  padding?: number;
}

const DEFAULT_STYLE: Required<TooltipStyle> = {
  backgroundColor: UI.tooltip.colors.background,
  titleColor: UI.tooltip.colors.title,
  descriptionColor: UI.tooltip.colors.description,
  borderColor: UI.tooltip.colors.border,
  titleFontSize: UI.tooltip.fontSize.title,
  descFontSize: UI.tooltip.fontSize.description,
  fontFamily: 'monospace',
  maxWidth: UI.tooltip.maxWidth,
  padding: UI.tooltip.padding,
};

/**
 * Tooltip encapsulado sin estado global.
 * Singleton por escena: cada escena gestiona su propia instancia.
 */
export class Tooltip {
  private elements: Phaser.GameObjects.GameObject[] = [];
  private scene: Phaser.Scene;
  private style: Required<TooltipStyle>;

  constructor(scene: Phaser.Scene, style?: TooltipStyle) {
    this.scene = scene;
    this.style = { ...DEFAULT_STYLE, ...style };
  }

  /**
   * Muestra el tooltip en la posicion indicada
   */
  show(x: number, y: number, title: string, description?: string): void {
    this.hide();

    const { padding, maxWidth, fontFamily } = this.style;

    // Titulo
    const titleText = this.scene.add
      .text(x + padding, y + padding, title, {
        fontSize: this.style.titleFontSize,
        color: this.style.titleColor,
        fontFamily,
        fontStyle: 'bold',
        wordWrap: { width: maxWidth },
        lineSpacing: 4,
      })
      .setDepth(DEPTH.overlay + 2);

    this.elements.push(titleText);

    // Descripcion (opcional)
    let descText: Phaser.GameObjects.Text | null = null;
    if (description) {
      descText = this.scene.add
        .text(x + padding, y + padding + titleText.height + 8, description, {
          fontSize: this.style.descFontSize,
          color: this.style.descriptionColor,
          fontFamily,
          wordWrap: { width: maxWidth },
          lineSpacing: 4,
        })
        .setDepth(DEPTH.overlay + 2);

      this.elements.push(descText);
    }

    const totalHeight = descText
      ? titleText.height + descText.height + 8
      : titleText.height;
    const totalWidth = Math.max(titleText.width, descText?.width || 0);

    const boxWidth = totalWidth + padding * 2;
    const boxHeight = totalHeight + padding * 2;

    // Fondo
    const background = this.scene.add
      .rectangle(x, y, boxWidth, boxHeight, this.style.backgroundColor, 1.0)
      .setOrigin(0, 0)
      .setDepth(DEPTH.tooltip);

    this.elements.push(background);

    // Borde exterior
    const outerBorder = this.scene.add
      .rectangle(x - 2, y - 2, boxWidth + 4, boxHeight + 4, 0x000000, 0)
      .setOrigin(0, 0)
      .setDepth(DEPTH.tooltip - 1)
      .setStrokeStyle(2, 0x000000);

    this.elements.push(outerBorder);

    // Borde interior
    const innerBorder = this.scene.add
      .rectangle(x + 1, y + 1, boxWidth - 2, boxHeight - 2, 0x000000, 0)
      .setOrigin(0, 0)
      .setDepth(DEPTH.tooltip + 1)
      .setStrokeStyle(1, this.style.borderColor);

    this.elements.push(innerBorder);
  }

  /**
   * Oculta y destruye todos los elementos del tooltip
   */
  hide(): void {
    this.elements.forEach((el) => el.destroy());
    this.elements = [];
  }

  /**
   * Destruye el tooltip permanentemente
   */
  destroy(): void {
    this.hide();
  }
}

// --- Funciones de conveniencia para compatibilidad con el codigo existente ---

let activeTooltip: Tooltip | null = null;

export function showTooltip(
  scene: Phaser.Scene,
  x: number,
  y: number,
  title: string,
  desc: string
): void {
  hideTooltip();
  activeTooltip = new Tooltip(scene);
  activeTooltip.show(x, y, title, desc);
}

export function hideTooltip(): void {
  if (activeTooltip) {
    activeTooltip.destroy();
    activeTooltip = null;
  }
}
