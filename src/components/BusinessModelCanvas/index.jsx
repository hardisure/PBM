import SectionWrapper from '../../layouts/SectionWrapper'
import { useTranslation } from '../../i18n/LanguageContext'

export default function BusinessModelCanvas() {
    const { t } = useTranslation()

    const blocks = [
        { key: 'kp', label: t('bmc.kp'), items: [t('bmc.kp1'), t('bmc.kp2'), t('bmc.kp3')], color: '#7c3aed', span: 'r1' },
        { key: 'ka', label: t('bmc.ka'), items: [t('bmc.ka1'), t('bmc.ka2'), t('bmc.ka3'), t('bmc.ka4')], color: '#0077b6', span: 'r1' },
        { key: 'vp', label: t('bmc.vp'), items: [t('bmc.vp1'), t('bmc.vp2'), t('bmc.vp3'), t('bmc.vp4')], color: '#059669', span: 'r1r2' },
        { key: 'cr', label: t('bmc.cr'), items: [t('bmc.cr1'), t('bmc.cr2'), t('bmc.cr3')], color: '#0891b2', span: 'r1' },
        { key: 'cs', label: t('bmc.cs'), items: [t('bmc.cs1'), t('bmc.cs2'), t('bmc.cs3')], color: '#c0392b', span: 'r1' },
        { key: 'kr', label: t('bmc.kr'), items: [t('bmc.kr1'), t('bmc.kr2'), t('bmc.kr3')], color: '#7c3aed', span: 'r2' },
        { key: 'ch', label: t('bmc.ch'), items: [t('bmc.ch1'), t('bmc.ch2')], color: '#0891b2', span: 'r2' },
    ]

    const bottomBlocks = [
        { key: 'cost', label: t('bmc.costLabel'), items: [t('bmc.cost1'), t('bmc.cost2'), t('bmc.cost3'), t('bmc.cost4')], color: '#c0392b' },
        { key: 'rev', label: t('bmc.revLabel'), items: [t('bmc.rev1'), t('bmc.rev2'), t('bmc.rev3'), t('bmc.rev4')], color: '#059669' },
    ]

    const renderBlock = (block) => (
        <div style={{ padding: 16, background: 'var(--bg-card)', borderRadius: 'var(--radius)', border: `1px solid ${block.color}18`, minHeight: 120 }}>
            <div style={{ fontWeight: 800, fontSize: '0.68rem', letterSpacing: 1, textTransform: 'uppercase', color: block.color, marginBottom: 10 }}>{block.label}</div>
            {block.items.map((item, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, padding: '3px 0', fontSize: '0.72rem', color: 'var(--text-dim)', lineHeight: 1.4 }}>
                    <span style={{ color: block.color, fontSize: '0.55rem', marginTop: 3, flexShrink: 0 }}>●</span>{item}
                </div>
            ))}
        </div>
    )

    return (
        <SectionWrapper id="bmc" variant="dark">
            <div className="section-header">
                <span className="section-tag" style={{ background: 'rgba(0,119,182,0.08)', color: 'var(--accent)' }}>{t('bmc.tag')}</span>
                <h2 className="section-title">{t('bmc.title1')}<span className="gradient-text">{t('bmc.titleAccent')}</span></h2>
                <p className="section-subtitle">{t('bmc.subtitle')}</p>
            </div>

            <div style={{ maxWidth: 900, margin: '0 auto' }}>
                {/* Top 5 columns (KP | KA+KR | VP | CR+CH | CS) */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: 8, marginBottom: 8 }}>
                    {/* KP */}
                    <div style={{ gridRow: 'span 2' }}>{renderBlock(blocks[0])}</div>
                    {/* KA */}
                    <div>{renderBlock(blocks[1])}</div>
                    {/* VP */}
                    <div style={{ gridRow: 'span 2' }}>{renderBlock(blocks[2])}</div>
                    {/* CR */}
                    <div>{renderBlock(blocks[3])}</div>
                    {/* CS */}
                    <div style={{ gridRow: 'span 2' }}>{renderBlock(blocks[4])}</div>
                    {/* KR */}
                    <div>{renderBlock(blocks[5])}</div>
                    {/* CH */}
                    <div>{renderBlock(blocks[6])}</div>
                </div>

                {/* Bottom 2 (Cost | Revenue) */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {bottomBlocks.map((block, i) => (
                        <div key={i}>{renderBlock(block)}</div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    )
}
