import { useState } from 'react'
import SectionWrapper from '../../layouts/SectionWrapper'

// === DATA ===
const marketData = {
    TAM: {
        label: 'TAM',
        fullLabel: 'Total Addressable Market',
        value: 5.1,
        unit: 'Triliun',
        color: '#0077b6',
        colorLight: 'rgba(0,119,182,0.08)',
        description: 'Seluruh organisasi di Indonesia yang menjalankan tata kelola proses bisnis dan terpapar risiko restrukturisasi.',
        segments: [
            { name: 'BUMN & Anak Perusahaan', count: '150+ org', value: 'Rp 2.4T', icon: '🏛️' },
            { name: 'Perusahaan Swasta (Mid–Large)', count: '500+ org', value: 'Rp 1.8T', icon: '🏢' },
            { name: 'Perusahaan Merger/Akuisisi', count: '30+/thn', value: 'Rp 900M', icon: '🤝' },
        ],
    },
    SAM: {
        label: 'SAM',
        fullLabel: 'Serviceable Addressable Market',
        value: 1.8,
        unit: 'Triliun',
        color: '#00a896',
        colorLight: 'rgba(0,168,150,0.08)',
        description: 'Organisasi yang secara aktif melakukan redesain proses bisnis dan memiliki anggaran konsultansi governance.',
        segments: [
            { name: 'BUMN dengan unit Process Management', count: '60+ org', value: 'Rp 960M', icon: '🏛️' },
            { name: 'Swasta dengan divisi SPI/GRC', count: '120+ org', value: 'Rp 540M', icon: '🏢' },
            { name: 'Perusahaan pasca-merger', count: '15+/thn', value: 'Rp 300M', icon: '🤝' },
        ],
    },
    SOM: {
        label: 'SOM',
        fullLabel: 'Serviceable Obtainable Market',
        value: 0.42,
        unit: 'Triliun',
        color: '#d63031',
        colorLight: 'rgba(214,48,49,0.08)',
        description: 'Target realistis dalam 3 tahun pertama: PLN Group, BUMN strategis, dan perusahaan yang sudah mengenal framework PBM.',
        segments: [
            { name: 'PLN Group (internal)', count: '12 anak usaha', value: 'Rp 168M', icon: '⚡' },
            { name: 'BUMN Strategis (pilot)', count: '8–10 org', value: 'Rp 176M', icon: '🏛️' },
            { name: 'Early Adopter Swasta', count: '5–8 org', value: 'Rp 76M', icon: '🚀' },
        ],
    },
}

const rings = ['TAM', 'SAM', 'SOM']

