import { useState } from 'react'
import SectionWrapper from '../../layouts/SectionWrapper'

const phases = [
    {
        num: 1,
        title: 'Process Architecture Assessment',
        duration: '2–3 weeks',
        color: '#0077b6',
        icon: '🔍',
        activities: [
            'Audit existing process architecture',
            'Identify position-based dependencies',
            'Evaluate governance complexity',
        ],
        deliverables: [
            'Architecture diagnostic report',
            'Governance Complexity Index',
            'Restructuring risk analysis',
        ],
    },
    {
        num: 2,
        title: 'Process Redesign',
        duration: '3–6 weeks',
        color: '#00b4d8',
        icon: '⚙️',
        activities: [
            'Redesign processes using Function-Based BPMN',
            'Simplify process hierarchy',
            'Define stable functional lanes',
        ],
        deliverables: [
            'Redesigned BPMN architecture',
            'Simplified process structure',
            'Standardized process documentation',
        ],
    },
    {
        num: 3,
        title: 'Role Mapping',
        duration: '2–3 weeks',
        color: '#0096c7',
        icon: '🔗',
        activities: [
            'Build Role Mapping Matrix',
            'Connect functional roles to positions',
            'Validate governance responsibilities',
        ],
        deliverables: [
            'Role mapping framework',
            'RACI governance structure',
        ],
    },
    {
        num: 4,
        title: 'Governance Deployment',
        duration: '3–4 weeks',
        color: '#023e8a',
        icon: '🚀',
        activities: [
            'Deploy governance dashboard',
            'Train process owners',
            'Establish governance monitoring cycle',
        ],
        deliverables: [
            'Governance dashboard',
            'Monitoring KPIs',
            'Continuous improvement model',
        ],
    },
]

const summaryItems = [
    { label: 'Typical Duration', value: '10 – 16 weeks', icon: '⏱️' },
    { label: 'Scope', value: 'Enterprise-level process architecture', icon: '🏢' },
    { label: 'Outcome', value: 'Stable governance architecture independent from org structure', icon: '🎯' },
]

