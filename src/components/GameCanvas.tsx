import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { MainScene } from '../game/scenes/MainScene';
import { ChestScene } from '../game/scenes/ChestScene';

export function GameCanvas() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const game = new Phaser.Game({
      type: Phaser.AUTO,
      width: 1920,
      height: 1080,
      parent: ref.current!,
      scene: [MainScene, ChestScene],
      pixelArt: true,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    });

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div ref={ref} className="w-full h-full" />;
}
