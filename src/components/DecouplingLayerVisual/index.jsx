import SectionWrapper from '../../layouts/SectionWrapper'
import { useTranslation } from '../../i18n/LanguageContext'

export default function DecouplingLayerVisual() {
    const { t } = useTranslation()

    const layerStyle = (bg, border, color) => ({
        padding: '20px 24px', borderRadius: 'var(--radius-lg)', border: `1.5px solid ${border}`,
        background: bg, textAlign: 'center', position: 'relative',
    })

    return (
        <SectionWrapper id="decoupling" variant="darker">
            <div className="section-header">
                <span className="section-tag">{t('decoupling.tag')}</span>
                <h2 className="section-title">{t('decoupling.title1')}<span className="gradient-text">{t('decoupling.titleAccent')}</span></h2>
                <p className="section-subtitle">{t('decoupling.subtitle')}</p>
            </div>

            <div style={{ maxWidth: 700, margin: '0 auto' }}>
                {/* WITHOUT Decoupling */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 40 }}>
                    <div>
                        <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#c0392b', marginBottom: 16, textAlign: 'center' }}>
                            ❌ {t('decoupling.without')}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                            <div style={layerStyle('rgba(214,48,49,0.04)', 'rgba(214,48,49,0.2)', '#c0392b')}>
                                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#c0392b' }}>🏢 {t('decoupling.orgStructure')}</div>
                                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: 4 }}>{t('decoupling.positions')}</div>
                            </div>
                            <div style={{ textAlign: 'center', fontSize: '1.2rem', padding: '4px 0', color: '#c0392b' }}>⚡</div>
                            <div style={layerStyle('rgba(214,48,49,0.04)', 'rgba(214,48,49,0.2)', '#c0392b')}>
                                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#c0392b' }}>📋 {t('decoupling.processLogic')}</div>
                                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: 4 }}>{t('decoupling.directLink')}</div>
                            </div>
                        </div>
                        <div style={{ marginTop: 12, padding: 10, background: 'rgba(214,48,49,0.04)', borderRadius: 8, fontSize: '0.72rem', color: '#c0392b', textAlign: 'center', fontWeight: 600 }}>
                            ⚠️ {t('decoupling.tightCoupling')}
                        </div>
                    </div>

                    {/* WITH Decoupling */}
                    <div>
                        <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16, textAlign: 'center' }}>
                            ✅ {t('decoupling.with')}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                            <div style={layerStyle('rgba(0,119,182,0.04)', 'rgba(0,119,182,0.2)', 'var(--accent)')}>
                                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--accent)' }}>🏢 {t('decoupling.orgStructure')}</div>
                                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: 4 }}>{t('decoupling.canChange')}</div>
                            </div>
                            <div style={{ textAlign: 'center', fontSize: '0.7rem', padding: '6px 0', color: 'var(--text-muted)' }}>↕</div>
                            <div style={{
                                ...layerStyle('rgba(0,184,148,0.06)', 'rgba(0,184,148,0.3)', '#00b894'),
                                background: 'linear-gradient(135deg, rgba(0,184,148,0.06), rgba(0,119,182,0.06))',
                            }}>
                                <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#00b894' }}>🔗 {t('decoupling.roleMapping')}</div>
                                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: 4 }}>{t('decoupling.roleMappingDesc')}</div>
                            </div>
                            <div style={{ textAlign: 'center', fontSize: '0.7rem', padding: '6px 0', color: 'var(--text-muted)' }}>↕</div>
                            <div style={layerStyle('rgba(0,119,182,0.04)', 'rgba(0,119,182,0.2)', 'var(--accent)')}>
                                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--accent)' }}>📋 {t('decoupling.processLogic')}</div>
                                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: 4 }}>{t('decoupling.staysStable')}</div>
                            </div>
                        </div>
                        <div style={{ marginTop: 12, padding: 10, background: 'rgba(0,184,148,0.04)', borderRadius: 8, fontSize: '0.72rem', color: '#00b894', textAlign: 'center', fontWeight: 600 }}>
                            ✅ {t('decoupling.looseCoupling')}
                        </div>
                    </div>
                </div>

                {/* How Role Mapping Works */}
                <div style={{ padding: 24, background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>🔗 {t('decoupling.howTitle')}</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                        {[
                            { fn: t('decoupling.fn1'), role: t('decoupling.role1'), emoji: '📊' },
                            { fn: t('decoupling.fn2'), role: t('decoupling.role2'), emoji: '✅' },
                            { fn: t('decoupling.fn3'), role: t('decoupling.role3'), emoji: '📝' },
                        ].map((item, i) => (
                            <div key={i} style={{ padding: 14, background: 'rgba(0,119,182,0.03)', borderRadius: 8, border: '1px solid rgba(0,119,182,0.1)', textAlign: 'center' }}>
                                <div style={{ fontSize: '1.2rem', marginBottom: 6 }}>{item.emoji}</div>
                                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent)', marginBottom: 4 }}>{item.fn}</div>
                                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>→</div>
                                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontWeight: 500 }}>{item.role}</div>
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: 12, fontSize: '0.75rem', color: 'var(--text-dim)', textAlign: 'center', fontStyle: 'italic' }}>
                        {t('decoupling.onlyMapping')}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}
