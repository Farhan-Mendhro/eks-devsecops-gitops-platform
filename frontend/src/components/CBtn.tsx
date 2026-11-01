import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

type Props = { to?: string; onClick?: () => void; children: ReactNode; variant?: 'solid' | 'dark' | 'ghost'; type?: 'button' | 'submit'; disabled?: boolean; light?: boolean };

// Button with corner-bracket frame and an arrow tile (template-style CTA).
export default function CBtn({ to, onClick, children, variant = 'solid', type = 'button', disabled, light }: Props) {
  const inner = (<><span>{children}</span><i className="cbtn-arrow"><ArrowUpRight size={13} /></i></>);
  const cls = `cbtn cbtn-${variant} ${light ? 'on-light' : ''}`;
  return (
    <span className={`cbtn-wrap ${light ? 'on-light' : ''}`}>
      {to ? <Link to={to} className={cls}>{inner}</Link> : <button type={type} onClick={onClick} disabled={disabled} className={cls}>{inner}</button>}
    </span>
  );
}
