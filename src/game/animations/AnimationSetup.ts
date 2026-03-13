import { createRowAnimation } from '../utils/createRowAnimation';

export function setupAnimations(scene: Phaser.Scene) {
  const texCofre = scene.textures.get('cofre')?.getSourceImage();
  if (texCofre) {
    const chestColumns = texCofre.width / 48;
    createRowAnimation(scene, 'chest_hover', 'cofre', 0, chestColumns, 6, 0);
  }

  const texCofre1 = scene.textures.get('cofre1')?.getSourceImage();
  if (texCofre1) {
    const chestColumns1 = texCofre1.width / 32;
    createRowAnimation(scene, 'chest_idle', 'cofre1', 0, chestColumns1, 2);
  }
}
