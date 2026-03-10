import { useState, useCallback } from 'react'
import SectionWrapper from '../../layouts/SectionWrapper'
import { useTranslation } from '../../i18n/LanguageContext'

export default function ROISimulator() {
    const { t } = useTranslation()
    const [employees, setEmployees] = useState(5000)
    const [sops, setSops] = useState(300)
    const [restruct, setRestruct] = useState(3)
    const [showResults, setShowResults] = useState(false)

    const calc = useCallback(() => {
        const base = (employees * 0.02 + sops * 0.8) * restruct
        const admin = Math.round(base * 0.35)
        const operational = Math.round(base * 0.45)
        const audit = Math.round(base * 0.2)
        const total = admin + operational + audit
        const gci = Math.min(100, Math.round((employees / 100 + sops / 10 + restruct * 15) * 0.8))
        const savings = Math.round(total * 0.55)
        return { admin, operational, audit, total, gci, savings }
    }, [employees, sops, restruct])

    const results = calc()

    const sliderStyle = { width: '100%', accentColor: 'var(--accent)' }
    const labelStyle = { fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }
    const valStyle = { fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }

    return (
        <SectionWrapper id="roi" variant="product-alt">
            <div className="section-header">
                <span className="section-tag" style={{ background: 'rgba(214,48,49,0.06)', color: '#c0392b' }}>{t('roi.tag')}</span>
                <h2 className="section-title">
                    {t('roi.title1')}<span className="gradient-text-hot">{t('roi.titleAccent')}</span>
                </h2>
                <p className="section-subtitle">{t('roi.subtitle')}</p>
            </div>

            <div style={{ maxWidth: 700, margin: '0 auto' }}>
                <div style={{ padding: 28, background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', marginBottom: 24 }}>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-dim)', lineHeight: 1.7, margin: '0 0 24px' }}>
                        {t('roi.introText1')}<strong>{t('roi.introProcess')}</strong>, <strong>{t('roi.introOp')}</strong>, {t('roi.introGov')}{t('roi.introText2')}
                    </p>

                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 20 }}>{t('roi.profileTitle')}</div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <div>
                            <div style={labelStyle}>{t('roi.employees')}</div>
                            <input type="range" min="500" max="50000" step="500" value={employees} onChange={e => setEmployees(+e.target.value)} style={sliderStyle} />
                            <div style={valStyle}>{employees.toLocaleString()} {t('roi.people')}</div>
                        </div>
                        <div>
                            <div style={labelStyle}>{t('roi.sops')}</div>
                            <input type="range" min="20" max="2000" step="10" value={sops} onChange={e => setSops(+e.target.value)} style={sliderStyle} />
                            <div style={valStyle}>{sops} {t('roi.documents')}</div>
                        </div>
                        <div>
                            <div style={labelStyle}>{t('roi.restructuring')}</div>
                            <input type="range" min="0" max="10" step="1" value={restruct} onChange={e => setRestruct(+e.target.value)} style={sliderStyle} />
                            <div style={valStyle}>{restruct} {t('roi.events')}</div>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowResults(true)}
                        className="btn btn-primary"
                        style={{ width: '100%', justifyContent: 'center', marginTop: 28, padding: '14px 0', fontSize: '0.95rem' }}
                    >
                        {t('roi.runBtn')}
                    </button>
                </div>

                {showResults && (
                    <div style={{ padding: 28, background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                        <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 20 }}>{t('roi.resultsTitle')}</div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4 }}>{t('roi.gci')}</div>
                                <div style={{ height: 12, background: 'rgba(0,60,120,0.04)', borderRadius: 6, overflow: 'hidden' }}>
                                    <div style={{
                                        height: '100%', width: `${results.gci}%`, borderRadius: 6,
                                        background: results.gci > 70 ? '#c0392b' : results.gci > 40 ? '#e17055' : '#00b894',
                                        transition: 'width 0.8s ease',
                                    }} />
                                </div>
                            </div>
                            <div style={{ fontWeight: 900, fontSize: '1.4rem', color: results.gci > 70 ? '#c0392b' : results.gci > 40 ? '#e17055' : '#00b894' }}>
                                {results.gci}
                                <span style={{ fontSize: '0.7rem', fontWeight: 500, color: 'var(--text-muted)', marginLeft: 4 }}>
                                    {results.gci > 70 ? t('roi.critical') : results.gci > 40 ? t('roi.moderate') : t('roi.low')}
                                </span>
                            </div>
                        </div>

                        <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: '#c0392b', marginBottom: 12 }}>
                            {t('roi.annualBleed')}: Rp {results.total.toLocaleString('id-ID')} Juta
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
                            {[
                                { label: t('roi.adminRework'), value: results.admin, color: '#e17055' },
                                { label: t('roi.operationalDelay'), value: results.operational, color: '#c0392b' },
                                { label: t('roi.auditRisk'), value: results.audit, color: '#d63031' },
                            ].map((item, i) => (
                                <div key={i} style={{ padding: 14, background: 'rgba(214,48,49,0.03)', borderRadius: 8, border: '1px solid rgba(214,48,49,0.08)', textAlign: 'center' }}>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: item.color }}>Rp {item.value}</div>
                                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 2 }}>{item.label}</div>
                                </div>
                            ))}
                        </div>

                        <div style={{ padding: 16, background: 'rgba(0,184,148,0.04)', borderRadius: 10, border: '1px solid rgba(0,184,148,0.12)', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: '#00b894', marginBottom: 4 }}>
                                {t('roi.potentialSavings')}
                            </div>
                            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#00b894' }}>
                                Rp {results.savings.toLocaleString('id-ID')} Juta
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </SectionWrapper>
    )
}
