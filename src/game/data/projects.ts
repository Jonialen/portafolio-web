import { i18n } from '../i18n';
import type { Language } from '../i18n';

export interface ProjectData {
  id: string;
  name: string;
  icon: string;
  description: string;
  onClick: () => void;
}

const projectActions: Record<string, () => void> = {
  '1': () => {
    window.open(
      'https://portafolio.jonialen.com',
      '_blank',
      'noopener,noreferrer'
    );
  },
  '2': () => {
    window.open(
      'https://canchas.jonialen.com/',
      '_blank',
      'noopener,noreferrer'
    );
  },
  '3': () => {
    window.open(
      'https://recetas3.jonialen.com/',
      '_blank',
      'noopener,noreferrer'
    );
  },
  '4': () => {
    window.open('https://dev.eduvial.space/', '_blank', 'noopener,noreferrer');
  },
  '5': () => {
    window.open(
      'https://github.com/Jonialen/dotfiles',
      '_blank',
      'noopener,noreferrer'
    );
  },
  '6': () => {
    window.open(
      'https://github.com/Jonialen/proyecto1-garficas',
      '_blank',
      'noopener,noreferrer'
    );
  },
  '7': () => {
    window.open(
      'https://fastpochi.jonialen.com',
      '_blank',
      'noopener,noreferrer'
    );
  },
};

const projectsData: Record<Language, Omit<ProjectData, 'onClick'>[]> = {
  es: [
    {
      id: '1',
      name: 'Portafolio interactivo',
      icon: 'book_portfolio',
      description:
        'Portafolio web gamificado construido como un RPG interactivo con Phaser 3, React 19 y TypeScript. Explora un campamento con objetos interactivos para descubrir proyectos, habilidades y m\u00e1s.',
    },
    {
      id: '2',
      name: 'Reportes de canchas deportivas',
      icon: 'fruta',
      description:
        'Plataforma web para la gesti\u00f3n y visualizaci\u00f3n de reportes de canchas deportivas. Frontend en React con dashboards interactivos, backend en FastAPI y base de datos PostgreSQL.',
    },
    {
      id: '3',
      name: 'RecipeHub',
      icon: 'glowStone',
      description:
        'Aplicaci\u00f3n web full-stack para gestionar recetas de cocina. CRUD completo con b\u00fasqueda, filtros y categor\u00edas. Construido con React, FastAPI y PostgreSQL.',
    },
    {
      id: '4',
      name: 'Eduvial',
      icon: 'perl',
      description:
        'Aplicaci\u00f3n m\u00f3vil para la ense\u00f1anza de educaci\u00f3n vial. Incluye lecciones interactivas, evaluaciones y seguimiento de progreso. Desarrollada con Flutter, Node.js (Express) y PostgreSQL.',
    },
    {
      id: '5',
      name: 'Dotfiles',
      icon: 'sword',
      description:
        'Mi configuraci\u00f3n personalizada de Hyprland en Arch Linux. Incluye rice completo con temas, scripts de automatizaci\u00f3n en Bash, y configuraci\u00f3n de herramientas de desarrollo.',
    },
    {
      id: '6',
      name: 'RayTracer',
      icon: 'fruta',
      description:
        'Motor de renderizado 3D por ray tracing desarrollado en Rust. Ejecuta escenas 3D directamente en la terminal con soporte para iluminaci\u00f3n, sombras y materiales.',
    },
    {
      id: '7',
      name: 'FastPochi',
      icon: 'glowStone',
      description:
        'Sistema multi-tenant de gesti\u00f3n de restaurantes con pedidos, rese\u00f1as y panel administrativo con m\u00e9tricas en tiempo real. Monorepo con React 19, NestJS 11, MongoDB y Turborepo. 242 tests unitarios con 100% de cobertura en services.',
    },
  ],
  en: [
    {
      id: '1',
      name: 'Interactive Portfolio',
      icon: 'book_portfolio',
      description:
        'Gamified web portfolio built as an interactive RPG with Phaser 3, React 19, and TypeScript. Explore a camp with interactive objects to discover projects, skills, and more.',
    },
    {
      id: '2',
      name: 'Sports Court Reports',
      icon: 'fruta',
      description:
        'Web platform for managing and visualizing sports court reports. React frontend with interactive dashboards, FastAPI backend, and PostgreSQL database.',
    },
    {
      id: '3',
      name: 'RecipeHub',
      icon: 'glowStone',
      description:
        'Full-stack web application for managing cooking recipes. Complete CRUD with search, filters, and categories. Built with React, FastAPI, and PostgreSQL.',
    },
    {
      id: '4',
      name: 'Eduvial',
      icon: 'perl',
      description:
        "Mobile application for driver's education. Includes interactive lessons, assessments, and progress tracking. Built with Flutter, Node.js (Express), and PostgreSQL.",
    },
    {
      id: '5',
      name: 'Dotfiles',
      icon: 'sword',
      description:
        'My custom Hyprland configuration on Arch Linux. Includes a complete rice with themes, Bash automation scripts, and development tool configuration.',
    },
    {
      id: '6',
      name: 'RayTracer',
      icon: 'fruta',
      description:
        '3D rendering engine using ray tracing, built in Rust. Renders 3D scenes directly in the terminal with lighting, shadows, and materials support.',
    },
    {
      id: '7',
      name: 'FastPochi',
      icon: 'glowStone',
      description:
        'Multi-tenant restaurant management system with ordering, reviews, and admin dashboard with real-time metrics. Monorepo with React 19, NestJS 11, MongoDB, and Turborepo. 242 unit tests with 100% service coverage.',
    },
  ],
};

export const getProjects = (): ProjectData[] =>
  projectsData[i18n.current].map((p) => ({
    ...p,
    onClick: projectActions[p.id],
  }));

// Backward compatibility
export const projects: ProjectData[] = projectsData.es.map((p) => ({
  ...p,
  onClick: projectActions[p.id],
}));
