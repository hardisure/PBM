import { useState, useCallback } from 'react'
import SectionWrapper from '../../layouts/SectionWrapper'

export default function ROISimulator() {
    const [employees, setEmployees] = useState(500)
    const [sops, setSops] = useState(500)
    const [restructures, setRestructures] = useState(2)
    const [calculated, setCalculated] = useState(false)

    const calc = useCallback(() => {
        const adminCost = sops * 2.4 * restructures
        const opCost = employees * 0.8 * restructures
        const auditCost = (sops * 0.6 + employees * 0.3) * restructures
        const totalBleed = adminCost + opCost + auditCost
        const savings = totalBleed * 0.65
        const gci = Math.min(100, Math.round((sops * 0.04 + restructures * 15 + employees * 0.005)))
        return { adminCost: Math.round(adminCost), opCost: Math.round(opCost), auditCost: Math.round(auditCost), totalBleed: Math.round(totalBleed), savings: Math.round(savings), gci }
    }, [employees, sops, restructures])

    const result = calc()
    const formatM = (v) => `Rp ${(v / 1).toLocaleString('id-ID')} Juta`
    const gciLabel = result.gci > 70 ? 'Critical' : result.gci > 45 ? 'Moderate' : 'Low'
    const gciColor = result.gci > 70 ? 'var(--accent-hot)' : result.gci > 45 ? 'var(--accent-warm)' : 'var(--accent)'
    const arcLen = 251 * (result.gci / 100)

    return (
        <SectionWrapper id="roi" variant="product">
            <div className="section-header">
                <span className="section-tag">Diagnostic Tool</span>
                <h2 className="section-title">Reveal the Hidden Cost of <span className="gradient-text">Governance Inefficiency</span></h2>
                <p className="section-subtitle">Governance inefficiency is often invisible. This diagnostic tool estimates the financial impact.</p>
            </div>

            {/* Diagnostic intro */}
            <div style={{
                maxWidth: 640, margin: '0 auto 36px', textAlign: 'center',
                padding: '16px 24px',
                background: 'rgba(0,119,182,0.03)',
                border: '1px solid rgba(0,119,182,0.08)',
                borderRadius: 12,
            }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: 1.7, margin: 0 }}>
                    Estimate the financial impact of <strong style={{ color: 'var(--text-primary)' }}>process redesign</strong>,{' '}
                    <strong style={{ color: 'var(--text-primary)' }}>operational delays</strong>, and{' '}
                    <strong style={{ color: 'var(--text-primary)' }}>governance rework</strong>.
                    Run the analysis to see how organizational complexity affects your costs.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, maxWidth: 900, margin: '0 auto' }}>
                {/* Inputs */}
                <div style={{ padding: 32, background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                    <h3 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: 20 }}>📋 Your Organization Profile</h3>
                    {[
                        { label: 'Total Employees', value: employees, set: setEmployees, min: 50, max: 5000, step: 50, unit: 'people' },
                        { label: 'Number of SOPs', value: sops, set: setSops, min: 50, max: 5000, step: 50, unit: 'documents' },
                        { label: 'Restructuring Events (5yr)', value: restructures, set: setRestructures, min: 0, max: 10, step: 1, unit: 'events' },
                    ].map((inp, i) => (
                        <div key={i} style={{ marginBottom: 20 }}>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>{inp.label}</label>
                            <input type="range" min={inp.min} max={inp.max} step={inp.step} value={inp.value}
                                onChange={e => { inp.set(+e.target.value); setCalculated(true) }}
                                style={{ width: '100%', appearance: 'none', height: 6, background: 'var(--bg-tertiary)', borderRadius: 3, outline: 'none' }}
                            />
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 6 }}>
                                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>{inp.value}</span>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{inp.unit}</span>
                            </div>
                        </div>
                    ))}
                    <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={() => setCalculated(true)}>
                        🔍 Run Governance Diagnosis
                    </button>
                </div>

                {/* Results */}
                <div style={{ padding: 32, background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                    <h3 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: 20 }}>📊 Diagnostic Results</h3>

                    {/* GCI Gauge */}
                    <div style={{ textAlign: 'center', marginBottom: 24 }}>
                        <svg viewBox="0 0 200 120" style={{ width: '100%', maxWidth: 240 }}>
                            <defs>
                                <linearGradient id="gciGrad2" x1="0%" y1="0%" x2="100%">
                                    <stop offset="0%" stopColor="#4BE3C2" />
                                    <stop offset="50%" stopColor="#FFC857" />
                                    <stop offset="100%" stopColor="#ff3366" />
                                </linearGradient>
                            </defs>
                            <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="rgba(0,60,120,0.04)" strokeWidth="16" strokeLinecap="round" />
                            <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="url(#gciGrad2)" strokeWidth="16" strokeLinecap="round"
                                strokeDasharray={`${arcLen} 251`} style={{ transition: 'stroke-dasharray 0.8s ease' }} />
                            <text x="100" y="88" textAnchor="middle" fill="var(--text-primary)" fontSize="32" fontWeight="800">{result.gci}</text>
                            <text x="100" y="108" textAnchor="middle" fill={gciColor} fontSize="10">{gciLabel}</text>
                        </svg>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 4 }}>Governance Complexity Index</div>
                    </div>

                    {/* Bleed */}
                    <div style={{ textAlign: 'center', padding: 16, background: 'rgba(214,48,49,0.04)', borderRadius: 'var(--radius)', marginBottom: 16 }}>
                        <div style={{ fontSize: '0.7rem', letterSpacing: 1, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Annual Financial Bleed</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--accent-hot)', fontFamily: 'var(--font-display)' }}>{formatM(result.totalBleed)}</div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                            <span style={{ color: 'var(--text-dim)' }}>Admin Rework</span>
                            <span style={{ color: '#c0392b', fontWeight: 600 }}>{formatM(result.adminCost)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                            <span style={{ color: 'var(--text-dim)' }}>Operational Delay</span>
                            <span style={{ color: '#c0392b', fontWeight: 600 }}>{formatM(result.opCost)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                            <span style={{ color: 'var(--text-dim)' }}>Audit Risk</span>
                            <span style={{ color: '#c0392b', fontWeight: 600 }}>{formatM(result.auditCost)}</span>
                        </div>
                        <div style={{ marginTop: 8, padding: 12, background: 'rgba(0,119,182,0.06)', borderRadius: 8, textAlign: 'center' }}>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: 1, textTransform: 'uppercase' }}>Potential Savings</div>
                            <div style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--accent)' }}>{formatM(result.savings)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}
