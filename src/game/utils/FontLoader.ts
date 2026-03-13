export class FontLoader {
  private static loadedFonts = new Set<string>();
  private static readonly TIMEOUT_MS = 5000;

  static async loadGoogleFont(
    fontName: string,
    _scene?: Phaser.Scene
  ): Promise<void> {
    if (this.loadedFonts.has(fontName)) {
      return;
    }

    // Inject the Google Fonts stylesheet
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, '+')}:wght@400;700&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Wait for the font to load with a timeout fallback
    try {
      await Promise.race([
        document.fonts.load(`24px "${fontName}"`),
        new Promise<void>((_, reject) =>
          setTimeout(
            () => reject(new Error(`Font "${fontName}" load timed out`)),
            this.TIMEOUT_MS
          )
        ),
      ]);
    } catch (error) {
      console.warn(`[FontLoader] ${(error as Error).message}. Using fallback.`);
    }

    this.loadedFonts.add(fontName);
  }
}
