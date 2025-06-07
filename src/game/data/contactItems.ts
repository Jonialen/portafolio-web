// contactItems.ts
export const contactItems = [
  {
    icon: 'email_icon',
    label: 'Email',
    action: () => {
      window.open('mailto:jonathanalej09@gmail.com', '_blank');
    },
  },
  {
    icon: 'linkedin_icon',
    label: 'LinkedIn',
    action: () => {
      window.open('https://www.linkedin.com/in/jonathanadiazt09/', '_blank');
    },
  },
  {
    icon: 'cv_icon',
    label: 'Descargar CV',
    action: () => {
      window.open('public/assets/cv/Curriculum.pdf', '_blank');
    },
  },
];
