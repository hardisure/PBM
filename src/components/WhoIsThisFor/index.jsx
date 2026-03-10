import SectionWrapper from '../../layouts/SectionWrapper'

const audiences = [
    {
        icon: '🔄',
        title: 'Frequent Restructuring',
        desc: 'Organizations that regularly change their organizational structure, reporting lines, or departmental setup.',
    },
    {
        icon: '🏢',
        title: 'Multi-Subsidiary Groups',
        desc: 'Holding companies and conglomerates managing multiple subsidiaries with complex governance layers.',
    },
    {
        icon: '📋',
        title: 'Large SOP Libraries',
        desc: 'Organizations maintaining extensive process documentation that must be updated after every structural change.',
    },
    {
        icon: '🔍',
        title: 'Compliance-Driven',
        desc: 'Entities requiring strong compliance visibility, audit readiness, and governance accountability.',
    },
]

export default function WhoIsThisFor() {
    return (
        <SectionWrapper id="who" variant="product">
            <div className="section-header">
                <span className="section-tag" style={{ background: 'rgba(0,119,182,0.08)', color: 'var(--accent)' }}>Target Audience</span>
                <h2 className="section-title">Who Is This <span className="gradient-text">For</span></h2>
                <p className="section-subtitle">This solution is designed for organizations that face these challenges.</p>
            </div>

            <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20,
                maxWidth: 800, margin: '0 auto',
            }}>
                {audiences.map((a, i) => (
                    <div key={i} style={{
                        padding: 28,
                        background: 'var(--bg-card)',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--border)',
                        transition: 'all 0.3s',
                        cursor: 'default',
                    }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,119,182,0.25)'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.04)' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
                    >
                        <div style={{ fontSize: '1.8rem', marginBottom: 12 }}>{a.icon}</div>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1rem', marginBottom: 8 }}>{a.title}</div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>{a.desc}</div>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    )
}
