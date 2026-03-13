const buildEmail = () => {
  const user = ['jonathanalej09'];
  const domain = ['gmail', 'com'];
  return `${user[0]}@${domain.join('.')}`;
};

export const contactItems = [
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
    icon: 'cv_icon',
    label: 'Descargar CV',
    action: () => {
      window.open('/assets/cv/Curriculum.pdf', '_blank', 'noopener,noreferrer');
    },
  },
];