export default function ImplementationTimeline() {
    const [expandedPhase, setExpandedPhase] = useState(null)

    return (
        <SectionWrapper id="implementation" variant="product">
            <div className="section-header">
                <span className="section-tag" style={{ background: 'rgba(0,119,182,0.1)', color: 'var(--accent)' }}>Implementation Guide</span>
                <h2 className="section-title">How <span className="gradient-text">Implementation</span> Works</h2>
                <p className="section-subtitle">A structured 4-phase approach designed for minimal disruption and maximum governance impact.</p>
            </div>

            <div className="container">
                {/* ═══ Horizontal Timeline Bar ═══ */}
                <div style={{
                    display: 'flex', alignItems: 'stretch',
                    maxWidth: 960, margin: '0 auto 48px',
                    position: 'relative',
                }}>
                    {/* Connecting line */}
                    <div style={{
                        position: 'absolute',
                        top: 28, left: '8%', right: '8%',
                        height: 3,
                        background: 'linear-gradient(90deg, #0077b6, #00b4d8, #0096c7, #023e8a)',
                        borderRadius: 2,
                        zIndex: 0,
                    }} />

                    {phases.map((p, i) => (
                        <div key={i} style={{
                            flex: 1,
                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                            position: 'relative', zIndex: 1,
                        }}>
                            {/* Circle */}
                            <div
                                onClick={() => setExpandedPhase(expandedPhase === i ? null : i)}
                                style={{
                                    width: 56, height: 56,
                                    borderRadius: '50%',
                                    background: expandedPhase === i
                                        ? p.color
                                        : '#fff',
                                    border: `3px solid ${p.color}`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '1.4rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    boxShadow: expandedPhase === i
                                        ? `0 4px 20px ${p.color}40`
                                        : '0 2px 8px rgba(0,0,0,0.08)',
                                }}
                            >
                                {expandedPhase === i ? (
                                    <span style={{ color: '#fff', fontSize: '1.2rem' }}>{p.icon}</span>
                                ) : (
                                    <span style={{ fontWeight: 800, color: p.color, fontSize: '1.1rem' }}>{p.num}</span>
                                )}
                            </div>

                            {/* Title */}
                            <div style={{
                                marginTop: 12,
                                fontWeight: 700,
                                fontSize: '0.82rem',
                                color: expandedPhase === i ? p.color : 'var(--text-primary)',
                                textAlign: 'center',
                                lineHeight: 1.3,
                                transition: 'color 0.3s',
                            }}>
                                {p.title}
                            </div>

                            {/* Duration badge */}
                            <div style={{
                                marginTop: 6,
                                padding: '3px 10px',
                                background: `${p.color}10`,
                                borderRadius: 12,
                                fontSize: '0.68rem',
                                fontWeight: 600,
                                color: p.color,
                                border: `1px solid ${p.color}20`,
                            }}>
                                {p.duration}
                            </div>
                        </div>
                    ))}
                </div>

                {/* ═══ Expanded Detail Panel ═══ */}
                {expandedPhase !== null && (
                    <div style={{
                        maxWidth: 800,
                        margin: '-20px auto 40px',
                        padding: '28px 32px',
                        background: 'var(--bg-card-solid)',
                        border: `2px solid ${phases[expandedPhase].color}20`,
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: `0 8px 32px ${phases[expandedPhase].color}08`,
                        animation: 'fadeIn 0.3s ease',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                            <span style={{ fontSize: '1.5rem' }}>{phases[expandedPhase].icon}</span>
                            <div>
                                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                                    Phase {phases[expandedPhase].num}: {phases[expandedPhase].title}
                                </div>
                                <div style={{ fontSize: '0.8rem', color: phases[expandedPhase].color, fontWeight: 600 }}>
                                    Duration: {phases[expandedPhase].duration}
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                            {/* Activities */}
                            <div>
                                <div style={{
                                    fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase',
                                    letterSpacing: 1.5, color: 'var(--text-muted)', marginBottom: 10,
                                }}>
                                    Activities
                                </div>
                                {phases[expandedPhase].activities.map((a, ai) => (
                                    <div key={ai} style={{
                                        display: 'flex', alignItems: 'flex-start', gap: 8,
                                        fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: 1.5,
                                        marginBottom: 6,
                                    }}>
                                        <span style={{ color: phases[expandedPhase].color, fontWeight: 700, flexShrink: 0 }}>•</span>
                                        {a}
                                    </div>
                                ))}
                            </div>

                            {/* Deliverables */}
                            <div>
                                <div style={{
                                    fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase',
                                    letterSpacing: 1.5, color: 'var(--text-muted)', marginBottom: 10,
                                }}>
                                    Deliverables
                                </div>
                                {phases[expandedPhase].deliverables.map((d, di) => (
                                    <div key={di} style={{
                                        display: 'flex', alignItems: 'flex-start', gap: 8,
                                        fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: 1.5,
                                        marginBottom: 6,
                                    }}>
                                        <span style={{ color: '#00b894', fontWeight: 700, flexShrink: 0 }}>✓</span>
                                        {d}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {expandedPhase === null && (
                    <div style={{
                        textAlign: 'center', marginBottom: 40,
                        fontSize: '0.78rem', color: 'var(--text-muted)',
                    }}>
                        Click on any phase above to see details ↑
                    </div>
                )}

                {/* ═══ Summary Cards ═══ */}
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 20, maxWidth: 800, margin: '0 auto 40px',
                }}>
                    {summaryItems.map((s, i) => (
                        <div key={i} style={{
                            padding: '20px 24px',
                            background: 'var(--bg-card-solid)',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius)',
                            textAlign: 'center',
                        }}>
                            <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>{s.icon}</div>
                            <div style={{ fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1.2, color: 'var(--text-muted)', marginBottom: 6 }}>
                                {s.label}
                            </div>
                            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.4 }}>
                                {s.value}
                            </div>
                        </div>
                    ))}
                </div>

                {/* ═══ Implementation Effort ═══ */}
                <div style={{
                    maxWidth: 700, margin: '0 auto',
                    padding: '24px 28px',
                    background: 'rgba(0,119,182,0.03)',
                    border: '1px solid rgba(0,119,182,0.1)',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    gap: 40,
                    alignItems: 'center',
                }}>
                    {/* Client Effort */}
                    <div style={{ flex: 1 }}>
                        <div style={{
                            fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase',
                            letterSpacing: 1.5, color: 'var(--text-muted)', marginBottom: 8,
                        }}>
                            Client Effort
                        </div>
                        <div style={{
                            display: 'inline-block',
                            padding: '4px 14px',
                            background: 'rgba(0,184,148,0.1)',
                            border: '1px solid rgba(0,184,148,0.2)',
                            borderRadius: 8,
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            color: '#00b894',
                        }}>
                            Low – Moderate
                        </div>
                        <div style={{ marginTop: 8, fontSize: '0.75rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                            Our team handles the heavy lifting.
                            Your team provides domain knowledge.
                        </div>
                    </div>

                    {/* Divider */}
                    <div style={{ width: 1, height: 72, background: 'rgba(0,119,182,0.12)' }} />

                    {/* Internal Resources */}
                    <div style={{ flex: 1 }}>
                        <div style={{
                            fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase',
                            letterSpacing: 1.5, color: 'var(--text-muted)', marginBottom: 8,
                        }}>
                            Internal Resources Required
                        </div>
                        {['Process Owners', 'Governance Team', 'IT / BPM Support'].map((r, ri) => (
                            <div key={ri} style={{
                                display: 'flex', alignItems: 'center', gap: 6,
                                fontSize: '0.82rem', color: 'var(--text-secondary)',
                                marginBottom: 4,
                            }}>
                                <span style={{ color: 'var(--accent)', fontSize: '0.6rem' }}>●</span>
                                {r}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}
