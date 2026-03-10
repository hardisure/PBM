import SectionWrapper from '../../layouts/SectionWrapper'

const features = [
    { icon: '🔓', title: 'Process Decoupling Engine', desc: 'Automatically separate process logic from organizational structure using function-based BPMN architecture.' },
    { icon: '🗺️', title: 'Role Mapping Matrix', desc: 'Dynamic RACI matrix connecting functional roles to positions. Only the mapping changes — never the processes.' },
    { icon: '📊', title: 'Governance Dashboard', desc: 'Real-time visibility into process health, compliance status, and governance metrics across the organization.' },
    { icon: '⚡', title: 'Restructuring Simulator', desc: 'Model organizational changes and instantly see their impact on process architecture — before implementation.' },
]

const steps = [
    { num: '1', title: 'Assess', desc: 'Audit current process architecture and identify position-based dependencies.' },
    { num: '2', title: 'Transform', desc: 'Re-architect processes using function-based BPMN methodology.' },
    { num: '3', title: 'Map', desc: 'Build Role Mapping Matrix connecting functions to current org structure.' },
    { num: '4', title: 'Monitor', desc: 'Deploy governance dashboard and continuous improvement cycle.' },
]

export default function SolutionOverview() {
    return (
        <SectionWrapper id="solution" variant="product">
            <div className="section-header">
                <span className="section-tag" style={{ background: 'rgba(0,119,182,0.1)', color: 'var(--accent)' }}>Platform</span>
                <h2 className="section-title">Governance Architecture <span className="gradient-text">Platform</span></h2>
                <p className="section-subtitle">A modular governance system designed to keep business processes stable during organizational change.</p>
            </div>

            <h3 style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--text-muted)', marginBottom: 24 }}>Core Modules</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, maxWidth: 800, margin: '0 auto 48px' }}>
                {features.map((f, i) => (
                    <div key={i} style={{
                        padding: 28,
                        background: 'rgba(0,60,120,0.03)',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--border)',
                        transition: 'all 0.3s',
                        cursor: 'default',
                    }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,119,182,0.3)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
                    >
                        <div style={{ fontSize: '2rem', marginBottom: 12 }}>{f.icon}</div>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1.05rem', marginBottom: 8 }}>{f.title}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>{f.desc}</div>
                    </div>
                ))}
            </div>

            {/* How it works */}
            <h3 style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 32 }}>How It <span className="gradient-text">Works</span></h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, maxWidth: 900, margin: '0 auto' }}>
                {steps.map((st, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(0,119,182,0.1)', border: '2px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontWeight: 800, color: 'var(--accent)', fontSize: '1.1rem' }}>{st.num}</div>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem', marginBottom: 6 }}>{st.title}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', lineHeight: 1.4 }}>{st.desc}</div>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    )
}
