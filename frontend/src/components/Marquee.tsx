import { TICKER } from '@/data/content';

// Two identical groups; the track moves -50% so the loop is seamless and always full-width.
export default function Marquee() {
  const g = (k: string) => (
    <ul className="marquee-g" aria-hidden={k === 'b'}>
      {TICKER.map((t) => <li key={t}><i />{t}</li>)}
    </ul>
  );
  return <div className="marquee"><div className="marquee-track">{g('a')}{g('b')}</div></div>;
}
