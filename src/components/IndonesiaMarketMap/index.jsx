import { useState } from 'react'
import SectionWrapper from '../../layouts/SectionWrapper'
import { useTranslation } from '../../i18n/LanguageContext'

const rings = ['TAM', 'SAM', 'SOM']

export default function IndonesiaMarketMap() {
    const { t } = useTranslation()
    const [active, setActive] = useState('TAM')

    const marketData = {
        TAM: {
            label: 'TAM', fullLabel: t('market.tamFull'),
            value: 5.1, unit: 'Triliun',
            color: '#0077b6', colorLight: 'rgba(0,119,182,0.08)',
            description: t('market.tamDesc'),
            segments: [
                { name: t('market.tamSeg1'), count: '150+ org', value: 'Rp 2.4T', icon: '🏛️' },
                { name: t('market.tamSeg2'), count: '500+ org', value: 'Rp 1.8T', icon: '🏢' },
                { name: t('market.tamSeg3'), count: '30+/thn', value: 'Rp 900M', icon: '🤝' },
            ],
        },
        SAM: {
            label: 'SAM', fullLabel: t('market.samFull'),
            value: 1.8, unit: 'Triliun',
            color: '#00a896', colorLight: 'rgba(0,168,150,0.08)',
            description: t('market.samDesc'),
            segments: [
                { name: t('market.samSeg1'), count: '60+ org', value: 'Rp 960M', icon: '🏛️' },
                { name: t('market.samSeg2'), count: '120+ org', value: 'Rp 540M', icon: '🏢' },
                { name: t('market.samSeg3'), count: '15+/thn', value: 'Rp 300M', icon: '🤝' },
            ],
        },
        SOM: {
            label: 'SOM', fullLabel: t('market.somFull'),
            value: 0.42, unit: 'Triliun',
            color: '#d63031', colorLight: 'rgba(214,48,49,0.08)',
            description: t('market.somDesc'),
            segments: [
                { name: t('market.somSeg1'), count: '12 anak usaha', value: 'Rp 168M', icon: '⚡' },
                { name: t('market.somSeg2'), count: '8–10 org', value: 'Rp 176M', icon: '🏛️' },
                { name: t('market.somSeg3'), count: '5–8 org', value: 'Rp 76M', icon: '🚀' },
            ],
        },
    }

    const data = marketData[active]
    const cx = 200, cy = 200
    const radii = { TAM: 180, SAM: 120, SOM: 60 }

    return (
        <SectionWrapper id="market" variant="dark">
            <div className="section-header">
                <span className="section-tag">{t('market.tag')}</span>
                <h2 className="section-title">{t('market.title1')}<span className="gradient-text">{t('market.titleAccent')}</span></h2>
                <p className="section-subtitle">{t('market.subtitle')}</p>
            </div>

            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 40, alignItems: 'center', maxWidth: 1000, margin: '0 auto' }}>
                    <div style={{ position: 'relative' }}>
                        <svg viewBox="0 0 400 400" style={{ width: '100%', maxWidth: 400, margin: '0 auto', display: 'block' }}>
                            {rings.map((ring) => {
                                const r = radii[ring]
                                const d = marketData[ring]
                                const isActive = active === ring
                                return (
                                    <g key={ring} onClick={() => setActive(ring)} style={{ cursor: 'pointer' }}>
                                        <circle cx={cx} cy={cy} r={r}
                                            fill={isActive ? `${d.color}15` : `${d.color}06`}
                                            stroke={d.color} strokeWidth={isActive ? 3 : 1.5}
                                            strokeDasharray={isActive ? 'none' : '6,4'}
                                            style={{ transition: 'all 0.4s ease' }}
                                        />
                                        <text x={cx} y={cy - r + (ring === 'TAM' ? 20 : ring === 'SAM' ? 18 : 0)}
                                            textAnchor="middle" fill={d.color}
                                            fontSize={isActive ? 13 : 11} fontWeight={isActive ? 800 : 600}
                                            style={{ transition: 'all 0.3s' }}>
                                            {d.label}
                                        </text>
                                    </g>
                                )
                            })}
                            <text x={cx} y={cy - 8} textAnchor="middle" fill={data.color} fontSize="32" fontWeight="900" style={{ transition: 'all 0.3s' }}>
                                Rp {data.value}
                            </text>
                            <text x={cx} y={cy + 16} textAnchor="middle" fill="var(--text-dim)" fontSize="12" fontWeight="600">{data.unit}</text>
                            <text x={cx} y={cy + 34} textAnchor="middle" fill="var(--text-muted)" fontSize="10">{data.fullLabel}</text>
                        </svg>
                    </div>

                    <div>
                        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
                            {rings.map((ring) => {
                                const d = marketData[ring]
                                const isActive = active === ring
                                return (
                                    <button key={ring} onClick={() => setActive(ring)} style={{
                                        flex: 1, padding: '10px 16px',
                                        background: isActive ? d.color : 'var(--bg-card-solid)',
                                        color: isActive ? '#fff' : 'var(--text-dim)',
                                        border: `1.5px solid ${isActive ? d.color : 'var(--border)'}`,
                                        borderRadius: 10, fontWeight: 700, fontSize: '0.85rem',
                                        cursor: 'pointer', transition: 'all 0.3s ease', fontFamily: 'inherit',
                                    }}>
                                        {d.label}
                                        <div style={{ fontSize: '0.7rem', fontWeight: 500, marginTop: 2, opacity: 0.85 }}>
                                            Rp {d.value} {d.unit}
                                        </div>
                                    </button>
                                )
                            })}
                        </div>

                        <div style={{ padding: '16px 20px', background: data.colorLight, borderRadius: 10, borderLeft: `3px solid ${data.color}`, marginBottom: 20 }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: data.color, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>{data.fullLabel}</div>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{data.description}</p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {data.segments.map((seg, i) => (
                                <div key={i} style={{
                                    display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px',
                                    background: 'var(--bg-card-solid)', border: '1px solid var(--border)',
                                    borderRadius: 10, boxShadow: 'var(--shadow-sm)', transition: 'all 0.3s',
                                }}>
                                    <div style={{ width: 44, height: 44, borderRadius: 10, background: data.colorLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>{seg.icon}</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>{seg.name}</div>
                                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>{seg.count}</div>
                                    </div>
                                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: data.color, fontFamily: 'var(--font-display)', whiteSpace: 'nowrap' }}>{seg.value}</div>
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop: 20, padding: '14px 18px', background: 'var(--bg-tertiary)', borderRadius: 10, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}>
                            <span style={{ fontSize: '1.2rem' }}>📊</span>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>{t('market.conversion')}</div>
                                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>
                                    100% → {((marketData.SAM.value / marketData.TAM.value) * 100).toFixed(0)}% → {((marketData.SOM.value / marketData.TAM.value) * 100).toFixed(0)}% — {t('market.conversionNote')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}
