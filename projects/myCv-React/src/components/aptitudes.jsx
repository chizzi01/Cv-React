// ─── DESKTOP layout: 700×380, center (350,190) ───────────────────────────────
const D = {
  vb: '0 0 700 380',
  cx: 350, cy: 190,
  skills: [
    { x:350, y:28,  es:'Trabajo en equipo',       en:'Team player',         icon:'🤝', d:0    },
    { x:564, y:83,  es:'Aprendizaje continuo',    en:'Continuous learning', icon:'📘', d:0.1  },
    { x:626, y:200, es:'Pensamiento creativo',    en:'Creative thinking',   icon:'✨', d:0.2  },
    { x:510, y:345, es:'Orientado a resultados',  en:'Results-driven',      icon:'✅', d:0.3  },
    { x:190, y:345, es:'Resolución de problemas', en:'Problem solver',      icon:'⚠️', d:0.4  },
    { x:74,  y:200, es:'Adaptable al cambio',     en:'Adaptable',           icon:'🔄', d:0.5  },
    { x:136, y:83,  es:'Iniciativa propia',       en:'Self-starter',        icon:'🚀', d:0.6  },
  ],
  mainPaths: [
    'M 350 190 C 350 145 350 85  350 28',
    'M 350 190 C 415 158 488 118 564 83',
    'M 350 190 C 442 188 534 197 626 200',
    'M 350 190 C 400 245 458 298 510 345',
    'M 350 190 C 300 245 242 298 190 345',
    'M 350 190 C 258 190 166 197 74  200',
    'M 350 190 C 285 158 212 118 136 83',
  ],
  outer: [
    'M 350 28  Q 470 28  564 83',
    'M 564 83  Q 630 130 626 200',
    'M 626 200 Q 630 300 510 345',
    'M 510 345 Q 350 392 190 345',
    'M 190 345 Q 70  300 74  200',
    'M 74  200 Q 70  130 136 83',
    'M 136 83  Q 230 28  350 28',
  ],
  junctions: [
    {x:350,y:109},{x:453,y:138},{x:488,y:193},
    {x:429,y:271},{x:271,y:271},{x:212,y:194},{x:247,y:138},
  ],
  deco: [
    // ── FROM M0 (350,109) — top hub ──
    {p:'M 350 109 Q 350 55  350 6',   dot:{x:350,y:6  }, d:0.35},
    {p:'M 350 109 Q 295 68  238 38',  dot:{x:238,y:38 }, d:0.38},
    {p:'M 238  38 Q 135 16   12  6',  dot:{x:12, y:6  }, d:0.52},
    {p:'M 350 109 Q 405 68  462 38',  dot:{x:462,y:38 }, d:0.40},
    {p:'M 462  38 Q 565 16  688  6',  dot:{x:688,y:6  }, d:0.55},

    // ── FROM M1 (453,138) — top-right hub ──
    {p:'M 453 138 Q 522 88  592 48',  dot:{x:592,y:48 }, d:0.45},
    {p:'M 592  48 Q 648 22  692  8',  dot:{x:692,y:8  }, d:0.60},
    {p:'M 453 138 Q 585 136 692 132', dot:{x:692,y:132}, d:0.48},

    // ── FROM M2 (488,193) — right hub ──
    {p:'M 488 193 Q 600 193 692 193', dot:{x:692,y:193}, d:0.50},
    {p:'M 488 193 Q 572 148 658  98', dot:{x:658,y:98 }, d:0.53},
    {p:'M 658  98 Q 682 52  692  8',  dot:{x:692,y:8  }, d:0.66},
    {p:'M 488 193 Q 572 242 658 288', dot:{x:658,y:288}, d:0.56},
    {p:'M 658 288 Q 682 332 692 372', dot:{x:692,y:372}, d:0.70},

    // ── FROM M3 (429,271) — bottom-right hub ──
    {p:'M 429 271 Q 505 316 568 354', dot:{x:568,y:354}, d:0.60},
    {p:'M 568 354 Q 636 370 692 374', dot:{x:692,y:374}, d:0.73},
    {p:'M 429 271 Q 438 332 445 372', dot:{x:445,y:372}, d:0.63},

    // ── BOTTOM edge run ──
    {p:'M 445 372 Q 350 378 255 372', dot:{x:255,y:372}, d:0.78},

    // ── FROM M4 (271,271) — bottom-left hub ──
    {p:'M 271 271 Q 195 316 132 354', dot:{x:132,y:354}, d:0.65},
    {p:'M 132 354 Q  64 370   8 374', dot:{x:8,  y:374}, d:0.79},
    {p:'M 271 271 Q 262 332 255 372', dot:{x:255,y:372}, d:0.67},

    // ── FROM M5 (212,194) — left hub ──
    {p:'M 212 194 Q 105 194   8 194', dot:{x:8,  y:194}, d:0.70},
    {p:'M 212 194 Q 128 148   42  98', dot:{x:42,y:98  }, d:0.73},
    {p:'M  42  98 Q  18 52    8   8', dot:{x:8,  y:8  }, d:0.86},
    {p:'M 212 194 Q 128 242   42 288', dot:{x:42,y:288 }, d:0.76},
    {p:'M  42 288 Q  18 332   8  372', dot:{x:8, y:372 }, d:0.89},

    // ── FROM M6 (247,138) — top-left hub ──
    {p:'M 247 138 Q 175 90  108 50',  dot:{x:108,y:50 }, d:0.80},
    {p:'M 108  50 Q  48 22    8  8',  dot:{x:8,  y:8  }, d:0.93},
    {p:'M 247 138 Q 118 136   8 132', dot:{x:8,  y:132}, d:0.83},
  ],
};