// === COMPONENT ===
export default function IndonesiaMarketMap() {
    const [active, setActive] = useState('TAM')
    const data = marketData[active]

    // SVG concentric ring dimensions
    const cx = 200, cy = 200
    const radii = { TAM: 180, SAM: 120, SOM: 60 }

    return (
        <SectionWrapper id="market" variant="dark">
            <div className="section-header">
                <span className="section-tag">Market Opportunity</span>
                <h2 className="section-title">TAM–SAM–SOM <span className="gradient-text">Analysis</span></h2>
                <p className="section-subtitle">Analisis ukuran pasar untuk framework Function-Based BPMN di Indonesia.</p>
            </div>

            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1.3fr',
                    gap: 40,
                    alignItems: 'center',
                    maxWidth: 1000,
                    margin: '0 auto',
                }}>
                    {/* LEFT: Concentric Rings SVG */}
                    <div style={{ position: 'relative' }}>
                        <svg viewBox="0 0 400 400" style={{ width: '100%', maxWidth: 400, margin: '0 auto', display: 'block' }}>
                            {rings.map((ring) => {
                                const r = radii[ring]
                                const d = marketData[ring]
                                const isActive = active === ring
                                return (
                                    <g key={ring}
                                        onClick={() => setActive(ring)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <circle
                                            cx={cx} cy={cy} r={r}
                                            fill={isActive ? `${d.color}15` : `${d.color}06`}
                                            stroke={d.color}
                                            strokeWidth={isActive ? 3 : 1.5}
                                            strokeDasharray={isActive ? 'none' : '6,4'}
                                            style={{ transition: 'all 0.4s ease' }}
                                        />
                                        {/* Ring label */}
                                        <text
                                            x={cx}
                                            y={cy - r + (ring === 'TAM' ? 20 : ring === 'SAM' ? 18 : 0)}
                                            textAnchor="middle"
                                            fill={d.color}
                                            fontSize={isActive ? 13 : 11}
                                            fontWeight={isActive ? 800 : 600}
                                            style={{ transition: 'all 0.3s' }}
                                        >
                                            {d.label}
                                        </text>
                                    </g>
                                )
                            })}

                            {/* Center value */}
                            <text x={cx} y={cy - 8} textAnchor="middle" fill={data.color} fontSize="32" fontWeight="900" style={{ transition: 'all 0.3s' }}>
                                Rp {data.value}
                            </text>
                            <text x={cx} y={cy + 16} textAnchor="middle" fill="var(--text-dim)" fontSize="12" fontWeight="600">
                                {data.unit}
                            </text>
                            <text x={cx} y={cy + 34} textAnchor="middle" fill="var(--text-muted)" fontSize="10">
                                {data.fullLabel}
                            </text>
                        </svg>
                    </div>

                    {/* RIGHT: Detail Panel */}
                    <div>
                        {/* Toggle Buttons */}
                        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
                            {rings.map((ring) => {
                                const d = marketData[ring]
                                const isActive = active === ring
                                return (
                                    <button
                                        key={ring}
                                        onClick={() => setActive(ring)}
                                        style={{
                                            flex: 1,
                                            padding: '10px 16px',
                                            background: isActive ? d.color : 'var(--bg-card-solid)',
                                            color: isActive ? '#fff' : 'var(--text-dim)',
                                            border: `1.5px solid ${isActive ? d.color : 'var(--border)'}`,
                                            borderRadius: 10,
                                            fontWeight: 700,
                                            fontSize: '0.85rem',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            fontFamily: 'inherit',
                                        }}
                                    >
                                        {d.label}
                                        <div style={{
                                            fontSize: '0.7rem',
                                            fontWeight: 500,
                                            marginTop: 2,
                                            opacity: 0.85,
                                        }}>
                                            Rp {d.value} {d.unit}
                                        </div>
                                    </button>
                                )
                            })}
                        </div>

                        {/* Description */}
                        <div style={{
                            padding: '16px 20px',
                            background: data.colorLight,
                            borderRadius: 10,
                            borderLeft: `3px solid ${data.color}`,
                            marginBottom: 20,
                        }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: data.color, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
                                {data.fullLabel}
                            </div>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                                {data.description}
                            </p>
                        </div>

                        {/* Segments */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {data.segments.map((seg, i) => (
                                <div key={i} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 14,
                                    padding: '14px 18px',
                                    background: 'var(--bg-card-solid)',
                                    border: '1px solid var(--border)',
                                    borderRadius: 10,
                                    boxShadow: 'var(--shadow-sm)',
                                    transition: 'all 0.3s',
                                }}>
                                    <div style={{
                                        width: 44, height: 44,
                                        borderRadius: 10,
                                        background: data.colorLight,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '1.3rem', flexShrink: 0,
                                    }}>
                                        {seg.icon}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>{seg.name}</div>
                                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>{seg.count}</div>
                                    </div>
                                    <div style={{
                                        fontWeight: 800,
                                        fontSize: '0.95rem',
                                        color: data.color,
                                        fontFamily: 'var(--font-display)',
                                        whiteSpace: 'nowrap',
                                    }}>
                                        {seg.value}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Conversion funnel note */}
                        <div style={{
                            marginTop: 20,
                            padding: '14px 18px',
                            background: 'var(--bg-tertiary)',
                            borderRadius: 10,
                            border: '1px solid var(--border)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                        }}>
                            <span style={{ fontSize: '1.2rem' }}>📊</span>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                                    Conversion: TAM → SAM → SOM
                                </div>
                                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>
                                    100% → {((marketData.SAM.value / marketData.TAM.value) * 100).toFixed(0)}% → {((marketData.SOM.value / marketData.TAM.value) * 100).toFixed(0)}% — Penetrasi target 3 tahun pertama
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}
