import SectionWrapper from '../../layouts/SectionWrapper'

const tiers = [
    {
        name: 'Ala Carte',
        price: 'Rp 50 Jt',
        unit: '/ kategori proses',
        desc: 'Audit per Kategori Proses',
        features: [
            'Audit arsitektur proses per kategori',
            'Pemetaan ketergantungan posisi',
            'Rekomendasi perbaikan proses',
            'GCI (Governance Complexity Index) score',
        ],
        cta: 'Request Audit',
        highlight: false,
    },
    {
        name: 'All-In',
        price: 'Rp 450 Jt',
        unit: '/ organisasi',
        desc: 'Full Process Redesign',
        features: [
            'Audit arsitektur proses menyeluruh',
            'Function-based BPMN redesign (APQC L1–L4)',
            'Role Mapping Matrix build',
            'Toolkits tata kelola (template & kamus fungsi)',
            'Implementasi Decoupling Layer',
            'Pelatihan & sertifikasi internal',
            'Governance dashboard setup',
        ],
        cta: 'Start Transformation',
        highlight: true,
    },
    {
        name: 'Custom',
        price: 'Rp 600 Jt',
        unit: '/ proyek',
        desc: 'Multi-Entity Deployment',
        features: [
            'Seluruh layanan All-In',
            'Multi-subsidiary rollout',
            'Integrasi dengan platform BPM (Camunda/Bizagi/Signavio)',
            'Harmonisasi proses lintas entitas',
            'Dukungan governance berkelanjutan',
            'Strategic advisory',
        ],
        cta: 'Contact Us',
        highlight: false,
    },
]

const marketNote = {
    som: 'Rp 800 Jt / Tahun (2 klien awal)',
    sam: 'Rp 16 Miliar (40 organisasi)',
    tam: 'Rp 88,8 Miliar (310+ entitas)',
}

export default function Pricing() {
    return (
        <SectionWrapper id="pricing" variant="product-alt">
            <div className="section-header">
                <span className="section-tag">Pricing</span>
                <h2 className="section-title">Investment <span className="gradient-text">Tiers</span></h2>
                <p className="section-subtitle">ROI-driven pricing — payback guaranteed within 12 months.</p>
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
                    <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: '#059669', marginBottom: 6 }}>Avg. Governance Cost Reduction</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#059669' }}>30–60%</div>
                </div>
                <div style={{
                    flex: '1 1 240px', padding: '20px 24px', textAlign: 'center',
                    background: 'rgba(0,119,182,0.04)', border: '1px solid rgba(0,119,182,0.12)',
                    borderRadius: 12,
                }}>
                    <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: 'var(--accent)', marginBottom: 6 }}>Typical Payback Period</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--accent)' }}>&lt; 12 Months</div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, maxWidth: 960, margin: '0 auto' }}>
                {tiers.map((tier, i) => (
                    <div key={i} style={{
                        padding: 32,
                        background: tier.highlight ? 'rgba(0,119,182,0.04)' : 'var(--bg-card)',
                        borderRadius: 'var(--radius-lg)',
                        border: `1.5px solid ${tier.highlight ? 'var(--accent)' : 'var(--border)'}`,
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        ...(tier.highlight ? { transform: 'scale(1.04)', boxShadow: '0 8px 40px rgba(0,119,182,0.1)' } : {}),
                    }}>
                        {tier.highlight && (
                            <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'var(--accent)', color: '#fff', padding: '4px 16px', borderRadius: 12, fontSize: '0.7rem', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>
                                Recommended
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

            {/* Rata-rata proyek note */}
            <div style={{
                maxWidth: 640,
                margin: '48px auto 0',
                textAlign: 'center',
                padding: '20px 24px',
                background: 'rgba(0,119,182,0.04)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(0,119,182,0.1)',
            }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: 'var(--accent)', marginBottom: 8 }}>
                    Rata-Rata Nilai Proyek
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                    Rp 400 Juta
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4, marginBottom: 0 }}>
                    Estimasi konservatif berdasarkan bauran paket layanan (Rp 50 Jt – Rp 600 Jt)
                </p>
            </div>
        </SectionWrapper>
    )
}
