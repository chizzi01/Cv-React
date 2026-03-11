import React from 'react';
import github from '../assets/github.png';
import linkedin from '../assets/linkedin.png';
import email from '../assets/email.png';

export function SocialLinks() {
    return (
        <div className="social-links">
            <div className='items-align'>
                <a href="https://github.com/chizzi01" target='_blank' rel="noopener noreferrer"><img src={github} alt="GitHub" /></a>
                <a href="https://www.linkedin.com/in/agustin-chizzini-melo-237224209/" target='_blank' rel="noopener noreferrer"><img src={linkedin} alt="LinkedIn" /></a>
                <a href="mailto:aguschizzini@gmail.com"><img src={email} alt="Email" /></a>
            </div>
        </div>
    );
}