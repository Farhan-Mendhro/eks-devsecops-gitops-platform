import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import CBtn from './CBtn';

const LINKS: [string, string, string][] = [['01', 'Services', '/services'], ['02', 'Process', '/process'], ['03', 'Pricing', '/pricing'], ['04', 'About', '/about'], ['05', 'Journal', '/journal'], ['06', 'Contact', '/contact']];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  return (
    <header className="hdr">
      <div className="wrap hdr-in">
        <Logo />
        <nav className={`hdr-nav ${open ? 'open' : ''}`} aria-label="Primary">
          {LINKS.map(([n, l, to]) => (
            <NavLink key={to} to={to} className={({ isActive }) => `hdr-link ${isActive ? 'on' : ''}`}><i />{n} <b>{l}</b></NavLink>
          ))}
        </nav>
        <div className="hdr-right">
          <span className="hdr-cta"><CBtn to="/contact" variant="dark">Start a project</CBtn></span>
          <button className="hdr-burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </div>
    </header>
  );
}
