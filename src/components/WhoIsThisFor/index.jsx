import SectionWrapper from '../../layouts/SectionWrapper'
import { useTranslation } from '../../i18n/LanguageContext'

export default function WhoIsThisFor() {
    const { t } = useTranslation()

    const audiences = [
        { icon: '🔄', title: t('whoIsThisFor.aud1Title'), desc: t('whoIsThisFor.aud1Desc') },
        { icon: '🏢', title: t('whoIsThisFor.aud2Title'), desc: t('whoIsThisFor.aud2Desc') },
        { icon: '📋', title: t('whoIsThisFor.aud3Title'), desc: t('whoIsThisFor.aud3Desc') },
        { icon: '🔍', title: t('whoIsThisFor.aud4Title'), desc: t('whoIsThisFor.aud4Desc') },
    ]

    return (
        <SectionWrapper id="who" variant="product">
            <div className="section-header">
                <span className="section-tag" style={{ background: 'rgba(0,119,182,0.08)', color: 'var(--accent)' }}>{t('whoIsThisFor.tag')}</span>
                <h2 className="section-title">{t('whoIsThisFor.title1')}<span className="gradient-text">{t('whoIsThisFor.titleAccent')}</span></h2>
                <p className="section-subtitle">{t('whoIsThisFor.subtitle')}</p>
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
