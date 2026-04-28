import { useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation, staggerFast, fadeUp, cardReveal3D } from '../../../hooks/useScrollAnimation'
import SectionTitle from '../../ui/SectionTitle'
import NeonButton from '../../ui/NeonButton'
import './Contact.css'

export default function Contact() {
  const { ref, inView } = useScrollAnimation({ threshold: 0.05 })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const form = e.target
    const data = new FormData(form)

    try {
      await fetch('https://formsubmit.co/ajax/aguschizzini@gmail.com', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      setSent(true)
    } catch {
      setSent(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="contact-section section-container" id="contacto">
      <div className="section-wrapper">
        <SectionTitle
          eyebrow="¿Listo para empezar?"
          title="Contacto"
          color="cyan"
        />

        <motion.div
          ref={ref}
          className="contact-inner"
          variants={staggerFast}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div className="contact-info" variants={fadeUp}>
            <p className="contact-tagline">
              Contame sobre tu proyecto y <span>construyamos algo increíble</span> juntos.
            </p>
            <p className="contact-info-text">
              Trabajo con emprendedores, empresas y profesionales que quieren una presencia digital que destaque. Respondo en menos de 24 horas.
            </p>
            <div className="contact-direct">
              <a href="mailto:aguschizzini@gmail.com" className="contact-direct-link">
                📧 aguschizzini@gmail.com
              </a>
              <a
                href="https://github.com/chizzi01"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-direct-link"
              >
                💻 github.com/chizzi01
              </a>
              <a
                href="https://www.linkedin.com/in/agustin-chizzini-melo-237224209/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-direct-link"
              >
                🔗 LinkedIn
              </a>
            </div>
          </motion.div>

          <motion.div className="contact-form-wrapper glass-card glass-card--cyan" variants={cardReveal3D}>
            {sent ? (
              <div className="form-success">
                <div className="form-success-icon">✓</div>
                <h3>¡Mensaje enviado!</h3>
                <p>Te respondo en menos de 24 horas. ¡Gracias por escribirme!</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_subject" value="Nuevo contacto desde WebPortfolio" />
                <input type="hidden" name="_template" value="table" />

                <div className="form-group">
                  <label className="form-label" htmlFor="nombre">Nombre</label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    className="form-input"
                    placeholder="Tu nombre"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-input"
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="proyecto">Tipo de proyecto</label>
                  <select id="proyecto" name="proyecto" className="form-select" required>
                    <option value="">Seleccioná una opción</option>
                    <option value="Landing Page">Landing Page</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Portfolio">Portfolio</option>
                    <option value="App Web">App Web</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="mensaje">Mensaje</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    className="form-textarea"
                    placeholder="Contame sobre tu proyecto..."
                    required
                  />
                </div>

                <div className="form-submit-btn">
                  <NeonButton type="submit" variant="solid" color="cyan">
                    {loading ? 'Enviando...' : 'Enviar mensaje →'}
                  </NeonButton>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
