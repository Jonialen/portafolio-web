export type Language = 'es' | 'en';

export interface I18nStrings {
  // Scene titles
  scenes: {
    camp: string;
    chest: string;
    backpack: string;
    bundle: string;
    crystalBall: string;
  };
  // Interactive object labels
  objects: {
    chest: string;
    backpack: string;
    bundle: string;
    crystalBall: string;
  };
  // UI elements
  ui: {
    back: string;
    page: string; // "Página X de Y" / "Page X of Y"
    loadError: string;
    onboarding: string; // hint text for first-time visitors
  };
  // Contact labels
  contact: {
    email: string;
    linkedin: string;
    github: string;
    downloadCV: string;
  };
}
