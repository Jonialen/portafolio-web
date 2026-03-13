import { i18n } from '../i18n';
import type { Language } from '../i18n';

export interface SkillData {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const skillsData: Record<Language, SkillData[]> = {
  es: [
    {
      id: '1',
      name: 'React',
      icon: 'react',
      description:
        'Desarrollo de interfaces interactivas y SPAs. Experiencia profesional en Revi y en proyectos personales como este portafolio y FastPochi.',
    },
    {
      id: '2',
      name: 'TypeScript',
      icon: 'react',
      description:
        'Tipado estricto en proyectos React y NestJS. Este portafolio usa TypeScript strict con cero any.',
    },
    {
      id: '3',
      name: 'React Native',
      icon: 'android',
      description:
        'Desarrollo de aplicaciones m\u00f3viles multiplataforma. Experiencia profesional en Revi construyendo apps de punto de venta.',
    },
    {
      id: '4',
      name: 'Vue.js',
      icon: 'react',
      description:
        'Desarrollo de interfaces con Vue.js y su ecosistema. Experiencia profesional en Revi.',
    },
    {
      id: '5',
      name: 'PHP / Laravel',
      icon: 'database',
      description:
        'Backend con Laravel: APIs REST, Eloquent ORM, autenticaci\u00f3n y migraciones. Experiencia profesional en Revi.',
    },
    {
      id: '6',
      name: 'Node.js / NestJS',
      icon: 'terminal',
      description:
        'APIs con Express.js y NestJS. Proyecto FastPochi: API completa con Swagger, transacciones ACID y 242 tests.',
    },
    {
      id: '7',
      name: 'Python / FastAPI',
      icon: 'python',
      description:
        'Backend con FastAPI para APIs de alto rendimiento. Usado en proyectos como Reportes de Canchas y RecipeHub.',
    },
    {
      id: '8',
      name: 'Flutter',
      icon: 'android',
      description:
        'Desarrollo m\u00f3vil multiplataforma con Flutter y Dart. Proyecto Eduvial: app de educaci\u00f3n vial.',
    },
    {
      id: '9',
      name: 'SQL / NoSQL',
      icon: 'database',
      description:
        'PostgreSQL, MySQL y MongoDB. Dise\u00f1o de esquemas, queries complejas, \u00edndices y aggregation pipelines.',
    },
    {
      id: '10',
      name: 'Docker & DevOps',
      icon: 'docker',
      description:
        'Contenedores, Docker Compose, CI/CD con Jenkins. Experiencia en despliegues y automatizaci\u00f3n en Revi.',
    },
    {
      id: '11',
      name: 'Rust',
      icon: 'terminal',
      description:
        'Programaci\u00f3n de sistemas con Rust. Proyecto RayTracer: motor de renderizado 3D en terminal.',
    },
    {
      id: '12',
      name: 'Java',
      icon: 'java',
      description:
        'POO, estructuras de datos y patrones de dise\u00f1o. Base s\u00f3lida en fundamentos de CS.',
    },
    {
      id: '13',
      name: 'Linux',
      icon: 'terminal',
      description:
        'Arch Linux como sistema principal. Scripting en Bash, administraci\u00f3n de servidores, y configuraci\u00f3n avanzada (Hyprland).',
    },
    {
      id: '14',
      name: 'Git',
      icon: 'git-branch',
      description:
        'Control de versiones, branching strategies, code review y CI/CD pipelines.',
    },
    {
      id: '15',
      name: 'Phaser 3',
      icon: 'react',
      description:
        'Motor de juegos para la web. Este portafolio es un RPG interactivo construido con Phaser 3.',
    },
  ],
  en: [
    {
      id: '1',
      name: 'React',
      icon: 'react',
      description:
        'Interactive UI and SPA development. Professional experience at Revi and personal projects like this portfolio and FastPochi.',
    },
    {
      id: '2',
      name: 'TypeScript',
      icon: 'react',
      description:
        'Strict typing in React and NestJS projects. This portfolio uses strict TypeScript with zero any.',
    },
    {
      id: '3',
      name: 'React Native',
      icon: 'android',
      description:
        'Cross-platform mobile app development. Professional experience at Revi building point-of-sale apps.',
    },
    {
      id: '4',
      name: 'Vue.js',
      icon: 'react',
      description:
        'UI development with Vue.js and its ecosystem. Professional experience at Revi.',
    },
    {
      id: '5',
      name: 'PHP / Laravel',
      icon: 'database',
      description:
        'Backend with Laravel: REST APIs, Eloquent ORM, authentication, and migrations. Professional experience at Revi.',
    },
    {
      id: '6',
      name: 'Node.js / NestJS',
      icon: 'terminal',
      description:
        'APIs with Express.js and NestJS. FastPochi project: complete API with Swagger, ACID transactions, and 242 tests.',
    },
    {
      id: '7',
      name: 'Python / FastAPI',
      icon: 'python',
      description:
        'Backend with FastAPI for high-performance APIs. Used in projects like Sports Court Reports and RecipeHub.',
    },
    {
      id: '8',
      name: 'Flutter',
      icon: 'android',
      description:
        "Cross-platform mobile development with Flutter and Dart. Eduvial project: driver's education app.",
    },
    {
      id: '9',
      name: 'SQL / NoSQL',
      icon: 'database',
      description:
        'PostgreSQL, MySQL, and MongoDB. Schema design, complex queries, indexes, and aggregation pipelines.',
    },
    {
      id: '10',
      name: 'Docker & DevOps',
      icon: 'docker',
      description:
        'Containers, Docker Compose, CI/CD with Jenkins. Deployment and automation experience at Revi.',
    },
    {
      id: '11',
      name: 'Rust',
      icon: 'terminal',
      description:
        'Systems programming with Rust. RayTracer project: 3D rendering engine in the terminal.',
    },
    {
      id: '12',
      name: 'Java',
      icon: 'java',
      description:
        'OOP, data structures, and design patterns. Solid foundation in CS fundamentals.',
    },
    {
      id: '13',
      name: 'Linux',
      icon: 'terminal',
      description:
        'Arch Linux as daily driver. Bash scripting, server administration, and advanced configuration (Hyprland).',
    },
    {
      id: '14',
      name: 'Git',
      icon: 'git-branch',
      description:
        'Version control, branching strategies, code review, and CI/CD pipelines.',
    },
    {
      id: '15',
      name: 'Phaser 3',
      icon: 'react',
      description:
        'Game engine for the web. This portfolio is an interactive RPG built with Phaser 3.',
    },
  ],
};

export const getSkills = (): SkillData[] => skillsData[i18n.current];

// Backward compatibility
export const skills: SkillData[] = skillsData.es;
