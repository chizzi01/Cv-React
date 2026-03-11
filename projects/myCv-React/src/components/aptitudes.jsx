import React from 'react';

export function Aptitudes({ isVisible }) {
    const language = localStorage.getItem('language');

    const TrabajoEnEquipo = language === 'es' ? 'Trabajo en equipo 🤝' : 'Team player 🤝';
    const Autodidacta = language === 'es' ? 'Aprendizaje continuo 📘' : 'Continuous learning 📘';
    const Proactivo = language === 'es' ? 'Iniciativa propia 🚀' : 'Self-starter 🚀';
    const Responsable = language === 'es' ? 'Orientado a resultados ✅' : 'Results-driven ✅';
    const Comprometido = language === 'es' ? 'Compromiso con la calidad' : 'Quality-focused';
    const Adaptativo = language === 'es' ? 'Adaptable al cambio 🔌' : 'Adaptable 🔌';
    const SolucionadorDeProblemas = language === 'es' ? 'Resolución de problemas ⚠️' : 'Problem solver ⚠️';


    const animationClass = isVisible ? 'animate' : '';
    return (
        <div className='aptitudes-container' >
            <div className='line1'>
            <ul className='line1-align'>
                    <li className='rgb'>Pensamiento creativo ✨</li>
                    <li className={`animation1 ${animationClass}`}>{TrabajoEnEquipo}</li>
                    <li className={`animation2 ${animationClass}`}>{Autodidacta}</li>
                </ul>
            </div>
            <div className='line2'>
                <ul className='line2-align'>
                    <li className={`animation3  ${animationClass}`}>{Proactivo}</li>
                    <li className={`animation4 ${animationClass}`}>{Responsable}</li>
                    <li className={`animation5 ${animationClass}`}>{Comprometido}</li>
                </ul>
            </div>
            <div className='line3'>
                <ul className='line3-align'>
                    <li className={`animation6 ${animationClass}`}>{Adaptativo}</li>
                    <li className={`animation7 ${animationClass}`}>{SolucionadorDeProblemas}</li>
                </ul>
            </div>
        </div>
    );
}