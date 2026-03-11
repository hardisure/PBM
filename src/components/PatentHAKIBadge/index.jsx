import SectionWrapper from '../../layouts/SectionWrapper'
import { useTranslation } from '../../i18n/LanguageContext'

export default function PatentHAKIBadge() {
    const { t } = useTranslation()

    const credentials = [
        { icon: '📜', title: t('patent.cred1'), desc: t('patent.cred1Desc'), status: t('patent.registered'), color: '#059669' },
        { icon: '🏅', title: t('patent.cred2'), desc: t('patent.cred2Desc'), status: t('patent.planned'), color: '#d97706' },
        { icon: '🎓', title: t('patent.cred3'), desc: t('patent.cred3Desc'), status: t('patent.planned'), color: '#d97706' },
    ]

    const standards = [
        { icon: '🌐', name: 'APQC PCF', desc: t('patent.std1') },
        { icon: '📐', name: 'BPMN 2.0', desc: t('patent.std2') },
        { icon: '🛡️', name: 'ISO 31000', desc: t('patent.std3') },
        { icon: '📋', name: 'GCG/GRC', desc: t('patent.std4') },
    ]

    return (
        <SectionWrapper id="patent" variant="darker">
            <div className="section-header">
                <span className="section-tag" style={{ background: 'rgba(16,185,129,0.08)', color: '#059669' }}>{t('patent.tag')}</span>
                <h2 className="section-title">{t('patent.title1')}<span className="gradient-text">{t('patent.titleAccent')}</span></h2>
                <p className="section-subtitle">{t('patent.subtitle')}</p>
            </div>

            <div style={{ maxWidth: 750, margin: '0 auto' }}>
                {/* Credentials */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 28 }}>
                    {credentials.map((c, i) => (
                        <div key={i} style={{ padding: 22, background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', textAlign: 'center' }}>
                            <div style={{ fontSize: '1.8rem', marginBottom: 10 }}>{c.icon}</div>
                            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: 6 }}>{c.title}</div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: 10, lineHeight: 1.5 }}>{c.desc}</div>
                            <div style={{
                                display: 'inline-block', padding: '4px 12px', borderRadius: 12,
                                background: `${c.color}0a`, border: `1px solid ${c.color}25`,
                                fontSize: '0.65rem', fontWeight: 700, color: c.color, letterSpacing: 0.5,
                            }}>{c.status}</div>
                        </div>
                    ))}
                </div>

                {/* Standards Compliance */}
                <div style={{ padding: 24, background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16, textAlign: 'center' }}>{t('patent.standardsTitle')}</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                        {standards.map((s, i) => (
                            <div key={i} style={{
                                padding: 14, background: 'rgba(0,119,182,0.03)', borderRadius: 8,
                                border: '1px solid rgba(0,119,182,0.08)', textAlign: 'center',
                            }}>
                                <div style={{ fontSize: '1.2rem', marginBottom: 6 }}>{s.icon}</div>
                                <div style={{ fontWeight: 800, fontSize: '0.75rem', color: 'var(--accent)', marginBottom: 4 }}>{s.name}</div>
                                <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', lineHeight: 1.4 }}>{s.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}
