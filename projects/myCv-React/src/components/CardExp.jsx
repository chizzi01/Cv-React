import React from 'react';

export function Card({fondo, titulo, tiempo, lista, color}) {
    return (
        <div className='exp-container'>
            <div className="cardExp" style={{ backgroundImage: `url(${fondo})`}}></div>
            <div className='textExp-align' >
                <h1 className='titulo'>{titulo}</h1>
                <h2 className='tiempo' style={{color:color}}>{tiempo}</h2>
                <ul>
                {lista.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}