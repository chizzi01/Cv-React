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
        <span className="ls-logo">AG</span>
        <div className="ls-nav-links">
          <span>Inicio</span>
          <span>Servicios</span>
          <span>Proyectos</span>
          <span>Contacto</span>
        </div>
        <div className="ls-nav-cta">Hablemos</div>
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
            Desarrollo Web · Buenos Aires
          </div>

          <h1 className="ls-h1">
            Webs que convierten
            <br />
            <span className="ls-h1-neon">visitantes en clientes</span>
          </h1>

          <p className="ls-sub">
            Sitios únicos, rápidos y de alto impacto — landing pages,
            e-commerce y apps web a medida.
          </p>

          <div className="ls-btns">
            <div className="ls-btn-solid">Ver trabajos</div>
            <div className="ls-btn-ghost">Contacto</div>
          </div>
        </div>

        {/* Mini phone mockups with real screenshots */}
        <div className="ls-phones" ref={phonesRef}>
          <div className="ls-phone ls-phone--purple">
            <div className="ls-phone-island" />
            <img src={schreiberMobileImg} alt="" className="ls-phone-img" />
            <div className="ls-phone-bar" />
          </div>
          <div className="ls-phone ls-phone--green">
            <div className="ls-phone-island" />
            <img src={nearbyMobileImg} alt="" className="ls-phone-img" />
            <div className="ls-phone-bar" />
          </div>
          <div className="ls-phone ls-phone--cyan">
            <div className="ls-phone-island" />
            <img src={fitcMobileImg} alt="" className="ls-phone-img" />
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
