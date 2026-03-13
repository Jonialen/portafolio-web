import { BaseScene } from '../core/BaseScene';
import {
  AssetLoader,
  BACKGROUNDS,
  IMAGES,
  AUDIO_FILES,
} from '../config/assets';
import { getContactItems } from '../data/contactItems';
import type { ContactItem } from '../data/contactItems';
import { addBreathingAnimation } from '../utils/animationUtils';
import { ANIMATION } from '../config/constants';
import { i18n } from '../i18n';

/**
 * Escena de la bola de cristal (CrystalBallScene)
 * Muestra todos los contactos simultáneamente en un layout vertical
 */
export class CrystalBallScene extends BaseScene {
  private respirationTween?: Phaser.Tweens.Tween;
  private contactRows: Phaser.GameObjects.Container[] = [];

  constructor() {
    super({
      sceneKey: 'CrystalBallScene',
      title: 'Contactame',
      backgroundKey: 'forestDark',
      backgroundLayers: [...BACKGROUNDS.forestDark.layers],
      music: {
        introKey: AUDIO_FILES.music.introSong.key,
        mainKey: AUDIO_FILES.music.second.key,
        introVolume: 0.2,
        mainVolume: 0.1,
      },
      enableCinematicTitle: true,
      enableBackButton: true,
      returnScene: 'MainScene',
    });
  }

  preload() {
    super.preload();

    // Cargar background
    AssetLoader.loadBackground(this, 'forestDark');

    // Cargar imagen de la bola de cristal
    AssetLoader.loadSceneImages(this, ['crystalInside']);

    // Cargar iconos de contacto
    AssetLoader.loadContactIcons(this);

    // Cargar audio (centralizado)
    AssetLoader.loadAudio(this);
  }

  protected initializeContent(): void {
    // Update title with current language
    this.config.title = i18n.t.scenes.crystalBall;
    const items = getContactItems();
    this.createCrystalDisplay();
    this.createContactGrid(items);
  }

  private createCrystalDisplay() {
    const { width, height } = this.getCameraSize();

    // Crear imagen de la bola de cristal
    const crystalInside = this.add
      .image(width / 2, height - 200, IMAGES.crystalInside.key)
      .setOrigin(0.5, 0.7);

    // Calcular escala
    const scale = this.calculateScale(IMAGES.crystalInside.key, 0.6, 20);
    crystalInside.setScale(scale);

    // Agregar animación de respiración
    this.respirationTween = addBreathingAnimation(this, crystalInside);
  }

  /**
   * Crea un grid vertical con todos los items de contacto visibles a la vez.
   * Cada fila: icono + label, clickeable con efecto hover.
   */
  private createContactGrid(items: ContactItem[]) {
    const { width, height } = this.getCameraSize();
    const centerX = width / 2;
    const rowSpacing = 80;
    const totalHeight = (items.length - 1) * rowSpacing;
    const startY = height / 2 - totalHeight / 2 - 40;

    items.forEach((item, index) => {
      const rowY = startY + index * rowSpacing;
      this.createContactRow(item, centerX, rowY);
    });
  }

  /**
   * Crea una fila de contacto interactiva: icono + texto.
   */
  private createContactRow(item: ContactItem, x: number, y: number) {
    const icon = this.add.image(-120, 0, item.icon).setScale(5).setOrigin(0.5);

    const label = this.add
      .text(-60, 0, item.label, {
        fontSize: '26px',
        fontFamily: 'Georgia, serif',
        color: '#ffffff',
        backgroundColor: '#00000088',
        padding: { x: 14, y: 8 },
      })
      .setOrigin(0, 0.5);

    const row = this.add.container(x, y, [icon, label]);

    // Zona interactiva que cubre toda la fila
    const hitWidth = 340;
    const hitHeight = 60;
    const hitZone = this.add
      .zone(0, 0, hitWidth, hitHeight)
      .setInteractive({ useHandCursor: true });
    row.add(hitZone);

    // Hover: escala + tint
    hitZone.on('pointerover', () => {
      this.tweens.add({
        targets: row,
        scaleX: ANIMATION.hover.scale,
        scaleY: ANIMATION.hover.scale,
        duration: ANIMATION.hover.duration,
        ease: 'Power2.easeOut',
      });
      label.setTint(ANIMATION.hover.tint);
      icon.setTint(ANIMATION.hover.tint);
    });

    hitZone.on('pointerout', () => {
      this.tweens.add({
        targets: row,
        scaleX: 1,
        scaleY: 1,
        duration: ANIMATION.hover.duration,
        ease: 'Power2.easeOut',
      });
      label.clearTint();
      icon.clearTint();
    });

    // Click: ejecutar acción del contacto
    hitZone.on('pointerdown', () => {
      item.action();
    });

    // Animación de entrada escalonada
    row.setAlpha(0);
    this.tweens.add({
      targets: row,
      alpha: 1,
      y: y,
      duration: 400,
      delay: this.contactRows.length * 100,
      ease: 'Power2.easeOut',
    });

    this.contactRows.push(row);
  }

  protected cleanupResources(): void {
    this.respirationTween?.destroy();
    this.contactRows = [];
  }
}
