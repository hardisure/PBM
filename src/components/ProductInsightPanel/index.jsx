export default function ProductInsightPanel() {
    const cardStyle = {
        padding: '18px 16px',
        background: 'rgba(255,255,255,0.78)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(0,0,0,0.05)',
        borderRadius: 14,
        boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
    }

    const labelStyle = {
        fontSize: '0.55rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        color: 'var(--text-muted)',
        marginBottom: 10,
    }

    const layers = [
        { icon: '🎯', name: 'Strategy Layer', desc: 'Business strategy & governance objectives' },
        { icon: '🗺️', name: 'Process Landscape', desc: 'Enterprise process classification (APQC)' },
        { icon: '⚙️', name: 'Process Architecture', desc: 'Function-Based BPMN — stable process logic' },
        { icon: '🔗', name: 'Governance Layer', desc: 'Role Mapping Matrix — functions to roles' },
        { icon: '📊', name: 'Monitoring Layer', desc: 'Dashboard for performance & compliance' },
    ]

    return (
        <aside style={{
            position: 'sticky',
            top: 'calc(var(--nav-h, 64px) + 24px)',
            width: 240,
            maxHeight: 'calc(100vh - var(--nav-h, 64px) - 48px)',
            overflowY: 'auto',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            paddingBottom: 24,
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
        }}>
            {/* ── Card 1: Product Identity ── */}
            <div style={cardStyle}>
                <div style={{
                    fontSize: '0.6rem', fontWeight: 800, textTransform: 'uppercase',
                    letterSpacing: 2, color: 'var(--accent)', marginBottom: 4,
                }}>
                    Governance Architecture
                </div>
                <div style={{ width: 20, height: 2, background: 'var(--accent)', borderRadius: 2, marginBottom: 10 }} />
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6, lineHeight: 1.3 }}>
                    Governance Architecture Platform
                </div>
                <p style={{ fontSize: '0.62rem', color: 'var(--text-dim)', lineHeight: 1.55, margin: '0 0 10px' }}>
                    Enterprise governance framework designed to keep business processes stable during organizational restructuring.
                </p>
                <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', lineHeight: 1.55, margin: 0 }}>
                    This platform separates process logic from organizational structure, enabling consistent process architecture even when roles or departments change.
                </p>
            </div>

            {/* ── Card 2: Architecture Layers ── */}
            <div style={cardStyle}>
                <div style={labelStyle}>Architecture Layers</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                    {layers.map((l, i) => (
                        <div key={i}>
                            <div style={{
                                display: 'flex', alignItems: 'flex-start', gap: 8,
                                padding: '7px 0',
                            }}>
                                <span style={{ fontSize: '0.72rem', flexShrink: 0, marginTop: 1 }}>{l.icon}</span>
                                <div>
                                    <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                                        {l.name}
                                    </div>
                                    <div style={{ fontSize: '0.58rem', color: 'var(--text-muted)', lineHeight: 1.4, marginTop: 1 }}>
                                        {l.desc}
                                    </div>
                                </div>
                            </div>
                            {i < layers.length - 1 && (
                                <div style={{
                                    width: 1, height: 8,
                                    background: 'var(--border)',
                                    marginLeft: 5,
                                }} />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Card 3: Core Innovation + Mini Diagram ── */}
            <div style={cardStyle}>
                <div style={labelStyle}>Core Innovation</div>
                <div style={{
                    fontSize: '0.68rem', fontWeight: 700, color: 'var(--accent)',
                    marginBottom: 6, lineHeight: 1.3,
                }}>
                    Function-Based BPMN Architecture
                </div>
                <p style={{ fontSize: '0.6rem', color: 'var(--text-dim)', lineHeight: 1.55, margin: '0 0 8px' }}>
                    Traditional process design binds logic to job positions. This innovation introduces a <strong style={{ color: 'var(--text-primary)' }}>decoupling layer</strong> where:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginBottom: 14 }}>
                    {['Business processes remain stable', 'Organizational roles can change', 'Only role mapping is updated'].map((t, i) => (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'flex-start', gap: 6,
                            fontSize: '0.58rem', color: 'var(--text-secondary)', lineHeight: 1.4,
                        }}>
                            <span style={{ color: 'var(--accent)', fontWeight: 700, flexShrink: 0 }}>•</span>
                            {t}
                        </div>
                    ))}
                </div>

                {/* Mini Architecture Diagram */}
                <div style={{
                    padding: '12px 10px',
                    background: 'rgba(0,119,182,0.03)',
                    border: '1px solid rgba(0,119,182,0.1)',
                    borderRadius: 10,
                }}>
                    {[
                        { label: 'Business Strategy', bg: 'rgba(0,119,182,0.08)' },
                        null,
                        { label: 'Process Landscape', bg: 'rgba(0,119,182,0.08)' },
                        null,
                        { label: 'Function-Based BPMN', bg: 'rgba(0,119,182,0.12)', accent: true },
                        'decouple',
                        { label: 'Role Mapping Matrix', bg: 'rgba(0,119,182,0.08)' },
                        null,
                        { label: 'Organization Structure', bg: 'rgba(0,119,182,0.06)' },
                    ].map((item, i) => {
                        if (item === null) {
                            return (
                                <div key={i} style={{ textAlign: 'center', lineHeight: 1, padding: '1px 0' }}>
                                    <span style={{ fontSize: '0.6rem', color: 'var(--accent)', fontWeight: 700 }}>│</span>
                                </div>
                            )
                        }
                        if (item === 'decouple') {
                            return (
                                <div key={i} style={{
                                    textAlign: 'center', padding: '3px 0',
                                    fontSize: '0.48rem', fontWeight: 800, color: '#e17055',
                                    textTransform: 'uppercase', letterSpacing: 1.5,
                                }}>
                                    ─── decoupling layer ───
                                </div>
                            )
                        }
                        return (
                            <div key={i} style={{
                                textAlign: 'center',
                                padding: '4px 8px',
                                background: item.bg,
                                borderRadius: 6,
                                fontSize: '0.55rem',
                                fontWeight: item.accent ? 800 : 600,
                                color: item.accent ? 'var(--accent)' : 'var(--text-secondary)',
                                border: item.accent ? '1px solid rgba(0,119,182,0.2)' : '1px solid transparent',
                            }}>
                                {item.label}
                            </div>
                        )
                    })}
                </div>
            </div>
        </aside>
    )
}
