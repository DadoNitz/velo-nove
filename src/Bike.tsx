// The product, drawn in code: one flat graphic language, colours come from CSS variables
// (--bike, --bike2, --hl) so the configurator can recolour it and the story can highlight parts.
const RAD = 143
const spokes = Array.from({ length: 12 }, (_, i) => (i * Math.PI) / 6)

function Wheel({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={RAD} fill="none" stroke="var(--tyre)" strokeWidth="16" />
      <circle cx={cx} cy={cy} r={RAD - 16} fill="none" stroke="var(--rim)" strokeWidth="5" />
      <g className="spin" style={{ transformOrigin: `${cx}px ${cy}px` }}>
        {spokes.map((a, i) => (
          <line key={i} x1={cx} y1={cy} x2={cx + Math.cos(a) * (RAD - 18)} y2={cy + Math.sin(a) * (RAD - 18)} stroke="var(--steel)" strokeWidth="1.8" />
        ))}
        <circle cx={cx + RAD - 30} cy={cy} r="5" fill="var(--hl)" />
      </g>
    </g>
  )
}

export function Bike({ label }: { label: string }) {
  return (
    <svg className="bike" viewBox="0 0 900 520" role="img" aria-label={label}>
      <ellipse cx="450" cy="494" rx="400" ry="9" fill="var(--ground)" />
      <Wheel cx={200} cy={340} />
      <Wheel cx={700} cy={340} />
      {/* mudguards */}
      <path d="M52 296 A158 158 0 0 1 348 296" fill="none" stroke="var(--bike2)" strokeWidth="9" strokeLinecap="round" />
      <path d="M552 296 A158 158 0 0 1 848 296" fill="none" stroke="var(--bike2)" strokeWidth="9" strokeLinecap="round" />
      {/* belt drive */}
      <path className="p p-belt" d="M200 320 L412 322 A46 46 0 0 1 412 414 L200 360 A20 20 0 0 1 200 320Z" fill="none" strokeWidth="7" strokeLinejoin="round" />
      <circle cx="412" cy="368" r="36" fill="var(--bike2)" />
      <path d="M412 368 L438 428" stroke="var(--steel)" strokeWidth="11" strokeLinecap="round" />
      <rect x="424" y="424" width="34" height="9" fill="var(--tyre)" />
      {/* frame */}
      <g className="p p-frame" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M204 342 L412 368" strokeWidth="14" />
        <path d="M352 202 L204 340" strokeWidth="12" />
        <path d="M412 368 L348 186" strokeWidth="17" />
        <path d="M348 190 L634 180" strokeWidth="17" />
        <path d="M632 158 L652 230" strokeWidth="24" />
        <path d="M652 230 L700 340" strokeWidth="14" />
      </g>
      {/* battery lives inside the down tube */}
      <path d="M648 224 L414 366" fill="none" stroke="var(--bike)" strokeWidth="38" strokeLinecap="round" />
      <path className="p p-battery" d="M630 236 L430 358" fill="none" strokeWidth="24" strokeLinecap="round" />
      {/* motor in the rear hub */}
      <circle className="p p-motor" cx="200" cy="340" r="31" />
      <circle cx="200" cy="340" r="12" fill="var(--steel)" />
      <circle cx="700" cy="340" r="12" fill="var(--bike2)" />
      {/* cockpit */}
      <path d="M350 184 L338 126" stroke="var(--steel)" strokeWidth="10" strokeLinecap="round" />
      <path d="M294 124 Q340 106 394 124 Q382 138 338 138 Q306 138 294 124Z" fill="var(--tyre)" />
      <path d="M638 160 L646 118" stroke="var(--steel)" strokeWidth="10" strokeLinecap="round" />
      <path d="M628 116 Q668 108 702 128" fill="none" stroke="var(--tyre)" strokeWidth="9" strokeLinecap="round" />
      <path d="M692 124 L718 133" stroke="var(--tyre)" strokeWidth="15" strokeLinecap="round" />
      <circle cx="664" cy="190" r="8" fill="#fff" />
    </svg>
  )
}
