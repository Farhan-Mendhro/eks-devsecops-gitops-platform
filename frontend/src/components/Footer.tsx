import { Link } from 'react-router-dom';
import { SERVICES } from '@/data/content';

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr-top">
          <div><p className="mono dim">Have a platform in mind?</p><a className="ftr-mail" href="mailto:hello@synopsis.dev">hello@synopsis.dev</a><p className="mono ok"><i className="pulse" /> Now booking Q4 builds</p></div>
          <div><h4 className="mono dim">Services</h4>{SERVICES.map((s) => <Link key={s.slug} to={`/services/${s.slug}`}>{s.title}</Link>)}</div>
          <div><h4 className="mono dim">Company</h4><Link to="/process">Process</Link><Link to="/pricing">Pricing</Link><Link to="/about">About</Link><Link to="/journal">Journal</Link><Link to="/contact">Contact</Link></div>
          <div><h4 className="mono dim">Contact</h4><Link to="/contact">Start a project</Link><a href="mailto:hello@synopsis.dev">hello@synopsis.dev</a></div>
        </div>
        <div className="ftr-word" aria-hidden="true">SYNOPSIS</div>
        <div className="ftr-base mono dim"><span>© 2026 Synopsis</span><span>Built to ship. Documented to hand over.</span></div>
      </div>
    </footer>
  );
}
