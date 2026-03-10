import SectionWrapper from '../../layouts/SectionWrapper'
import { useScrollReveal } from '../../animations/useScrollReveal'

const steps = [
    { num: '01', title: 'Root Cause Analysis', desc: 'Identified position-based process design as the systemic root cause through fishbone and 5-Why analysis.' },
    { num: '02', title: 'DMAIC Framework', desc: 'Applied Define-Measure-Analyze-Improve-Control methodology to structure the innovation.' },
    { num: '03', title: 'Function-Based BPMN Design', desc: 'Designed decoupling architecture separating process logic from organizational structure.' },
    { num: '04', title: 'Pilot Implementation', desc: 'Deployed at PT Mitra Karya Prima — full process library redesign.' },
    { num: '05', title: 'Measured Impact', desc: '43% hand-off reduction, 47% cycle time reduction, 75% audit score improvement.' },
]

const s = {
    pipeline: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0', position: 'relative', maxWidth: '100%' },
    line: { position: 'absolute', left: '10%', right: '10%', top: '28px', height: '2px', background: 'linear-gradient(90deg, var(--accent), var(--accent2))' },
    step: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', textAlign: 'center', padding: '0 8px', position: 'relative' },
    num: { width: 48, height: 48, borderRadius: '50%', background: 'var(--bg-card)', border: '2px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem', color: 'var(--accent)', zIndex: 2, fontFamily: 'var(--font-display)' },
    title: { fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 700, marginBottom: 4 },
    desc: { fontSize: '0.75rem', color: 'var(--text-dim)', lineHeight: 1.4 },
}

export default function InnovationMethodologyDiagram() {
    const ref = useScrollReveal()
    return (
        <SectionWrapper id="methodology" variant="dark">
            <div className="section-header">
                <span className="section-tag">Innovation Methodology</span>
                <h2 className="section-title">Systematic <span className="gradient-text">Research-Driven</span> Approach</h2>
                <p className="section-subtitle">This innovation follows a rigorous improvement methodology — not guesswork.</p>
            </div>
            <div ref={ref} className="reveal-wrapper" style={s.pipeline}>
                <div style={s.line} />
                {steps.map(step => (
                    <div key={step.num} style={s.step}>
                        <div style={s.num}>{step.num}</div>
                        <div>
                            <div style={s.title}>{step.title}</div>
                            <div style={s.desc}>{step.desc}</div>
                        </div>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    )
}
