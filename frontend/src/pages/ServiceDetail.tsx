import { Link, useParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import PageHero from '@/components/PageHero';
import CBtn from '@/components/CBtn';
import Reveal from '@/components/Reveal';
import Counter from '@/components/Counter';
import { SERVICES } from '@/data/content';
import NotFound from './NotFound';

export default function ServiceDetail() {
  const { slug } = useParams();
  const s = SERVICES.find((x) => x.slug === slug);
  if (!s) return <NotFound />;
  const next = SERVICES[(SERVICES.indexOf(s) + 1) % SERVICES.length];
  return (
    <>
      <PageHero crumbs={[['Home', '/'], ['Services', '/services'], [s.title]]} kicker={`${s.n} / 06 · ${s.title.split(' ')[0]}`} lines={s.title.toUpperCase().split(' & ').length > 1 ? [`${s.title.split(' & ')[0]} &`, s.title.split(' & ')[1]] : [s.title]} sub={s.blurb}
        aside={<><div className="stat-pair"><div><b><Counter value={s.stat.v} /></b><span className="mono">{s.stat.l}</span></div></div></>}>
        <div className="btn-row"><CBtn to="/contact">Start a project</CBtn><CBtn to="/pricing" variant="dark">See pricing</CBtn></div>
      </PageHero>
      <section className="paper sec"><div className="wrap two">
        <Reveal><p className="tag mono"><i />[ Overview ]</p><h2 className="h-md">What this covers.</h2><p className="body-lg">{s.long}</p>
          <p className="tag mono top"><i />[ Tools ]</p><div className="chips">{s.stack.map((t) => <span key={t} className="chip mono">{t}</span>)}</div></Reveal>
        <Reveal delay={0.1}><p className="tag mono"><i />[ Deliverables ]</p><ul className="checks">{s.deliver.map((d) => <li key={d}><Check size={16} />{d}</li>)}</ul></Reveal>
      </div></section>
      <section className="dark sec"><div className="wrap next"><p className="tag mono"><i />[ Next service ]</p><Link to={`/services/${next.slug}`} className="h-lg link-big">{next.title} →</Link></div></section>
    </>
  );
}