// ─── MOBILE layout: 340×580, center (170,70) — vertical top-down tree ─────────
const M = {
  vb: '0 0 340 580',
  cx: 170, cy: 70,
  skills: [
    { x:55,  y:165, es:'Trabajo en equipo',       en:'Team player',         icon:'🤝', d:0    },
    { x:285, y:165, es:'Aprendizaje continuo',    en:'Continuous learning', icon:'📘', d:0.1  },
    { x:55,  y:285, es:'Pensamiento creativo',    en:'Creative thinking',   icon:'✨', d:0.2  },
    { x:285, y:285, es:'Orientado a resultados',  en:'Results-driven',      icon:'✅', d:0.3  },
    { x:55,  y:405, es:'Resolución de problemas', en:'Problem solver',      icon:'⚠️', d:0.4  },
    { x:285, y:405, es:'Adaptable al cambio',     en:'Adaptable',           icon:'🔄', d:0.5  },
    { x:170, y:520, es:'Iniciativa propia',       en:'Self-starter',        icon:'🚀', d:0.6  },
  ],
  mainPaths: [
    'M 170 70 C 135 105 85  135 55  165',
    'M 170 70 C 205 105 255 135 285 165',
    'M 170 70 C 150 155 90  225 55  285',
    'M 170 70 C 190 155 250 225 285 285',
    'M 170 70 C 145 210 75  315 55  405',
    'M 170 70 C 195 210 265 315 285 405',
    'M 170 70 C 170 235 170 380 170 520',
  ],
  outer: [
    'M 55  165 Q 170 132 285 165',
    'M 55  165 L 55  285',
    'M 285 165 L 285 285',
    'M 55  285 L 55  405',
    'M 285 285 L 285 405',
    'M 55  405 Q 100 472 170 520',
    'M 285 405 Q 240 472 170 520',
  ],
  junctions: [
    {x:111,y:119},{x:229,y:119},{x:118,y:189},
    {x:222,y:189},{x:111,y:258},{x:229,y:258},{x:170,y:302},
  ],
  deco: [
    // ── FROM M0 (111,119) — top-left hub ──
    {p:'M 111 119 Q 62  62   18  12', dot:{x:18, y:12 }, d:0.35},
    {p:'M  18  12 Q   8   8   8   8', dot:{x:8,  y:8  }, d:0.48},
    {p:'M 111 119 Q 110 65  110  8',  dot:{x:110,y:8  }, d:0.40},
    {p:'M 111 119 Q 62 138    8 138', dot:{x:8,  y:138}, d:0.43},

    // ── FROM M1 (229,119) — top-right hub ──
    {p:'M 229 119 Q 278  62  322  12', dot:{x:322,y:12 }, d:0.45},
    {p:'M 322  12 Q 332   8  332   8', dot:{x:332,y:8  }, d:0.58},
    {p:'M 229 119 Q 230  65  230   8', dot:{x:230,y:8  }, d:0.50},
    {p:'M 229 119 Q 278 138  332 138', dot:{x:332,y:138}, d:0.53},

    // ── Top edge center ──
    {p:'M 170  70 Q 170  35  170   8', dot:{x:170,y:8  }, d:0.37},

    // ── FROM M2 (118,189) — left hub ──
    {p:'M 118 189 Q  55 189   8  189', dot:{x:8,  y:189}, d:0.55},
    {p:'M 118 189 Q  55 140   8   95', dot:{x:8,  y:95 }, d:0.58},
    {p:'M 118 189 Q  55 242   8  290', dot:{x:8,  y:290}, d:0.62},

    // ── FROM M3 (222,189) — right hub ──
    {p:'M 222 189 Q 285 189  332  189', dot:{x:332,y:189}, d:0.60},
    {p:'M 222 189 Q 285 140  332   95', dot:{x:332,y:95 }, d:0.63},
    {p:'M 222 189 Q 285 242  332  290', dot:{x:332,y:290}, d:0.67},

    // ── FROM M4 (111,258) — left-bottom hub ──
    {p:'M 111 258 Q  55 310   8  365', dot:{x:8,  y:365}, d:0.70},
    {p:'M   8 365 Q   8 470   8  572', dot:{x:8,  y:572}, d:0.83},
    {p:'M 111 258 Q  55 258   8  258', dot:{x:8,  y:258}, d:0.72},

    // ── FROM M5 (229,258) — right-bottom hub ──
    {p:'M 229 258 Q 285 310  332  365', dot:{x:332,y:365}, d:0.75},
    {p:'M 332 365 Q 332 470  332  572', dot:{x:332,y:572}, d:0.87},
    {p:'M 229 258 Q 285 258  332  258', dot:{x:332,y:258}, d:0.77},

    // ── FROM M6 (170,302) — center hub ──
    {p:'M 170 302 Q  90 295   8  295', dot:{x:8,  y:295}, d:0.80},
    {p:'M 170 302 Q 250 295  332  295', dot:{x:332,y:295}, d:0.82},
    {p:'M 170 302 Q 170 435  170  572', dot:{x:170,y:572}, d:0.78},

    // ── Bottom corners ──
    {p:'M   8 572 Q  85 576  170  576', dot:{x:8,  y:572}, d:0.95},
    {p:'M 332 572 Q 255 576  170  576', dot:{x:332,y:572}, d:0.97},
  ],
};

