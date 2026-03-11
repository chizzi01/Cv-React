import * as React from 'react';
import { getImgAlt } from '../utils';

export function ProyectCard({ fondo, nombre, bio, tecnologias, web, isWeb, linkLabel = 'Ver proyecto' }) {
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
              alt={getImgAlt(item)}
              className={item.includes('react') ? 'rotate' : ''}
              style={{
                width: '40px',
                height: item.includes('sap') || item.includes('nodejs') ? '70px' : ''
              }} />
          ))}
        </div>
        {isWeb && (
          <div className='btnProyect-container'>
            <a href={web} target='_blank' rel="noopener noreferrer">{linkLabel}</a>
          </div>
        )}
      </div>
    </div>
  );
}