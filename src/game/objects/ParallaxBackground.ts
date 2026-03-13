import type { BackgroundLayer } from '../config/assets';

export class ParallaxBackground {
  private layers: Phaser.GameObjects.Image[] = [];

  constructor(scene: Phaser.Scene, layers: BackgroundLayer[]) {
    const { width, height } = scene.cameras.main;

    layers.forEach(({ key }, index) => {
      const img = scene.add.image(0, 0, key).setOrigin(0);
      const tex = scene.textures.get(key).getSourceImage();
      const scale = Math.max(width / tex.width, height / tex.height);

      img.setScale(scale);

      img.setDepth(index - 10);

      this.layers.push(img);

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
}
