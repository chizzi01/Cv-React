import { useState } from 'react'
import NeonButton from '../ui/NeonButton'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'Por qué yo',  href: '#por-que-yo' },
  { label: 'Servicios',   href: '#servicios' },
  { label: 'Proyectos',   href: '#proyectos' },
  { label: 'Proceso',     href: '#proceso' },
  { label: 'Tech',        href: '#tecnologias' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="navbar">
        <a href="#inicio" className="navbar-logo">
          ACM <span>·dev</span>
        </a>

        <ul className="navbar-links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="navbar-link">{link.label}</a>
            </li>
          ))}
        </ul>

        <div className="navbar-cta">
          <NeonButton href="#contacto" variant="ghost" color="cyan">
            Hablemos
          </NeonButton>
        </div>

        <button
          className={`navbar-hamburger ${open ? 'open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
        </button>
      </nav>

      <div className={`navbar-drawer ${open ? 'open' : ''}`}>
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="navbar-link"
            onClick={() => setOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contacto"
          className="navbar-link"
          onClick={() => setOpen(false)}
        >
          Contacto
        </a>
      </div>
    </>
  )
}
