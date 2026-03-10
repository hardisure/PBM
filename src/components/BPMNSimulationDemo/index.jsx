import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionWrapper from '../../layouts/SectionWrapper'
import { useTranslation } from '../../i18n/LanguageContext'

const scenarios = (t) => [
    { key: 'original', label: t('bpmnSimulation.original'), desc: t('bpmnSimulation.originalDesc'), icon: '🏢' },
    { key: 'renamed', label: t('bpmnSimulation.renamed'), desc: t('bpmnSimulation.renamedDesc'), icon: '' },
    { key: 'merged', label: t('bpmnSimulation.merged'), desc: t('bpmnSimulation.mergedDesc'), icon: '' },
    { key: 'removed', label: t('bpmnSimulation.removed'), desc: t('bpmnSimulation.removedDesc'), icon: '' },
    { key: 'added', label: t('bpmnSimulation.added'), desc: t('bpmnSimulation.addedDesc'), icon: '' },
]

const posLanesOriginal = ['HR Manager', 'Finance Supervisor', 'Admin Staff']
const funcLanesOriginal = ['Fungsi SDM', 'Fungsi Keuangan', 'Fungsi Administrasi']

const scenarioEffects = {
    original: { posLanes: posLanesOriginal, funcLanes: funcLanesOriginal, posStatus: 'ok', funcStatus: 'ok' },
    renamed: { posLanes: ['HR Business Partner', 'Finance Supervisor', 'Admin Staff'], funcLanes: funcLanesOriginal, posStatus: 'broken', funcStatus: 'stable' },
    merged: { posLanes: ['Department Head', '—', 'Admin Staff'], funcLanes: funcLanesOriginal, posStatus: 'broken', funcStatus: 'stable' },
    removed: { posLanes: ['HR Manager', 'Finance Supervisor', '❌ Removed'], funcLanes: funcLanesOriginal, posStatus: 'broken', funcStatus: 'stable' },
    added: { posLanes: ['HR Manager', 'Finance Supervisor', 'Admin Staff', 'Digital HR Lead'], funcLanes: [...funcLanesOriginal, 'Fungsi Digital HR'], posStatus: 'broken', funcStatus: 'stable' },
}

