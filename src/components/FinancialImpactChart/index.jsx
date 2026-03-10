import SectionWrapper from '../../layouts/SectionWrapper'

const roiItems = [
    { icon: '📊', value: 'Rp 24 Juta', label: 'Man-Hours Saving — Document revision reduction' },
    { icon: '⚡', value: 'Rp 297 Juta', label: 'Productivity Gain — Role clarity & workflow efficiency' },
]

export default function FinancialImpactChart() {
    return (
        <SectionWrapper id="financial" variant="darker">
            <div className="section-header">
                <span className="section-tag">Financial Impact</span>
                <h2 className="section-title">The <span className="gradient-text">Real ROI</span></h2>
                <p className="section-subtitle">Payback in less than one year.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, maxWidth: 800, margin: '0 auto' }}>
                {/* Bar chart */}
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 40, padding: '40px 0' }}>
                    {/* Investment bar */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 60, height: 80, background: 'linear-gradient(to top, rgba(214,48,49,0.6), rgba(214,48,49,0.15))', borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 8 }}>
                            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#c0392b' }}>Rp 88 Jt</span>
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Investment</span>
                    </div>
                    {/* Benefit bar */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 60, height: 280, background: 'linear-gradient(to top, rgba(0,119,182,0.6), rgba(0,119,182,0.15))', borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 8 }}>
                            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent)' }}>Rp 321 Jt</span>
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Annual Benefit</span>
                    </div>
                </div>

                {/* Breakdown */}
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
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Payback period with 265% return on investment</div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}
