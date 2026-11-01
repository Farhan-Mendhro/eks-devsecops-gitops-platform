import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Marquee from '@/components/Marquee';
import CBtn from '@/components/CBtn';
import Reveal from '@/components/Reveal';
import Counter from '@/components/Counter';
import PostRow from '@/components/PostRow';
import Stages from '@/components/Stages';
import { FAQ, SERVICES } from '@/data/content';
import { getFeatured, Post } from '@/lib/api';

export default function Home() {
  const [faq, setFaq] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    let live = true;
    getFeatured().then((f) => {
      if (live) setPosts(Array.isArray(f.data) ? f.data.slice(0, 4) : []);
    }).catch(() => { if (live) setPosts([]); });
    return () => { live = false; };
  }, []);
  return (
    <>
      <PageHero
        crumbs={[['Home']]}
        kicker="[01] Cloud & DevOps studio"
        lines={['Software', <>that <span className="acc">ships.</span></>]}
        sub="Synopsis designs, builds and runs cloud platforms for product teams: Kubernetes, GitOps, CI/CD and security, delivered in two-week sprints."
        aside={<><div className="stat-pair"><div><b><Counter value="99.98%" /></b><span className="mono">Uptime across client apps</span></div><div><b><Counter value="140+" /></b><span className="mono">Releases shipped</span></div></div></>}
      >
        <div className="btn-row"><CBtn to="/contact">Start a project</CBtn><CBtn to="/services" variant="dark">See services</CBtn></div>
      </PageHero>

      <Marquee />

      <section className="paper sec">
        <div className="wrap">
          <Reveal><p className="tag mono"><i />[ What we build ]</p><h2 className="h-lg">Everything a platform needs.</h2></Reveal>
          <ul className="srv-list">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.05}>
                <Link to={`/services/${s.slug}`} className="srv-row">
                  <span className="mono srv-n">{s.n}</span>
                  <span className="srv-t">{s.title}</span>
                  <span className="srv-b">{s.blurb}</span>
                  <span className="srv-s"><b><Counter value={s.stat.v} /></b><em className="mono">{s.stat.l}</em></span>
                  <ArrowRight className="srv-a" size={22} />
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="dark sec">
        <div className="wrap">
          <Reveal><p className="tag mono"><i />[ From the journal ]</p><h2 className="h-lg">Notes from the build.</h2></Reveal>
          <div className="plist">{posts.map((p, i) => <PostRow key={p._id} post={p} index={i} />)}</div>
          <div className="btn-row"><CBtn to="/journal" variant="dark">All articles</CBtn></div>
        </div>
      </section>

      <section className="paper sec">
        <div className="wrap">
          <Reveal><p className="tag mono"><i />[ How it works ]</p><h2 className="h-lg">From brief to <span className="acc">release.</span></h2></Reveal>
          <Stages />
        </div>
      </section>

      <section className="dark sec">
        <div className="wrap faq">
          <Reveal><p className="tag mono"><i />[ FAQ ]</p><h2 className="h-lg">Questions, answered.</h2><p className="sub">Pick a question. The answer runs in the terminal.</p>
            <ol className="faq-l">{FAQ.map(([q], i) => <li key={q}><button className={i === faq ? 'on' : ''} onClick={() => setFaq(i)}><span className="mono">0{i + 1}</span>{q}<ArrowRight size={16} /></button></li>)}</ol>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="term"><div className="term-bar"><i /><i /><i /><span className="mono">synopsis — zsh</span></div>
              <motion.pre key={faq} className="mono" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><span className="ok">$</span> synopsis faq --q 0{faq + 1}{'\n\n'}› {FAQ[faq][0]}{'\n\n'}{FAQ[faq][1]}<span className="caret" /></motion.pre></div>
          </Reveal>
        </div>
      </section>

      <section className="paper sec cta">
        <div className="wrap"><Reveal><h2 className="h-xl2">Let’s build your <span className="acc">platform.</span></h2><p className="sub dk">Tell us what you are running. We reply within one business day.</p><div className="btn-row"><CBtn to="/contact" light>Start a project</CBtn></div></Reveal></div>
      </section>
    </>
  );
}
