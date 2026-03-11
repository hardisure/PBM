import { useState } from 'react'
import SectionWrapper from '../../layouts/SectionWrapper'
import { useTranslation } from '../../i18n/LanguageContext'

export default function CommercializationRoadmap() {
    const { t } = useTranslation()
    const [activePhase, setActivePhase] = useState(0)

    const phases = [
        {
            num: '01', label: t('commercialization.p1'), timeline: t('commercialization.p1Time'), color: '#0077b6',
            items: [t('commercialization.p1a'), t('commercialization.p1b'), t('commercialization.p1c')],
        },
        {
            num: '02', label: t('commercialization.p2'), timeline: t('commercialization.p2Time'), color: '#059669',
            items: [t('commercialization.p2a'), t('commercialization.p2b'), t('commercialization.p2c')],
        },
        {
            num: '03', label: t('commercialization.p3'), timeline: t('commercialization.p3Time'), color: '#7c3aed',
            items: [t('commercialization.p3a'), t('commercialization.p3b'), t('commercialization.p3c')],
        },
        {
            num: '04', label: t('commercialization.p4'), timeline: t('commercialization.p4Time'), color: '#d97706',
            items: [t('commercialization.p4a'), t('commercialization.p4b'), t('commercialization.p4c')],
        },
        {
            num: '05', label: t('commercialization.p5'), timeline: t('commercialization.p5Time'), color: '#0891b2',
            items: [t('commercialization.p5a'), t('commercialization.p5b'), t('commercialization.p5c')],
        },
    ]

    const phase = phases[activePhase]

    return (
        <SectionWrapper id="commercialization" variant="dark">
            <div className="section-header">
                <span className="section-tag" style={{ background: 'rgba(0,119,182,0.08)', color: 'var(--accent)' }}>{t('commercialization.tag')}</span>
                <h2 className="section-title">{t('commercialization.title1')}<span className="gradient-text">{t('commercialization.titleAccent')}</span></h2>
                <p className="section-subtitle">{t('commercialization.subtitle')}</p>
            </div>

            <div style={{ maxWidth: 800, margin: '0 auto' }}>
                {/* Phase Selector Timeline */}
                <div style={{ display: 'flex', gap: 0, marginBottom: 32, position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 18, left: '5%', right: '5%', height: 3, background: 'var(--border)', borderRadius: 2, zIndex: 0 }} />
                    <div style={{ position: 'absolute', top: 18, left: '5%', height: 3, width: `${(activePhase / (phases.length - 1)) * 90}%`, background: 'var(--accent)', borderRadius: 2, zIndex: 1, transition: 'width 0.4s ease' }} />
                    {phases.map((p, i) => (
                        <div key={i} onClick={() => setActivePhase(i)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer', zIndex: 2 }}>
                            <div style={{
                                width: 38, height: 38, borderRadius: '50%',
                                background: i <= activePhase ? p.color : 'var(--bg-card)',
                                border: `2px solid ${i <= activePhase ? p.color : 'var(--border)'}`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: i <= activePhase ? '#fff' : 'var(--text-muted)',
                                fontWeight: 800, fontSize: '0.7rem', transition: 'all 0.3s',
                            }}>{p.num}</div>
                            <div style={{ fontSize: '0.68rem', fontWeight: 600, color: i === activePhase ? p.color : 'var(--text-muted)', textAlign: 'center', maxWidth: 100, transition: 'color 0.3s' }}>{p.label}</div>
                        </div>
                    ))}
                </div>

                {/* Phase Detail */}
                <div style={{ padding: 28, background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: `1.5px solid ${phase.color}25` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <div>
                            <div style={{ fontWeight: 800, fontSize: '1rem', color: phase.color }}>{phase.label}</div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>{t('commercialization.phaseLabel')} {phase.num}</div>
                        </div>
                        <div style={{ padding: '6px 14px', background: `${phase.color}0a`, borderRadius: 6, border: `1px solid ${phase.color}25`, fontSize: '0.72rem', fontWeight: 700, color: phase.color }}>
                            📅 {phase.timeline}
                        </div>
                    </div>
                    {phase.items.map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 0', fontSize: '0.82rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                            <span style={{ color: phase.color, marginTop: 2, flexShrink: 0 }}>✓</span>{item}
                        </div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    )
}
