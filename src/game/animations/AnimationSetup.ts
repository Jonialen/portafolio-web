import { createRowAnimation } from '../utils/createRowAnimation';

export function setupAnimations(scene: Phaser.Scene) {
  const texCofre = scene.textures.get('cofre')?.getSourceImage();
  if (texCofre) {
    const columnasCofre = texCofre.width / 48;
    createRowAnimation(scene, 'cofre_hover', 'cofre', 0, columnasCofre, 6, 0);
  }

  const texCofre1 = scene.textures.get('cofre1')?.getSourceImage();
  if (texCofre1) {
    const columnasCofre1 = texCofre1.width / 32;
    createRowAnimation(scene, 'cofre_idle', 'cofre1', 0, columnasCofre1, 2);
  }
}