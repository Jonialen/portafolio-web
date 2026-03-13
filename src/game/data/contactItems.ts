import { i18n } from '../i18n';

const buildEmail = () => {
  const user = ['jonathanalej09'];
  const domain = ['gmail', 'com'];
  return `${user[0]}@${domain.join('.')}`;
};

export interface ContactItem {
  icon: string;
  label: string;
  action: () => void;
}

export const getContactItems = (): ContactItem[] => [
  {
    icon: 'email_icon',
    label: i18n.t.contact.email,
    action: () => {
      window.open(`mailto:${buildEmail()}`, '_blank', 'noopener,noreferrer');
    },
  },
  {
    icon: 'linkedin_icon',
    label: i18n.t.contact.linkedin,
    action: () => {
      window.open(
        'https://www.linkedin.com/in/jonathanadiazt09/',
        '_blank',
        'noopener,noreferrer'
      );
    },
  },
  {
    icon: 'linkedin_icon',
    label: i18n.t.contact.github,
    action: () => {
      window.open(
        'https://github.com/Jonialen',
        '_blank',
        'noopener,noreferrer'
      );
    },
  },
  {
    icon: 'cv_icon',
    label: i18n.t.contact.downloadCV,
    action: () => {
      window.open('/assets/cv/Curriculum.pdf', '_blank', 'noopener,noreferrer');
    },
  },
];

// Backward compatibility
export const contactItems: ContactItem[] = [
  {
    icon: 'email_icon',
    label: 'Email',
    action: () => {
      window.open(`mailto:${buildEmail()}`, '_blank', 'noopener,noreferrer');
    },
  },
  {
    icon: 'linkedin_icon',
    label: 'LinkedIn',
    action: () => {
      window.open(
        'https://www.linkedin.com/in/jonathanadiazt09/',
        '_blank',
        'noopener,noreferrer'
      );
    },
  },
  {
    icon: 'linkedin_icon',
    label: 'GitHub',
    action: () => {
      window.open(
        'https://github.com/Jonialen',
        '_blank',
        'noopener,noreferrer'
      );
    },
  },
  {
    icon: 'cv_icon',
    label: 'Descargar CV',
    action: () => {
      window.open('/assets/cv/Curriculum.pdf', '_blank', 'noopener,noreferrer');
    },
  },
];
