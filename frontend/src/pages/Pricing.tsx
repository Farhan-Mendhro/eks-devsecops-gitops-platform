import { Check } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import CBtn from '@/components/CBtn';
import { PLANS, FAQ } from '@/data/content';

export default function Pricing() {
  return (
    <>
      <PageHero crumbs={[['Home', '/'], ['Pricing']]} kicker="[04] Pricing" lines={['Ways to', <>work <span className="acc">together.</span></>]} sub="Fixed price for a first release, a monthly squad for a roadmap, or a retainer to keep a platform healthy." />
      <section className="paper sec"><div className="wrap">
        <div className="plans">{PLANS.map((p, i) => (
          <Reveal key={p.n} delay={i * 0.08} className={`plan ${p.tag === 'Most chosen' ? 'hot' : ''}`}>
            <div className="plan-top mono"><span>{p.n}</span><span>{p.tag}</span></div>
            <h3>{p.name}</h3><p className="plan-p">{p.pitch}</p>
            <div className="plan-price"><b>{p.price}</b><span className="mono">{p.unit}</span></div>
            <ul>{p.items.map((it) => <li key={it}><Check size={15} />{it}</li>)}</ul>
            <CBtn to={`/contact`} light={p.tag !== 'Most chosen'}>Choose plan</CBtn>
          </Reveal>))}</div>
        <p className="mono note">Prices in USD. Sample figures for this demo site.</p>
        <Reveal><h2 className="h-md top">Common questions</h2><dl className="dl">{FAQ.map(([q, a]) => <div key={q}><dt>{q}</dt><dd>{a}</dd></div>)}</dl></Reveal>
      </div></section>
    </>
  );
}
