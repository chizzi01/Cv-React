import * as React from 'react';
import { getImgAlt } from '../utils';

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

function MobileMockup({ fondo }) {
  return (
    <div className="mockup-mobile">
      <div className="mockup-mobile__body">
        <div className="mockup-mobile__screen-area">
          <div className="mockup-mobile__island" />
          <div className="mockup-mobile__screen" style={{ backgroundImage: `url(${fondo})` }} />
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
  desktopBgPos = 'top center'
}) {
  const imgDesktop = fondoDesktop ?? fondo;
  const imgMobile  = fondoMobile  ?? fondo;

  return (
    <div className='cardProyect-container'>
      <div className={`mockup-wrap mockup-wrap--${mockupType}`}>
        {(mockupType === 'both' || mockupType === 'desktop') && <DesktopMockup fondo={imgDesktop} bgPos={desktopBgPos} />}
        {(mockupType === 'both' || mockupType === 'mobile')  && <MobileMockup  fondo={imgMobile}  />}
      </div>

      <div className='cardProyect-info'>
        <div className='cardProyect-header'>
          <h3>{nombre}</h3>
          {isWeb && (
            <a href={web} target='_blank' rel="noopener noreferrer" className='cardProyect-btn'>
              {linkLabel} <span>→</span>
            </a>
          )}
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
