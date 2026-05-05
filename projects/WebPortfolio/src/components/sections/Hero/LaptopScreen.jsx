import { useMemo } from 'react'
import schreiberMobileImg from '../../../assets/images/schreiber-mobile.png'
import fitcMobileImg      from '../../../assets/images/fitc-mobile.png'
import nearbyMobileImg    from '../../../assets/images/nearby-mobile.png'
import './LaptopScreen.css'

export default function LaptopScreen({ phonesRef }) {
  const stars = useMemo(() =>
    Array.from({ length: 28 }, (_, i) => ({
      id: i,
      left: `${(i * 37.3 + 11) % 100}%`,
      top:  `${(i * 53.7 + 7)  % 100}%`,
      delay: `${(i * 0.4) % 3}s`,
      size: i % 3 === 0 ? '2px' : '1px',
    }))
  , [])
  return (
    <div className="ls-root">

      {/* ── Navbar ───────────────────────────── */}
      <nav className="ls-nav">
        <a href="#inicio" className="ls-logo">ACM <span>·dev</span></a>
        <div className="ls-nav-links">
          <a href="#por-que-yo">Por qué yo</a>
          <a href="#servicios">Servicios</a>
          <a href="#proyectos">Proyectos</a>
          <a href="#proceso">Proceso</a>
          <a href="#tecnologias">Tech</a>
        </div>
        <a href="#contacto" className="ls-nav-cta">Hablemos</a>
      </nav>

      {/* ── Hero ─────────────────────────────── */}
      <div className="ls-hero">
        {/* Stars */}
        {stars.map(s => (
          <div key={s.id} className="ls-star" style={{
            left: s.left, top: s.top,
            animationDelay: s.delay,
            width: s.size, height: s.size,
          }} />
        ))}

        <div className="ls-content">
          <div className="ls-eyebrow">
            <span className="ls-dot" />
            Desarrollo Web Personalizado &nbsp;·&nbsp; Buenos Aires
          </div>

          <h1 className="ls-h1">
            Webs que convierten
            <br />
            <span className="ls-h1-neon">visitantes en clientes</span>
          </h1>

          <p className="ls-sub">
            Sin una web que convierte, cada visita es una oportunidad perdida.
            Diseño y desarrollo sitios únicos, rápidos y de alto impacto — landing pages, e-commerce y apps web a medida.
          </p>

          <div className="ls-btns">
            <a href="#proyectos" className="ls-btn-solid">Ver mis trabajos</a>
            <a href="#contacto" className="ls-btn-ghost">Contame tu proyecto</a>
          </div>

          <div className="ls-stats">
            <div className="ls-stat">
              <span className="ls-stat-value">7+</span>
              <span className="ls-stat-label">Proyectos entregados</span>
            </div>
            <div className="ls-stat">
              <span className="ls-stat-value">3+</span>
              <span className="ls-stat-label">Años de experiencia</span>
            </div>
            <div className="ls-stat">
              <span className="ls-stat-value">&lt;24h</span>
              <span className="ls-stat-label">Tiempo de respuesta</span>
            </div>
          </div>
        </div>

        {/* Mini phone mockups with real screenshots */}
        <div className="ls-phones" ref={phonesRef}>
          <div className="ls-phone ls-phone--purple">
            <img src={schreiberMobileImg} alt="" className="ls-phone-img" />
            <div className="ls-phone-island" />
            <div className="ls-phone-bar" />
          </div>
          <div className="ls-phone ls-phone--green">
            <img src={nearbyMobileImg} alt="" className="ls-phone-img" />
            <div className="ls-phone-island" />
            <div className="ls-phone-bar" />
          </div>
          <div className="ls-phone ls-phone--cyan">
            <img src={fitcMobileImg} alt="" className="ls-phone-img" />
            <div className="ls-phone-island" />
            <div className="ls-phone-bar" />
          </div>
        </div>

        {/* Scroll line */}
        <div className="ls-scroll">
          <div className="ls-scroll-track"><div className="ls-scroll-dot" /></div>
          <span>scroll</span>
        </div>
      </div>

    </div>
  )
}
