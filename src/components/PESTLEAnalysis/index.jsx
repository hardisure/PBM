import SectionWrapper from '../../layouts/SectionWrapper'
import { useTranslation } from '../../i18n/LanguageContext'

export default function PESTLEAnalysis() {
    const { t } = useTranslation()

    const factors = [
        { letter: 'P', label: t('pestle.political'), desc: t('pestle.pDesc'), icon: '🏛️', color: '#0077b6' },
        { letter: 'E', label: t('pestle.economic'), desc: t('pestle.eDesc'), icon: '📈', color: '#059669' },
        { letter: 'S', label: t('pestle.social'), desc: t('pestle.sDesc'), icon: '👥', color: '#7c3aed' },
        { letter: 'T', label: t('pestle.technological'), desc: t('pestle.tDesc'), icon: '💻', color: '#0891b2' },
        { letter: 'L', label: t('pestle.legal'), desc: t('pestle.lDesc'), icon: '⚖️', color: '#d97706' },
        { letter: 'E', label: t('pestle.environmental'), desc: t('pestle.envDesc'), icon: '🌿', color: '#059669' },
    ]

    return (
        <SectionWrapper id="pestle" variant="darker">
            <div className="section-header">
                <span className="section-tag">{t('pestle.tag')}</span>
                <h2 className="section-title">{t('pestle.title1')}<span className="gradient-text">{t('pestle.titleAccent')}</span></h2>
                <p className="section-subtitle">{t('pestle.subtitle')}</p>
            </div>

            <div style={{ maxWidth: 800, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                {factors.map((f, i) => (
                    <div key={i} style={{
                        padding: 22, background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--border)', transition: 'all 0.3s', cursor: 'default',
                    }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = `${f.color}40`; e.currentTarget.style.transform = 'translateY(-3px)' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                            <div style={{
                                width: 36, height: 36, borderRadius: 8, background: `${f.color}10`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem',
                            }}>{f.icon}</div>
                            <div>
                                <div style={{ fontWeight: 900, fontSize: '0.7rem', letterSpacing: 1.5, color: f.color }}>{f.letter}</div>
                                <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--text-primary)' }}>{f.label}</div>
                            </div>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>{f.desc}</div>
                    </div>
                ))}
            </div>

            <div style={{ maxWidth: 600, margin: '28px auto 0', padding: 16, background: 'rgba(0,119,182,0.04)', borderRadius: 'var(--radius)', border: '1px solid rgba(0,119,182,0.1)', textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                💡 {t('pestle.conclusion')}
            </div>
        </SectionWrapper>
    )
}
