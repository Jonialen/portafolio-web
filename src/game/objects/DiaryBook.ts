// objects/DiaryBook.ts
export class DiaryBook {
  private scene: Phaser.Scene;
  private bookPage!: Phaser.GameObjects.Image;
  private diaryText!: Phaser.GameObjects.Text;
  private nextButton!: Phaser.GameObjects.Text;
  private prevButton!: Phaser.GameObjects.Text;
  private currentPageIndex: number = 0;
  private pages: string[];
  private scale!: number;
  private respirationTween!: Phaser.Tweens.Tween;
  private isTransitioning: boolean = false;

  constructor(scene: Phaser.Scene, pages: string[]) {
    this.scene = scene;
    this.pages = pages;
    this.createBook();
  }

  private createBook() {
    const { width, height } = this.scene.cameras.main;

    // Crear la página del libro
    this.bookPage = this.scene.add
      .image(width / 2, height - 200, 'book_page')
      .setOrigin(0.5, 1);

    const tex = this.scene.textures.get('book_page').getSourceImage();
    this.scale = Math.min((width * 0.6) / tex.width, 4.5);
    this.bookPage.setScale(this.scale);

    const marginX = tex.width * this.scale * 0.05;
    const marginY = tex.height * this.scale * 0.07;

    this.diaryText = this.scene.add
      .text(
        this.bookPage.x - (tex.width * this.scale) / 2 + marginX,
        this.bookPage.y - tex.height * this.scale + marginY,
        '',
        {
          fontFamily: '"Shadows Into Light", cursive, Georgia, serif',
          fontSize: '20px',
          color: '#3e2f1c',
          wordWrap: { width: tex.width * this.scale - marginX * 2 },
          align: 'left',
        }
      )
      .setOrigin(-0.1, 0) //alinear el área del libro
      .setDepth(10);

    this.createNavigationButtons();
    this.createBreathingAnimation();
    this.setPage(0);
  }

  private createNavigationButtons() {
    const tex = this.scene.textures.get('book_page').getSourceImage();

    // Botón siguiente
    this.nextButton = this.scene.add
      .text(
        this.bookPage.x + tex.width * this.scale * 0.3,
        this.bookPage.y - 40,
        '→',
        {
          fontSize: '36px',
          fontFamily: 'Arial',
          color: '#000000',
          backgroundColor: '#ffffff88',
          padding: { x: 10, y: 5 },
        }
      )
      .setOrigin(1, 1)
      .setInteractive({ useHandCursor: true })
      .setAlpha(0.7);

    this.nextButton.on('pointerdown', () => {
      if (!this.isTransitioning) {
        this.nextPage();
      }
    });

    this.nextButton.on('pointerover', () => {
      this.nextButton.setAlpha(1);
    });

    this.nextButton.on('pointerout', () => {
      this.nextButton.setAlpha(0.7);
    });

    // Botón anterior
    this.prevButton = this.scene.add
      .text(
        this.bookPage.x - tex.width * this.scale * 0.3,
        this.bookPage.y - 40,
        '←',
        {
          fontSize: '36px',
          fontFamily: 'Arial',
          color: '#000000',
          backgroundColor: '#ffffff88',
          padding: { x: 10, y: 5 },
        }
      )
      .setOrigin(0, 1)
      .setInteractive({ useHandCursor: true })
      .setAlpha(0.7);

    this.prevButton.on('pointerdown', () => {
      if (!this.isTransitioning) {
        this.prevPage();
      }
    });

    this.prevButton.on('pointerover', () => {
      this.prevButton.setAlpha(1);
    });

    this.prevButton.on('pointerout', () => {
      this.prevButton.setAlpha(0.7);
    });

    this.updateButtonVisibility();
  }

  private createBreathingAnimation() {
    this.respirationTween = this.scene.tweens.add({
      targets: [this.bookPage],
      scaleX: this.scale * 1.01,
      scaleY: this.scale * 1.01,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
  }

  private updateButtonVisibility() {
    // Mostrar/ocultar botones según la página actual
    this.prevButton.setVisible(this.currentPageIndex > 0);
    this.nextButton.setVisible(this.currentPageIndex < this.pages.length - 1);
  }

  public setPage(index: number) {
    if (index < 0 || index >= this.pages.length || this.isTransitioning) return;

    this.isTransitioning = true;

    this.scene.tweens.add({
      targets: this.diaryText,
      alpha: 0,
      duration: 300,
      ease: 'Power2.easeOut',
      onComplete: () => {
        // Limpiar completamente el texto antes de establecer el nuevo
        this.diaryText.setText('');

        // Esperar un frame para asegurar que se renderice vacío
        this.scene.time.delayedCall(16, () => {
          this.diaryText.setText(this.pages[index]);
          this.currentPageIndex = index;
          this.updateButtonVisibility();

          this.scene.tweens.add({
            targets: this.diaryText,
            alpha: 1,
            duration: 300,
            ease: 'Power2.easeIn',
            onComplete: () => {
              this.isTransitioning = false;
            },
          });
        });
      },
    });
  }

  public nextPage() {
    if (this.currentPageIndex < this.pages.length - 1) {
      this.setPage(this.currentPageIndex + 1);
    }
  }

  public prevPage() {
    if (this.currentPageIndex > 0) {
      this.setPage(this.currentPageIndex - 1);
    }
  }

  public getCurrentPage(): number {
    return this.currentPageIndex;
  }

  public getTotalPages(): number {
    return this.pages.length;
  }

  public destroy() {
    if (this.respirationTween) {
      this.respirationTween.destroy();
    }

    this.bookPage?.destroy();
    this.diaryText?.destroy();
    this.nextButton?.destroy();
    this.prevButton?.destroy();
  }
}