export function Aptitudes({ isVisible }) {
  const language = localStorage.getItem('language');
  const isMobile = window.matchMedia('(max-width: 600px)').matches;
  const L = isMobile ? M : D;
  const vbW = isMobile ? 340 : 700;
  const vbH = isMobile ? 580 : 380;
  const cls = isVisible ? 'animate' : '';

  return (
    <div className={`skills-tree ${isMobile ? 'skills-tree--mobile' : ''} ${cls}`}>
      <svg className="skills-tree__svg" viewBox={L.vb}
        xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

        <defs>
          <filter id="st-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="st-glow-sm" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {L.outer.map((d,i)      => <path key={`or-${i}`}  d={d} className="st__outer" />)}
        {L.mainPaths.map((d,i)  => <path key={`mr-${i}`}  d={d} className="st__main-rail" />)}
        {L.mainPaths.map((d,i)  => (
          <path key={`md-${i}`} d={d} className="st__main-draw" pathLength="100"
            style={{ animationDelay:`${i*0.12}s` }} />
        ))}
        {L.mainPaths.map((d,i)  => (
          <path key={`mf-${i}`} d={d} className="st__main-flow" pathLength="100"
            filter="url(#st-glow)" style={{ animationDelay:`${i*0.4+0.7}s` }} />
        ))}
        {L.deco.map((b,i)       => <path key={`dr-${i}`}  d={b.p} className="st__deco-rail" />)}
        {L.deco.map((b,i)       => (
          <path key={`dd-${i}`} d={b.p} className="st__deco-draw" pathLength="100"
            style={{ animationDelay:`${b.d}s` }} />
        ))}
        {L.deco.map((b,i)       => (
          <path key={`df-${i}`} d={b.p} className="st__deco-flow" pathLength="100"
            filter="url(#st-glow-sm)" style={{ animationDelay:`${b.d+0.5}s` }} />
        ))}
        {L.junctions.map((j,i)  => (
          <circle key={`jc-${i}`} cx={j.x} cy={j.y} r="3.5" className="st__junction"
            style={{ animationDelay:`${i*0.09+0.5}s` }} />
        ))}
        {L.deco.map((b,i)       => (
          <circle key={`td-${i}`} cx={b.dot.x} cy={b.dot.y} r="2.5" className="st__terminal"
            style={{ animationDelay:`${b.d+0.3}s` }} />
        ))}
        <circle cx={L.cx} cy={L.cy} r="28" className="st__center-ring" />
      </svg>

      {/* Center node */}
      <div className="skill-node skill-node--center"
        style={{ left:`${(L.cx/vbW)*100}%`, top:`${(L.cy/vbH)*100}%` }}>
        <span>Soft</span><span>Skills</span>
      </div>

      {/* Skill nodes — --flash-delay synced to particle arrival (93% of 1.8s cycle) */}
      {L.skills.map((s,i) => (
        <div key={i} className="skill-node"
          style={{
            left: `${(s.x/vbW)*100}%`,
            top:  `${(s.y/vbH)*100}%`,
            transitionDelay: `${s.d+0.3}s`,
            '--flash-delay': `${i*0.4 + 0.7 + 2.79}s`,
          }}>
          <span className="skill-node__icon">{s.icon}</span>
          <span className="skill-node__label">
            {language === 'es' ? s.es : s.en}
          </span>
        </div>
      ))}
    </div>
  );
}
