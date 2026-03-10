import { useState } from 'react'
import SectionWrapper from '../../layouts/SectionWrapper'

// ──────────────────────────────────────────
// DATA
// ──────────────────────────────────────────

const riskCategories = [
    {
        id: 'market', icon: '📊', title: 'Risiko Pasar', titleEn: 'Market Risk',
        risks: [
            { id: 'R1', name: 'Market Education Gap', desc: 'Banyak organisasi belum memahami masalah ketergantungan proses bisnis terhadap struktur jabatan sehingga tidak merasa membutuhkan solusi.', likelihood: 'D', impact: 4, mitigations: ['Publikasi whitepaper governance architecture', 'Seminar / webinar industri', 'Publikasi studi kasus implementasi MKP'] },
            { id: 'R2', name: 'Customer Value Perception Risk', desc: 'Calon klien menganggap redesign BPMN hanya pekerjaan dokumentasi administratif.', likelihood: 'C', impact: 4, mitigations: ['ROI calculator', 'Kuantifikasi governance rework cost', 'Demonstrasi simulator BPMN'] },
            { id: 'R3', name: 'Market Adoption Lag', desc: 'Organisasi lambat mengadopsi pendekatan baru karena preferensi terhadap metode lama.', likelihood: 'C', impact: 3, mitigations: ['Pilot implementation', 'Showcase early success story', 'Endorsement dari organisasi besar'] },
        ],
    },
    {
        id: 'commercial', icon: '💼', title: 'Risiko Penjualan', titleEn: 'Commercial Risk',
        risks: [
            { id: 'R4', name: 'Enterprise Sales Cycle Risk', desc: 'Keputusan proyek governance membutuhkan banyak persetujuan sehingga siklus penjualan panjang.', likelihood: 'D', impact: 3, mitigations: ['Paket diagnostic assessment', 'Proof of concept kecil', 'Pendekatan executive sponsorship'] },
            { id: 'R5', name: 'Budget Allocation Risk', desc: 'Organisasi tidak memiliki anggaran khusus untuk redesign proses bisnis.', likelihood: 'C', impact: 4, mitigations: ['Paket layanan modular', 'Integrasi dengan program transformasi digital'] },
        ],
    },
    {
        id: 'delivery', icon: '⚙️', title: 'Risiko Implementasi', titleEn: 'Delivery Risk',
        risks: [
            { id: 'R6', name: 'Implementation Misalignment', desc: 'Interpretasi BPMN atau arsitektur proses berbeda antar tim implementasi.', likelihood: 'C', impact: 3, mitigations: ['Template BPMN standar', 'Governance modeling guideline', 'Peer review model proses'] },
            { id: 'R7', name: 'BPMN Literacy Gap', desc: 'Tim klien tidak memahami notasi BPMN dengan baik.', likelihood: 'D', impact: 2, mitigations: ['Pelatihan BPMN', 'Sertifikasi process owner', 'Workshop modeling'] },
            { id: 'R8', name: 'Data & Documentation Inconsistency', desc: 'Dokumen proses yang ada tidak lengkap atau tidak konsisten.', likelihood: 'C', impact: 3, mitigations: ['Process audit awal', 'Dokumentasi baseline'] },
        ],
    },
    {
        id: 'adoption', icon: '🏢', title: 'Risiko Adopsi Organisasi', titleEn: 'Adoption Risk',
        risks: [
            { id: 'R9', name: 'Organizational Resistance', desc: 'Perubahan arsitektur proses dapat menimbulkan resistensi dari unit kerja.', likelihood: 'D', impact: 3, mitigations: ['Change management program', 'Komunikasi manfaat proses baru', 'Pilot pada unit kecil'] },
            { id: 'R10', name: 'Governance Ownership Gap', desc: 'Tidak jelas siapa yang bertanggung jawab menjaga konsistensi proses setelah implementasi.', likelihood: 'C', impact: 3, mitigations: ['Pembentukan process owner', 'Governance review board'] },
        ],
    },
    {
        id: 'performance', icon: '📈', title: 'Risiko Kinerja Solusi', titleEn: 'Solution Performance Risk',
        risks: [
            { id: 'R11', name: 'Implementation Outcome Risk', desc: 'Hasil implementasi tidak menghasilkan peningkatan kinerja yang signifikan.', likelihood: 'B', impact: 5, mitigations: ['Baseline performance measurement', 'KPI improvement tracking'] },
            { id: 'R12', name: 'Process Complexity Risk', desc: 'Redesign tidak cukup menyederhanakan kompleksitas proses.', likelihood: 'C', impact: 3, mitigations: ['Prinsip simplifikasi level proses', 'Peer review arsitektur'] },
        ],
    },
    {
        id: 'reputation', icon: '🛡️', title: 'Risiko Reputasi', titleEn: 'Reputation Risk',
        risks: [
            { id: 'R13', name: 'Early Project Failure', desc: 'Jika implementasi awal gagal, reputasi solusi dapat menurun.', likelihood: 'B', impact: 5, mitigations: ['Pemilihan klien pilot yang tepat', 'Implementasi bertahap'] },
        ],
    },
    {
        id: 'capacity', icon: '👥', title: 'Risiko Kapasitas', titleEn: 'Operational Scaling Risk',
        risks: [
            { id: 'R14', name: 'Delivery Capacity Constraint', desc: 'Permintaan meningkat tetapi kapasitas tim implementasi terbatas.', likelihood: 'B', impact: 4, mitigations: ['Toolkit implementasi', 'Partner consulting ecosystem'] },
        ],
    },
    {
        id: 'competition', icon: '⚔️', title: 'Risiko Kompetisi', titleEn: 'Strategic Risk',
        risks: [
            { id: 'R15', name: 'Competing Consulting Framework', desc: 'Perusahaan konsultan lain menawarkan metode transformasi proses alternatif.', likelihood: 'C', impact: 3, mitigations: ['Publikasi metodologi', 'Diferensiasi konsep decoupling architecture'] },
        ],
    },
    {
        id: 'scalability', icon: '🚀', title: 'Risiko Skalabilitas', titleEn: 'Growth Risk',
        risks: [
            { id: 'R16', name: 'Consulting Scalability Limit', desc: 'Model bisnis terlalu bergantung pada konsultasi manual.', likelihood: 'C', impact: 3, mitigations: ['Pengembangan toolkit digital', 'Platform governance automation'] },
        ],
    },
]