const s = {
    controls: { display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 32 },
    ctrlBtn: (active) => ({
        padding: '10px 20px', borderRadius: 10,
        border: `1.5px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
        background: active ? 'rgba(0,119,182,0.08)' : 'var(--bg-card-solid)',
        color: active ? 'var(--accent)' : 'var(--text-dim)',
        fontWeight: active ? 700 : 500, fontSize: '0.8rem', cursor: 'pointer',
        fontFamily: 'inherit', transition: 'all 0.3s',
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2, minWidth: 150,
    }),
    ctrlDesc: { fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 400 },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, maxWidth: 900, margin: '0 auto' },
    panel: { padding: 24, background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' },
    panelTitle: (color) => ({ fontSize: '0.85rem', fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4 }),
    panelSub: { fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 16 },
    lane: (broken) => ({
        padding: '10px 16px', borderRadius: 8, marginBottom: 8,
        fontWeight: 600, fontSize: '0.82rem', textAlign: 'center',
        background: broken ? 'rgba(214,48,49,0.06)' : 'rgba(0,119,182,0.04)',
        border: `1px solid ${broken ? 'rgba(214,48,49,0.15)' : 'rgba(0,119,182,0.12)'}`,
        color: broken ? '#c0392b' : 'var(--accent)',
        transition: 'all 0.4s',
    }),
    statusBar: (ok) => ({
        marginTop: 16, padding: '10px 14px', borderRadius: 8,
        background: ok ? 'rgba(0,184,148,0.06)' : 'rgba(214,48,49,0.06)',
        border: `1px solid ${ok ? 'rgba(0,184,148,0.15)' : 'rgba(214,48,49,0.15)'}`,
        fontSize: '0.78rem', fontWeight: 600,
        color: ok ? '#00b894' : '#c0392b',
    }),
    gaugeRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 32, maxWidth: 600, margin: '32px auto 0' },
    gaugeCard: { padding: 16, background: 'var(--bg-card)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', textAlign: 'center' },
    gaugeLabel: { fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6, color: 'var(--text-muted)' },
}

export default function BPMNSimulationDemo() {
    const { t } = useTranslation()
    const [active, setActive] = useState('original')
    const effect = scenarioEffects[active]
    const isOriginal = active === 'original'

    return (
        <SectionWrapper id="bpmn-simulation" variant="product-alt">
            <div className="section-header">
                <span className="section-tag" style={{ background: 'rgba(0,119,182,0.08)', color: 'var(--accent)' }}>{t('bpmnSimulation.tag')}</span>
                <h2 className="section-title">
                    {t('bpmnSimulation.title1')}<span className="gradient-text">{t('bpmnSimulation.titleAccent')}</span>
                </h2>
                <p className="section-subtitle">{t('bpmnSimulation.subtitle')}</p>
            </div>

            <div style={s.controls}>
                {scenarios(t).map(sc => (
                    <button key={sc.key} style={s.ctrlBtn(active === sc.key)} onClick={() => setActive(sc.key)}>
                        <span>{sc.icon} {sc.label}</span>
                        <span style={s.ctrlDesc}>{sc.desc}</span>
                    </button>
                ))}
            </div>

            {!isOriginal && (
                <div style={{ textAlign: 'center', marginBottom: 20, fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600 }}>
                    ⚡ {t('bpmnSimulation.simulating')}: {scenarios(t).find(sc => sc.key === active)?.label}
                </div>
            )}

            <div style={s.grid}>
                {/* Position-Based Panel */}
                <div style={s.panel}>
                    <div style={s.panelTitle('#c0392b')}>{t('bpmnSimulation.positionBased')}</div>
                    <div style={s.panelSub}>{t('bpmnSimulation.positionSwimlane')}</div>
                    {effect.posLanes.map((lane, i) => (
                        <motion.div key={`${active}-pos-${i}`} style={s.lane(effect.posStatus === 'broken' && !isOriginal)}
                            initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.08 }}>
                            {lane}
                        </motion.div>
                    ))}
                    <div style={s.statusBar(effect.posStatus === 'ok')}>
                        {effect.posStatus === 'ok'
                            ? t('bpmnSimulation.validPos')
                            : <><strong>{t('bpmnSimulation.broken')}</strong> — {t('bpmnSimulation.brokenMsg')}</>
                        }
                    </div>
                </div>

                {/* Function-Based Panel */}
                <div style={{ ...s.panel, borderColor: 'rgba(0,119,182,0.2)' }}>
                    <div style={s.panelTitle('var(--accent)')}>{t('bpmnSimulation.functionBased')}</div>
                    <div style={s.panelSub}>{t('bpmnSimulation.functionSwimlane')}</div>
                    {effect.funcLanes.map((lane, i) => (
                        <motion.div key={`${active}-func-${i}`} style={s.lane(false)}
                            initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.08 }}>
                            {lane}
                        </motion.div>
                    ))}
                    <div style={s.statusBar(true)}>
                        {isOriginal
                            ? t('bpmnSimulation.validFunc')
                            : <><strong>{t('bpmnSimulation.stable')}</strong> — {t('bpmnSimulation.stableMsg')}</>
                        }
                    </div>
                </div>
            </div>

            {/* Stability Gauge */}
            <div style={s.gaugeRow}>
                <div style={s.gaugeCard}>
                    <div style={s.gaugeLabel}>{t('bpmnSimulation.processStability')}: {t('bpmnSimulation.position')}</div>
                    <div style={{ fontSize: '2rem', fontWeight: 900, color: isOriginal ? '#00b894' : '#c0392b', fontFamily: 'var(--font-display)' }}>
                        {isOriginal ? '100%' : '0%'}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 4 }}>
                        {isOriginal ? '—' : <>⚠ {t('bpmnSimulation.breakRisk')}<br />📄 {t('bpmnSimulation.docRevision')}<br />🔗 {t('bpmnSimulation.roleDependency')}</>}
                    </div>
                </div>
                <div style={s.gaugeCard}>
                    <div style={s.gaugeLabel}>{t('bpmnSimulation.processStability')}: {t('bpmnSimulation.function')}</div>
                    <div style={{ fontSize: '2rem', fontWeight: 900, color: '#00b894', fontFamily: 'var(--font-display)' }}>100%</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 4 }}>
                        ✅ {t('bpmnSimulation.resilient')}<br />📄 {t('bpmnSimulation.noDocRewrite')}<br />🔓 {t('bpmnSimulation.roleIndependence')}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}
