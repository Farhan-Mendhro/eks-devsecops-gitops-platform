import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import Counter from '@/components/Counter';
import CBtn from '@/components/CBtn';
import { VALUES } from '@/data/content';

export default function About() {
  return (
    <>
      <PageHero crumbs={[['Home', '/'], ['About']]} kicker="[05] About" lines={['Engineers who', <>run what they <span className="acc">build.</span></>]} sub="Synopsis is a small cloud and DevOps studio. The people on your kickoff call are the people writing your pipelines." />
      <section className="paper sec"><div className="wrap">
        <Reveal><div className="facts">
          {[['2016', 'Founded'], ['38', 'Engineers'], ['140+', 'Releases shipped'], ['99.98%', 'Uptime']].map(([v, l]) => <div key={l}><b><Counter value={v} /></b><span className="mono">{l}</span></div>)}
        </div></Reveal>
        <Reveal><p className="tag mono top"><i />[ Principles ]</p><h2 className="h-md">How we work.</h2></Reveal>
        <div className="values">{VALUES.map(([t, d], i) => <Reveal key={t} delay={i * 0.06} className="value"><span className="mono">0{i + 1}</span><h3>{t}</h3><p>{d}</p></Reveal>)}</div>
        <div className="btn-row top"><CBtn to="/contact" light>Talk to us</CBtn></div>
      </div></section>
    </>
  );
}
