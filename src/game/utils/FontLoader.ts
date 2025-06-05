// utils/FontLoader.ts
export class FontLoader {
  private static loadedFonts = new Set<string>();

  static async loadGoogleFont(
    fontName: string,
    scene: Phaser.Scene
  ): Promise<void> {
    // Si ya está cargada, no hacer nada
    if (this.loadedFonts.has(fontName)) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      // Crear el link para cargar la fuente
      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(' ', '+')}:wght@400;700&display=swap`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);

      // Verificar si la fuente se ha cargado
      this.checkFontLoaded(fontName, scene, resolve);
    });
  }

  private static checkFontLoaded(
    fontName: string,
    scene: Phaser.Scene,
    callback: () => void
  ) {
    // Crear un elemento temporal para probar la fuente
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

      // Verificar si la fuente está disponible
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

        // Esperar un poco más para asegurar que la fuente esté completamente cargada
        scene.time.delayedCall(100, callback);
      } else {
        // Reintentar después de 100ms
        scene.time.delayedCall(100, checkFont);
      }
    };

    // Empezar a verificar después de 300ms
    scene.time.delayedCall(300, checkFont);
  }

  static getFontFamily(fontName: string): string {
    return `"${fontName}", cursive, Georgia, serif`;
  }
}
