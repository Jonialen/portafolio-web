export function createLabel(scene: Phaser.Scene, x: number, y: number, infoText: string) {
  return scene.add.text(x + 60, y - 20, infoText, {
    fontSize: '24px',
    fontFamily: 'Arial',
    color: '#ffffff',
    backgroundColor: '#000000aa',
    padding: { x: 10, y: 5 },
  }).setAlpha(0).setDepth(12);
}