// 9 risks for heatmap — one per category
const heatmapRisks = [
    { id: 1, name: 'Market Education Gap', cat: 'Pasar', likelihood: 'D', impact: 4, color: '#d63031' },
    { id: 2, name: 'Enterprise Sales Cycle', cat: 'Penjualan', likelihood: 'D', impact: 3, color: '#e17055' },
    { id: 3, name: 'Implementation Misalignment', cat: 'Implementasi', likelihood: 'C', impact: 3, color: '#fdcb6e' },
    { id: 4, name: 'Organizational Resistance', cat: 'Adopsi', likelihood: 'D', impact: 3, color: '#6c5ce7' },
    { id: 5, name: 'Implementation Outcome', cat: 'Kinerja', likelihood: 'B', impact: 5, color: '#0984e3' },
    { id: 6, name: 'Early Project Failure', cat: 'Reputasi', likelihood: 'B', impact: 5, color: '#d63031' },
    { id: 7, name: 'Delivery Capacity', cat: 'Kapasitas', likelihood: 'B', impact: 4, color: '#00b894' },
    { id: 8, name: 'Competing Framework', cat: 'Kompetisi', likelihood: 'C', impact: 3, color: '#636e72' },
    { id: 9, name: 'Scalability Limit', cat: 'Skalabilitas', likelihood: 'C', impact: 3, color: '#fd79a8' },
]

const letterToRow = { A: 0, B: 1, C: 2, D: 3, E: 4 }

const rowLabels = [
    { letter: 'A', label: 'Sangat Jarang Terjadi' },
    { letter: 'B', label: 'Jarang Terjadi' },
    { letter: 'C', label: 'Bisa Terjadi' },
    { letter: 'D', label: 'Sangat Mungkin Terjadi' },
    { letter: 'E', label: 'Hampir Pasti Terjadi' },
]

const colLabels = [
    { num: 1, label: 'Sangat Rendah' },
    { num: 2, label: 'Rendah' },
    { num: 3, label: 'Moderat' },
    { num: 4, label: 'Tinggi' },
    { num: 5, label: 'Sangat Tinggi' },
]

