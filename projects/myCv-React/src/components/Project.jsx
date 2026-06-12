import * as React from 'react';
import { getImgAlt } from '../utils';

function GooglePlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.18 23.76c.37.2.8.22 1.19.07L15.5 12 4.37.17C3.98.02 3.55.04 3.18.24 2.46.64 2 1.4 2 2.23v19.54c0 .83.46 1.59 1.18 1.99z" fill="#32BBFF"/>
      <path d="M20.07 10.09 17.2 8.46 13.72 12l3.48 3.54 2.87-1.63A2.27 2.27 0 0 0 21.3 12c0-.8-.47-1.54-1.23-1.91z" fill="#FFD400"/>
      <path d="M4.37.17 15.5 12 4.37 23.83c-.09-.04-.18-.09-.27-.15l-.06-.04-.86-.5A2.27 2.27 0 0 1 2 21.77V2.23C2 1.4 2.46.64 3.18.24L4.1.1z" fill="#32BBFF"/>
      <path d="m4.37 23.83 11.13-11.83-2.88-2.88L4.1 23.9l.27-.07z" fill="#00AAFF"/>
      <path d="M15.5 12 4.37.17l-.27.07 8.52 14.68z" fill="#00AAFF"/>
      <path d="m13.72 12-2.1-2.1L4.1.1 15.5 12z" fill="#43D854"/>
      <path d="m13.72 12 1.78 1.78L4.1 23.9l9.62-11.9z" fill="#00CC4A"/>
      <path d="M17.2 15.54 13.72 12l1.78 1.78 2.3 2.31-.6-.55z" fill="#E6A800"/>
    </svg>
  );
}

function DesktopMockup({ fondo, bgPos = 'top center' }) {
  return (
    <div className="mockup-desktop">
      <div className="mockup-desktop__chrome">
        <div className="mockup-desktop__dots">
          <span className="dot dot--red" />
          <span className="dot dot--yellow" />
          <span className="dot dot--green" />
        </div>
        <div className="mockup-desktop__urlbar">
          <span className="mockup-desktop__lock" />
          <span className="mockup-desktop__url-text" />
        </div>
      </div>
      <div className="mockup-desktop__screen" style={{ backgroundImage: `url(${fondo})`, backgroundPosition: bgPos }}>
        <div className="mockup-desktop__screen-fade" />
      </div>
    </div>
  );
}

function MobileMockup({ fondo, bgSize = 'cover', height }) {
  return (
    <div className="mockup-mobile" style={height ? { height } : undefined}>
      <div className="mockup-mobile__body">
        <div className="mockup-mobile__screen-area">
          <div className="mockup-mobile__island" />
          <div className="mockup-mobile__screen" style={{ backgroundImage: `url(${fondo})`, backgroundSize: bgSize }} />
          <div className="mockup-mobile__home" />
        </div>
      </div>
    </div>
  );
}

export function ProyectCard({
  fondo,
  fondoDesktop,
  fondoMobile,
  nombre,
  bio,
  tecnologias,
  web,
  isWeb,
  linkLabel = 'Ver proyecto',
  mockupType = 'both',
  desktopBgPos = 'top center',
  mobileBgSize = 'contain',
  mobileHeight,
  storeUrl
}) {
  const imgDesktop = fondoDesktop ?? fondo;
  const imgMobile  = fondoMobile  ?? fondo;

  return (
    <div className='cardProyect-container'>
      <div className={`mockup-wrap mockup-wrap--${mockupType}`}>
        {(mockupType === 'both' || mockupType === 'desktop') && <DesktopMockup fondo={imgDesktop} bgPos={desktopBgPos} />}
        {(mockupType === 'both' || mockupType === 'mobile')  && <MobileMockup  fondo={imgMobile} bgSize={mobileBgSize} height={mobileHeight} />}
      </div>

      <div className='cardProyect-info'>
        <div className='cardProyect-header'>
          <h3>{nombre}</h3>
          <div className='cardProyect-actions'>
            {isWeb && (
              <a href={web} target='_blank' rel="noopener noreferrer" className='cardProyect-btn'>
                {linkLabel} <span>→</span>
              </a>
            )}
            {storeUrl && (
              <a href={storeUrl} target='_blank' rel="noopener noreferrer" className='cardProyect-btn cardProyect-btn--store'>
                <GooglePlayIcon /> Play Store
              </a>
            )}
          </div>
        </div>
        <ul className='cardProyect-bio'>
          {bio.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
        <div className='tecProyect-container'>
          {tecnologias.map((item, index) => (
            <img key={index}
              src={item}
              alt={getImgAlt(item)}
              className={item.includes('react') ? 'rotate' : ''}
              style={{
                width: '40px',
                height: item.includes('sap') || item.includes('nodejs') ? '70px' : ''
              }} />
          ))}
        </div>
      </div>
    </div>
  );
}
