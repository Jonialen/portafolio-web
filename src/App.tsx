import { useEffect, useState } from 'react';
import { GameCanvas } from './components/GameCanvas';
import { QuickView } from './components/QuickView';
import { i18n } from './game/i18n';
import type { Language } from './game/i18n';

function App() {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [lang, setLang] = useState<Language>(i18n.current);
  const [bannerVisible, setBannerVisible] = useState(true);

  useEffect(() => {
    const unsub = i18n.onLanguageChange((l) => setLang(l));
    return unsub;
  }, []);

  const t = i18n.t.quickView;
  // lang state ensures re-render on language toggle
  void lang;

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <GameCanvas />

      {/* Mobile banner */}
      {bannerVisible && (
        <div className="mobile-banner">
          {t.mobileBanner}
          <button
            className="mobile-banner-close"
            onClick={() => setBannerVisible(false)}
            aria-label="Close banner"
          >
            &times;
          </button>
        </div>
      )}

      {/* Floating Quick View button */}
      <button
        className="quickview-trigger"
        onClick={() => setQuickViewOpen(true)}
        aria-label={t.button}
      >
        <span className="quickview-trigger-icon" aria-hidden="true">
          &#9889;
        </span>
        {t.button}
      </button>

      {/* Quick View overlay */}
      <QuickView
        isOpen={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </div>
  );
}

export default App;
