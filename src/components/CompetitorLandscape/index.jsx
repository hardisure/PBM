import { useState } from 'react'
import SectionWrapper from '../../layouts/SectionWrapper'
import { useTranslation } from '../../i18n/LanguageContext'

export default function CompetitorLandscape() {
    const { t } = useTranslation()
    const [active, setActive] = useState(0)

    const competitors = [
        { name: 'MKP', color: '#0077b6', scores: [90, 95, 85, 80, 95], highlight: true },
        { name: 'Big Four', color: '#c0392b', scores: [30, 40, 95, 95, 60], highlight: false },
        { name: 'GML', color: '#d97706', scores: [60, 50, 75, 70, 50], highlight: false },
        { name: 'Proxsis', color: '#7c3aed', scores: [55, 45, 80, 75, 45], highlight: false },
        { name: 'SaaS BPM', color: '#0891b2', scores: [70, 30, 60, 85, 40], highlight: false },
    ]

    const dims = [
        t('competitor.dim1'), t('competitor.dim2'), t('competitor.dim3'), t('competitor.dim4'), t('competitor.dim5'),
    ]

    const comp = competitors[active]

    return (
        <SectionWrapper id="competitor" variant="darker">
            <div className="section-header">
                <span className="section-tag">{t('competitor.tag')}</span>
                <h2 className="section-title">{t('competitor.title1')}<span className="gradient-text">{t('competitor.titleAccent')}</span></h2>
                <p className="section-subtitle">{t('competitor.subtitle')}</p>
            </div>

            <div style={{ maxWidth: 800, margin: '0 auto' }}>
                {/* Competitor Tabs */}
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 32, flexWrap: 'wrap' }}>
                    {competitors.map((c, i) => (
                        <button key={i} onClick={() => setActive(i)} style={{
                            padding: '8px 18px', borderRadius: 8,
                            border: `1.5px solid ${i === active ? c.color : 'var(--border)'}`,
                            background: i === active ? `${c.color}0a` : 'var(--bg-card)',
                            color: i === active ? c.color : 'var(--text-dim)',
                            fontWeight: i === active ? 800 : 600, fontSize: '0.78rem',
                            cursor: 'pointer', transition: 'all 0.2s',
                        }}>
                            {c.highlight && '⭐ '}{c.name}
                        </button>
                    ))}
                </div>

                {/* Radar-style Bar Comparison */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                    <div style={{ padding: 24, background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.85rem', color: comp.color, marginBottom: 20 }}>{comp.name}</div>
                        {dims.map((dim, i) => (
                            <div key={i} style={{ marginBottom: 14 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{dim}</span>
                                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: comp.color }}>{comp.scores[i]}%</span>
                                </div>
                                <div style={{ height: 6, background: 'rgba(0,60,120,0.04)', borderRadius: 3, overflow: 'hidden' }}>
                                    <div style={{ height: '100%', width: `${comp.scores[i]}%`, background: comp.color, borderRadius: 3, transition: 'width 0.6s ease' }} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* MKP vs Selected */}
                    <div style={{ padding: 24, background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: 20 }}>{t('competitor.vsTitle')}</div>
                        {dims.map((dim, i) => {
                            const mkpScore = competitors[0].scores[i]
                            const compScore = comp.scores[i]
                            const diff = mkpScore - compScore
                            return (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                                    <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', width: 100, flexShrink: 0 }}>{dim}</span>
                                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <div style={{ width: 32, fontSize: '0.72rem', fontWeight: 700, color: '#0077b6', textAlign: 'right' }}>{mkpScore}</div>
                                        <div style={{ flex: 1, height: 4, background: 'rgba(0,60,120,0.04)', borderRadius: 2, position: 'relative' }}>
                                            <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${mkpScore}%`, background: '#0077b6', borderRadius: 2, opacity: 0.4 }} />
                                            <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${compScore}%`, background: comp.color, borderRadius: 2, opacity: 0.4 }} />
                                        </div>
                                        <div style={{ width: 32, fontSize: '0.72rem', fontWeight: 700, color: comp.color, textAlign: 'left' }}>{compScore}</div>
                                    </div>
                                    <div style={{
                                        fontSize: '0.65rem', fontWeight: 700, width: 32, textAlign: 'center',
                                        color: diff > 0 ? '#059669' : diff < 0 ? '#c0392b' : 'var(--text-muted)',
                                    }}>
                                        {diff > 0 ? `+${diff}` : diff}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div style={{ marginTop: 24, padding: 16, background: 'rgba(0,119,182,0.04)', borderRadius: 'var(--radius)', border: '1px solid rgba(0,119,182,0.1)', textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--accent)', marginBottom: 4 }}>🎯 {t('competitor.positioning')}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{t('competitor.positioningDesc')}</div>
                </div>
            </div>
        </SectionWrapper>
    )
}
