import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Lines } from './Reveal';
import SecureCloud from './SecureCloud';

export default function PageHero({ crumbs, kicker, lines, sub, children, aside }: { crumbs: [string, string?][]; kicker?: string; lines: ReactNode[]; sub?: string; children?: ReactNode; aside?: ReactNode }) {
  return (
    <section className="phero">
      <div className="wrap phero-in">
        <div>
          <p className="crumbs mono">{crumbs.map(([l, to], i) => <span key={l}>{to ? <Link to={to}>{l}</Link> : <b>{l}</b>}{i < crumbs.length - 1 && ' / '}</span>)}</p>
          {kicker && <p className="kick mono">{kicker}</p>}
          <Lines lines={lines} className="h-xl" />
          {sub && <p className="sub">{sub}</p>}
          {children}
        </div>
        <div className="phero-aside"><SecureCloud />{aside}</div>
      </div>
    </section>
  );
}
