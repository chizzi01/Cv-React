import * as React from 'react';

export function ProyectCard({ fondo, nombre, bio, tecnologias, web, isWeb }) {
  return (
    <div className='cardProyect-container'>
      <div className='imgProyect-side' style={{backgroundImage: `url(${fondo})`}}></div>
      <div className='textProyect-side'>
        <h3>{nombre}</h3>
        <ul>{bio.map((item, index) => (<li key={index}>{item}</li>))}</ul>
        <div className='tecProyect-container'>
          {tecnologias.map((item, index) => (
            <img key={index}
              src={item}
              alt={item}
              className={item.includes('react.svg') ? 'rotate' : ''}
              style={{ 
                width: '40px',
                height: item.includes('sap.png') || item.includes('nodejs.png') ? '70px' : '' 
              }} />
          ))}
        </div>
        <div className='btnProyect-container' style={{
          visibility: isWeb ? 'visible' : 'hidden',
        }}>
          <a href={web} target='_blank'>Ver web</a>
        </div>
      </div>
    </div>
  );
}