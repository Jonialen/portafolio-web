import { BaseScene } from '../core/BaseScene';
import {
  AssetLoader,
  BACKGROUNDS,
  IMAGES,
  AUDIO_FILES,
} from '../config/assets';
import { ANIMATION } from '../config/constants';
import { contactItems } from '../data/contactItems';

/**
 * Escena de la bola de cristal (CrystalBallScene)
 * Refactorizada usando BaseScene
 */
export class CrystalBallScene extends BaseScene {
  private respirationTween?: Phaser.Tweens.Tween;
  private currentIndex = 0;
  private displayIcon!: Phaser.GameObjects.Image;
  private displayText!: Phaser.GameObjects.Text;

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
    // Cargar background
    AssetLoader.loadBackground(this, 'forestDark');

    // Cargar imagen de la bola de cristal
    AssetLoader.loadSceneImages(this, ['crystalInside']);

    // Cargar iconos de contacto
    AssetLoader.loadContactIcons(this);

    // Cargar audio
    this.load.audio(AUDIO_FILES.music.second.key, [
      ...AUDIO_FILES.music.second.paths,
    ]);
    this.load.audio(AUDIO_FILES.music.introSong.key, [
      ...AUDIO_FILES.music.introSong.paths,
    ]);
  }

  protected initializeContent(): void {
    this.createCrystalDisplay();
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
    this.respirationTween = this.tweens.add({
      targets: crystalInside,
      scaleX: scale * ANIMATION.breathing.scale,
      scaleY: scale * ANIMATION.breathing.scale,
      duration: ANIMATION.breathing.duration,
      yoyo: true,
      repeat: -1,
      ease: ANIMATION.breathing.ease,
    });

    // Crear interfaz de contacto
    this.createContactInterface(crystalInside);
  }

  private createContactInterface(crystalInside: Phaser.GameObjects.Image) {
    const centerX = crystalInside.x;
    const centerY = crystalInside.y - crystalInside.displayHeight * 0.35;

    // Icono de contacto
    this.displayIcon = this.add
      .image(0, 0, '')
      .setScale(8)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .setAlpha(1);

    // Texto de contacto
    this.displayText = this.add
      .text(0, 150, '', {
        fontSize: '24px',
        color: '#ffffff',
        backgroundColor: '#00000088',
        padding: { x: 10, y: 5 },
      })
      .setOrigin(0.5)
      .setAlpha(1);

    // Flecha izquierda
    const leftArrow = this.createArrow(-150, 150, '<', () => {
      this.currentIndex =
        (this.currentIndex - 1 + contactItems.length) % contactItems.length;
      this.updateContactItem();
    });

    // Flecha derecha
    const rightArrow = this.createArrow(150, 150, '>', () => {
      this.currentIndex = (this.currentIndex + 1) % contactItems.length;
      this.updateContactItem();
    });

    // Contenedor
    this.add.container(centerX, centerY, [
      this.displayIcon,
      this.displayText,
      leftArrow,
      rightArrow,
    ]);

    // Click en icono para ejecutar acción
    this.displayIcon.on('pointerdown', () => {
      const item = contactItems[this.currentIndex];
      item.action();
    });

    // Mostrar primer item
    this.updateContactItem();
  }

  private createArrow(
    x: number,
    y: number,
    text: string,
    onClick: () => void
  ): Phaser.GameObjects.Text {
    const arrow = this.add
      .text(x, y, text, {
        fontSize: '32px',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
        backgroundColor: '#000000aa',
        color: '#ffffff',
        padding: { x: 15, y: 8 },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    arrow.on('pointerdown', onClick);

    return arrow;
  }

  private updateContactItem() {
    const item = contactItems[this.currentIndex];

    this.tweens.add({
      targets: [this.displayIcon, this.displayText],
      alpha: 0,
      duration: 150,
      onComplete: () => {
        this.displayIcon.setTexture(item.icon);
        this.displayText.setText(item.label);

        this.tweens.add({
          targets: [this.displayIcon, this.displayText],
          alpha: 1,
          duration: 150,
        });
      },
    });
  }

  protected cleanupResources(): void {
    this.respirationTween?.destroy();
  }
}