// Exact color per cell
const cellData = [
    // Row A
    [{ s: 1, cat: 'LOW', bg: '#4caf50' }, { s: 5, cat: 'LOW', bg: '#e53935' }, { s: 10, cat: 'LOW TO MODERATE', bg: '#ffee58' }, { s: 15, cat: 'MODERATE', bg: '#ffee58' }, { s: 20, cat: 'HIGH', bg: '#e53935' }],
    // Row B
    [{ s: 2, cat: 'LOW', bg: '#4caf50' }, { s: 6, cat: 'LOW TO MODERATE', bg: '#c8e6c9' }, { s: 11, cat: 'LOW TO MODERATE', bg: '#ffee58' }, { s: 16, cat: 'MODERATE TO HIGH', bg: '#ff9800' }, { s: 21, cat: 'HIGH', bg: '#e53935' }],
    // Row C
    [{ s: 3, cat: 'LOW', bg: '#4caf50' }, { s: 8, cat: 'LOW TO MODERATE', bg: '#c8e6c9' }, { s: 13, cat: 'MODERATE', bg: '#ffee58' }, { s: 18, cat: 'MODERATE TO HIGH', bg: '#ff9800' }, { s: 23, cat: 'HIGH', bg: '#e53935' }],
    // Row D
    [{ s: 4, cat: 'LOW', bg: '#8bc34a' }, { s: 9, cat: 'LOW TO MODERATE', bg: '#c8e6c9' }, { s: 14, cat: 'MODERATE', bg: '#ffee58' }, { s: 19, cat: 'MODERATE TO HIGH', bg: '#ff9800' }, { s: 24, cat: 'HIGH', bg: '#ff5722' }],
    // Row E
    [{ s: 7, cat: 'LOW TO MODERATE', bg: '#c8e6c9' }, { s: 12, cat: 'MODERATE', bg: '#ffee58' }, { s: 17, cat: 'MODERATE TO HIGH', bg: '#ff9800' }, { s: 22, cat: 'HIGH', bg: '#ff5722' }, { s: 25, cat: 'HIGH', bg: '#e53935' }],
]

const isDarkCell = (bg) => bg === '#e53935' || bg === '#ff5722'

// ──────────────────────────────────────────
// COMPONENT
// ──────────────────────────────────────────

