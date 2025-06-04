export class ParallaxBackground {
  private scene: Phaser.Scene;
  private capas: Phaser.GameObjects.Image[] = [];

  constructor(scene: Phaser.Scene, layerKeys: string[]) {
    this.scene = scene;

    const { width, height } = scene.cameras.main;

    layerKeys.forEach((key, index) => {
      const img = scene.add.image(0, 0, key).setOrigin(0);
      const tex = scene.textures.get(key).getSourceImage();
      const scale = Math.max(width / tex.width, height / tex.height);
      img.setScale(scale);
      this.capas.push(img);

      // Animación parallax básica
      scene.tweens.add({
        targets: img,
        x: '+=5',
        duration: 3000 + index * 1000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });
    });
  }

  getLayers() {
    return this.capas;
  }
}
