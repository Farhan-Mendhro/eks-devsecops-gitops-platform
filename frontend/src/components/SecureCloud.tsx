// One shared glowing secure-cloud emblem used on every page hero.
export default function SecureCloud() {
  return (
    <div className="sc" aria-hidden="true">
      <svg viewBox="0 0 420 360" className="sc-svg" role="img" aria-label="Secure cloud">
        <defs>
          <filter id="scGlow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          <radialGradient id="scBg" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#2f6bff" stopOpacity=".45" /><stop offset="1" stopColor="#2f6bff" stopOpacity="0" /></radialGradient>
          <linearGradient id="scStroke" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#4de1ff" /><stop offset="1" stopColor="#2f6bff" /></linearGradient>
        </defs>
        <ellipse className="sc-aura" cx="210" cy="175" rx="190" ry="160" fill="url(#scBg)" />
        <circle className="sc-ring r1" cx="212" cy="185" r="60" />
        <circle className="sc-ring r2" cx="212" cy="185" r="60" />
        <g className="sc-circuit" fill="none" stroke="#2f6bff" strokeWidth="1.5">
          <path d="M150 240 V282 H100" /><path d="M212 240 V300" /><path d="M275 240 V282 H325" />
          <circle cx="100" cy="282" r="4" fill="#4de1ff" stroke="none" /><circle cx="212" cy="300" r="4" fill="#4de1ff" stroke="none" /><circle cx="325" cy="282" r="4" fill="#4de1ff" stroke="none" />
        </g>
        <path className="sc-cloud" filter="url(#scGlow)" d="M120 240 C70 240 50 205 70 175 C80 150 110 140 135 148 C145 105 190 80 235 95 C265 105 285 125 290 150 C335 145 365 175 355 210 C348 232 325 240 305 240 Z" fill="rgba(47,107,255,.10)" stroke="url(#scStroke)" strokeWidth="3" strokeLinejoin="round" />
        <g className="sc-shield" filter="url(#scGlow)">
          <path d="M212 140 L252 154 V190 C252 214 236 228 212 238 C188 228 172 214 172 190 V154 Z" fill="rgba(77,225,255,.12)" stroke="#8fd3ff" strokeWidth="2.4" strokeLinejoin="round" />
          <path className="sc-check" d="M194 190 L208 204 L232 174" fill="none" stroke="#4de1ff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <g className="sc-orbit"><circle cx="212" cy="35" r="4.5" fill="#4de1ff" filter="url(#scGlow)" /><circle cx="212" cy="335" r="3" fill="#8fd3ff" /></g>
        <g className="sc-orbit rev"><circle cx="40" cy="185" r="3.5" fill="#2f6bff" filter="url(#scGlow)" /><circle cx="384" cy="185" r="3" fill="#4de1ff" /></g>
      </svg>
    </div>
  );
}
