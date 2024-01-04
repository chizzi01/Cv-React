import React from 'react';

export function Aptitudes({ isVisible }) {
    const language = localStorage.getItem('language');

    const TrabajoEnEquipo = language === 'es' ? 'Trabajo en equipo 🤝' : 'Teamwork 🤝';
    const Autodidacta = language === 'es' ? 'Autodidacta 📘' : 'Self-taught 📘';
    const Proactivo = language === 'es' ? 'Proactivo' : 'Proactive';
    const Responsable = language === 'es' ? 'Responsable ✅' : 'Responsible ✅';
    const Comprometido = language === 'es' ? 'Comprometido' : 'Committed';
    const Adaptativo = language === 'es' ? 'Adaptativo 🔌' : 'Adaptive 🔌';
    const SolucionadorDeProblemas = language === 'en' ? 'Solucionador de problemas ⚠' : 'Problem solver ⚠';


    const animationClass = isVisible ? 'animate' : '';
    return (
        <div className='aptitudes-container' >
            <div className='line1'>
            <ul className='line1-align'>
                    <li className='rgb'>Creativo ✨</li>
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
                    <li className={`animation7 ${animationClass}`}>Solucionador de <span style={{color:"#FF4141"}}>problemas ⚠ </span></li>
                </ul>
            </div>
        </div>
    );
}