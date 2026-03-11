import SectionWrapper from '../../layouts/SectionWrapper'
import { useTranslation } from '../../i18n/LanguageContext'

export default function CaseStudyMKP() {
    const { t } = useTranslation()

    const timeline = [
        { year: '2017', event: t('caseStudy.ev1'), icon: '🔄' },
        { year: '2021', event: t('caseStudy.ev2'), icon: '🏗️' },
        { year: '2023', event: t('caseStudy.ev3'), icon: '⚙️' },
        { year: '2024', event: t('caseStudy.ev4'), icon: '📋' },
        { year: '2025', event: t('caseStudy.ev5'), icon: '🚀' },
    ]

    const impacts = [
        { label: t('caseStudy.imp1'), before: t('caseStudy.imp1Before'), after: t('caseStudy.imp1After'), icon: '📄' },
        { label: t('caseStudy.imp2'), before: t('caseStudy.imp2Before'), after: t('caseStudy.imp2After'), icon: '⏱️' },
        { label: t('caseStudy.imp3'), before: t('caseStudy.imp3Before'), after: t('caseStudy.imp3After'), icon: '🔁' },
        { label: t('caseStudy.imp4'), before: t('caseStudy.imp4Before'), after: t('caseStudy.imp4After'), icon: '💰' },
    ]

    return (
        <SectionWrapper id="case-study" variant="dark">
            <div className="section-header">
                <span className="section-tag" style={{ background: 'rgba(0,119,182,0.08)', color: 'var(--accent)' }}>{t('caseStudy.tag')}</span>
                <h2 className="section-title">{t('caseStudy.title1')}<span className="gradient-text">{t('caseStudy.titleAccent')}</span></h2>
                <p className="section-subtitle">{t('caseStudy.subtitle')}</p>
            </div>

            {/* Restructuring Timeline */}
            <div style={{ maxWidth: 800, margin: '0 auto 40px', display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 24, left: '10%', right: '10%', height: 2, background: 'linear-gradient(90deg, rgba(214,48,49,0.3), rgba(0,119,182,0.3), rgba(0,184,148,0.3))' }} />
                {timeline.map((item, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, position: 'relative', zIndex: 1, flex: 1 }}>
                        <div style={{
                            width: 48, height: 48, borderRadius: '50%',
                            background: i < 3 ? 'rgba(214,48,49,0.08)' : i === 3 ? 'rgba(0,119,182,0.08)' : 'rgba(0,184,148,0.08)',
                            border: `2px solid ${i < 3 ? 'rgba(214,48,49,0.25)' : i === 3 ? 'rgba(0,119,182,0.25)' : 'rgba(0,184,148,0.25)'}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem',
                        }}>{item.icon}</div>
                        <div style={{ fontWeight: 800, fontSize: '0.85rem', color: i < 3 ? '#c0392b' : 'var(--accent)' }}>{item.year}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textAlign: 'center', maxWidth: 120, lineHeight: 1.4 }}>{item.event}</div>
                    </div>
                ))}
            </div>

            {/* Before/After Impact Table */}
            <div style={{ maxWidth: 700, margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1.5fr', gap: 0, borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)' }}>
                    <div style={{ padding: '12px 16px', background: 'var(--bg-card)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: 1, textTransform: 'uppercase', color: 'var(--text-muted)' }}>{t('caseStudy.aspect')}</div>
                    <div style={{ padding: '12px 16px', background: 'rgba(214,48,49,0.04)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: 1, textTransform: 'uppercase', color: '#c0392b', textAlign: 'center' }}>{t('caseStudy.before')}</div>
                    <div style={{ padding: '12px 16px', background: 'rgba(0,119,182,0.04)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: 1, textTransform: 'uppercase', color: 'var(--accent)', textAlign: 'center' }}>{t('caseStudy.after')}</div>
                    {impacts.map((item, i) => (
                        <div key={i} style={{ display: 'contents' }}>
                            <div style={{ padding: '14px 16px', background: 'var(--bg-card)', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                                <span>{item.icon}</span>{item.label}
                            </div>
                            <div style={{ padding: '14px 16px', background: 'rgba(214,48,49,0.02)', borderTop: '1px solid var(--border)', textAlign: 'center', fontSize: '0.82rem', color: '#c0392b', fontWeight: 600 }}>{item.before}</div>
                            <div style={{ padding: '14px 16px', background: 'rgba(0,119,182,0.02)', borderTop: '1px solid var(--border)', textAlign: 'center', fontSize: '0.82rem', color: 'var(--accent)', fontWeight: 600 }}>{item.after}</div>
                        </div>
                    ))}
                </div>
                <div style={{ marginTop: 20, padding: 16, background: 'rgba(0,184,148,0.04)', borderRadius: 'var(--radius)', border: '1px solid rgba(0,184,148,0.15)', textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-dim)' }}>
                    💡 {t('caseStudy.closingNote')}
                </div>
            </div>
        </SectionWrapper>
    )
}
