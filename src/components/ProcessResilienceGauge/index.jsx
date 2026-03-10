import { useEffect, useRef, useState } from 'react'
import SectionWrapper from '../../layouts/SectionWrapper'
import { useTranslation } from '../../i18n/LanguageContext'

export default function ProcessResilienceGauge() {
    const { t } = useTranslation()
    const [score, setScore] = useState(42)
    const [animated, setAnimated] = useState(false)
    const ref = useRef(null)

    const segments = [
        { label: t('resilience.seg1'), color: 'var(--accent)' },
        { label: t('resilience.seg2'), color: 'var(--accent2)' },
        { label: t('resilience.seg3'), color: 'var(--accent-blue)' },
        { label: t('resilience.seg4'), color: 'var(--accent-warm)' },
    ]

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting && !animated) {
                setAnimated(true)
                let v = 42
                const interval = setInterval(() => {
                    v += 1
                    setScore(v)
                    if (v >= 81) clearInterval(interval)
                }, 30)
                obs.unobserve(el)
            }
        }, { threshold: 0.3 })
        obs.observe(el)
        return () => obs.disconnect()
    }, [animated])

    const pct = (score - 0) / 100
    const arcLen = 251 * pct

    const getLabel = (s) => {
        if (s < 40) return t('resilience.critical')
        if (s < 60) return t('resilience.needsImprovement')
        if (s < 75) return t('resilience.good')
        return t('resilience.excellent')
    }

    return (
        <SectionWrapper id="resilience" variant="darker">
            <div className="section-header">
                <span className="section-tag">{t('resilience.tag')}</span>
                <h2 className="section-title">{t('resilience.title1')}<span className="gradient-text">{t('resilience.titleAccent')}</span></h2>
                <p className="section-subtitle">{t('resilience.subtitle')}</p>
            </div>

            <div ref={ref} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
                <svg viewBox="0 0 200 120" style={{ width: '100%', maxWidth: 320 }}>
                    <defs>
                        <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%">
                            <stop offset="0%" stopColor="#4BE3C2" />
                            <stop offset="50%" stopColor="#FFC857" />
                            <stop offset="100%" stopColor="#ff3366" />
                        </linearGradient>
                    </defs>
                    <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="rgba(0,60,120,0.04)" strokeWidth="16" strokeLinecap="round" />
                    <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="url(#gaugeGrad)" strokeWidth="16" strokeLinecap="round"
                        strokeDasharray={`${arcLen} 251`}
                        style={{ transition: 'stroke-dasharray 0.5s ease' }}
                    />
                    <text x="100" y="88" textAnchor="middle" fill="var(--text-primary)" fontSize="36" fontWeight="800">{score}</text>
                    <text x="100" y="108" textAnchor="middle" fill="var(--text-dim)" fontSize="10">{getLabel(score)}</text>
                </svg>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, width: '100%', maxWidth: 600 }}>
                    {segments.map((seg, i) => (
                        <div key={i} style={{ textAlign: 'center', padding: 16, background: 'var(--bg-card)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                            <div style={{ width: 40, height: 40, borderRadius: '50%', border: `2px solid ${seg.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', fontSize: '0.85rem', fontWeight: 700, color: seg.color }}>
                                {Math.round(60 + Math.random() * 25)}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{seg.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    )
}
