import { motion } from 'framer-motion'
import fitcDesktopImg    from '../../../assets/images/fitc-desktop.png'
import schreiberMobileImg from '../../../assets/images/schreiber-mobile.png'
import fitcMobileImg     from '../../../assets/images/fitc-mobile.png'
import nearbyMobileImg   from '../../../assets/images/nearby-mobile.png'

function PhoneMockup({ image, delay = 0, rotate = -8, x = 0, neonColor = 'cyan' }) {
  const colors = {
    cyan:   { border: 'rgba(0,255,255,0.35)',   glow: 'rgba(0,255,255,0.12)' },
    purple: { border: 'rgba(191,0,255,0.35)',   glow: 'rgba(191,0,255,0.12)' },
    pink:   { border: 'rgba(255,0,168,0.35)',   glow: 'rgba(255,0,168,0.12)' },
    green:  { border: 'rgba(0,255,136,0.35)',   glow: 'rgba(0,255,136,0.12)' },
  }
  const c = colors[neonColor]

  return (
    <motion.div
      className="device-phone"
      style={{
        border: `1.5px solid ${c.border}`,
        boxShadow: `0 0 40px ${c.glow}, 0 24px 60px rgba(0,0,0,0.6)`,
        rotate,
        x,
      }}
      initial={{ opacity: 0, y: 60, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.04, rotate: rotate * 0.4, transition: { duration: 0.4 } }}
    >
      <motion.div
        className="device-phone-float"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
      >
        <div className="device-phone-inner">
          <div className="device-island" />
          <img src={image} alt="" className="device-screen-img" loading="lazy" />
          <div className="device-home-bar" />
        </div>
      </motion.div>
    </motion.div>
  )
}

function LaptopMockup({ image, delay = 0 }) {
  return (
    <motion.div
      className="device-laptop"
      initial={{ opacity: 0, y: 50, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02, transition: { duration: 0.4 } }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="device-laptop-lid">
          <div className="device-laptop-camera" />
          <div className="device-laptop-screen">
            <img src={image} alt="" className="device-screen-img" loading="lazy" />
            <div className="device-laptop-overlay" />
          </div>
        </div>
        <div className="device-laptop-hinge" />
        <div className="device-laptop-base">
          <div className="device-laptop-trackpad" />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function DeviceMockups() {
  return (
    <div className="devices-container">
      <LaptopMockup image={fitcDesktopImg} delay={0.5} />
      <div className="devices-phones">
        <PhoneMockup image={schreiberMobileImg} delay={0.7} rotate={-10} neonColor="purple" />
        <PhoneMockup image={nearbyMobileImg}    delay={0.9} rotate={4}   neonColor="green"  x={-8} />
        <PhoneMockup image={fitcMobileImg}      delay={1.1} rotate={-5}  neonColor="cyan"   />
      </div>
    </div>
  )
}
