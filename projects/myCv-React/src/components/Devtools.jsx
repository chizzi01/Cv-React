import React from "react";

export function DevToolsCard({ titulo, listaImgs }) {

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    return (
        <div className='devtools-card'>
            <h1>{titulo}</h1>
            <div className='devtools-img'>
                {listaImgs.map((item, index) => (
                    <img key={index}
                        src={item}
                        alt={item}
                        className={item.includes('react') ? 'rotate' : ''}
                        style={
                            item.includes('sql') 
                            ? {width: '110px'} 
                            : (item.includes('sap') || item.includes('nodejs')) 
                            ? (isMobile ? {width: '70px'} : {}) 
                            : {}
                        }                         />
                ))}
            </div>
        </div>

    );

}

