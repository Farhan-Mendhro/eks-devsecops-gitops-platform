import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

// Animates the first number found in `value` (e.g. "99.98%" or "< 5 min").
export default function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const m = value.match(/[\d.]+/);
  const target = m ? parseFloat(m[0]) : null;
  const decimals = m && m[0].includes('.') ? m[0].split('.')[1].length : 0;
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView || target === null) return;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 1400);
      setN(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);
  if (target === null || !m) return <span ref={ref}>{value}</span>;
  return <span ref={ref}>{value.replace(m[0], n.toFixed(decimals))}</span>;
}
