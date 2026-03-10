import { useEffect, useRef, useState } from 'react'
import SectionWrapper from '../../layouts/SectionWrapper'
import { useTranslation } from '../../i18n/LanguageContext'

function AnimatedBar({ value, max, color, delay = 0 }) {
    const [width, setWidth] = useState(0)
    const ref = useRef(null)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                setTimeout(() => setWidth((value / max) * 100), delay)
                obs.unobserve(el)
            }
        }, { threshold: 0.3 })
        obs.observe(el)
        return () => obs.disconnect()
    }, [value, max, delay])

    return (
        <div ref={ref} style={{ height: 8, background: 'rgba(0,60,120,0.04)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${width}%`, background: color, borderRadius: 4, transition: 'width 1s ease' }} />
        </div>
    )
}

export default function ImplementationComparison() {
    const { t } = useTranslation()

    const metrics = [
        { label: t('comparison.met1'), before: 6, after: 4, suffix: '', color: 'var(--accent-blue)' },
        { label: t('comparison.met2'), before: 8.2, after: 4.7, suffix: '', color: 'var(--accent-warm)' },
        { label: t('comparison.met3'), before: 15, after: 8, suffix: ' days', color: '#c0392b' },
        { label: t('comparison.met4'), before: 40, after: 70, suffix: '%', color: 'var(--accent)' },
    ]

    const improvements = [
        { label: t('comparison.imp1'), value: 43, suffix: '%' },
        { label: t('comparison.imp2'), value: 47, suffix: '%' },
        { label: t('comparison.imp3'), value: 75, suffix: '%' },
        { label: t('comparison.imp4'), value: 33, suffix: '%' },
    ]

    return (
        <SectionWrapper id="evidence" variant="dark">
            <div className="section-header">
                <span className="section-tag">{t('comparison.tag')}</span>
                <h2 className="section-title">{t('comparison.title1')}<span className="gradient-text">{t('comparison.titleAccent')}</span></h2>
                <p className="section-subtitle">{t('comparison.subtitle')}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 32, maxWidth: 800, margin: '0 auto' }}>
                <div style={{ padding: 28, background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(214,48,49,0.15)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#c0392b', marginBottom: 20 }}>{t('comparison.before')}</div>
                    {metrics.map((m, i) => (
                        <div key={i} style={{ marginBottom: 18 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{m.label}</span>
                                <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#c0392b' }}>{m.before}{m.suffix}</span>
                            </div>
                            <AnimatedBar value={m.before} max={20} color="rgba(214,48,49,0.5)" delay={i * 200} />
                        </div>
                    ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
                    <span style={{ fontSize: '2rem', color: 'var(--accent-warm)' }}>⚡</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1 }}>{t('comparison.transform')}</span>
                </div>

                <div style={{ padding: 28, background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(0,119,182,0.15)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 20 }}>{t('comparison.after')}</div>
                    {metrics.map((m, i) => (
                        <div key={i} style={{ marginBottom: 18 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{m.label}</span>
                                <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--accent)' }}>{m.after}{m.suffix}</span>
                            </div>
                            <AnimatedBar value={m.after} max={20} color="var(--accent)" delay={i * 200 + 400} />
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 40, padding: 28, background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                {improvements.map((imp, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>{imp.value}<span style={{ fontSize: '1.2rem' }}>{imp.suffix}</span></div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: 4 }}>{imp.label}</div>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    )
}
