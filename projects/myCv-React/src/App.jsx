import './App.css'
import { SocialLinks } from './components/Social-Links'
import { Avatar } from './components/Avatar'
import { CustomizedProgressBars } from './components/ProgressBar'
import { DrawerAppBar } from './components/Navbar'
import { Aptitudes } from './components/Aptitudes'
import { Card } from './components/CardExp'
import { DevToolsCard } from './components/Devtools'
import { useState, useEffect } from 'react'
import { useRef } from 'react'
import { ProyectCard } from './components/Project'
import { Textfield } from './components/Textfield'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Footer } from './components/Footer'
import SendIcon from '@mui/icons-material/Send'
import Danone from './assets/danone.png'
import Ejercito from './assets/ejercito.png'
import Javascript from '../src/assets/js.png'
import Html from '../src/assets/HTMLCSS.png'
import Css from '../src/assets/css.png'
import ReactLog from '../src/assets/react.svg'
import Nodejs from '../src/assets/nodejs.png'
import Capacitor from '../src/assets/capacitor.svg'
import Sap from '../src/assets/sap.png'
import PowerBi from '../src/assets/powerbi.png'
import Electron from '../src/assets/electron.png'
import Figma from '../src/assets/figma.png'
import Sql from '../src/assets/sql.svg'
import Mui from '../src/assets/mui.png'
import Agrimensura from '../src/assets/agrimensura.png'
import Mizzio from '../src/assets/mizzio.png'
import Siro from '../src/assets/siro.png'
import DonPepe from '../src/assets/donpepe.png'
import Mypass from '../src/assets/mypass.png'
import Mybolucompras from '../src/assets/mybolucompras.png'

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderColor: 'white',
          },
          '&:hover fieldset': {
            borderColor: 'white',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'white',
          },
        },
      },
    },
  },
});






export function App() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [animatedValueMount1, setAnimatedValueMount1] = useState(0);
  const [animatedValueMount2, setAnimatedValueMount2] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

