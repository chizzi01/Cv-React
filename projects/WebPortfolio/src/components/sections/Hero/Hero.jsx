import { motion } from 'framer-motion'
import HeroScene from './HeroScene'
import HeroContent from './HeroContent'
import DeviceMockups from './DeviceMockups'
import './Hero.css'
import './DeviceMockups.css'

export default function Hero() {
  return (
    <section className="hero-section" id="inicio">
      <HeroScene />
      <DeviceMockups />
      <HeroContent />

      {/* Scroll indicator — centered at bottom of section */}
      <motion.div
        className="hero-scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
      >
        <div className="scroll-track">
          <div className="scroll-dot" />
        </div>
        <span className="scroll-label">scroll</span>
      </motion.div>
    </section>
  )
}
