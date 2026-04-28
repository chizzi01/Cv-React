import { useInView } from 'react-intersection-observer'

export function useScrollAnimation(options = {}) {
  const [ref, inView] = useInView({
    threshold:   options.threshold  ?? 0.1,
    triggerOnce: options.triggerOnce ?? false,
    rootMargin:  options.rootMargin  ?? '-5% 0px -5% 0px',
  })
  return { ref, inView }
}

/* ── Base variants ────────────────────────────── */

export const fadeUp = {
  hidden:  { opacity: 0, y: 40, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
}

export const fadeIn = {
  hidden:  { opacity: 0, transition: { duration: 0.3 } },
  visible: { opacity: 1, transition: { duration: 0.5 } },
}

export const slideLeft = {
  hidden:  { opacity: 0, x: -40, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  visible: { opacity: 1, x: 0,   transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

/* ── Agency-style variants ────────────────────── */

export const cardReveal3D = {
  hidden:  { opacity: 0, y: 60, scale: 0.93, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  visible: (i = 0) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
}

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.55, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  visible: (i = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: i * 0.06 },
  }),
}

export const dropIn = {
  hidden:  { opacity: 0, y: -36, scale: 0.9, transition: { duration: 0.4,  ease: [0.22, 1, 0.36, 1] } },
  visible: (i = 0) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
}

/* ── SectionTitle internal variants ──────────── */

export const titleBlockContainer = {
  hidden:  { transition: { staggerChildren: 0.06, staggerDirection: -1 } },
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0 } },
}

export const eyebrowReveal = {
  hidden:  { opacity: 0, x: -22, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  visible: { opacity: 1, x: 0,   transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export const titleClip = {
  hidden:  { y: '115%', transition: { duration: 0.5,  ease: [0.76, 0, 0.24, 1] } },
  visible: { y: '0%',   transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] } },
}

export const subtitleReveal = {
  hidden:  { opacity: 0, y: 20, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.6,  ease: [0.22, 1, 0.36, 1] } },
}

export const lineReveal = {
  hidden:  { scaleX: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  visible: { scaleX: 1, transition: { duration: 0.6,  ease: [0.22, 1, 0.36, 1] } },
}
