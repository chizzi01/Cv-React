import { useInView } from 'react-intersection-observer'

export function useScrollAnimation(options = {}) {
  const [ref, inView] = useInView({
    threshold: options.threshold ?? 0.15,
    triggerOnce: options.triggerOnce ?? true,
  })
  return { ref, inView }
}

export const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
}

export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
}

export const slideLeft = {
  hidden:  { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}
