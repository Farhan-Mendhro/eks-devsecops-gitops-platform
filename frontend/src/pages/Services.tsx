import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import Marquee from '@/components/Marquee';
import Counter from '@/components/Counter';
import { SERVICES } from '@/data/content';

export default function Services() {
  return (
    <>
      <PageHero crumbs={[['Home', '/'], ['Services']]} kicker="[02] Services" lines={['Six teams.', <>One <span className="acc">platform.</span></>]} sub="Pick one service or combine them. Every engagement ships working software every two weeks." />
      <Marquee />
      <section className="paper sec"><div className="wrap">
        <ul className="srv-list">{SERVICES.map((s, i) => (
          <Reveal key={s.slug} delay={i * 0.04}><Link to={`/services/${s.slug}`} className="srv-row">
            <span className="mono srv-n">{s.n}</span><span className="srv-t">{s.title}</span><span className="srv-b">{s.blurb}</span>
            <span className="srv-s"><b><Counter value={s.stat.v} /></b><em className="mono">{s.stat.l}</em></span><ArrowRight className="srv-a" size={22} />
          </Link></Reveal>))}</ul>
      </div></section>
    </>
  );
}
