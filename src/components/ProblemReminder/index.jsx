import SectionWrapper from '../../layouts/SectionWrapper'
import { useTranslation } from '../../i18n/LanguageContext'

export default function ProblemReminder() {
    const { t } = useTranslation()

    const painPoints = [
        { icon: '🔄', text: t('problemReminder.pain1') },
        { icon: '📄', text: t('problemReminder.pain2') },
        { icon: '✅', text: t('problemReminder.pain3') },
    ]

    return (
        <SectionWrapper id="problem-reminder" variant="product-alt">
            <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
                <span className="section-tag" style={{ background: 'rgba(214,48,49,0.08)', color: '#c0392b' }}>{t('problemReminder.tag')}</span>
                <h2 className="section-title" style={{ marginTop: 16 }}>
                    {t('problemReminder.title1')}
                    <span style={{ color: 'var(--accent-hot, #e63946)' }}>{t('problemReminder.title2')}</span>
                </h2>
                <p style={{
                    fontSize: '1.05rem', color: 'var(--text-dim)', lineHeight: 1.8,
                    maxWidth: 600, margin: '0 auto 32px',
                }}>
                    {t('problemReminder.desc')}
                </p>

                <div style={{
                    display: 'flex', flexDirection: 'column', gap: 12,
                    maxWidth: 520, margin: '0 auto 36px',
                }}>
                    {painPoints.map((p, i) => (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'center', gap: 14,
                            padding: '14px 20px',
                            background: 'rgba(214,48,49,0.03)',
                            border: '1px solid rgba(214,48,49,0.08)',
                            borderRadius: 12,
                            transition: 'all 0.3s',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(214,48,49,0.2)'; e.currentTarget.style.transform = 'translateX(4px)' }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(214,48,49,0.08)'; e.currentTarget.style.transform = 'translateX(0)' }}
                        >
                            <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>{p.icon}</span>
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500, textAlign: 'left' }}>{p.text}</span>
                        </div>
                    ))}
                </div>

                <div style={{
                    padding: '16px 24px',
                    background: 'rgba(0,119,182,0.04)',
                    border: '1px solid rgba(0,119,182,0.1)',
                    borderRadius: 12,
                    maxWidth: 560, margin: '0 auto',
                }}>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0, fontWeight: 500 }}>
                        {t('problemReminder.closingText1')}<strong style={{ color: 'var(--text-primary)' }}>{t('problemReminder.closing1')}</strong>{t('problemReminder.closingText2')}<strong style={{ color: 'var(--accent)' }}>{t('problemReminder.closing2')}</strong>{t('problemReminder.closingText3')}
                    </p>
                </div>
            </div>
        </SectionWrapper>
    )
}
