import { useState } from 'react'
import SectionWrapper from '../../layouts/SectionWrapper'
import { useTranslation } from '../../i18n/LanguageContext'

export default function ROIPerPackage() {
    const { t } = useTranslation()
    const [selected, setSelected] = useState(1)

    const packages = [
        { name: t('roiPkg.pkg1'), price: 50, roi: 542, payback: '< 2', color: '#0891b2' },
        { name: t('roiPkg.pkg2'), price: 450, roi: 261, payback: '< 4', color: '#0077b6' },
        { name: t('roiPkg.pkg3'), price: 600, roi: 147, payback: '< 6', color: '#7c3aed' },
    ]

    const annualBenefit = 321
    const benefitBreakdown = [
        { label: t('roiPkg.manHours'), value: 24, color: '#0891b2' },
        { label: t('roiPkg.productivity'), value: 297, color: '#0077b6' },
    ]

    const pkg = packages[selected]
    const netGain = annualBenefit - pkg.price

    return (
        <SectionWrapper id="roi-package" variant="darker">
            <div className="section-header">
                <span className="section-tag">{t('roiPkg.tag')}</span>
                <h2 className="section-title">{t('roiPkg.title1')}<span className="gradient-text">{t('roiPkg.titleAccent')}</span></h2>
                <p className="section-subtitle">{t('roiPkg.subtitle')}</p>
            </div>

            <div style={{ maxWidth: 750, margin: '0 auto' }}>
                {/* Package Selector */}
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 32 }}>
                    {packages.map((p, i) => (
                        <button key={i} onClick={() => setSelected(i)} style={{
                            padding: '10px 24px', borderRadius: 8, border: `1.5px solid ${i === selected ? p.color : 'var(--border)'}`,
                            background: i === selected ? `${p.color}0a` : 'var(--bg-card)',
                            color: i === selected ? p.color : 'var(--text-dim)', fontWeight: 700, fontSize: '0.82rem',
                            cursor: 'pointer', transition: 'all 0.2s',
                        }}>
                            {p.name}
                        </button>
                    ))}
                </div>

                {/* ROI Display */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 28 }}>
                    <div style={{ padding: 24, background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#c0392b', marginBottom: 8 }}>{t('roiPkg.investment')}</div>
                        <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#c0392b' }}>Rp {pkg.price}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{t('roiPkg.million')}</div>
                    </div>
                    <div style={{ padding: 24, background: 'rgba(0,119,182,0.04)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(0,119,182,0.15)', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>ROI</div>
                        <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--accent)' }}>{pkg.roi}%</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{t('roiPkg.firstYear')}</div>
                    </div>
                    <div style={{ padding: 24, background: 'rgba(0,184,148,0.04)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(0,184,148,0.15)', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#00b894', marginBottom: 8 }}>{t('roiPkg.payback')}</div>
                        <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#00b894' }}>{pkg.payback}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{t('roiPkg.months')}</div>
                    </div>
                </div>

                {/* Benefit Breakdown */}
                <div style={{ padding: 24, background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>{t('roiPkg.breakdownTitle')}</div>
                    {benefitBreakdown.map((b, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                    <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>{b.label}</span>
                                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: b.color }}>Rp {b.value} Jt</span>
                                </div>
                                <div style={{ height: 6, background: 'rgba(0,60,120,0.04)', borderRadius: 3, overflow: 'hidden' }}>
                                    <div style={{ height: '100%', width: `${(b.value / annualBenefit) * 100}%`, background: b.color, borderRadius: 3, transition: 'width 0.8s ease' }} />
                                </div>
                            </div>
                        </div>
                    ))}
                    <div style={{ marginTop: 16, padding: 14, background: 'rgba(0,184,148,0.04)', borderRadius: 8, border: '1px solid rgba(0,184,148,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>{t('roiPkg.totalAnnual')}</span>
                        <span style={{ fontWeight: 900, fontSize: '1.2rem', color: '#00b894' }}>Rp {annualBenefit} Jt / {t('roiPkg.year')}</span>
                    </div>
                    {netGain > 0 && (
                        <div style={{ marginTop: 10, padding: 10, background: 'rgba(0,184,148,0.04)', borderRadius: 8, textAlign: 'center', fontSize: '0.78rem', color: '#00b894', fontWeight: 600 }}>
                            💰 {t('roiPkg.netGain')}: Rp {netGain} Jt {t('roiPkg.firstYearNote')}
                        </div>
                    )}
                </div>
            </div>
        </SectionWrapper>
    )
}
