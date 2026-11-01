import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Mark } from './Logo';

const STEPS = ['Compiling modules', 'Running 318 tests', 'Deploying', 'Live'];

export default function Boot() {
  const [show, setShow] = useState(() => !sessionStorage.getItem('synopsis_boot'));
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!show) return;
    const t = setInterval(() => setI((n) => Math.min(n + 1, STEPS.length - 1)), 300);
    const d = setTimeout(() => { sessionStorage.setItem('synopsis_boot', '1'); setShow(false); }, 1500);
    return () => { clearInterval(t); clearTimeout(d); };
  }, [show]);
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="boot" exit={{ y: '-100%' }} transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}>
          <Mark size={40} />
          <ul>{STEPS.map((s, n) => <li key={s} className={n <= i ? 'on' : ''}>{n < i ? '✓' : n === i ? '›' : '\u00a0'} {s}</li>)}</ul>
          <div className="boot-bar"><span style={{ width: `${((i + 1) / STEPS.length) * 100}%` }} /></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
