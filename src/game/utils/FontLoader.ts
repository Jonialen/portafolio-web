export class FontLoader {
  private static loadedFonts = new Set<string>();

  static async loadGoogleFont(
    fontName: string,
    scene: Phaser.Scene
  ): Promise<void> {

    if (this.loadedFonts.has(fontName)) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(' ', '+')}:wght@400;700&display=swap`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);

      this.checkFontLoaded(fontName, scene, resolve);
    });
  }

  private static checkFontLoaded(
    fontName: string,
    scene: Phaser.Scene,
    callback: () => void
  ) {
    const testElement = document.createElement('div');
    testElement.style.fontFamily = `${fontName}, Arial`;
    testElement.style.fontSize = '24px';
    testElement.style.position = 'absolute';
    testElement.style.left = '-9999px';
    testElement.style.visibility = 'hidden';
    testElement.textContent = 'Test Font Loading';
    document.body.appendChild(testElement);

    let attempts = 0;
    const maxAttempts = 50;

    const checkFont = () => {
      attempts++;

      const computedStyle = window.getComputedStyle(testElement);
      const fontAvailable =
        computedStyle.fontFamily.includes(fontName) ||
        (document.fonts && document.fonts.check(`24px "${fontName}"`));

      if (fontAvailable || attempts >= maxAttempts) {
        document.body.removeChild(testElement);
        this.loadedFonts.add(fontName);

        if (fontAvailable) {
          console.log(`Font ${fontName} loaded successfully`);
        } else {
          console.warn(`Font ${fontName} failed to load, using fallback`);
        }

        scene.time.delayedCall(100, callback);
      } else {

        scene.time.delayedCall(100, checkFont);
      }
    };

    scene.time.delayedCall(300, checkFont);
  }

  static getFontFamily(fontName: string): string {
    return `"${fontName}", cursive, Georgia, serif`;
  }
}
