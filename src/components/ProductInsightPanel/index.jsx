import { useTranslation } from '../../i18n/LanguageContext'

export default function ProductInsightPanel() {
    const { t } = useTranslation()

    const cardStyle = {
        padding: '18px 16px',
        background: 'rgba(255,255,255,0.78)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(0,0,0,0.05)',
        borderRadius: 14,
        boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
    }

    const labelStyle = {
        fontSize: '0.55rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        color: 'var(--text-muted)',
        marginBottom: 10,
    }

    const layers = [
        { icon: '🎯', name: t('insightPanel.layer1'), desc: t('insightPanel.layer1Desc') },
        { icon: '🗺️', name: t('insightPanel.layer2'), desc: t('insightPanel.layer2Desc') },
        { icon: '⚙️', name: t('insightPanel.layer3'), desc: t('insightPanel.layer3Desc') },
        { icon: '🔗', name: t('insightPanel.layer4'), desc: t('insightPanel.layer4Desc') },
        { icon: '📊', name: t('insightPanel.layer5'), desc: t('insightPanel.layer5Desc') },
    ]

    const coreBullets = [
        t('insightPanel.coreBullet1'),
        t('insightPanel.coreBullet2'),
        t('insightPanel.coreBullet3'),
    ]

    const diagramItems = [
        { label: t('insightPanel.diagramBS'), bg: 'rgba(0,119,182,0.08)' },
        null,
        { label: t('insightPanel.diagramPL'), bg: 'rgba(0,119,182,0.08)' },
        null,
        { label: t('insightPanel.diagramFB'), bg: 'rgba(0,119,182,0.12)', accent: true },
        'decouple',
        { label: t('insightPanel.diagramRM'), bg: 'rgba(0,119,182,0.08)' },
        null,
        { label: t('insightPanel.diagramOS'), bg: 'rgba(0,119,182,0.06)' },
    ]

    return (
        <aside style={{
            position: 'sticky',
            top: 'calc(var(--nav-h, 64px) + 24px)',
            width: 240,
            maxHeight: 'calc(100vh - var(--nav-h, 64px) - 48px)',
            overflowY: 'auto',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            paddingBottom: 24,
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
        }}>
            {/* ── Card 1: Product Identity ── */}
            <div style={cardStyle}>
                <div style={{
                    fontSize: '0.6rem', fontWeight: 800, textTransform: 'uppercase',
                    letterSpacing: 2, color: 'var(--accent)', marginBottom: 4,
                }}>
                    {t('insightPanel.brandLabel')}
                </div>
                <div style={{ width: 20, height: 2, background: 'var(--accent)', borderRadius: 2, marginBottom: 10 }} />
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6, lineHeight: 1.3 }}>
                    {t('insightPanel.productTitle')}
                </div>
                <p style={{ fontSize: '0.62rem', color: 'var(--text-dim)', lineHeight: 1.55, margin: '0 0 10px' }}>
                    {t('insightPanel.productDesc1')}
                </p>
                <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', lineHeight: 1.55, margin: 0 }}>
                    {t('insightPanel.productDesc2')}
                </p>
            </div>

            {/* ── Card 2: Architecture Layers ── */}
            <div style={cardStyle}>
                <div style={labelStyle}>{t('insightPanel.layersLabel')}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                    {layers.map((l, i) => (
                        <div key={i}>
                            <div style={{
                                display: 'flex', alignItems: 'flex-start', gap: 8,
                                padding: '7px 0',
                            }}>
                                <span style={{ fontSize: '0.72rem', flexShrink: 0, marginTop: 1 }}>{l.icon}</span>
                                <div>
                                    <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                                        {l.name}
                                    </div>
                                    <div style={{ fontSize: '0.58rem', color: 'var(--text-muted)', lineHeight: 1.4, marginTop: 1 }}>
                                        {l.desc}
                                    </div>
                                </div>
                            </div>
                            {i < layers.length - 1 && (
                                <div style={{
                                    width: 1, height: 8,
                                    background: 'var(--border)',
                                    marginLeft: 5,
                                }} />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Card 3: Core Innovation + Mini Diagram ── */}
            <div style={cardStyle}>
                <div style={labelStyle}>{t('insightPanel.coreLabel')}</div>
                <div style={{
                    fontSize: '0.68rem', fontWeight: 700, color: 'var(--accent)',
                    marginBottom: 6, lineHeight: 1.3,
                }}>
                    {t('insightPanel.coreTitle')}
                </div>
                <p style={{ fontSize: '0.6rem', color: 'var(--text-dim)', lineHeight: 1.55, margin: '0 0 8px' }}>
                    {t('insightPanel.coreDesc')}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginBottom: 14 }}>
                    {coreBullets.map((bullet, i) => (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'flex-start', gap: 6,
                            fontSize: '0.58rem', color: 'var(--text-secondary)', lineHeight: 1.4,
                        }}>
                            <span style={{ color: 'var(--accent)', fontWeight: 700, flexShrink: 0 }}>•</span>
                            {bullet}
                        </div>
                    ))}
                </div>

                {/* Mini Architecture Diagram */}
                <div style={{
                    padding: '12px 10px',
                    background: 'rgba(0,119,182,0.03)',
                    border: '1px solid rgba(0,119,182,0.1)',
                    borderRadius: 10,
                }}>
                    {diagramItems.map((item, i) => {
                        if (item === null) {
                            return (
                                <div key={i} style={{ textAlign: 'center', lineHeight: 1, padding: '1px 0' }}>
                                    <span style={{ fontSize: '0.6rem', color: 'var(--accent)', fontWeight: 700 }}>│</span>
                                </div>
                            )
                        }
                        if (item === 'decouple') {
                            return (
                                <div key={i} style={{
                                    textAlign: 'center', padding: '3px 0',
                                    fontSize: '0.48rem', fontWeight: 800, color: '#e17055',
                                    textTransform: 'uppercase', letterSpacing: 1.5,
                                }}>
                                    ─── {t('insightPanel.diagramDecouple')} ───
                                </div>
                            )
                        }
                        return (
                            <div key={i} style={{
                                textAlign: 'center',
                                padding: '4px 8px',
                                background: item.bg,
                                borderRadius: 6,
                                fontSize: '0.55rem',
                                fontWeight: item.accent ? 800 : 600,
                                color: item.accent ? 'var(--accent)' : 'var(--text-secondary)',
                                border: item.accent ? '1px solid rgba(0,119,182,0.2)' : '1px solid transparent',
                            }}>
                                {item.label}
                            </div>
                        )
                    })}
                </div>
            </div>
        </aside>
    )
}
