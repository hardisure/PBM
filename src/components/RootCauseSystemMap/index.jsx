import { useState } from 'react'
import SectionWrapper from '../../layouts/SectionWrapper'

const rootCause = {
    label: 'Position-Based Process Design',
    description: 'Business processes are hardcoded to job titles (positions) instead of business functions. When positions change, processes break.',
    icon: '🎯',
}

const effects = [
    {
        id: 'dependency',
        label: 'Process Dependency',
        icon: '🔗',
        color: '#d63031',
        description: 'Setiap proses terikat pada jabatan spesifik. Jika jabatan berubah, alur proses harus dirancang ulang.',
        example: '"Kepala Bagian Pengadaan" dihapus → 12 SOP terkait menjadi invalid',
        impact: 'Proses berhenti saat jabatan berubah',
    },
    {
        id: 'documentation',
        label: 'Documentation Complexity',
        icon: '📑',
        color: '#e17055',
        description: 'Setiap perubahan jabatan memicu revisi masif pada dokumen SOP, IK, dan formulir terkait.',
        example: 'Restrukturisasi 1 direktorat → 847 halaman dokumen harus direvisi',
        impact: '6-12 bulan waktu revisi per siklus',
    },
    {
        id: 'handoff',
        label: 'High Hand-Off Rate',
        icon: '🔄',
        color: '#0984e3',
        description: 'Karena proses dirancang berdasarkan jabatan, terjadi hand-off berlebihan antar posisi.',
        example: 'Rata-rata 8.2 hand-off per proses, idealnya < 5',
        impact: 'Bottleneck dan keterlambatan operasional',
    },
    {
        id: 'cycletime',
        label: 'Cycle Time Delay',
        icon: '⏱️',
        color: '#6c5ce7',
        description: 'Proses yang terikat jabatan memiliki cycle time lebih panjang karena approval chain mengikuti hierarki, bukan fungsi.',
        example: 'Approval chain 6 level → cycle time 14 hari (seharusnya 5 hari)',
        impact: 'Operasional terlambat dan tidak kompetitif',
    },
]

export default function RootCauseSystemMap() {
    const [selected, setSelected] = useState(null)

    return (
        <SectionWrapper id="rootcause" variant="darker">
            <div className="section-header">
                <span className="section-tag">Root Cause Analysis</span>
                <h2 className="section-title">The Core Issue: <span className="gradient-text">Position-Based</span> Process Design</h2>
                <p className="section-subtitle">Business processes are hardcoded to job titles — not business functions.</p>
            </div>

            <div className="container">
                {/* Root Cause Center Card */}
                <div style={{
                    maxWidth: 600,
                    margin: '0 auto 40px',
                    padding: '28px 32px',
                    background: 'linear-gradient(135deg, rgba(214,48,49,0.06), rgba(214,48,49,0.02))',
                    border: '2px solid rgba(214,48,49,0.2)',
                    borderRadius: 'var(--radius-lg)',
                    textAlign: 'center',
                }}>
                    <div style={{ fontSize: '2rem', marginBottom: 8 }}>{rootCause.icon}</div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#d63031', marginBottom: 8 }}>
                        {rootCause.label}
                    </h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
                        {rootCause.description}
                    </p>
                </div>

                {/* Arrow Down */}
                <div style={{ textAlign: 'center', marginBottom: 24, color: '#d63031', fontSize: '1.5rem' }}>
                    ▼ Menyebabkan ▼
                </div>

                {/* Effects Grid — 2x2 balanced */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 24,
                    maxWidth: 960,
                    margin: '0 auto',
                }}>
                    {effects.map((ef) => (
                        <div
                            key={ef.id}
                            onClick={() => setSelected(selected === ef.id ? null : ef.id)}
                            style={{
                                padding: '28px 28px',
                                background: selected === ef.id ? `linear-gradient(135deg, ${ef.color}08, ${ef.color}04)` : 'var(--bg-card-solid)',
                                border: `1.5px solid ${selected === ef.id ? ef.color : 'var(--border)'}`,
                                borderRadius: 'var(--radius)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: selected === ef.id ? `0 4px 20px ${ef.color}15` : 'var(--shadow-sm)',
                            }}
                        >
                            {/* Header */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                                <div style={{
                                    width: 50, height: 50,
                                    borderRadius: 12,
                                    background: `${ef.color}10`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '1.5rem',
                                    border: `1px solid ${ef.color}25`,
                                }}>
                                    {ef.icon}
                                </div>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>{ef.label}</div>
                                    <div style={{ fontSize: '0.8rem', color: ef.color, fontWeight: 600, marginTop: 3 }}>{ef.impact}</div>
                                </div>
                            </div>

                            {/* Description */}
                            <p style={{ fontSize: '0.95rem', color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: selected === ef.id ? 12 : 0 }}>
                                {ef.description}
                            </p>

                            {/* Expanded Example */}
                            {selected === ef.id && (
                                <div style={{
                                    marginTop: 12,
                                    padding: '14px 18px',
                                    background: `${ef.color}08`,
                                    borderRadius: 8,
                                    borderLeft: `3px solid ${ef.color}`,
                                }}>
                                    <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: ef.color, marginBottom: 4 }}>
                                        Contoh Nyata
                                    </div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                                        {ef.example}
                                    </div>
                                </div>
                            )}

                            {/* Click hint */}
                            <div style={{
                                marginTop: 12,
                                fontSize: '0.75rem',
                                color: 'var(--text-muted)',
                                textAlign: 'right',
                            }}>
                                {selected === ef.id ? 'Klik untuk tutup ▲' : 'Klik untuk detail ▼'}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary callout */}
                <div style={{
                    maxWidth: 700,
                    margin: '40px auto 0',
                    padding: '20px 28px',
                    background: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius)',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 16,
                }}>
                    <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>💡</div>
                    <div>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem', marginBottom: 4 }}>
                            Kesimpulan Root Cause
                        </div>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-dim)', lineHeight: 1.6, margin: 0 }}>
                            Keempat masalah ini berakar dari satu hal: <strong style={{ color: '#d63031' }}>proses bisnis dirancang berdasarkan jabatan</strong>, bukan berdasarkan fungsi.
                            Solusinya adalah <strong style={{ color: 'var(--accent)' }}>Function-Based BPMN</strong> — memisahkan arsitektur proses dari struktur organisasi.
                        </p>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}
