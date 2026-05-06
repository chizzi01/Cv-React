import './App.css'
import { maintenanceUrl } from './utils'
import { SocialLinks } from './components/Social-Links'
import { Avatar } from './components/Avatar'
import { CustomizedProgressBars } from './components/ProgressBar'
import { DrawerAppBar } from './components/navbar'
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
import CheckIcon from '@mui/icons-material/Check'
import Danone from './assets/danone.png'
import Ejercito from './assets/ejercito.png'
import Javascript from '../src/assets/js.png'
import Html from '../src/assets/HTMLCSS.png'
import Css from '../src/assets/css.png'
import ReactLog from '../src/assets/react.svg'
import Nodejs from '../src/assets/nodejs.png'
import Capacitor from '../src/assets/capacitor.svg'
import PowerBi from '../src/assets/powerbi.png'
import Electron from '../src/assets/electron.png'
import Figma from '../src/assets/figma.png'
import Sql from '../src/assets/sql.png'
import Mui from '../src/assets/mui.png'
import SchreiberDesktop from '../src/assets/schreiber-desktop.png'
import SchreiberMobile from '../src/assets/schreiber-mobile.png'
import Siro from '../src/assets/siro.png'
import FitcDesktop from '../src/assets/fitc-desktop.png'
import FitcMobile from '../src/assets/fitc-mobile.png'
import Mypass from '../src/assets/mypass.png'
import Mybolucompras from '../src/assets/mybolucompras.png'
import Json from '../src/assets/json.png'
import Mongo from '../src/assets/mongo.png'
import gds from '../src/assets/gdsnetlogo.jpg'

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
  // const [scrollPosition, setScrollPosition] = useState(0);
  const [animatedValueMount1, setAnimatedValueMount1] = useState(0);
  const [animatedValueMount2, setAnimatedValueMount2] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [key, setKey] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const aptitudesRef = useRef(null);
  const expRef = useRef(null);
  const homeRef = useRef(null);
  const devtools = useRef(null);
  const portfolio = useRef(null);
  const contacto = useRef(null);
  const studiesSectionRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [expVisible, setExpVisible] = useState(false);
  const [homeVisible, setHomeVisible] = useState(false);
  const [devtoolsVisible, setDevtoolsVisible] = useState(false);
  const [portfolioVisible, setPortfolioVisible] = useState(false);
  const [contactoVisible, setContactoVisible] = useState(false);
  const [seccionActual, setSeccionActual] = useState('avatar-section')



  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  const finalValueMount1 = 100;
  const finalValueMount2 = 100;

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setExpVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    if (expRef.current) {
      observer.observe(expRef.current);
    }

    return () => {
      if (expRef.current) {
        observer.unobserve(expRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHomeVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    if (homeRef.current) {
      observer.observe(homeRef.current);
    }

    return () => {
      if (homeRef.current) {
        observer.unobserve(homeRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setDevtoolsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    if (devtools.current) {
      observer.observe(devtools.current);
    }

    return () => {
      if (devtools.current) {
        observer.unobserve(devtools.current);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setPortfolioVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    if (portfolio.current) {
      observer.observe(portfolio.current);
    }

    return () => {
      if (portfolio.current) {
        observer.unobserve(portfolio.current);
      }

    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setContactoVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    if (contacto.current) {
      observer.observe(contacto.current);
    }

    return () => {
      if (contacto.current) {
        observer.unobserve(contacto.current);
      }
    };
  }, []);

  useEffect(() => {
    if (homeVisible) {
      setSeccionActual('avatar-section')
    }
    if (expVisible) {
      setSeccionActual('experiencia-section')
    }
    if (devtoolsVisible) {
      setSeccionActual('devtools-section')
    }
    if (portfolioVisible) {
      setSeccionActual('proyectos-section')
    }
    if (contactoVisible) {
      setSeccionActual('contacto-section')
    }
  }, [homeVisible, expVisible, devtoolsVisible, portfolioVisible, contactoVisible])


  // Mouse spotlight — updates --mx / --my CSS vars on <html>
  useEffect(() => {
    const handler = (e) => {
      document.documentElement.style.setProperty('--mx', `${e.clientX}px`);
      document.documentElement.style.setProperty('--my', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  // Custom cursor with lerp ring
  useEffect(() => {
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let rafId;
    const lerp = (a, b, t) => a + (b - a) * t;
    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
    };
    const tick = () => {
      rx = lerp(rx, mx, 0.1);
      ry = lerp(ry, my, 0.1);
      ring.style.transform = `translate(${rx - 20}px, ${ry - 20}px)`;
      rafId = requestAnimationFrame(tick);
    };
    const onEnter = () => ring.classList.add('ring-hover');
    const onLeave = () => ring.classList.remove('ring-hover');
    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });
    window.addEventListener('mousemove', onMove);
    rafId = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // 3D card tilt on hover
  useEffect(() => {
    const cards = document.querySelectorAll('.cardProyect-container, .devtools-card');
    const handlers = [];
    cards.forEach(card => {
      const onMove = (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${(-y * 10).toFixed(1)}deg) rotateY(${(x * 10).toFixed(1)}deg)`;
      };
      const onLeave = () => {
        card.style.transition = 'transform 0.6s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s, border-color 0.3s';
        card.style.transform = '';
        setTimeout(() => { card.style.transition = ''; }, 650);
      };
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
      handlers.push({ card, onMove, onLeave });
    });
    return () => {
      handlers.forEach(({ card, onMove, onLeave }) => {
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  const valueWidthMount = isMobile ? 300 : 500;

  if (!localStorage.getItem('language')) {
    localStorage.setItem('language', 'es');
  }

    return (
      <div className='App'>
        {/* Background effects */}
        <div className="mouse-glow" aria-hidden="true" />
        <div className="bg-orbs" aria-hidden="true">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>
        {/* Custom cursor (hidden on touch/coarse pointer devices via CSS) */}
        <div className="cursor-dot" ref={cursorDotRef} aria-hidden="true" />
        <div className="cursor-ring" ref={cursorRingRef} aria-hidden="true" />
        <DrawerAppBar currentSection={seccionActual} />
        <section id='avatar-section' >
          <div
            isVisible={homeVisible}
            ref={homeRef}
          >
            <Avatar />
          </div>
          <div className='info-align'>
            <h1>Agustin<br></br>Chizzini Melo</h1>
            <h3><span className='blue'>Desarrollador Full Stack</span> · <span className='green'>Analista de Datos</span> · Lic. en Sistemas</h3>
            <p>📍 Buenos Aires, <span className='gradient-text'>Argentina</span></p>
          </div>
          <a href="#estudios-section" className="scroll-indicator" aria-label="Ir a la siguiente sección">
            <span></span>
            <span></span>
            <span></span>
          </a>
        </section>
        <section id='estudios-section' ref={studiesSectionRef} >
          <h2>Formación <span className='dark-blue'>_</span></h2>
          <div className='estudios-grid'>

            {/* Tarjeta universitaria */}
            <div className='edu-card'>
              <div className='edu-card-top'>
                <div className='edu-icon-wrap'>🎓</div>
                <div className='edu-info'>
                  <h3>Licenciatura en Sistemas de Información</h3>
                  <p className='edu-institution'>Universidad Argentina de la Empresa · UADE</p>
                </div>
                <span className='edu-badge edu-badge--done'>Completado</span>
              </div>
              <p className='edu-year'>📅 2019 – 2024 &nbsp;·&nbsp; 📍 Buenos Aires</p>
              <div className='edu-tags'>
                <span>Ingeniería de Software</span>
                <span>Bases de Datos</span>
                <span>Algoritmos</span>
                <span>Desarrollo de aplicaciones</span>
                <span>Análisis de Sistemas</span>
                <span>Gestión de Proyectos</span>
              </div>
              <CustomizedProgressBars title="Universitario" valueMount={animatedValueMount1} valueWidth={valueWidthMount} />
            </div>

            {/* Tarjeta secundaria */}
            <div className='edu-card'>
              <div className='edu-card-top'>
                <div className='edu-icon-wrap'>📖</div>
                <div className='edu-info'>
                  <h3>Bachiller en Economía</h3>
                  <p className='edu-institution'>Leon XIII · Buenos Aires</p>
                </div>
                <span className='edu-badge edu-badge--done'>Completado</span>
              </div>
              <p className='edu-year'>📅 2013 – 2018 &nbsp;·&nbsp; 📍 Buenos Aires</p>
              <div className='edu-tags'>
                <span>Economía</span>
                <span>Contabilidad</span>
                <span>Administración de empresas</span>
                <span>Marketing</span>
                <span>Inglés</span>
              </div>
              <CustomizedProgressBars title="Secundario" valueMount={animatedValueMount2} valueWidth={valueWidthMount} />
            </div>

          </div>
        </section>
        <section id='aptitudes-section' ref={aptitudesRef}>
          <h2>Habilidades <span className='dark-blue'>_</span></h2>
          <Aptitudes isVisible={isVisible} />

        </section>

        <section id='experiencia-section'>
          <h2 className='expContTitulo'>Experiencia <span className='dark-blue'>_</span></h2>
          <div className='experiencia-align' ref={expRef}>
            <Card isVisible={expVisible} fondo={gds} titulo="Analista y Desarrollador" tiempo="Feb 2024 - Actualidad"
              lista={["Diseño y desarrollo de aplicaciones web con React.", "Desarrollo de aplicaciones móviles multiplataforma con React Native.", "Desarrollo de plataformas web con C# y ASP.NET.", "Control de calidad y monitoreo de flujos de datos."]} color="#00b9c4" />
            <Card isVisible={expVisible} fondo={Danone} titulo="Analista BI" tiempo="Jul 2022 - Ene 2024"
              lista={["Diseño y publicación de reportes en Power BI y SAP Analytics Cloud.", "Soporte en migraciones y conciliación periódica de datos.", "Desarrollo de aplicaciones de escritorio con Electron para el negocio."]} color="#6AC9FF" />
            <Card isVisible={expVisible} fondo={Ejercito} titulo="Desarrollador Web" tiempo="Feb 2021 - Jul 2022"
              lista={["Desarrollo y mantenimiento de sitios web institucionales.", "Generación de reportes operativos con Microsoft Reporting Services.", "Administración y optimización de bases de datos SQL."]} color="#FCC850" />
          </div>
        </section>

        <section id='devtools-section'>
          <h2 className='expContTitulo'>Stack Tecnológico <span className='dark-blue'>_</span></h2>
          <div className='devtools-container' ref={devtools}>
            <DevToolsCard titulo="Front-End" isVisible={devtoolsVisible} listaImgs={[ReactLog, Html, Css, Javascript, Figma, Capacitor, Electron, Mui]} />
            <DevToolsCard titulo="Back-End" isVisible={devtoolsVisible} listaImgs={[Nodejs, Sql, Json, Mongo]} />
            <DevToolsCard titulo="Business Intelligence" isVisible={devtoolsVisible} listaImgs={[PowerBi]} />

          </div>
        </section>

        <section id='proyectos-section'>
          <h2 className='expContTitulo'>Portfolio <span className='dark-blue'>_</span></h2>
          <div className='proyectos-container' isVisible={portfolioVisible} ref={portfolio}>
            <ProyectCard isWeb={true} mockupType="both" nombre="FITC Training" bio={["Plataforma para coach de fútbol", "React + Vite", "Diseño dinámico y deportivo"]} tecnologias={[ReactLog, Html, Css, Javascript, Figma]} fondoDesktop={FitcDesktop} fondoMobile={FitcMobile} fondo={FitcDesktop} web='https://fitctraining.com/' />
          <ProyectCard isWeb={true} mockupType="both" nombre="Estudios Schreiber" bio={["Estudio de arquitectura", "React + Vite", "Diseño profesional"]} tecnologias={[ReactLog, Html, Css, Javascript, Figma]} fondo={SchreiberDesktop} fondoDesktop={SchreiberDesktop} fondoMobile={SchreiberMobile} web='https://estudioschreiber.ar/' />
            <ProyectCard isWeb={true} mockupType="both" nombre="Siro Transporte" bio={["Empresa de transporte", "SEO-friendly", "100% Responsive"]} tecnologias={[Html, Css, Javascript, Figma]} fondo={Siro} desktopBgPos="center 20%" web={maintenanceUrl('Siro Transporte')} />
            <ProyectCard isWeb={false} mockupType="mobile" nombre="MyPasswords" bio={["App móvil nativa", "Gestor offline de contraseñas", "React + Capacitor"]} tecnologias={[ReactLog, Capacitor, Html, Css, Javascript, Json]} fondo={Mypass} web='https://www.linkedin.com/posts/agustin-chizzini-melo-237224209_buenas-a-todos-paso-a-comentarles-uno-de-activity-7121331172919382016-Cqcw?utm_source=share&utm_medium=member_desktop' />
            <ProyectCard isWeb={true} mockupType="desktop" linkLabel="Descargar" nombre="MyBolucompras" bio={["App de escritorio", "Control de gastos personal", "Actualizaciones automaticas","Electron + JS"]} tecnologias={[ReactLog,Electron, Html, Css, Javascript, Json]} fondo={Mybolucompras} web='https://github.com/chizzi01/MyBolucompras/releases/tag/v0.0.36' />
          </div>
        </section>

        <section id='contacto-section'>
          <div className='contacto-container' isVisible={contactoVisible} ref={contacto} style={isSubmitted ? { backgroundColor: '#3456ff' } : {}}>
            <h2 className='expContTitulo'>Hablemos <span className='dark-blue'>_</span></h2>
            <form action="https://formsubmit.co/aguschizzini@gmail.com" method="POST" onSubmit={async (e) => {
              e.preventDefault();
              setIsSending(true);
              const formData = new FormData(e.target);
              const response = await fetch(e.target.action, {
                method: 'POST',
                body: formData,
                headers: {
                  'Accept': 'application/json'
                }
              });
              if (response.ok) {
                setIsSubmitted(true);
                e.target.reset();
                // Change key to force TextField components to reload
                setKey(prevKey => prevKey + 1);
              } else {
                // There was an error submitting the form
                // You can display an error message here
              }
              setIsSending(false);
            }}>
              <input type="hidden" name="_next" value="" />
              <input type="hidden" name="_subject" value="Nuevo mensaje desde portfolio" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <div className='contacto-align'>
                <div className='contactText-container'>
                  <ThemeProvider theme={theme}>
                    <Textfield forceUpdate={key} indicador={'Nombre'} tipo={'text'} name={"Nombre"} />
                    <Textfield forceUpdate={key} indicador={'Email'} tipo={'email'} name={"Email"} />
                    <Textfield forceUpdate={key} indicador={'Mensaje'} tipo={'textfield'} name={"Mensaje"} />
                  </ThemeProvider>
                </div>
                <div className='btnEnviar'>
                  {isSending ? <button type='submit' disabled>Enviando... </button> : isSubmitted ? <CheckIcon style={{ width: '100px', height: '100px', backgroundColor: '#001931', borderRadius: '60px', color: 'white' }} /> : <button type='submit'>Enviar <SendIcon style={{ padding: '3px' }} /> </button>}
                </div>
              </div>
            </form>
          </div>
        </section>
        <Footer tecnologias={[ReactLog, Html, Css, Javascript]} />

        <SocialLinks />
      </div>

    )
}

