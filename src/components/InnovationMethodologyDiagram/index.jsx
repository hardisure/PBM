import SectionWrapper from '../../layouts/SectionWrapper'
import { useTranslation } from '../../i18n/LanguageContext'
import { useScrollReveal } from '../../animations/useScrollReveal'

export default function InnovationMethodologyDiagram() {
    const { t } = useTranslation()
    const ref = useScrollReveal()

    const steps = [
        { num: '01', title: t('methodology.s1Title'), desc: t('methodology.s1Desc') },
        { num: '02', title: t('methodology.s2Title'), desc: t('methodology.s2Desc') },
        { num: '03', title: t('methodology.s3Title'), desc: t('methodology.s3Desc') },
        { num: '04', title: t('methodology.s4Title'), desc: t('methodology.s4Desc') },
        { num: '05', title: t('methodology.s5Title'), desc: t('methodology.s5Desc') },
    ]

    const s = {
        pipeline: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0', position: 'relative', maxWidth: '100%' },
        line: { position: 'absolute', left: '10%', right: '10%', top: '28px', height: '2px', background: 'linear-gradient(90deg, var(--accent), var(--accent2))' },
        step: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', textAlign: 'center', padding: '0 8px', position: 'relative' },
        num: { width: 48, height: 48, borderRadius: '50%', background: 'var(--bg-card)', border: '2px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem', color: 'var(--accent)', zIndex: 2, fontFamily: 'var(--font-display)' },
        title: { fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 700, marginBottom: 4 },
        desc: { fontSize: '0.75rem', color: 'var(--text-dim)', lineHeight: 1.4 },
    }

    return (
        <SectionWrapper id="methodology" variant="dark">
            <div className="section-header">
                <span className="section-tag">{t('methodology.tag')}</span>
                <h2 className="section-title">{t('methodology.title1')}<span className="gradient-text">{t('methodology.titleAccent')}</span>{t('methodology.title2')}</h2>
                <p className="section-subtitle">{t('methodology.subtitle')}</p>
            </div>
            <div ref={ref} className="reveal-wrapper" style={s.pipeline}>
                <div style={s.line} />
                {steps.map(step => (
                    <div key={step.num} style={s.step}>
                        <div style={s.num}>{step.num}</div>
                        <div>
                            <div style={s.title}>{step.title}</div>
                            <div style={s.desc}>{step.desc}</div>
                        </div>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    )
}
