import { Link } from 'react-router-dom';

export function Mark({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true">
      <path d="M14 2l11 6-11 6L3 8z" fill="#2f6bff" />
      <path d="M3 13l11 6 11-6" fill="none" stroke="#4de1ff" strokeWidth="2" />
      <path d="M3 18.5l11 6 11-6" fill="none" stroke="#8fd3ff" strokeWidth="2" opacity=".6" />
    </svg>
  );
}

export default function Logo() {
  return (
    <Link to="/" className="logo" aria-label="Synopsis home">
      <Mark /> <span>SYNOPSIS</span>
    </Link>
  );
}
