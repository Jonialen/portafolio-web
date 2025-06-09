# Portafolio Web Interactivo

Un portafolio personal gamificado que presenta información profesional a través de una experiencia de juego inmersiva desarrollada con Phaser 3.

Disponible en:
- 🌐 [portafolio.jonialen.com](https://portafolio.jonialen.com)
- 🌐 [portafolio.eduvial.space](https://portafolio.eduvial.space)

## 🎮 Características

- **Experiencia Gamificada**: Navegación interactiva con objetos del juego que representan diferentes secciones
- **Diario Personal**: Sistema de páginas interactivo que muestra información personal y profesional
- **Showcase de Proyectos**: Grid interactivo mostrando proyectos con enlaces directos
- **Sistema de Tooltips**: Información contextual con múltiples estilos visuales
- **Efectos Cinemáticos**: Transiciones suaves entre escenas con títulos animados
- **Audio Inmersivo**: Música de fondo y efectos de sonido

## 🛠️ Tecnologías

- **Frontend**: React 19.1.0 + TypeScript
- **Build Tool**: Vite 6.3.5
- **Game Engine**: Phaser 3.90.0
- **Animations**: GSAP 3.13.0

## 🚀 Instalación y Uso

```bash
# Clonar el repositorio
git clone https://github.com/Jonialen/portafolio-web.git

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de la build
npm run preview
```

## 📁 Estructura del Proyecto

```
src/
├── game/
│   ├── data/           # Datos del contenido (proyectos, diario)
│   ├── objects/        # Objetos del juego (DiaryBook, etc.)
│   ├── scenes/         # Escenas principales del juego
│   ├── types/          # Definiciones de TypeScript
│   └── utils/          # Utilidades (tooltips, animaciones)
```

## 🎯 Funcionalidades Principales

### Sistema de Diario Personal
- **10 páginas** de contenido personal y profesional
- **Navegación fluida** con animaciones de transición
- **Diseño de libro** con efectos visuales inmersivos

### Showcase de Proyectos
Los proyectos incluyen:
- Portafolio interactivo (este proyecto)
- Sistema de reportes deportivos (React + FastAPI + PostgreSQL)
- CRUD de recetas
- EduVial (aplicación móvil educativa)
- Dotfiles para Arch Linux

### Sistema de Interacciones
- **Hover effects** con escalado y efectos de color
- **Tooltips informativos** con múltiples estilos
- **Efectos de sonido** para feedback del usuario
- **Animaciones suaves** usando tweens de Phaser

## 🎨 Características Técnicas

### Componentes de UI Mejorados
- Sistema de tooltips con 3 estilos diferentes
- Grid layout responsivo para iconos
- Framework de interacciones estandarizado
- Efectos cinemáticos para transiciones

### Gestión de Escenas
- Arquitectura modular con escenas especializadas
- Sistema de navegación fluido
- Gestión de audio por escena
- Limpieza automática de recursos

## 🌐 Demo en Vivo

- 🔗 [https://portafolio.jonialen.com](https://portafolio.jonialen.com)
- 🔗 [https://portafolio.eduvial.space](https://portafolio.eduvial.space)

## 👨‍💻 Autor

**Jonathan Alejandro Díaz Tahuite**  
Estudiante de Ingeniería en Ciencias de la Computación  
Desarrollador Full Stack  
Entusiasta de Linux y tecnologías open source

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