export default function RiskMatrix() {
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [hoveredRisk, setHoveredRisk] = useState(null)
    const [expandedRisk, setExpandedRisk] = useState(null)

    const getRisksInCell = (rowIdx, colIdx) =>
        heatmapRisks.filter(r => letterToRow[r.likelihood] === rowIdx && r.impact === colIdx + 1)

    return (
        <SectionWrapper id="risk" variant="darker">
            <div className="section-header">
                <span className="section-tag">Risk Assessment</span>
                <h2 className="section-title">Innovation <span className="gradient-text">Risk Matrix</span></h2>
                <p className="section-subtitle">Penilaian risiko menggunakan matriks 5×5: Probabilitas (A–E) × Dampak (1–5).</p>
            </div>

            <div className="container">
                {/* ═══════ HEATMAP ═══════ */}
                <div style={{ maxWidth: 750, margin: '0 auto 20px' }}>
                    {/* Grid layout: Y-label | row-labels | 5x5 cells */}
                    <div style={{ display: 'flex', alignItems: 'stretch' }}>
                        {/* Y-axis title */}
                        <div style={{
                            width: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            writingMode: 'vertical-rl', transform: 'rotate(180deg)',
                            fontWeight: 800, fontSize: '0.8rem', color: 'var(--text-primary)',
                            letterSpacing: 2, textTransform: 'uppercase', flexShrink: 0,
                        }}>
                            PROBABILITAS
                        </div>

                        {/* Row labels */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, flexShrink: 0, width: 90 }}>
                            {[4, 3, 2, 1, 0].map((rowIdx) => (
                                <div key={rowIdx} style={{
                                    flex: 1, display: 'flex', flexDirection: 'column',
                                    alignItems: 'center', justifyContent: 'center',
                                    padding: '4px 6px',
                                    background: 'var(--bg-tertiary)', borderRadius: 4,
                                    minHeight: 72,
                                }}>
                                    <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.3 }}>
                                        {rowLabels[rowIdx].label}
                                    </div>
                                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)', marginTop: 2 }}>
                                        {rowLabels[rowIdx].letter}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 5×5 Grid */}
                        <div style={{
                            flex: 1,
                            display: 'grid',
                            gridTemplateColumns: 'repeat(5, 1fr)',
                            gridTemplateRows: 'repeat(5, 1fr)',
                            gap: 3,
                        }}>
                            {[4, 3, 2, 1, 0].map((rowIdx) =>
                                [0, 1, 2, 3, 4].map((colIdx) => {
                                    const cell = cellData[rowIdx][colIdx]
                                    const risksHere = getRisksInCell(rowIdx, colIdx)
                                    const dark = isDarkCell(cell.bg)

                                    return (
                                        <div key={`${rowIdx}-${colIdx}`} style={{
                                            background: cell.bg,
                                            borderRadius: 5,
                                            display: 'flex', flexDirection: 'column',
                                            alignItems: 'center', justifyContent: 'center',
                                            padding: 4,
                                            position: 'relative',
                                            minHeight: 72,
                                            border: '1px solid rgba(0,0,0,0.06)',
                                        }}>
                                            {/* Category label */}
                                            <div style={{
                                                fontSize: '0.5rem', fontWeight: 700,
                                                color: dark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.6)',
                                                textAlign: 'center', lineHeight: 1.2,
                                            }}>
                                                {cell.cat}
                                            </div>
                                            {/* Score */}
                                            <div style={{
                                                fontSize: '1.1rem', fontWeight: 900,
                                                color: dark ? '#fff' : 'rgba(0,0,0,0.75)',
                                            }}>
                                                {cell.s}
                                            </div>

                                            {/* Risk markers */}
                                            {risksHere.length > 0 && (
                                                <div style={{
                                                    position: 'absolute', top: 2, right: 2,
                                                    display: 'flex', flexDirection: 'column', gap: 2,
                                                }}>
                                                    {risksHere.map((r) => (
                                                        <div
                                                            key={r.id}
                                                            onMouseEnter={() => setHoveredRisk(r.id)}
                                                            onMouseLeave={() => setHoveredRisk(null)}
                                                            style={{
                                                                background: '#1a1a2e',
                                                                color: '#fff',
                                                                fontSize: '0.42rem',
                                                                fontWeight: 800,
                                                                padding: '1px 4px',
                                                                borderRadius: 3,
                                                                cursor: 'pointer',
                                                                lineHeight: 1.4,
                                                                whiteSpace: 'nowrap',
                                                                position: 'relative',
                                                            }}
                                                        >
                                                            {r.id}
                                                            {/* Tooltip */}
                                                            {hoveredRisk === r.id && (
                                                                <div style={{
                                                                    position: 'absolute', bottom: '100%', right: 0,
                                                                    marginBottom: 4, zIndex: 30,
                                                                    background: '#fff', border: '1px solid #ddd',
                                                                    borderRadius: 6, padding: '6px 10px',
                                                                    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                                                                    width: 180, textAlign: 'left',
                                                                }}>
                                                                    <div style={{ fontWeight: 700, fontSize: '0.72rem', color: '#1a1a2e' }}>{r.name}</div>
                                                                    <div style={{ fontSize: '0.62rem', color: '#666', marginTop: 2 }}>{r.cat} • {r.likelihood}{r.impact}</div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )
                                })
                            )}
                        </div>
                    </div>

                    {/* X-axis labels */}
                    <div style={{ display: 'flex', marginLeft: 118, gap: 3, marginTop: 3 }}>
                        {colLabels.map((c, i) => (
                            <div key={i} style={{
                                flex: 1, textAlign: 'center',
                                padding: '6px 4px',
                                background: 'var(--bg-tertiary)', borderRadius: 4,
                            }}>
                                <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>{c.label}</div>
                                <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{c.num}</div>
                            </div>
                        ))}
                    </div>
                    <div style={{
                        textAlign: 'center', marginTop: 8,
                        fontWeight: 800, fontSize: '0.8rem', color: 'var(--text-primary)',
                        letterSpacing: 2, textTransform: 'uppercase',
                    }}>
                        DAMPAK
                    </div>
                </div>

                {/* ═══════ LEGEND: 9 risks ═══════ */}
                <div style={{
                    maxWidth: 900, margin: '16px auto 40px',
                    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8,
                }}>
                    {heatmapRisks.map((r) => (
                        <div key={r.id}
                            onMouseEnter={() => setHoveredRisk(r.id)}
                            onMouseLeave={() => setHoveredRisk(null)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 8,
                                padding: '8px 12px',
                                background: hoveredRisk === r.id ? 'rgba(0,119,182,0.05)' : 'var(--bg-card-solid)',
                                border: `1px solid ${hoveredRisk === r.id ? 'var(--accent)' : 'var(--border)'}`,
                                borderRadius: 8,
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                            }}
                        >
                            <span style={{
                                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                width: 20, height: 16,
                                background: '#1a1a2e', color: '#fff',
                                fontSize: '0.5rem', fontWeight: 800,
                                borderRadius: 3, flexShrink: 0,
                            }}>
                                {r.id}
                            </span>
                            <div style={{ overflow: 'hidden' }}>
                                <div style={{ fontWeight: 700, fontSize: '0.75rem', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {r.name}
                                </div>
                                <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>
                                    {r.cat} • {r.likelihood}{r.impact}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ═══════ RISK REGISTER (9 heatmap risks only) ═══════ */}
                <h3 style={{
                    textAlign: 'center', fontSize: '1.3rem', fontWeight: 800,
                    color: 'var(--text-primary)', marginBottom: 24,
                }}>
                    Daftar Risiko Inovasi
                </h3>

                {/* Risk cards — only 9 heatmap risks */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                    gap: 16, maxWidth: 1100, margin: '0 auto',
                }}>
                    {(() => {
                        const heatmapIds = new Set(['R1', 'R4', 'R6', 'R9', 'R11', 'R13', 'R14', 'R15', 'R16'])
                        return riskCategories
                            .flatMap(cat => cat.risks.map(r => ({ ...r, catIcon: cat.icon, catTitle: cat.title })))
                            .filter(r => heatmapIds.has(r.id))
                            .map((risk) => {
                                const rowIdx = letterToRow[risk.likelihood]
                                const colIdx = risk.impact - 1
                                const cell = cellData[rowIdx][colIdx]
                                const dark = isDarkCell(cell.bg)
                                const isOpen = expandedRisk === risk.id

                                return (
                                    <div key={risk.id}
                                        onClick={() => setExpandedRisk(isOpen ? null : risk.id)}
                                        style={{
                                            padding: '16px 20px',
                                            background: 'var(--bg-card-solid)',
                                            border: `1px solid ${isOpen ? 'var(--accent)' : 'var(--border)'}`,
                                            borderRadius: 12,
                                            boxShadow: isOpen ? '0 4px 16px rgba(0,119,182,0.08)' : 'var(--shadow-sm)',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                        }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <span style={{ fontSize: '1.1rem' }}>{risk.catIcon}</span>
                                                <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>{risk.name}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <div style={{
                                                    padding: '3px 10px', background: cell.bg, borderRadius: 6,
                                                    fontSize: '0.65rem', fontWeight: 800,
                                                    color: dark ? '#fff' : '#333',
                                                }}>
                                                    {risk.likelihood}{risk.impact} • {cell.s}
                                                </div>
                                                <span style={{
                                                    fontSize: '0.7rem', color: 'var(--text-muted)',
                                                    transition: 'transform 0.3s',
                                                    display: 'inline-block',
                                                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                                }}>▼</span>
                                            </div>
                                        </div>

                                        {isOpen && (
                                            <div style={{ marginTop: 12 }}>
                                                <p style={{ fontSize: '0.84rem', color: 'var(--text-dim)', lineHeight: 1.6, margin: '0 0 12px' }}>
                                                    {risk.desc}
                                                </p>
                                                <div style={{
                                                    padding: '10px 14px', background: 'var(--bg-tertiary)',
                                                    borderRadius: 8, borderLeft: '3px solid var(--accent)',
                                                }}>
                                                    <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>
                                                        Mitigasi
                                                    </div>
                                                    {risk.mitigations.map((m, mi) => (
                                                        <div key={mi} style={{
                                                            fontSize: '0.8rem', color: 'var(--text-secondary)',
                                                            paddingLeft: 12, position: 'relative',
                                                            marginBottom: mi < risk.mitigations.length - 1 ? 4 : 0,
                                                            lineHeight: 1.5,
                                                        }}>
                                                            <span style={{ position: 'absolute', left: 0, color: 'var(--accent)', fontWeight: 700 }}>•</span>
                                                            {m}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )
                            })
                    })()}
                </div>
            </div>
        </SectionWrapper>
    )
}
