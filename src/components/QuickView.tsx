import { useEffect, useState, useCallback } from 'react';
import { i18n } from '../game/i18n';
import type { Language } from '../game/i18n';
import { getProjects } from '../game/data/projects';
import { getSkills } from '../game/data/skills';
import { getDiaryPages } from '../game/data/diaryPages';
import { getContactItems } from '../game/data/contactItems';
import './QuickView.css';

/** Static map: project id → live URL (mirrors projectActions in projects.ts) */
const PROJECT_URLS: Record<string, string> = {
  '1': 'https://portafolio.jonialen.com',
  '2': 'https://canchas.jonialen.com/',
  '3': 'https://recetas3.jonialen.com/',
  '4': 'https://dev.eduvial.space/',
  '5': 'https://github.com/Jonialen/dotfiles',
  '6': 'https://github.com/Jonialen/proyecto1-garficas',
  '7': 'https://fastpochi.jonialen.com',
};

/** Emoji prefixes for contact items (keyed by icon field) */
const CONTACT_EMOJI: Record<string, string> = {
  email_icon: '\u2709\uFE0F',
  linkedin_icon: '\uD83D\uDD17',
  cv_icon: '\uD83D\uDCC4',
};

interface QuickViewProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuickView({ isOpen, onClose }: QuickViewProps) {
  const [lang, setLang] = useState<Language>(i18n.current);

  /* Keep in sync when Phaser toggles language */
  useEffect(() => {
    const unsub = i18n.onLanguageChange((l) => setLang(l));
    return unsub;
  }, []);

  /* Close on Escape */
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
      return () => document.removeEventListener('keydown', handleKey);
    }
  }, [isOpen, handleKey]);

  if (!isOpen) return null;

  /* Force fresh data based on current language (lang state triggers re-render) */
  void lang; // used implicitly — getters read i18n.current
  const t = i18n.t.quickView;
  const projects = getProjects();
  const skills = getSkills();
  const diary = getDiaryPages();
  const contacts = getContactItems();

  return (
    <div
      className="quickview-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={t.title}
    >
      <div className="quickview-content">
        {/* Bottom corner ornaments (top corners use ::before/::after on content) */}
        <div className="quickview-corners-bottom" aria-hidden="true" />

        {/* Close — diamond-shaped RPG button */}
        <button
          className="quickview-close"
          onClick={onClose}
          aria-label={t.close}
        >
          <span>&times;</span>
        </button>

        {/* Header */}
        <div className="quickview-header">
          <h1 className="quickview-title">{t.title}</h1>
          <p className="quickview-subtitle">
            Jonathan Alejandro D&iacute;az Tahuite
          </p>
        </div>

        {/* ── About ─────────────────────────── */}
        <section className="quickview-section quickview-about">
          <h2>
            <span className="quickview-section-icon" aria-hidden="true">
              &#x1F4DC;
            </span>
            {t.aboutTitle}
          </h2>
          {diary.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </section>

        {/* ── Projects ──────────────────────── */}
        <section className="quickview-section">
          <h2>
            <span className="quickview-section-icon" aria-hidden="true">
              &#x2694;&#xFE0F;
            </span>
            {t.projectsTitle}
          </h2>
          <div className="quickview-projects">
            {projects.map((p) => (
              <div className="quickview-project-card" key={p.id}>
                <div className="quickview-project-name">{p.name}</div>
                <div className="quickview-project-desc">{p.description}</div>
                {PROJECT_URLS[p.id] && (
                  <a
                    className="quickview-project-link"
                    href={PROJECT_URLS[p.id]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.viewProject}
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Skills ────────────────────────── */}
        <section className="quickview-section">
          <h2>
            <span className="quickview-section-icon" aria-hidden="true">
              &#x1F4E6;
            </span>
            {t.skillsTitle}
          </h2>
          <div className="quickview-skills">
            {skills.map((s) => (
              <span
                className="quickview-skill-pill"
                key={s.id}
                title={s.description}
              >
                {s.name}
              </span>
            ))}
          </div>
        </section>

        {/* ── Contact ───────────────────────── */}
        <section className="quickview-section">
          <h2>
            <span className="quickview-section-icon" aria-hidden="true">
              &#x1F52E;
            </span>
            {t.contactTitle}
          </h2>
          <ul className="quickview-contact-list">
            {contacts.map((c, idx) => (
              <li key={idx}>
                <button
                  className="quickview-contact-item"
                  onClick={c.action}
                  type="button"
                >
                  <span className="quickview-contact-icon">
                    {CONTACT_EMOJI[c.icon] ?? '\u25CF'}
                  </span>
                  {c.label}
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
