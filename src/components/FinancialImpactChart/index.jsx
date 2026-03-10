import SectionWrapper from '../../layouts/SectionWrapper'
import { useTranslation } from '../../i18n/LanguageContext'

export default function FinancialImpactChart() {
    const { t } = useTranslation()

    const roiItems = [
        { icon: '📊', value: 'Rp 24 Juta', label: t('financial.roi1Label') },
        { icon: '⚡', value: 'Rp 297 Juta', label: t('financial.roi2Label') },
    ]

    return (
        <SectionWrapper id="financial" variant="darker">
            <div className="section-header">
                <span className="section-tag">{t('financial.tag')}</span>
                <h2 className="section-title">{t('financial.title1')}<span className="gradient-text">{t('financial.titleAccent')}</span></h2>
                <p className="section-subtitle">{t('financial.subtitle')}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, maxWidth: 800, margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 40, padding: '40px 0' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 60, height: 80, background: 'linear-gradient(to top, rgba(214,48,49,0.6), rgba(214,48,49,0.15))', borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 8 }}>
                            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#c0392b' }}>Rp 88 Jt</span>
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{t('financial.investment')}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 60, height: 280, background: 'linear-gradient(to top, rgba(0,119,182,0.6), rgba(0,119,182,0.15))', borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 8 }}>
                            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent)' }}>Rp 321 Jt</span>
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{t('financial.annualBenefit')}</span>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {roiItems.map((item, i) => (
                        <div key={i} style={{ display: 'flex', gap: 16, padding: 20, background: 'var(--bg-card)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                            <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                            <div>
                                <div style={{ fontWeight: 800, color: 'var(--accent)', fontSize: '1.05rem' }}>{item.value}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{item.label}</div>
                            </div>
                        </div>
                    ))}
                    <div style={{ padding: 20, background: 'rgba(0,119,182,0.06)', borderRadius: 'var(--radius)', border: '1px solid rgba(0,119,182,0.2)', textAlign: 'center' }}>
                        <span style={{ fontSize: '1.5rem' }}>📈</span>
                        <div style={{ fontWeight: 900, color: 'var(--accent)', fontSize: '1.3rem', margin: '4px 0' }}>ROI &lt; 1 Year</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{t('financial.roiReturn')}</div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}
