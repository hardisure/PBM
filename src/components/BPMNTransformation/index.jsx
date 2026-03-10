import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionWrapper from '../../layouts/SectionWrapper'
import { useTranslation } from '../../i18n/LanguageContext'

const beforeLanes = ['Manager Akuntansi', 'Asst. Manager Pajak', 'Staff Pembukuan']
const afterLanes = ['Fungsi Akuntansi', 'Fungsi Perpajakan', 'Fungsi Pembukuan']
const oldLevels = ['PBM (Corporate)', 'PBM (Directorate)', 'PBM (Department)', 'SOP', 'Instruksi Kerja', 'Form / Checklist']
const newLevels = ['L1 — Process Category', 'L2 — Process Group', 'L3 — Activity', 'L4 — Task (embedded SOP/IK)']

const s = {
    split: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginBottom: 48 },
    subtitle: { fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 16 },
    subtitleOld: { color: 'var(--accent-hot)' },
    subtitleNew: { color: 'var(--accent)' },
    card: { padding: 24, background: 'var(--bg-card)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', marginBottom: 24 },
    principleIcon: { fontSize: '1.5rem', marginBottom: 8 },
    principleTitle: { fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 },
    principleDesc: { fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: 1.6 },
    transformBox: { padding: 24, background: 'var(--bg-card)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' },
    label: { fontSize: '0.75rem', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 },
    lane: { padding: '10px 16px', borderRadius: 6, marginBottom: 6, fontWeight: 600, fontSize: '0.85rem', textAlign: 'center' },
    laneOld: { background: 'rgba(214,48,49,0.08)', border: '1px solid rgba(214,48,49,0.2)', color: '#c0392b' },
    laneNew: { background: 'rgba(0,119,182,0.06)', border: '1px solid rgba(0,119,182,0.2)', color: 'var(--accent)' },
    arrow: { textAlign: 'center', fontSize: '2rem', margin: '16px 0', color: 'var(--accent-warm)' },
    simpRow: { display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 24, alignItems: 'start' },
    simpLabel: { fontSize: '0.9rem', fontWeight: 700, marginBottom: 12 },
    bar: { padding: '8px 16px', borderRadius: 6, marginBottom: 4, fontSize: '0.8rem', fontWeight: 600, textAlign: 'center' },
    barOld: { background: 'rgba(214,48,49,0.06)', border: '1px solid rgba(214,48,49,0.12)', color: '#c0392b' },
    barNew: { background: 'rgba(0,119,182,0.06)', border: '1px solid rgba(0,119,182,0.12)', color: 'var(--accent)' },
    simpArrow: { display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: 'var(--accent-warm)', paddingTop: 40 },
}

export default function BPMNTransformation() {
    const { t } = useTranslation()
    const [morphed, setMorphed] = useState(false)

    return (
        <SectionWrapper id="innovation" variant="darker">
            <div className="section-header">
                <span className="section-tag">{t('bpmnTransformation.tag')}</span>
                <h2 className="section-title"><span className="gradient-text">{t('bpmnTransformation.title1')}</span>{t('bpmnTransformation.title2')}</h2>
                <p className="section-subtitle">{t('bpmnTransformation.subtitle')}</p>
            </div>

            <div style={s.split}>
                <div>
                    <div style={{ ...s.subtitle, ...s.subtitleNew }}>{t('bpmnTransformation.corePrinciple')}</div>
                    <div style={s.card}>
                        <div style={s.principleIcon}>🔓</div>
                        <div style={s.principleTitle}>{t('bpmnTransformation.decouplingTitle')}</div>
                        <div style={s.principleDesc}>{t('bpmnTransformation.decouplingDesc')}</div>
                    </div>
                    <div style={s.card}>
                        <div style={s.principleIcon}>🗺️</div>
                        <div style={s.principleTitle}>{t('bpmnTransformation.roleMappingTitle')}</div>
                        <div style={s.principleDesc}>{t('bpmnTransformation.roleMappingDesc')}</div>
                    </div>
                </div>
                <div>
                    <div style={{ ...s.subtitle, ...s.subtitleNew }}>{t('bpmnTransformation.transformation')}</div>
                    <div style={s.transformBox}>
                        <div style={{ ...s.label, ...s.subtitleOld }}>{t('bpmnTransformation.beforeLabel')}</div>
                        {beforeLanes.map((l, i) => (
                            <motion.div key={l} style={{ ...s.lane, ...s.laneOld }} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>{l}</motion.div>
                        ))}
                        <div style={s.arrow}>⚡</div>
                        <div style={{ ...s.label, ...s.subtitleNew }}>{t('bpmnTransformation.afterLabel')}</div>
                        {afterLanes.map((l, i) => (
                            <motion.div key={l} style={{ ...s.lane, ...s.laneNew }} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>{l}</motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <div style={{ marginTop: 24 }}>
                <h3 className="section-title" style={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: 24 }}>{t('bpmnTransformation.simplification')}</h3>
                <div style={s.simpRow}>
                    <div>
                        <div style={{ ...s.simpLabel, ...s.subtitleOld }}>{t('bpmnTransformation.beforeLevels')}</div>
                        {oldLevels.map(l => <div key={l} style={{ ...s.bar, ...s.barOld }}>{l}</div>)}
                    </div>
                    <div style={s.simpArrow}>⚡</div>
                    <div>
                        <div style={{ ...s.simpLabel, ...s.subtitleNew }}>{t('bpmnTransformation.afterLevels')}</div>
                        {newLevels.map(l => <div key={l} style={{ ...s.bar, ...s.barNew }}>{l}</div>)}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}