useEffect(() => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
  const aptitudesRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const studiesSectionRef = useRef(null);

  const finalValueMount1 = 79;
  const finalValueMount2 = 100;

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (!isMobile) {
    useEffect(() => {
      const handleScroll = () => {
        if (studiesSectionRef.current) {
          const studiesSectionTop = studiesSectionRef.current.offsetTop;
          setScrollPosition(Math.min(window.scrollY, studiesSectionTop));
        }
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  }
  


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Si el elemento está en la vista, inicia las animaciones
        if (entries[0].isIntersecting) {
          const interval1 = setInterval(() => {
            setAnimatedValueMount1((prev) => Math.min(prev + 1, finalValueMount1));
          }, 10);
  
          const interval2 = setInterval(() => {
            setAnimatedValueMount2((prev) => Math.min(prev + 1, finalValueMount2));
          }, 10);
  
          return () => {
            clearInterval(interval1);
            clearInterval(interval2);
          };
        }
      },
      {
        // Define el umbral y la raíz para el observer
        root: null,
        threshold: 0.1,
      }
    );
  
    // Observa el elemento de la sección de estudios
    if (studiesSectionRef.current) {
      observer.observe(studiesSectionRef.current);
    }
  
    // Limpia el observer cuando el componente se desmonta
    return () => {
      if (studiesSectionRef.current) {
        observer.unobserve(studiesSectionRef.current);
      }
    };
  }, []);



  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    if (aptitudesRef.current) {
      observer.observe(aptitudesRef.current);
    }

    return () => {
      if (aptitudesRef.current) {
        observer.unobserve(aptitudesRef.current);
      }
    };
  }, []);

  const marginLeft = scrollPosition === studiesSectionRef.current?.offsetTop ? '20rem' : '0';

  const valueWidthMount = isMobile ? 300 : 500;


  return (
    <div className='App'>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100,200,300,400,500,600,700,800&display=swap');
      </style>
      <DrawerAppBar />
      <section id='avatar-section' >
        <div style={{ transform: `translate(${scrollPosition}px, ${scrollPosition}px)`, marginLeft }}>
          <Avatar />
        </div>
        <div className='info-align'>
          <h1>Agustin<br></br>Chizzini Melo</h1>
          <h3> <span className='blue'> Desarrollador Web Jr</span> | <span className='green'>Analista BI </span> y estudiante de Lic. Sistemas</h3>
        </div>
      </section>
      <section id='estudios-section' ref={studiesSectionRef} >
        <h1>Estudios <span className='dark-blue'>_</span></h1>
        <div className='barContainer-align'>
          <CustomizedProgressBars title="Universitario" valueMount={animatedValueMount1} valueWidth={valueWidthMount} />
          <CustomizedProgressBars title="Secundario" valueMount={animatedValueMount2} valueWidth={valueWidthMount} />
        </div>
      </section>
      <section id='aptitudes-section'>
        <h1>Aptitudes <span className='dark-blue'>_</span></h1>
        <div ref={aptitudesRef}></div>
        <Aptitudes isVisible={isVisible} />

      </section>

      <section id='experiencia-section'>
        <h1 className='expContTitulo'>Experiencia <span className='dark-blue'>_</span></h1>
        <div className='experiencia-align'>
          <Card fondo={Danone} titulo="Pasante Analista BI" tiempo="Jul 2022 - Actualidad"
            lista={["Análisis de datos.", "Soporte en migraciones de datos.", "Comparación periódica de registros", "Creación de reportes con Power Bi y Sap Analytics Cloud.", "Desarrollo de apps de escritorio con tecnología Web para el negocio."]} color="#6AC9FF" />
          <Card fondo={Ejercito} titulo="Desarrollador Web" tiempo="Feb 2021 - Jul 2022"
            lista={["Mantenimiento de paginas web del ejercito.", "Creación de reportes para los usuarios en Microsoft reporting Services.", "Gestión de base de datos con SQL."]} color="#FCC850" />
        </div>
      </section>

      <section id='devtools-section'>
        <h1 className='expContTitulo'>Herramientas de desarrollo <span className='dark-blue'>_</span></h1>
        <div className='devtools-container'>
          <DevToolsCard titulo="Front-End" listaImgs={[ReactLog, Html, Css, Javascript, Figma, Capacitor, Electron, Mui]} />
          <DevToolsCard titulo="Back-End" listaImgs={[Nodejs, Sql]} />
          <DevToolsCard titulo="Business Intelligence" listaImgs={[PowerBi, Sap]} />

        </div>
      </section>

      <section id='proyectos-section'>
        <h1 className='expContTitulo'>Algunos de mis proyectos <span className='dark-blue'>_</span></h1>
        <div className='proyectos-container'>
          <ProyectCard nombre="Mizzio Coding" bio={["Landing page", "Responsive", "Minimalista"]} tecnologias={[Html, Css, Javascript, Figma]} fondo={Mizzio} web='https://mizzio.com.ar/' />
          <ProyectCard nombre="GC Agrimensura" bio={["Landing page", "Divertida", "Minimalista"]} tecnologias={[Html, Css, Javascript, Figma]} fondo={Agrimensura} web='https://gcagrimensura.ar/' />
          <ProyectCard nombre="Siro Transporte" bio={["Landing page", "Responsive", "Colorida"]} tecnologias={[Html, Css, Javascript, Figma]} fondo={Siro} web='http://www.transportesiro.com.ar/' />
          <ProyectCard nombre="Don Pepe" bio={["Landing page", "Responsive", "Elegante y joven"]} tecnologias={[Html, Css, Javascript, Figma]} fondo={DonPepe} web='https://chizzi01.github.io/DonPepe-Bar/' />
          <ProyectCard nombre="MyPasswords" bio={["Mobile app", "Gestor de contraseñas", "Sencilla"]} tecnologias={[ReactLog, Capacitor, Html, Css, Javascript]} fondo={Mypass} web='https://www.linkedin.com/posts/agustin-chizzini-melo-237224209_buenas-a-todos-paso-a-comentarles-uno-de-activity-7121331172919382016-Cqcw?utm_source=share&utm_medium=member_desktop' />
          <ProyectCard nombre="MyBolucompras" bio={["Desktop app", "Gestor de compras", "Colorida"]} tecnologias={[Electron, Html, Css, Javascript]} fondo={Mybolucompras} web='' />
        </div>
      </section>
      
      <section id='contacto-section'>
        <div className='contacto-container'>
          <h1 className='expContTitulo'>Contacto <span className='dark-blue'>_</span></h1>
          <div className='contacto-align'>
            <div className='contactText-container'>
              <ThemeProvider theme={theme}>
                <Textfield indicador={'Nombre'} tipo={'text'} />
                <Textfield indicador={'Mail'} tipo={'email'} />
                <Textfield indicador={'Asunto'} tipo={'textfield'} />
              </ThemeProvider>
            </div>
            <div className='btnEnviar'>
              <a href='mailto:aguschizzini@gmail.com'>Enviar <SendIcon /></a>
            </div>
          </div>
        </div>
      </section> 
      <Footer tecnologias={[ReactLog, Html, Css, Javascript]} />

      <SocialLinks />
    </div>




  )

}
