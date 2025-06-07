import Phaser from 'phaser';
import { ParallaxBackground } from '../objects/ParallaxBackground';
import { showCinematicTitle } from '../utils/cinematicTitle';
import { contactItems } from '../data/contactItems';

export class CrystalBallScene extends Phaser.Scene {
  respirationTween!: Phaser.Tweens.Tween;
  currentIndex = 0;
  displayIcon!: Phaser.GameObjects.Image;
  displayText!: Phaser.GameObjects.Text;
  constructor() {
    super({ key: 'CrystalBallScene' });
  }

  preload() {
    this.load.image('fondo_back', '/assets/scenes/forest_light/back2.png');
    this.load.image('fondo_front', '/assets/scenes/forest_light/front2.png');
    this.load.image('fondo_middle', '/assets/scenes/forest_light/middle2.png');
    this.load.image(
      'cristal_inside',
      '/assets/crystallball/Bola_de_cristal_inside.png'
    );

    this.load.image('email_icon', '/assets/icons/mail.png');
    this.load.image('linkedin_icon', '/assets/icons/linkedin.png');
    this.load.image('cv_icon', '/assets/icons/cv.png');
    this.load.image('arrow_left', '/assets/ui/arrow_left.png');
    this.load.image('arrow_right', '/assets/ui/arrow_right.png');
  }

  create() {
    const { width, height } = this.cameras.main;

    new ParallaxBackground(this, ['fondo_back', 'fondo_middle', 'fondo_front']);
    showCinematicTitle(this, 'Contactame');
    this.cameras.main.fadeIn(800, 0, 0, 0);

    const crystalInside = this.add
      .image(width / 2, height - 200, 'cristal_inside')
      .setOrigin(0.5, 0.7);

    const tex = this.textures.get('cristal_inside').getSourceImage();
    const scale = Math.min((width * 0.6) / tex.width, 20);
    crystalInside.setScale(scale);

    this.respirationTween = this.tweens.add({
      targets: crystalInside,
      scaleX: scale * 1.01,
      scaleY: scale * 1.01,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Centro visual - más arriba
    const centerX = crystalInside.x;
    const centerY = crystalInside.y - crystalInside.displayHeight * 0.35; // Subido más

    // Icono principal
    this.displayIcon = this.add
      .image(0, 0, '')
      .setScale(8)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .setAlpha(1);

    // Texto relativo al icono - más abajo
    this.displayText = this.add
      .text(0, 150, '', {
        // Aumentado de 100 a 150
        fontSize: '24px',
        color: '#ffffff',
        backgroundColor: '#00000088',
        padding: { x: 10, y: 5 },
      })
      .setOrigin(0.5)
      .setAlpha(1);

    const leftArrow = this.add
      .text(-150, 150, '<', {
        fontSize: '32px',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
        backgroundColor: '#000000aa',
        color: '#ffffff',
        padding: { x: 15, y: 8 },
      })
      .setOrigin(0.5) // Centrar el origen
      .setInteractive({ useHandCursor: true });

    const rightArrow = this.add
      .text(150, 150, '>', {
        fontSize: '32px',
        fontFamily: 'Arial, sans-serif', 
        fontStyle: 'bold',
        backgroundColor: '#000000aa',
        color: '#ffffff',
        padding: { x: 15, y: 8 },
      })
      .setOrigin(0.5) 
      .setInteractive({ useHandCursor: true });

    this.add.container(centerX, centerY, [
      this.displayIcon,
      this.displayText,
      leftArrow,
      rightArrow,
    ]);

    // Interacciones
    leftArrow.on('pointerdown', () => {
      this.currentIndex =
        (this.currentIndex - 1 + contactItems.length) % contactItems.length;
      this.updateContactItem();
    });

    rightArrow.on('pointerdown', () => {
      this.currentIndex = (this.currentIndex + 1) % contactItems.length;
      this.updateContactItem();
    });

    this.displayIcon.on('pointerdown', () => {
      const item = contactItems[this.currentIndex];
      item.action();
    });

    this.updateContactItem();

    // volver
    const backText = this.add
      .text(width - 180, height - 60, '← Volver', {
        fontSize: '28px',
        backgroundColor: '#000000aa',
        color: '#ffffff',
        padding: { x: 10, y: 5 },
      })
      .setInteractive({ useHandCursor: true });

    backText.on('pointerdown', () => {
      this.cameras.main.fadeOut(800, 0, 0, 0);
      this.time.delayedCall(850, () => {
        this.scene.start('MainScene');
      });
    });
  }

  updateContactItem() {
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
}
