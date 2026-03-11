import SectionWrapper from '../../layouts/SectionWrapper'
import { useTranslation } from '../../i18n/LanguageContext'

export default function PortersFiveForces() {
    const { t } = useTranslation()

    const forces = [
        { label: t('porters.f1'), level: t('porters.f1Level'), desc: t('porters.f1Desc'), color: '#d97706', levelNum: 2, icon: '🚪' },
        { label: t('porters.f2'), level: t('porters.f2Level'), desc: t('porters.f2Desc'), color: '#c0392b', levelNum: 3, icon: '🤝' },
        { label: t('porters.f3'), level: t('porters.f3Level'), desc: t('porters.f3Desc'), color: '#059669', levelNum: 1, icon: '📦' },
        { label: t('porters.f4'), level: t('porters.f4Level'), desc: t('porters.f4Desc'), color: '#d97706', levelNum: 2, icon: '🔄' },
        { label: t('porters.f5'), level: t('porters.f5Level'), desc: t('porters.f5Desc'), color: '#c0392b', levelNum: 3, icon: '⚔️' },
    ]

    const levelBar = (num, color) => (
        <div style={{ display: 'flex', gap: 3 }}>
            {[1, 2, 3].map(n => (
                <div key={n} style={{ width: 20, height: 4, borderRadius: 2, background: n <= num ? color : 'rgba(0,60,120,0.06)' }} />
            ))}
        </div>
    )

    return (
        <SectionWrapper id="porters" variant="dark">
            <div className="section-header">
                <span className="section-tag" style={{ background: 'rgba(217,119,6,0.08)', color: '#d97706' }}>{t('porters.tag')}</span>
                <h2 className="section-title">{t('porters.title1')}<span className="gradient-text">{t('porters.titleAccent')}</span></h2>
                <p className="section-subtitle">{t('porters.subtitle')}</p>
            </div>

            <div style={{ maxWidth: 750, margin: '0 auto' }}>
                {/* Center Force */}
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <div style={{
                        display: 'inline-block', padding: '16px 32px', background: 'rgba(0,119,182,0.06)',
                        borderRadius: 'var(--radius-lg)', border: '2px solid rgba(0,119,182,0.2)',
                    }}>
                        <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--accent)' }}>⚔️ {t('porters.centerLabel')}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: 4 }}>{t('porters.centerDesc')}</div>
                    </div>
                </div>

                {/* Five Forces Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                    {forces.slice(0, 4).map((f, i) => (
                        <div key={i} style={{
                            padding: 20, background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)',
                            border: '1px solid var(--border)', transition: 'all 0.3s',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = `${f.color}40`; e.currentTarget.style.transform = 'translateY(-2px)' }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span style={{ fontSize: '1.1rem' }}>{f.icon}</span>
                                    <span style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--text-primary)' }}>{f.label}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    {levelBar(f.levelNum, f.color)}
                                    <span style={{ fontSize: '0.68rem', fontWeight: 700, color: f.color }}>{f.level}</span>
                                </div>
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', lineHeight: 1.55 }}>{f.desc}</div>
                        </div>
                    ))}
                </div>
                {/* 5th Force centered */}
                <div style={{ maxWidth: 370, margin: '16px auto 0' }}>
                    <div style={{
                        padding: 20, background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--border)',
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span style={{ fontSize: '1.1rem' }}>{forces[4].icon}</span>
                                <span style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--text-primary)' }}>{forces[4].label}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                {levelBar(forces[4].levelNum, forces[4].color)}
                                <span style={{ fontSize: '0.68rem', fontWeight: 700, color: forces[4].color }}>{forces[4].level}</span>
                            </div>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', lineHeight: 1.55 }}>{forces[4].desc}</div>
                    </div>
                </div>

                <div style={{ marginTop: 24, padding: 16, background: 'rgba(0,119,182,0.04)', borderRadius: 'var(--radius)', border: '1px solid rgba(0,119,182,0.1)', textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--accent)', marginBottom: 4 }}>{t('porters.strategyLabel')}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{t('porters.strategyDesc')}</div>
                </div>
            </div>
        </SectionWrapper>
    )
}
