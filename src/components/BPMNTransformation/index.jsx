import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionWrapper from '../../layouts/SectionWrapper'

const beforeLanes = ['Manager Akuntansi', 'Asst. Manager Pajak', 'Staff Pembukuan']
const afterLanes = ['Fungsi Akuntansi', 'Fungsi Perpajakan', 'Fungsi Pembukuan']

const s = {
    split: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginBottom: 48 },
    left: {},
    right: {},
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
    // Simplification
    simpRow: { display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 24, alignItems: 'start' },
    simpLabel: { fontSize: '0.9rem', fontWeight: 700, marginBottom: 12 },
    bar: { padding: '8px 16px', borderRadius: 6, marginBottom: 4, fontSize: '0.8rem', fontWeight: 600, textAlign: 'center' },
    barOld: { background: 'rgba(214,48,49,0.06)', border: '1px solid rgba(214,48,49,0.12)', color: '#c0392b' },
    barNew: { background: 'rgba(0,119,182,0.06)', border: '1px solid rgba(0,119,182,0.12)', color: 'var(--accent)' },
    simpArrow: { display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: 'var(--accent-warm)', paddingTop: 40 },
}

const oldLevels = ['PBM (Corporate)', 'PBM (Directorate)', 'PBM (Department)', 'SOP', 'Instruksi Kerja', 'Form / Checklist']
const newLevels = ['L1 — Process Category', 'L2 — Process Group', 'L3 — Activity', 'L4 — Task (embedded SOP/IK)']

export default function BPMNTransformation() {
    const [morphed, setMorphed] = useState(false)

    return (
        <SectionWrapper id="innovation" variant="darker">
            <div className="section-header">
                <span className="section-tag">The Innovation</span>
                <h2 className="section-title"><span className="gradient-text">Function-Based</span> BPMN Architecture</h2>
                <p className="section-subtitle">Decoupling process logic from organizational structure through two key components.</p>
            </div>

            <div style={s.split}>
                <div style={s.left}>
                    <div style={{ ...s.subtitle, ...s.subtitleNew }}>Core Principle</div>
                    <div style={s.card}>
                        <div style={s.principleIcon}>🔓</div>
                        <div style={s.principleTitle}>Decoupling Layer</div>
                        <div style={s.principleDesc}>Process swimlanes reference <em>business functions</em> (e.g., "Fungsi Akuntansi") instead of <em>job titles</em>. Structures change; processes don't.</div>
                    </div>
                    <div style={s.card}>
                        <div style={s.principleIcon}>🗺️</div>
                        <div style={s.principleTitle}>Role Mapping Matrix</div>
                        <div style={s.principleDesc}>A dynamic RACI matrix connects functional roles to organizational positions. When restructuring occurs, only the mapping is updated — not the processes.</div>
                    </div>
                </div>
                <div style={s.right}>
                    <div style={{ ...s.subtitle, ...s.subtitleNew }}>BPMN Transformation</div>
                    <div style={s.transformBox}>
                        <div style={{ ...s.label, ...s.subtitleOld }}>BEFORE — Position-Based Swimlane</div>
                        {beforeLanes.map((l, i) => (
                            <motion.div key={l} style={{ ...s.lane, ...s.laneOld }} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>{l}</motion.div>
                        ))}
                        <div style={s.arrow}>⚡</div>
                        <div style={{ ...s.label, ...s.subtitleNew }}>AFTER — Function-Based Swimlane</div>
                        {afterLanes.map((l, i) => (
                            <motion.div key={l} style={{ ...s.lane, ...s.laneNew }} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>{l}</motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Level Simplification */}
            <div style={{ marginTop: 24 }}>
                <h3 className="section-title" style={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: 24 }}>Process Level Simplification: 6 → 4</h3>
                <div style={s.simpRow}>
                    <div>
                        <div style={{ ...s.simpLabel, ...s.subtitleOld }}>Before: 6–7 Levels</div>
                        {oldLevels.map(l => <div key={l} style={{ ...s.bar, ...s.barOld }}>{l}</div>)}
                    </div>
                    <div style={s.simpArrow}>⚡</div>
                    <div>
                        <div style={{ ...s.simpLabel, ...s.subtitleNew }}>After: 4 Levels</div>
                        {newLevels.map(l => <div key={l} style={{ ...s.bar, ...s.barNew }}>{l}</div>)}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}
