import SectionWrapper from '../../layouts/SectionWrapper'
import { useTranslation } from '../../i18n/LanguageContext'

export default function Pricing() {
    const { t } = useTranslation()

    const tiers = [
        {
            name: t('pricing.tier1Name'),
            price: t('pricing.tier1Price'),
            unit: t('pricing.tier1Unit'),
            desc: t('pricing.tier1Desc'),
            features: [t('pricing.tier1f1'), t('pricing.tier1f2'), t('pricing.tier1f3'), t('pricing.tier1f4')],
            cta: t('pricing.tier1Cta'),
            highlight: false,
        },
        {
            name: t('pricing.tier2Name'),
            price: t('pricing.tier2Price'),
            unit: t('pricing.tier2Unit'),
            desc: t('pricing.tier2Desc'),
            features: [t('pricing.tier2f1'), t('pricing.tier2f2'), t('pricing.tier2f3'), t('pricing.tier2f4'), t('pricing.tier2f5'), t('pricing.tier2f6'), t('pricing.tier2f7')],
            cta: t('pricing.tier2Cta'),
            highlight: true,
        },
        {
            name: t('pricing.tier3Name'),
            price: t('pricing.tier3Price'),
            unit: t('pricing.tier3Unit'),
            desc: t('pricing.tier3Desc'),
            features: [t('pricing.tier3f1'), t('pricing.tier3f2'), t('pricing.tier3f3'), t('pricing.tier3f4'), t('pricing.tier3f5'), t('pricing.tier3f6')],
            cta: t('pricing.tier3Cta'),
            highlight: false,
        },
    ]

    return (
        <SectionWrapper id="pricing" variant="product-alt">
            <div className="section-header">
                <span className="section-tag">{t('pricing.tag')}</span>
                <h2 className="section-title">{t('pricing.title')} <span className="gradient-text">{t('pricing.titleAccent')}</span></h2>
                <p className="section-subtitle">{t('pricing.subtitle')}</p>
            </div>

            {/* Financial Outcome Box */}
            <div style={{
                display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap',
                maxWidth: 600, margin: '0 auto 40px',
            }}>
                <div style={{
                    flex: '1 1 240px', padding: '20px 24px', textAlign: 'center',
                    background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.12)',
                    borderRadius: 12,
                }}>
                    <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: '#059669', marginBottom: 6 }}>{t('pricing.costReduction')}</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#059669' }}>30–60%</div>
                </div>
                <div style={{
                    flex: '1 1 240px', padding: '20px 24px', textAlign: 'center',
                    background: 'rgba(0,119,182,0.04)', border: '1px solid rgba(0,119,182,0.12)',
                    borderRadius: 12,
                }}>
                    <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: 'var(--accent)', marginBottom: 6 }}>{t('pricing.paybackPeriod')}</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--accent)' }}>{t('pricing.paybackVal')}</div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, maxWidth: 960, margin: '0 auto' }}>
                {tiers.map((tier, i) => (
                    <div key={i} style={{
                        padding: 32,
                        background: tier.highlight ? 'rgba(0,119,182,0.04)' : 'var(--bg-card)',
                        borderRadius: 'var(--radius-lg)',
                        border: `1.5px solid ${tier.highlight ? 'var(--accent)' : 'var(--border)'}`,
                        display: 'flex', flexDirection: 'column', position: 'relative',
                        ...(tier.highlight ? { transform: 'scale(1.04)', boxShadow: '0 8px 40px rgba(0,119,182,0.1)' } : {}),
                    }}>
                        {tier.highlight && (
                            <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'var(--accent)', color: '#fff', padding: '4px 16px', borderRadius: 12, fontSize: '0.7rem', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>
                                {t('pricing.recommended')}
                            </div>
                        )}
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--accent)', marginBottom: 8 }}>{tier.name}</div>
                        <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: 2, fontFamily: 'var(--font-display)' }}>{tier.price}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 12, fontWeight: 500 }}>{tier.unit}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: 20 }}>{tier.desc}</div>
                        <div style={{ flex: 1, marginBottom: 24 }}>
                            {tier.features.map((f, fi) => (
                                <div key={fi} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '5px 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                    <span style={{ color: 'var(--accent)', marginTop: 1, flexShrink: 0 }}>✓</span> {f}
                                </div>
                            ))}
                        </div>
                        <button className={tier.highlight ? 'btn btn-primary' : 'btn btn-outline'} style={{ width: '100%', justifyContent: 'center' }}>
                            {tier.cta}
                        </button>
                    </div>
                ))}
            </div>

            {/* Average project value note */}
            <div style={{
                maxWidth: 640, margin: '48px auto 0', textAlign: 'center',
                padding: '20px 24px', background: 'rgba(0,119,182,0.04)',
                borderRadius: 'var(--radius-lg)', border: '1px solid rgba(0,119,182,0.1)',
            }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: 'var(--accent)', marginBottom: 8 }}>
                    {t('pricing.avgProjectValue')}
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                    {t('pricing.avgProjectAmount')}
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4, marginBottom: 0 }}>
                    {t('pricing.avgProjectNote')}
                </p>
            </div>
        </SectionWrapper>
    )
}
