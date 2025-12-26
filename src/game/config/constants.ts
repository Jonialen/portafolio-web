/**
 * Constantes globales del juego
 * Centraliza todos los valores "mágicos" para facilitar el mantenimiento
 */

export const GAME_CONFIG = {
  width: 1920,
  height: 1080,
} as const;

export const CAMERA = {
  fadeIn: {
    duration: 800,
    rgb: { r: 0, g: 0, b: 0 },
  },
  fadeOut: {
    duration: 800,
    rgb: { r: 0, g: 0, b: 0 },
  },
  zoom: {
    default: 1,
    hover: 1.2,
    duration: 1000,
    ease: 'Sine.easeInOut',
  },
} as const;

export const AUDIO = {
  volume: {
    music: 0.1,
    intro: 0.2,
    sfx: {
      hover: 0.3,
      click: 0.5,
    },
  },
  fadeDuration: 1000,
} as const;

export const ANIMATION = {
  breathing: {
    scale: 1.01,
    duration: 2000,
    ease: 'Sine.easeInOut',
  },
  floating: {
    offset: 5,
    duration: 3000,
    ease: 'Sine.easeInOut',
  },
  hover: {
    scale: 1.1,
    duration: 200,
    tint: 0xffcc88,
  },
  click: {
    scale: 0.95,
    duration: 80,
    ease: 'Quad.easeOut',
  },
} as const;

export const UI = {
  button: {
    fontSize: '28px',
    backgroundColor: '#000000aa',
    color: '#ffffff',
    padding: { x: 10, y: 5 },
    hoverAlpha: 1,
    normalAlpha: 0.7,
    depth: 100,
  },
  tooltip: {
    fontSize: {
      title: '18px',
      description: '16px',
    },
    colors: {
      background: 0x2a2a2a,
      title: '#ffff00',
      description: '#e0e0e0',
      border: 0x666666,
    },
    padding: 16,
    maxWidth: 300,
  },
  cinematic: {
    title: {
      fontSize: '48px',
      fontFamily: 'serif',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 6,
    },
    overlay: {
      alpha: 0.85,
      color: 0x000000,
    },
    displayDuration: 1200,
    fadeOutDuration: 2000,
  },
} as const;

export const GRID = {
  chest: {
    cols: 9,
    rows: 6,
    cellSize: 16,
    padding: 2,
    yOffset: -20,
  },
  bundle: {
    cols: 4,
    rows: 4,
    cellSize: 8,
    padding: 2,
    yOffset: -15,
  },
} as const;

export const DEPTH = {
  background: -10,
  shadow: 10,
  sprite: 11,
  label: 12,
  ui: 100,
  tooltip: 999,
  overlay: 1000,
} as const;

export const INTERACTIVE_OBJECT = {
  shadow: {
    opacity: 0.6,
    scaleX: 1.4,
    scaleY: 1,
  },
  label: {
    offset: { x: 60, y: -20 },
    fontSize: '24px',
    backgroundColor: '#000000aa',
    color: '#ffffff',
    padding: { x: 10, y: 5 },
  },
} as const;
