import React from 'react';

export function Card({fondo, titulo, tiempo, lista, color, isVisible}) {
    const animationClass = isVisible ? 'animate' : '';
    return (
        <div className='exp-container'>
            <div className={`cardExp ${animationClass} `} style={{ backgroundImage: `url(${fondo})`}}></div>
            <div className='textExp-align' >
                <h1 className={`titulo ${animationClass}`}>{titulo}</h1>
                <h2 className={`tiempo ${animationClass}`} style={{color:color}}>{tiempo}</h2>
                <ul className={`lista ${animationClass}`}>
                {lista.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}