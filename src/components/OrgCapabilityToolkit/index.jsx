import SectionWrapper from '../../layouts/SectionWrapper'

const tools = [
    {
        icon: '⚖️',
        title: 'Job Analysis Engine',
        desc: 'A multidimensional job analysis framework designed to objectively measure role complexity and structural dependencies within the organization.',
        capabilities: [
            'Multi-factor role complexity scoring model',
            'Analysis of domain expertise, regulatory exposure, and specialization',
            'Structural dependency mapping between roles and processes',
        ],
        purpose: 'Supports process architecture analysis by identifying organizational dependencies that may affect governance stability.',
    },
    {
        icon: '📐',
        title: 'Job Evaluation System',
        desc: 'A structured job evaluation model used to determine job size index and ensure consistent role grading across organizational functions.',
        capabilities: [
            'Causal scoring model for job sizing',
            'Role comparison across organizational units',
            'Automated generation of structured job descriptions',
        ],
        purpose: 'Ensures that role definitions and responsibilities remain aligned with governance architecture and functional process design.',
    },
    {
        icon: '📊',
        title: 'Workload Analysis',
        desc: 'A quantitative workload analysis system combining relative workload indicators and absolute workload estimates.',
        capabilities: [
            'Workload distribution analysis across roles',
            'Detection of overload and underutilization risks',
            'Workload balancing insights for organizational restructuring',
        ],
        purpose: 'Helps organizations identify structural imbalances that may affect operational performance and governance efficiency.',
    },
]

const cardStyle = {
    padding: '28px 24px',
    background: 'var(--bg-card-solid)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    transition: 'all 0.3s ease',
    cursor: 'default',
}

export default function OrgCapabilityToolkit() {
    return (
        <SectionWrapper id="toolkit" variant="product">
            <div className="section-header">
                <span className="section-tag" style={{
                    background: 'rgba(0,184,148,0.08)',
                    color: '#00b894',
                    border: '1px solid rgba(0,184,148,0.15)',
                }}>
                    Bonus Value
                </span>
                <h2 className="section-title">
                    Included: <span className="gradient-text">Organizational Capability Toolkit</span>
                </h2>
                <p className="section-subtitle" style={{ maxWidth: 680 }}>
                    Every governance transformation engagement includes access to integrated organizational engineering tools
                    designed to support structural analysis, role design, and workload optimization.
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 24,
                maxWidth: 960,
                margin: '0 auto 40px',
            }}>
                {tools.map((tool, i) => (
                    <div
                        key={i}
                        style={cardStyle}
                        onMouseEnter={e => {
                            e.currentTarget.style.borderColor = 'rgba(0,119,182,0.25)'
                            e.currentTarget.style.transform = 'translateY(-4px)'
                            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.06)'
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.borderColor = 'var(--border)'
                            e.currentTarget.style.transform = 'translateY(0)'
                            e.currentTarget.style.boxShadow = 'none'
                        }}
                    >
                        {/* Icon */}
                        <div style={{
                            fontSize: '1.8rem',
                            marginBottom: 14,
                            width: 48, height: 48,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: 'rgba(0,119,182,0.06)',
                            borderRadius: 12,
                        }}>
                            {tool.icon}
                        </div>

                        {/* Title */}
                        <div style={{
                            fontWeight: 700,
                            fontSize: '1.05rem',
                            color: 'var(--text-primary)',
                            marginBottom: 10,
                        }}>
                            {tool.title}
                        </div>

                        {/* Description */}
                        <p style={{
                            fontSize: '0.82rem',
                            color: 'var(--text-dim)',
                            lineHeight: 1.6,
                            marginBottom: 16,
                        }}>
                            {tool.desc}
                        </p>

                        {/* Capabilities */}
                        <div style={{ marginBottom: 16 }}>
                            {tool.capabilities.map((cap, ci) => (
                                <div key={ci} style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: 8,
                                    fontSize: '0.78rem',
                                    color: 'var(--text-secondary)',
                                    lineHeight: 1.5,
                                    marginBottom: 6,
                                }}>
                                    <span style={{
                                        color: 'var(--accent)',
                                        fontWeight: 600,
                                        flexShrink: 0,
                                        marginTop: 1,
                                        fontSize: '0.65rem',
                                    }}>●</span>
                                    {cap}
                                </div>
                            ))}
                        </div>

                        {/* Purpose */}
                        <div style={{
                            padding: '10px 12px',
                            background: 'rgba(0,119,182,0.03)',
                            borderRadius: 8,
                            borderLeft: '3px solid rgba(0,119,182,0.2)',
                        }}>
                            <div style={{
                                fontSize: '0.6rem',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: 1,
                                color: 'var(--text-muted)',
                                marginBottom: 4,
                            }}>Purpose</div>
                            <div style={{
                                fontSize: '0.75rem',
                                color: 'var(--text-dim)',
                                lineHeight: 1.5,
                            }}>
                                {tool.purpose}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Closing text */}
            <div style={{
                maxWidth: 760,
                margin: '0 auto',
                padding: '20px 28px',
                background: 'rgba(0,119,182,0.03)',
                border: '1px solid rgba(0,119,182,0.08)',
                borderRadius: 'var(--radius)',
                textAlign: 'center',
            }}>
                <p style={{
                    fontSize: '0.88rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.7,
                    margin: 0,
                }}>
                    These tools form an integrated organizational engineering toolkit that complements the{' '}
                    <strong style={{ color: 'var(--accent)' }}>Governance Architecture Platform</strong>.
                    Together, they provide evidence-based decision support for organizational design,
                    restructuring planning, and governance optimization.
                </p>
            </div>
        </SectionWrapper>
    )
}
