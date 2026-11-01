import { ReactNode } from 'react';
import { motion } from 'framer-motion';

export default function Reveal({ children, delay = 0, className, y = 28 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

// Headline whose lines slide up from a mask.
export function Lines({ lines, className }: { lines: ReactNode[]; className?: string }) {
  return (
    <h1 className={className}>
      {lines.map((l, i) => (
        <span className="mask" key={i}>
          <motion.span style={{ display: 'block' }} initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}>{l}</motion.span>
        </span>
      ))}
    </h1>
  );
}
