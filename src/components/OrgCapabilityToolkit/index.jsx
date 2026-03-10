import SectionWrapper from '../../layouts/SectionWrapper'
import { useTranslation } from '../../i18n/LanguageContext'

const cardStyle = {
    padding: '28px 24px',
    background: 'var(--bg-card-solid)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    transition: 'all 0.3s ease',
    cursor: 'default',
}

export default function OrgCapabilityToolkit() {
    const { t } = useTranslation()

    const tools = [
        {
            icon: '⚖️',
            title: t('toolkit.tool1Title'),
            desc: t('toolkit.tool1Desc'),
            capabilities: [t('toolkit.tool1c1'), t('toolkit.tool1c2'), t('toolkit.tool1c3')],
            purpose: t('toolkit.tool1Purpose'),
        },
        {
            icon: '📐',
            title: t('toolkit.tool2Title'),
            desc: t('toolkit.tool2Desc'),
            capabilities: [t('toolkit.tool2c1'), t('toolkit.tool2c2'), t('toolkit.tool2c3')],
            purpose: t('toolkit.tool2Purpose'),
        },
        {
            icon: '📊',
            title: t('toolkit.tool3Title'),
            desc: t('toolkit.tool3Desc'),
            capabilities: [t('toolkit.tool3c1'), t('toolkit.tool3c2'), t('toolkit.tool3c3')],
            purpose: t('toolkit.tool3Purpose'),
        },
    ]

    return (
        <SectionWrapper id="toolkit" variant="product">
            <div className="section-header">
                <span className="section-tag" style={{
                    background: 'rgba(0,184,148,0.08)',
                    color: '#00b894',
                    border: '1px solid rgba(0,184,148,0.15)',
                }}>
                    {t('toolkit.tag')}
                </span>
                <h2 className="section-title">
                    {t('toolkit.title1')}<span className="gradient-text">{t('toolkit.titleAccent')}</span>
                </h2>
                <p className="section-subtitle" style={{ maxWidth: 680 }}>
                    {t('toolkit.subtitle')}
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 24,
                maxWidth: 960,
                margin: '0 auto 40px',
            }}>
                {tools.map((tool, i) => (
                    <div
                        key={i}
                        style={cardStyle}
                        onMouseEnter={e => {
                            e.currentTarget.style.borderColor = 'rgba(0,119,182,0.25)'
                            e.currentTarget.style.transform = 'translateY(-4px)'
                            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.06)'
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.borderColor = 'var(--border)'
                            e.currentTarget.style.transform = 'translateY(0)'
                            e.currentTarget.style.boxShadow = 'none'
                        }}
                    >
                        <div style={{
                            fontSize: '1.8rem', marginBottom: 14,
                            width: 48, height: 48,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: 'rgba(0,119,182,0.06)', borderRadius: 12,
                        }}>
                            {tool.icon}
                        </div>
                        <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: 10 }}>{tool.title}</div>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: 16 }}>{tool.desc}</p>
                        <div style={{ marginBottom: 16 }}>
                            {tool.capabilities.map((cap, ci) => (
                                <div key={ci} style={{
                                    display: 'flex', alignItems: 'flex-start', gap: 8,
                                    fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 6,
                                }}>
                                    <span style={{ color: 'var(--accent)', fontWeight: 600, flexShrink: 0, marginTop: 1, fontSize: '0.65rem' }}>●</span>
                                    {cap}
                                </div>
                            ))}
                        </div>
                        <div style={{
                            padding: '10px 12px', background: 'rgba(0,119,182,0.03)',
                            borderRadius: 8, borderLeft: '3px solid rgba(0,119,182,0.2)',
                        }}>
                            <div style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)', marginBottom: 4 }}>{t('toolkit.purpose')}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>{tool.purpose}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{
                maxWidth: 760, margin: '0 auto',
                padding: '20px 28px', background: 'rgba(0,119,182,0.03)',
                border: '1px solid rgba(0,119,182,0.08)', borderRadius: 'var(--radius)', textAlign: 'center',
            }}>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
                    {t('toolkit.closingText1')}<strong style={{ color: 'var(--accent)' }}>{t('toolkit.closingAccent')}</strong>.{' '}
                    {t('toolkit.closingText2')}
                </p>
            </div>
        </SectionWrapper>
    )
}
