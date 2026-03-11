import { useState } from 'react'
import SectionWrapper from '../../layouts/SectionWrapper'
import { useTranslation } from '../../i18n/LanguageContext'

export default function SWOTAnalysis() {
    const { t } = useTranslation()
    const [activeQ, setActiveQ] = useState(null)

    const quadrants = [
        {
            key: 'S', label: t('swot.strengths'), color: '#0077b6', bg: 'rgba(0,119,182,0.04)', border: 'rgba(0,119,182,0.15)',
            items: [t('swot.s1'), t('swot.s2'), t('swot.s3'), t('swot.s4')],
        },
        {
            key: 'W', label: t('swot.weaknesses'), color: '#d97706', bg: 'rgba(217,119,6,0.04)', border: 'rgba(217,119,6,0.15)',
            items: [t('swot.w1'), t('swot.w2')],
        },
        {
            key: 'O', label: t('swot.opportunities'), color: '#059669', bg: 'rgba(5,150,105,0.04)', border: 'rgba(5,150,105,0.15)',
            items: [t('swot.o1'), t('swot.o2'), t('swot.o3')],
        },
        {
            key: 'T', label: t('swot.threats'), color: '#c0392b', bg: 'rgba(214,48,49,0.04)', border: 'rgba(214,48,49,0.15)',
            items: [t('swot.t1'), t('swot.t2'), t('swot.t3')],
        },
    ]

    const towsStrategies = [
        { label: 'SO', title: t('swot.soTitle'), desc: t('swot.soDesc'), color: '#0077b6' },
        { label: 'WO', title: t('swot.woTitle'), desc: t('swot.woDesc'), color: '#059669' },
        { label: 'ST', title: t('swot.stTitle'), desc: t('swot.stDesc'), color: '#d97706' },
        { label: 'WT', title: t('swot.wtTitle'), desc: t('swot.wtDesc'), color: '#c0392b' },
    ]

    return (
        <SectionWrapper id="swot" variant="dark">
            <div className="section-header">
                <span className="section-tag" style={{ background: 'rgba(0,119,182,0.08)', color: 'var(--accent)' }}>{t('swot.tag')}</span>
                <h2 className="section-title">{t('swot.title1')}<span className="gradient-text">{t('swot.titleAccent')}</span></h2>
                <p className="section-subtitle">{t('swot.subtitle')}</p>
            </div>

            <div style={{ maxWidth: 750, margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
                    {quadrants.map((q, i) => (
                        <div key={i} style={{
                            padding: 22, background: activeQ === i ? q.bg : 'var(--bg-card)',
                            borderRadius: 'var(--radius-lg)', border: `1.5px solid ${activeQ === i ? q.color : q.border}`,
                            cursor: 'pointer', transition: 'all 0.3s',
                        }}
                            onClick={() => setActiveQ(activeQ === i ? null : i)}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                                <div style={{ width: 32, height: 32, borderRadius: 6, background: `${q.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.85rem', color: q.color }}>{q.key}</div>
                                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: q.color }}>{q.label}</div>
                            </div>
                            {q.items.map((item, j) => (
                                <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '4px 0', fontSize: '0.75rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                                    <span style={{ color: q.color, marginTop: 1, flexShrink: 0, fontSize: '0.6rem' }}>●</span>{item}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* TOWS Strategies */}
                <div style={{ padding: 20, background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16, textAlign: 'center' }}>{t('swot.towsTitle')}</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                        {towsStrategies.map((s, i) => (
                            <div key={i} style={{ padding: 14, background: `${s.color}06`, borderRadius: 8, border: `1px solid ${s.color}18` }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                                    <span style={{ fontWeight: 900, fontSize: '0.7rem', color: s.color, background: `${s.color}12`, padding: '2px 8px', borderRadius: 4 }}>{s.label}</span>
                                    <span style={{ fontWeight: 700, fontSize: '0.78rem', color: 'var(--text-primary)' }}>{s.title}</span>
                                </div>
                                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>{s.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}
