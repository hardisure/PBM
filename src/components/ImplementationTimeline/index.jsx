import { useState } from 'react'
import SectionWrapper from '../../layouts/SectionWrapper'
import { useTranslation } from '../../i18n/LanguageContext'

export default function ImplementationTimeline() {
    const { t } = useTranslation()
    const [activePhase, setActivePhase] = useState(null)

    const phases = [
        {
            num: 1, title: t('implementationTimeline.p1Title'), duration: t('implementationTimeline.p1Duration'), color: '#0077b6',
            activities: [t('implementationTimeline.p1a1'), t('implementationTimeline.p1a2'), t('implementationTimeline.p1a3')],
            deliverables: [t('implementationTimeline.p1d1'), t('implementationTimeline.p1d2'), t('implementationTimeline.p1d3')],
        },
        {
            num: 2, title: t('implementationTimeline.p2Title'), duration: t('implementationTimeline.p2Duration'), color: '#00a896',
            activities: [t('implementationTimeline.p2a1'), t('implementationTimeline.p2a2'), t('implementationTimeline.p2a3')],
            deliverables: [t('implementationTimeline.p2d1'), t('implementationTimeline.p2d2'), t('implementationTimeline.p2d3')],
        },
        {
            num: 3, title: t('implementationTimeline.p3Title'), duration: t('implementationTimeline.p3Duration'), color: '#e17055',
            activities: [t('implementationTimeline.p3a1'), t('implementationTimeline.p3a2'), t('implementationTimeline.p3a3')],
            deliverables: [t('implementationTimeline.p3d1'), t('implementationTimeline.p3d2')],
        },
        {
            num: 4, title: t('implementationTimeline.p4Title'), duration: t('implementationTimeline.p4Duration'), color: '#6c5ce7',
            activities: [t('implementationTimeline.p4a1'), t('implementationTimeline.p4a2'), t('implementationTimeline.p4a3')],
            deliverables: [t('implementationTimeline.p4d1'), t('implementationTimeline.p4d2'), t('implementationTimeline.p4d3')],
        },
    ]

    const s = {
        timeline: { display: 'flex', gap: 0, maxWidth: 900, margin: '0 auto 32px', position: 'relative' },
        phase: (p, active) => ({
            flex: 1, padding: '20px 16px', textAlign: 'center', cursor: 'pointer',
            background: active ? `${p.color}10` : 'var(--bg-card)',
            border: `1.5px solid ${active ? p.color : 'var(--border)'}`,
            borderRadius: 12, transition: 'all 0.3s',
            position: 'relative', zIndex: active ? 2 : 1,
            ...(active ? { transform: 'scale(1.03)', boxShadow: `0 4px 24px ${p.color}15` } : {}),
        }),
        phaseNum: (c) => ({
            width: 36, height: 36, borderRadius: '50%', background: `${c}15`, border: `2px solid ${c}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 8px', fontWeight: 800, fontSize: '0.85rem', color: c,
        }),
        phaseTitle: { fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: 4 },
        phaseDuration: { fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 500 },
        detail: { maxWidth: 800, margin: '0 auto', padding: 28, background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' },
        detailGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 },
        detailLabel: { fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: 'var(--accent)', marginBottom: 12 },
        detailItem: { display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 6 },
        summaryRow: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, maxWidth: 700, margin: '32px auto 0' },
        summaryCard: { padding: 20, background: 'var(--bg-card)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', textAlign: 'center' },
        summaryLabel: { fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)', marginBottom: 6 },
        summaryValue: { fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent)' },
    }

    return (
        <SectionWrapper id="implementation" variant="product">
            <div className="section-header">
                <span className="section-tag" style={{ background: 'rgba(0,119,182,0.08)', color: 'var(--accent)' }}>{t('implementationTimeline.tag')}</span>
                <h2 className="section-title">
                    {t('implementationTimeline.title1')}<span className="gradient-text">{t('implementationTimeline.titleAccent')}</span>{t('implementationTimeline.title2')}
                </h2>
                <p className="section-subtitle">{t('implementationTimeline.subtitle')}</p>
            </div>

            <div style={s.timeline}>
                {phases.map((p) => (
                    <div key={p.num} style={s.phase(p, activePhase === p.num)} onClick={() => setActivePhase(activePhase === p.num ? null : p.num)}>
                        <div style={s.phaseNum(p.color)}>{p.num}</div>
                        <div style={s.phaseTitle}>{p.title}</div>
                        <div style={s.phaseDuration}>{p.duration}</div>
                    </div>
                ))}
            </div>

            {activePhase ? (
                <div style={s.detail}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 20 }}>
                        {t('implementationTimeline.phase')} {activePhase}: {phases[activePhase - 1].title}
                        <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-muted)', marginLeft: 12 }}>
                            {t('implementationTimeline.duration')}: {phases[activePhase - 1].duration}
                        </span>
                    </h4>
                    <div style={s.detailGrid}>
                        <div>
                            <div style={s.detailLabel}>{t('implementationTimeline.activities')}</div>
                            {phases[activePhase - 1].activities.map((a, i) => (
                                <div key={i} style={s.detailItem}>
                                    <span style={{ color: 'var(--accent)', flexShrink: 0 }}>▸</span> {a}
                                </div>
                            ))}
                        </div>
                        <div>
                            <div style={s.detailLabel}>{t('implementationTimeline.deliverables')}</div>
                            {phases[activePhase - 1].deliverables.map((d, i) => (
                                <div key={i} style={s.detailItem}>
                                    <span style={{ color: '#00b894', flexShrink: 0 }}>✓</span> {d}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    {t('implementationTimeline.clickHint')}
                </div>
            )}

            <div style={s.summaryRow}>
                <div style={s.summaryCard}>
                    <div style={s.summaryLabel}>{t('implementationTimeline.summaryDuration')}</div>
                    <div style={s.summaryValue}>{t('implementationTimeline.summaryDurationVal')}</div>
                </div>
                <div style={s.summaryCard}>
                    <div style={s.summaryLabel}>{t('implementationTimeline.summaryScope')}</div>
                    <div style={{ ...s.summaryValue, fontSize: '0.85rem' }}>{t('implementationTimeline.summaryScopeVal')}</div>
                </div>
                <div style={s.summaryCard}>
                    <div style={s.summaryLabel}>{t('implementationTimeline.summaryOutcome')}</div>
                    <div style={{ ...s.summaryValue, fontSize: '0.8rem' }}>{t('implementationTimeline.summaryOutcomeVal')}</div>
                </div>
            </div>

            {/* Client Effort */}
            <div style={{ maxWidth: 600, margin: '32px auto 0', padding: '20px 24px', background: 'rgba(0,184,148,0.04)', border: '1px solid rgba(0,184,148,0.12)', borderRadius: 12, textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: '#00b894', marginBottom: 8 }}>{t('implementationTimeline.clientEffort')}</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: 8 }}>{t('implementationTimeline.clientEffortVal')}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
                    {t('implementationTimeline.clientEffortDesc1')}<br />{t('implementationTimeline.clientEffortDesc2')}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
                    {[t('implementationTimeline.resource1'), t('implementationTimeline.resource2'), t('implementationTimeline.resource3')].map((r, i) => (
                        <span key={i} style={{ padding: '4px 12px', background: 'rgba(0,119,182,0.06)', borderRadius: 6, fontSize: '0.72rem', color: 'var(--accent)', fontWeight: 600 }}>{r}</span>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    )
}
