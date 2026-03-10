import { useState } from 'react'
import SectionWrapper from '../../layouts/SectionWrapper'
import { useTranslation } from '../../i18n/LanguageContext'

export default function RootCauseSystemMap() {
    const { t } = useTranslation()
    const [selected, setSelected] = useState(null)

    const rootCause = {
        label: t('rootCause.label'),
        description: t('rootCause.description'),
        icon: '🎯',
    }

    const effects = [
        {
            id: 'dependency', label: t('rootCause.dep'), icon: '🔗', color: '#d63031',
            description: t('rootCause.depDesc'), example: t('rootCause.depExample'), impact: t('rootCause.depImpact'),
        },
        {
            id: 'documentation', label: t('rootCause.doc'), icon: '📑', color: '#e17055',
            description: t('rootCause.docDesc'), example: t('rootCause.docExample'), impact: t('rootCause.docImpact'),
        },
        {
            id: 'handoff', label: t('rootCause.handoff'), icon: '🔄', color: '#0984e3',
            description: t('rootCause.handoffDesc'), example: t('rootCause.handoffExample'), impact: t('rootCause.handoffImpact'),
        },
        {
            id: 'cycletime', label: t('rootCause.cycle'), icon: '⏱️', color: '#6c5ce7',
            description: t('rootCause.cycleDesc'), example: t('rootCause.cycleExample'), impact: t('rootCause.cycleImpact'),
        },
    ]

    return (
        <SectionWrapper id="rootcause" variant="darker">
            <div className="section-header">
                <span className="section-tag">{t('rootCause.tag')}</span>
                <h2 className="section-title">{t('rootCause.title1')}<span className="gradient-text">{t('rootCause.titleAccent')}</span>{t('rootCause.title2')}</h2>
                <p className="section-subtitle">{t('rootCause.subtitle')}</p>
            </div>

            <div className="container">
                <div style={{
                    maxWidth: 600, margin: '0 auto 40px', padding: '28px 32px',
                    background: 'linear-gradient(135deg, rgba(214,48,49,0.06), rgba(214,48,49,0.02))',
                    border: '2px solid rgba(214,48,49,0.2)', borderRadius: 'var(--radius-lg)', textAlign: 'center',
                }}>
                    <div style={{ fontSize: '2rem', marginBottom: 8 }}>{rootCause.icon}</div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#d63031', marginBottom: 8 }}>{rootCause.label}</h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>{rootCause.description}</p>
                </div>

                <div style={{ textAlign: 'center', marginBottom: 24, color: '#d63031', fontSize: '1.5rem' }}>
                    ▼ {t('rootCause.causes')} ▼
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, maxWidth: 960, margin: '0 auto' }}>
                    {effects.map((ef) => (
                        <div key={ef.id}
                            onClick={() => setSelected(selected === ef.id ? null : ef.id)}
                            style={{
                                padding: '28px 28px',
                                background: selected === ef.id ? `linear-gradient(135deg, ${ef.color}08, ${ef.color}04)` : 'var(--bg-card-solid)',
                                border: `1.5px solid ${selected === ef.id ? ef.color : 'var(--border)'}`,
                                borderRadius: 'var(--radius)', cursor: 'pointer', transition: 'all 0.3s ease',
                                boxShadow: selected === ef.id ? `0 4px 20px ${ef.color}15` : 'var(--shadow-sm)',
                            }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                                <div style={{
                                    width: 50, height: 50, borderRadius: 12,
                                    background: `${ef.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '1.5rem', border: `1px solid ${ef.color}25`,
                                }}>{ef.icon}</div>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>{ef.label}</div>
                                    <div style={{ fontSize: '0.8rem', color: ef.color, fontWeight: 600, marginTop: 3 }}>{ef.impact}</div>
                                </div>
                            </div>
                            <p style={{ fontSize: '0.95rem', color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: selected === ef.id ? 12 : 0 }}>{ef.description}</p>
                            {selected === ef.id && (
                                <div style={{ marginTop: 12, padding: '14px 18px', background: `${ef.color}08`, borderRadius: 8, borderLeft: `3px solid ${ef.color}` }}>
                                    <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: ef.color, marginBottom: 4 }}>{t('rootCause.realExample')}</div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>{ef.example}</div>
                                </div>
                            )}
                            <div style={{ marginTop: 12, fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'right' }}>
                                {selected === ef.id ? t('rootCause.clickClose') : t('rootCause.clickOpen')}
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{
                    maxWidth: 700, margin: '40px auto 0', padding: '20px 28px',
                    background: 'var(--bg-tertiary)', borderRadius: 'var(--radius)',
                    border: '1px solid var(--border)', display: 'flex', alignItems: 'flex-start', gap: 16,
                }}>
                    <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>💡</div>
                    <div>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem', marginBottom: 4 }}>{t('rootCause.conclusionTitle')}</div>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-dim)', lineHeight: 1.6, margin: 0 }}>
                            {t('rootCause.conclusionText')}
                        </p>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}
