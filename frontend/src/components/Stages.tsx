import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check } from 'lucide-react';
import { STAGES } from '@/data/content';

// Pipeline-style stepper: stages turn PASSED one after another when scrolled into view.
export default function Stages() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [done, setDone] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const t = STAGES.map((_, i) => setTimeout(() => setDone(i + 1), 500 + i * 650));
    return () => t.forEach(clearTimeout);
  }, [inView]);
  return (
    <div ref={ref} className="stages">
      <div className="stages-line"><motion.span animate={{ scaleX: done / STAGES.length }} transition={{ duration: 0.6 }} /></div>
      <div className="stages-grid">
        {STAGES.map((s, i) => (
          <div key={s.n} className={`stage ${i < done ? 'passed' : ''}`}>
            <i className="stage-dot" />
            <div className="stage-top mono"><span>STAGE {s.n}</span><span>{i < done ? <><Check size={12} /> PASSED</> : '···'}</span></div>
            <h3>{s.title}</h3><p>{s.body}</p><em className="mono">{s.when}</em>
          </div>
        ))}
      </div>
    </div>
  );
}
