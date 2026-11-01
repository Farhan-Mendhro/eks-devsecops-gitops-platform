import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

// Re-keying the decorative panel restarts its animation on route changes.
// This avoids imperative controls.start() calls during React StrictMode mounts.
export default function Curtain() {
  const { pathname } = useLocation();

  return (
    <motion.div
      key={pathname}
      className="curtain"
      initial={{ y: '100%' }}
      animate={{ y: ['100%', '0%', '-100%'] }}
      transition={{
        duration: 0.88,
        times: [0, 0.43, 1],
        ease: [0.76, 0, 0.24, 1],
      }}
      aria-hidden="true"
    />
  );
}
