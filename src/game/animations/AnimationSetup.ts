import { createRowAnimation } from '../utils/createRowAnimation';

export function setupAnimations(scene: Phaser.Scene) {
  const anims = scene.anims;
  const tex = scene.textures.get('cofre')?.getSourceImage();
  if (!tex) return;

  const columnas = tex.width / 48;

  createRowAnimation(scene, 'cofre_idle', 'cofre', 0, columnas, 2);
  createRowAnimation(scene, 'cofre_hover', 'cofre', 1, columnas, 6, 0);
}
