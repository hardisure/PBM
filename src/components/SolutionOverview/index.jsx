import SectionWrapper from '../../layouts/SectionWrapper'
import { useTranslation } from '../../i18n/LanguageContext'

export default function SolutionOverview() {
    const { t } = useTranslation()

    const features = [
        { icon: '🔓', title: t('solutionOverview.feat1Title'), desc: t('solutionOverview.feat1Desc') },
        { icon: '🗺️', title: t('solutionOverview.feat2Title'), desc: t('solutionOverview.feat2Desc') },
        { icon: '📊', title: t('solutionOverview.feat3Title'), desc: t('solutionOverview.feat3Desc') },
        { icon: '⚡', title: t('solutionOverview.feat4Title'), desc: t('solutionOverview.feat4Desc') },
    ]

    const steps = [
        { num: '1', title: t('solutionOverview.step1'), desc: t('solutionOverview.step1Desc') },
        { num: '2', title: t('solutionOverview.step2'), desc: t('solutionOverview.step2Desc') },
        { num: '3', title: t('solutionOverview.step3'), desc: t('solutionOverview.step3Desc') },
        { num: '4', title: t('solutionOverview.step4'), desc: t('solutionOverview.step4Desc') },
    ]

    return (
        <SectionWrapper id="solution" variant="product">
            <div className="section-header">
                <span className="section-tag" style={{ background: 'rgba(0,119,182,0.1)', color: 'var(--accent)' }}>{t('solutionOverview.tag')}</span>
                <h2 className="section-title">{t('solutionOverview.title')} <span className="gradient-text">{t('solutionOverview.titleAccent')}</span></h2>
                <p className="section-subtitle">{t('solutionOverview.subtitle')}</p>
            </div>

            <h3 style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--text-muted)', marginBottom: 24 }}>{t('solutionOverview.coreModules')}</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, maxWidth: 800, margin: '0 auto 48px' }}>
                {features.map((f, i) => (
                    <div key={i} style={{
                        padding: 28,
                        background: 'rgba(0,60,120,0.03)',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--border)',
                        transition: 'all 0.3s',
                        cursor: 'default',
                    }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,119,182,0.3)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
                    >
                        <div style={{ fontSize: '2rem', marginBottom: 12 }}>{f.icon}</div>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1.05rem', marginBottom: 8 }}>{f.title}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>{f.desc}</div>
                    </div>
                ))}
            </div>

            {/* How it works */}
            <h3 style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 32 }}>{t('solutionOverview.howTitle')} <span className="gradient-text">{t('solutionOverview.howAccent')}</span></h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, maxWidth: 900, margin: '0 auto' }}>
                {steps.map((st, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(0,119,182,0.1)', border: '2px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontWeight: 800, color: 'var(--accent)', fontSize: '1.1rem' }}>{st.num}</div>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem', marginBottom: 6 }}>{st.title}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', lineHeight: 1.4 }}>{st.desc}</div>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    )
}
