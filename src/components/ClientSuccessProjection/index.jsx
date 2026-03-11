import SectionWrapper from '../../layouts/SectionWrapper'
import { useTranslation } from '../../i18n/LanguageContext'

export default function ClientSuccessProjection() {
    const { t } = useTranslation()

    const years = [
        { year: t('clientProjection.y1Label'), clients: 2, revenue: 800, color: '#0077b6', pct: 20 },
        { year: t('clientProjection.y2Label'), clients: 4, revenue: 1600, color: '#059669', pct: 40 },
        { year: t('clientProjection.y3Label'), clients: 6, revenue: 2400, color: '#0891b2', pct: 60 },
    ]

    const targets = [
        { name: t('clientProjection.target1'), desc: t('clientProjection.target1Desc'), icon: '⚡' },
        { name: t('clientProjection.target2'), desc: t('clientProjection.target2Desc'), icon: '🏢' },
    ]

    return (
        <SectionWrapper id="client-projection" variant="darker">
            <div className="section-header">
                <span className="section-tag" style={{ background: 'rgba(0,184,148,0.08)', color: '#00b894' }}>{t('clientProjection.tag')}</span>
                <h2 className="section-title">{t('clientProjection.title1')}<span className="gradient-text">{t('clientProjection.titleAccent')}</span></h2>
                <p className="section-subtitle">{t('clientProjection.subtitle')}</p>
            </div>

            <div style={{ maxWidth: 700, margin: '0 auto' }}>
                {/* Growth Bars */}
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 32, padding: '20px 0 32px', marginBottom: 24 }}>
                    {years.map((y, i) => (
                        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, flex: 1 }}>
                            <div style={{ fontWeight: 900, fontSize: '1.1rem', color: y.color }}>Rp {(y.revenue / 1000).toFixed(1)} M</div>
                            <div style={{
                                width: '100%', maxWidth: 80, height: 40 + i * 50, borderRadius: '8px 8px 0 0',
                                background: `linear-gradient(to top, ${y.color}60, ${y.color}15)`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: y.color }}>{y.clients}</span>
                            </div>
                            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)' }}>{y.year}</div>
                            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{y.clients} {t('clientProjection.clients')}</div>
                        </div>
                    ))}
                </div>

                {/* Target Clients */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    {targets.map((tgt, i) => (
                        <div key={i} style={{ padding: 20, background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                                <span style={{ fontSize: '1.3rem' }}>{tgt.icon}</span>
                                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>{tgt.name}</div>
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>{tgt.desc}</div>
                        </div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    )
}
