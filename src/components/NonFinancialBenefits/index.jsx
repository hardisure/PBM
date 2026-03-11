import SectionWrapper from '../../layouts/SectionWrapper'
import { useTranslation } from '../../i18n/LanguageContext'

export default function NonFinancialBenefits() {
    const { t } = useTranslation()

    const benefits = [
        { icon: '🛡️', title: t('nonFinancial.b1Title'), desc: t('nonFinancial.b1Desc'), color: '#0077b6' },
        { icon: '📋', title: t('nonFinancial.b2Title'), desc: t('nonFinancial.b2Desc'), color: '#059669' },
        { icon: '⚠️', title: t('nonFinancial.b3Title'), desc: t('nonFinancial.b3Desc'), color: '#d97706' },
        { icon: '🤝', title: t('nonFinancial.b4Title'), desc: t('nonFinancial.b4Desc'), color: '#7c3aed' },
        { icon: '💻', title: t('nonFinancial.b5Title'), desc: t('nonFinancial.b5Desc'), color: '#0891b2' },
    ]

    return (
        <SectionWrapper id="non-financial" variant="dark">
            <div className="section-header">
                <span className="section-tag" style={{ background: 'rgba(16,185,129,0.08)', color: '#059669' }}>{t('nonFinancial.tag')}</span>
                <h2 className="section-title">{t('nonFinancial.title1')}<span className="gradient-text">{t('nonFinancial.titleAccent')}</span></h2>
                <p className="section-subtitle">{t('nonFinancial.subtitle')}</p>
            </div>

            <div style={{ maxWidth: 800, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                {benefits.slice(0, 3).map((b, i) => (
                    <div key={i} style={{
                        padding: 24, background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--border)', transition: 'all 0.3s',
                    }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = `${b.color}30`; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.04)' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
                    >
                        <div style={{ fontSize: '1.6rem', marginBottom: 12 }}>{b.icon}</div>
                        <div style={{ fontWeight: 700, color: b.color, fontSize: '0.88rem', marginBottom: 8 }}>{b.title}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>{b.desc}</div>
                    </div>
                ))}
            </div>
            <div style={{ maxWidth: 540, margin: '16px auto 0', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                {benefits.slice(3, 5).map((b, i) => (
                    <div key={i} style={{
                        padding: 24, background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--border)', transition: 'all 0.3s',
                    }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = `${b.color}30`; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.04)' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
                    >
                        <div style={{ fontSize: '1.6rem', marginBottom: 12 }}>{b.icon}</div>
                        <div style={{ fontWeight: 700, color: b.color, fontSize: '0.88rem', marginBottom: 8 }}>{b.title}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>{b.desc}</div>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    )
}
