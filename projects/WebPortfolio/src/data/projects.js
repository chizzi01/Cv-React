import nearbyImg from '../assets/images/nearby-desktop.png'
import fitcImg from '../assets/images/fitc-desktop.png'
import schreiberImg from '../assets/images/schreiber-desktop.png'
import siroImg from '../assets/images/siro.png'
import mypassImg from '../assets/images/mypass.png'
import mybolucomprasImg from '../assets/images/mybolucompras.png'

export const PROJECTS = [
  {
    id: 1,
    name: 'Nearby',
    type: 'App de Citas',
    description: 'App de citas para conectar con personas cercanas. Matchmaking por proximidad geográfica, perfiles dinámicos y chat en tiempo real.',
    image: nearbyImg,
    url: 'https://www.nearbycompany.app/',
    tags: ['React', 'React Native', 'Vite', 'Figma'],
    neonColor: 'green',
  },
  {
    id: 2,
    name: 'FITC Training',
    type: 'Plataforma Web',
    description: 'Plataforma para coach de fútbol con diseño dinámico y deportivo. Gestión de entrenamientos, estadísticas y comunicación con jugadores.',
    image: fitcImg,
    url: 'https://fitctraining.com/',
    tags: ['React', 'Vite', 'CSS', 'Figma'],
    neonColor: 'cyan',
  },
  {
    id: 3,
    name: 'Estudios Schreiber',
    type: 'Landing Page',
    description: 'Sitio profesional para estudio de arquitectura. Diseño limpio, secciones de servicios y formulario de contacto integrado.',
    image: schreiberImg,
    url: 'https://estudioschreiber.ar/',
    tags: ['React', 'Vite', 'CSS', 'Figma'],
    neonColor: 'purple',
  },
  {
    id: 4,
    name: 'Siro Transporte',
    type: 'Landing Page',
    description: 'Página corporativa para empresa de transporte. SEO-friendly, 100% responsive y enfocada en conversión.',
    image: siroImg,
    url: `${import.meta.env.BASE_URL}mantenimiento.html?p=Siro+Transporte`,
    tags: ['HTML', 'CSS', 'JS', 'Figma'],
    neonColor: 'green',
  },
  {
    id: 5,
    name: 'Pass Buddy',
    type: 'App Móvil Nativa',
    description: 'Gestor de contraseñas nativo para Android. Guardá y organizá tus credenciales de forma segura con cifrado local.',
    image: mypassImg,
    url: 'https://www.linkedin.com/posts/agustin-chizzini-melo-237224209_buenas-a-todos-paso-a-comentarles-uno-de-activity-7121331172919382016-Cqcw?utm_source=share&utm_medium=member_desktop',
    storeUrl: '#',
    tags: ['React Native', 'JS', 'CSS'],
    neonColor: 'purple',
  },
  {
    id: 6,
    name: 'Budget Buddy',
    type: 'App Desktop y Móvil',
    description: 'App de escritorio y móvil con actualizaciones automáticas para control de gastos personales. Construida con Electron y React Native.',
    image: mybolucomprasImg,
    url: 'https://github.com/chizzi01/MyBolucompras/releases',
    storeUrl: '#',
    tags: ['Electron', 'React Native', 'HTML', 'CSS', 'JS'],
    neonColor: 'cyan',
  },
]
