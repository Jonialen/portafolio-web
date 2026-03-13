import { i18n } from '../i18n';
import type { Language } from '../i18n';

const diaryPagesData: Record<Language, string[]> = {
  es: [
    'Soy Jonathan Alejandro D\u00edaz Tahuite, estudiante de 7mo semestre de Ingenier\u00eda en Ciencias de la Computaci\u00f3n en la UVG y desarrollador Full Stack en Revi, una empresa de tecnolog\u00eda para restaurantes. Desde peque\u00f1o me ha fascinado entender c\u00f3mo funcionan las cosas: desarmarlas, observar cada parte y reconstruirlas con una nueva perspectiva. Esa curiosidad me trajo hasta aqu\u00ed.',

    'Actualmente trabajo en Revi como desarrollador Full Stack, donde construyo soluciones con React, React Native, Laravel, Vue.js y MySQL. He participado en todo el ciclo de desarrollo: desde el dise\u00f1o de APIs hasta el despliegue con Docker y Jenkins. Esta experiencia me ha ense\u00f1ado a trabajar en equipo, cumplir deadlines y escribir c\u00f3digo que otros puedan mantener.',

    'En la universidad he sido auxiliar en cursos como Algoritmos y Programaci\u00f3n B\u00e1sica, y he dado tutor\u00edas en diversas \u00e1reas. Ense\u00f1ar me ha hecho m\u00e1s paciente, m\u00e1s claro al comunicar ideas t\u00e9cnicas, y me ha recordado la importancia de compartir conocimiento. M\u00e1s all\u00e1 de las clases, lo que m\u00e1s disfruto es aplicar lo aprendido en proyectos reales.',

    'Me apasiona Linux \u2014 uso Arch como mi sistema principal y personalizar mi entorno es una forma de expresi\u00f3n. Tambi\u00e9n me fascina el software libre, los retos t\u00e9cnicos como programar un RayTracer en Rust o trabajar con CUDA, y la intersecci\u00f3n entre software y hardware con Arduino y Raspberry Pi.',

    'Mi objetivo es seguir creciendo como desarrollador, enfrentando problemas complejos y construyendo soluciones que importen. Si algo me define, es la constancia: cuando algo me interesa, lo estudio hasta dominarlo. Este portafolio es prueba de eso \u2014 un proyecto que combina creatividad, c\u00f3digo limpio y ganas de hacer las cosas diferentes.',
  ],
  en: [
    "I'm Jonathan Alejandro D\u00edaz Tahuite, a 7th-semester Computer Science student at UVG and Full Stack developer at Revi, a restaurant technology company. Since I was little, I've been fascinated by understanding how things work: taking them apart, studying each piece, and rebuilding them with a new perspective. That curiosity brought me here.",

    "I currently work at Revi as a Full Stack developer, where I build solutions with React, React Native, Laravel, Vue.js, and MySQL. I've participated in the full development cycle: from API design to deployment with Docker and Jenkins. This experience has taught me teamwork, meeting deadlines, and writing code that others can maintain.",

    "At university, I've been a teaching assistant for courses like Algorithms and Basic Programming, and I've tutored in various areas. Teaching has made me more patient, clearer in communicating technical ideas, and reminded me of the importance of sharing knowledge. Beyond classes, what I enjoy most is applying what I've learned to real projects.",

    "I'm passionate about Linux \u2014 I use Arch as my daily driver and customizing my environment is a form of expression. I'm also fascinated by open source, technical challenges like building a RayTracer in Rust or working with CUDA, and the intersection of software and hardware with Arduino and Raspberry Pi.",

    "My goal is to keep growing as a developer, tackling complex problems and building solutions that matter. If something defines me, it's persistence: when something interests me, I study it until I master it. This portfolio is proof of that \u2014 a project that combines creativity, clean code, and the drive to do things differently.",
  ],
};

export const getDiaryPages = (): string[] => diaryPagesData[i18n.current];

// Backward compatibility
export const diaryPages: string[] = diaryPagesData.es;
