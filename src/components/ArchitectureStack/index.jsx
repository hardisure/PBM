import SectionWrapper from '../../layouts/SectionWrapper'

const layers = [
    { label: 'Strategy Layer', sub: 'Corporate Vision & Goals', color: 'var(--accent-blue)', bg: 'rgba(79,195,247,0.06)' },
    { label: 'Process Landscape (APQC)', sub: 'Industry-Standard Classification', color: 'var(--accent2)', bg: 'rgba(100,255,218,0.06)' },
    { label: 'Process Architecture', sub: 'Function-Based BPMN (Decoupled)', color: 'var(--accent)', bg: 'rgba(0,119,182,0.08)', highlight: true },
    { label: 'Role Mapping Matrix', sub: 'RACI — Connects Functions to Positions', color: 'var(--accent-warm)', bg: 'rgba(225,112,85,0.06)' },
    { label: 'Organization Structure', sub: 'Positions, Departments, Levels', color: '#c0392b', bg: 'rgba(255,107,107,0.06)', shift: true },
]

const s = {
    stack: { maxWidth: 700, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 8 },
    layer: (l) => ({
        padding: '20px 28px',
        background: l.bg,
        border: `1.5px solid ${l.color}40`,
        borderRadius: 'var(--radius)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'transform 0.8s ease',
        ...(l.highlight ? { borderColor: l.color, boxShadow: `0 0 20px ${l.color}20` } : {}),
    }),
    label: (c) => ({ fontWeight: 700, fontSize: '1rem', color: c }),
    sub: { fontSize: '0.8rem', color: 'var(--text-dim)' },
    badge: { fontSize: '0.65rem', padding: '4px 10px', borderRadius: 12, background: 'rgba(0,119,182,0.12)', color: 'var(--accent)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' },
    note: { textAlign: 'center', marginTop: 24, fontSize: '0.85rem', color: 'var(--text-dim)', fontStyle: 'italic' },
}

export default function ArchitectureStack() {
    return (
        <SectionWrapper id="architecture" variant="dark">
            <div className="section-header">
                <span className="section-tag">Architecture</span>
                <h2 className="section-title">Enterprise <span className="gradient-text">Architecture Stack</span></h2>
                <p className="section-subtitle">Process Architecture is decoupled from Organization Structure through the Role Mapping Matrix.</p>
            </div>
            <div style={s.stack}>
                {layers.map((l, i) => (
                    <div key={i} style={s.layer(l)}>
                        <div>
                            <div style={s.label(l.color)}>{l.label}</div>
                            <div style={s.sub}>{l.sub}</div>
                        </div>
                        {l.highlight && <span style={s.badge}>Decoupled</span>}
                        {l.shift && <span style={{ ...s.badge, background: 'rgba(255,107,107,0.12)', color: '#c0392b' }}>Can Change</span>}
                    </div>
                ))}
            </div>
            <p style={s.note}>Organization layer shifts freely — Process Architecture remains stable.</p>
        </SectionWrapper>
    )
}
