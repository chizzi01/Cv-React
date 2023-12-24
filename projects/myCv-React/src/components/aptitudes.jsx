import React from 'react';

export function Aptitudes({ isVisible }) {
    const animationClass = isVisible ? 'animate' : '';
    return (
        <div className='aptitudes-container' >
            <div className='line1'>
            <ul className='line1-align'>
                    <li className='rgb'>Creativo ✨</li>
                    <li className={`animation1 ${animationClass}`}>Trabajo en equipo 🤝</li>
                    <li className={`animation2 ${animationClass}`}>Autodidacta 📘</li>
                </ul>
            </div>
            <div className='line2'>
                <ul className='line2-align'>
                    <li className={`animation3  ${animationClass}`}>Proactivo</li>
                    <li className={`animation4 ${animationClass}`}>Responsable ✅</li>
                    <li className={`animation5 ${animationClass}`}>Comprometido</li>
                </ul>
            </div>
            <div className='line3'>
                <ul className='line3-align'>
                    <li className={`animation6 ${animationClass}`}>Adaptativo 🔌</li>
                    <li className={`animation7 ${animationClass}`}>Solucionador de <span style={{color:"#FF4141"}}>problemas ⚠ </span></li>
                </ul>
            </div>
        </div>
    );
}