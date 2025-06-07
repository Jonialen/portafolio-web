export const projects = [
  {
    id: '1',
    name: 'Portafolio interactivo',
    icon: 'book_portfolio',
    description: 'Portfolio gamificado con Phaser',
    onClick: () => {
      window.open('https://github.com/Jonialen/portafolio-web', '_blank');
      window.open('https://portafolio.jonialen.com', '_blank');
    },
  },
  {
    id: '2',
    name: 'Reportes de canchas deportivas',
    icon: 'fruta',
    description:
      'Aplicacion web para visualizar reportes con react, fastapi y postgres.',
    onClick: () => {
      window.open('https://github.com/Jonialen/Proyecto3_bd_backend', '_blank');
      window.open('https://github.com/Jonialen/Proyecto3_bd_db', '_blank');
      window.open('https://github.com/Jonialen/Proyecto3_bd_fronted', '_blank');
      window.open('https://bd-api.eduvial.space/', '_blank');
    },
  },
  {
    id: '3',
    name: 'Crud de recetas',
    icon: 'glowStone',
    description:
      'Aplicacion web para ver, editar, eliminar y actualizar recentas con react, fastapi y postgres.',
    onClick: () => {
      window.open('https://github.com/AleWWH1104/Lab3_BD', '_blank');
      window.open('https://lab3-bd.eduvial.space/', '_blank');
    },
  },
  {
    id: '4',
    name: 'Eduvial',
    icon: 'perl',
    description:
      'Proyecto en desarrollo, aplicacion movil para ayudar con la enseñansa vehicular utilizando flutter, node(express) y postgres',
    onClick: () => {
      window.open('https://github.com/Jonialen/EduVial-Backend', '_blank');
      window.open('https://github.com/Jonialen/EduVial-Database', '_blank');
      window.open('https://github.com/Jonialen/EduVial-Frontend', '_blank');
    },
  },
  {
    id: '5',
    name: 'Dotfiles',
    icon: 'sword',
    description: 'Dotfiles para configuracion de hyprland en arch linux',
    onClick: () => {
      window.open('https://github.com/Jonialen/dotfiles', '_blank');
    },
  },
];
