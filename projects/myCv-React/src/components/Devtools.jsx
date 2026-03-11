import React from "react";
import { getImgAlt } from '../utils';

export function DevToolsCard({ titulo, listaImgs, isVisible }) {

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const animationClass = isVisible ? 'displayDevtools' : '';

    return (
        <div className='devtools-card'>
            <h1>{titulo}</h1>
            <div className='devtools-img'>
                {listaImgs.map((item, index) => (
                    <img key={index}
                        src={item}
                        alt={getImgAlt(item)}
                        className={item.includes('react') ? 'rotate' : animationClass}
                        style={
                            {
                                animationDelay: `${index * 0.1}s`,
                                ...item.includes('sql')
                                    ? { width: '110px' }
                                    : (item.includes('sap') || item.includes('nodejs'))
                                        ? (isMobile ? { width: '70px' } : {})
                                        : {}
                            }
                        }
                    />
                ))}
            </div>
        </div>

    );

}

