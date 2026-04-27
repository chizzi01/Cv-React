import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">ACM <span className="footer-logo-dev">·dev</span></span>
          <p className="footer-tagline">Webs que convierten.</p>
        </div>
        <div className="footer-links">
          <a href="mailto:aguschizzini@gmail.com" className="footer-link">aguschizzini@gmail.com</a>
          <a href="https://github.com/chizzi01" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
          <a href="https://www.linkedin.com/in/agustin-chizzini-melo-237224209/" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-copy">© {new Date().getFullYear()} Agustin Chizzini Melo. Buenos Aires, Argentina.</span>
      </div>
    </footer>
  )
}
