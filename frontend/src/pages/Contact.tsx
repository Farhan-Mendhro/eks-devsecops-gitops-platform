import { useEffect, useState, FormEvent } from 'react';
import PageHero from '@/components/PageHero';
import CBtn from '@/components/CBtn';
import Reveal from '@/components/Reveal';
import { useToast } from '@/components/Toast';

const BUILD = ['Cloud & DevOps', 'Kubernetes', 'DevSecOps', 'Observability', 'Platform', 'Cloud Security'];
const BUDGET = ['< $6K', '$6-15K', '$15-40K', '$40K+'];
const NEXT = [['We reply within one business day', 'A senior engineer reads your brief and asks the questions that matter.'], ['A free 30-minute scoping call', 'We talk through the platform, the risks and what to build first.'], ['A fixed quote for the first release', 'Scope, timeline and price in writing, usually within three days.']];
const TZ = 'Asia/Karachi';

// No backend endpoint exists for contact, so Send composes an email in the visitor's mail client.
export default function Contact() {
  const toast = useToast();
  const [f, setF] = useState({ name: '', email: '', company: '', build: [] as string[], budget: '', timeline: 'As soon as possible', msg: '' });
  const [time, setTime] = useState('');
  useEffect(() => {
    const t = () => setTime(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: TZ }));
    t(); const i = setInterval(t, 20000); return () => clearInterval(i);
  }, []);
  const toggle = (c: string) => setF({ ...f, build: f.build.includes(c) ? f.build.filter((x) => x !== c) : [...f.build, c] });
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!f.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email) || f.msg.trim().length < 10) return toast('Enter your name, a valid email and a project description (10+ characters).', 'err');
    const body = `${f.msg}\n\nCompany: ${f.company || '-'}\nBuilding: ${f.build.join(', ') || '-'}\nBudget: ${f.budget || '-'}\nTimeline: ${f.timeline}\n\n${f.name} <${f.email}>`;
    window.location.href = `mailto:hello@synopsis.dev?subject=${encodeURIComponent('Project brief from ' + f.name)}&body=${encodeURIComponent(body)}`;
    toast('Opening your email app…');
  };
  return (
    <>
      <PageHero crumbs={[['Home', '/'], ['Contact']]} kicker="[ Contact ]" lines={['Start a', <><span className="acc">project</span></>]} sub="Tell us what you are building. A senior engineer reads every message and replies within one business day." />
      <section className="dark sec cpage"><div className="wrap two-c">
        <Reveal>
          <form className="cform" onSubmit={submit} noValidate>
            <div className="fr2">
              <label className="fbox"><span className="mono">Your name *</span><input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></label>
              <label className="fbox"><span className="mono">Work email *</span><input type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></label>
            </div>
            <label className="fbox"><span className="mono">Company</span><input value={f.company} onChange={(e) => setF({ ...f, company: e.target.value })} /></label>
            <p className="mono flab">What are you building?</p>
            <div className="opts">{BUILD.map((c) => <button type="button" key={c} className={`opt mono ${f.build.includes(c) ? 'on' : ''}`} aria-pressed={f.build.includes(c)} onClick={() => toggle(c)}><i />{c}</button>)}</div>
            <p className="mono flab">Budget</p>
            <div className="opts">{BUDGET.map((c) => <button type="button" key={c} className={`opt mono ${f.budget === c ? 'on' : ''}`} aria-pressed={f.budget === c} onClick={() => setF({ ...f, budget: f.budget === c ? '' : c })}><i />{c}</button>)}</div>
            <label className="fbox"><span className="mono">Timeline</span>
              <select value={f.timeline} onChange={(e) => setF({ ...f, timeline: e.target.value })}>{['As soon as possible', 'Within 1 month', 'Within 3 months', 'Just exploring'].map((t) => <option key={t}>{t}</option>)}</select></label>
            <label className="fbox"><span className="mono">Tell us about the project</span><textarea rows={5} placeholder="What it does, who it is for, and what already exists." value={f.msg} onChange={(e) => setF({ ...f, msg: e.target.value })} /></label>
            <div><CBtn type="submit">Send the brief</CBtn></div>
          </form>
        </Reveal>
        <Reveal delay={0.1}>
          <aside className="cside">
            <p className="mono dim">Write directly</p>
            <a className="cmail" href="mailto:hello@synopsis.dev">hello@synopsis.dev</a>
            <div className="cgrid">
              <div><p className="mono dim">Call</p><p>+92 21 555 0142</p></div>
              <div><p className="mono dim">Local time</p><p className="ctime">{time}</p><p className="mono dim">Karachi</p></div>
              <div><p className="mono dim">Visit</p><p>Remote-first studio<br />Karachi, Pakistan</p></div>
              <div><p className="mono dim">Hours</p><p>Mon-Fri 09:00-18:00 PKT</p></div>
            </div>
            <p className="mono dim nx">What happens next</p>
            <ol className="next-l">{NEXT.map(([t, d], i) => <li key={t}><span className="mono">0{i + 1}</span><div><b>{t}</b><p>{d}</p></div></li>)}</ol>
            <p className="mono dim sample">Contact details are sample placeholders.</p>
          </aside>
        </Reveal>
      </div></section>
    </>
  );
}
