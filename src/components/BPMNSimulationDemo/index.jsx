import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionWrapper from '../../layouts/SectionWrapper'
import { useTranslation } from '../../i18n/LanguageContext'

/* ─── scenario definitions ─── */
const scenarios = (t) => [
    { key: 'original', label: t('bpmnSimulation.original'), desc: t('bpmnSimulation.originalDesc'), icon: '🏢' },
    { key: 'renamed', label: t('bpmnSimulation.renamed'), desc: t('bpmnSimulation.renamedDesc'), icon: '' },
    { key: 'merged', label: t('bpmnSimulation.merged'), desc: t('bpmnSimulation.mergedDesc'), icon: '' },
    { key: 'removed', label: t('bpmnSimulation.removed'), desc: t('bpmnSimulation.removedDesc'), icon: '' },
    { key: 'added', label: t('bpmnSimulation.added'), desc: t('bpmnSimulation.addedDesc'), icon: '' },
]

/* ─── BPMN config per scenario for position-based ─── */
const posConfigs = {
    original: {
        lanes: ['HR Manager', 'Finance Supervisor', 'Admin Staff'],
        brokenLanes: [],
        brokenArrows: [],
        score: 85,
    },
    renamed: {
        lanes: ['HR Business Partner', 'Finance Supervisor', 'Admin Staff'],
        brokenLanes: [0],
        brokenArrows: [0, 1],
        score: 35,
    },
    merged: {
        lanes: ['Department Head', '— (merged)', 'Admin Staff'],
        brokenLanes: [0, 1],
        brokenArrows: [0, 1, 2],
        score: 20,
    },
    removed: {
        lanes: ['HR Manager', 'Finance Supervisor', '❌ Removed'],
        brokenLanes: [2],
        brokenArrows: [2, 3],
        score: 45,
    },
    added: {
        lanes: ['HR Manager', 'Finance Supervisor', 'Admin Staff', 'Digital HR Lead'],
        brokenLanes: [3],
        brokenArrows: [3],
        score: 60,
    },
}

const funcLanes = ['Fungsi SDM', 'Fungsi Keuangan', 'Fungsi Administrasi']

/* ─── SVG BPMN Diagram Component ─── */
function BPMNDiagram({ lanes, brokenLanes = [], brokenArrows = [], isBroken, type }) {
    const laneH = 56
    const headerW = 100
    const padding = 12
    const nodeAreaW = 320
    const svgW = headerW + nodeAreaW + padding * 2
    const svgH = lanes.length * laneH + padding * 2

    const okColor = type === 'func' ? '#0077b6' : '#4a5568'
    const brokenColor = '#c0392b'
    const stableGreen = '#00b894'

    // Node positions per lane (relative to lane content area)
    const getNodes = (laneIdx) => {
        const y = padding + laneIdx * laneH + laneH / 2
        const x0 = headerW + 20 // start
        const x1 = headerW + 80 // task 1
        const x2 = headerW + 160 // gateway
        const x3 = headerW + 240 // task 2
        const x4 = headerW + 300 // end
        return [
            { type: 'start', x: x0, y },
            { type: 'task', x: x1, y, w: 50, h: 24 },
            { type: 'gateway', x: x2, y },
            { type: 'task', x: x3, y, w: 50, h: 24 },
            { type: 'end', x: x4, y },
        ]
    }

    const isLaneBroken = (i) => isBroken && brokenLanes.includes(i)

    return (
        <svg width="100%" viewBox={`0 0 ${svgW} ${svgH}`} style={{ display: 'block', borderRadius: 8, overflow: 'visible' }}>
            <defs>
                <marker id={`arrow-${type}-ok`} markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                    <path d="M0,0 L8,3 L0,6 Z" fill={okColor} />
                </marker>
                <marker id={`arrow-${type}-broken`} markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                    <path d="M0,0 L8,3 L0,6 Z" fill={brokenColor} />
                </marker>
                <marker id={`arrow-${type}-stable`} markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                    <path d="M0,0 L8,3 L0,6 Z" fill={stableGreen} />
                </marker>
            </defs>

            {/* Lanes */}
            {lanes.map((lane, i) => {
                const y = padding + i * laneH
                const broken = isLaneBroken(i)
                const laneColor = broken ? 'rgba(214,48,49,0.04)' : (type === 'func' ? 'rgba(0,119,182,0.03)' : 'rgba(0,0,0,0.015)')
                const borderColor = broken ? 'rgba(214,48,49,0.18)' : (type === 'func' ? 'rgba(0,119,182,0.12)' : 'rgba(0,0,0,0.08)')
                const textColor = broken ? brokenColor : (type === 'func' ? okColor : '#4a5568')

                return (
                    <g key={i}>
                        {/* Lane background */}
                        <rect x={padding} y={y} width={svgW - padding * 2} height={laneH - 2}
                            rx={4} fill={laneColor} stroke={borderColor} strokeWidth={0.8} />
                        {/* Lane header */}
                        <rect x={padding} y={y} width={headerW - 8} height={laneH - 2}
                            rx={4} fill={broken ? 'rgba(214,48,49,0.08)' : (type === 'func' ? 'rgba(0,119,182,0.06)' : 'rgba(0,0,0,0.03)')}
                            stroke={borderColor} strokeWidth={0.8} />
                        {/* Lane label */}
                        <text x={padding + (headerW - 8) / 2} y={y + laneH / 2 + 1}
                            textAnchor="middle" dominantBaseline="middle"
                            fontSize={8.5} fontWeight={600} fill={textColor}
                            fontFamily="Inter, system-ui, sans-serif">
                            {lane}
                        </text>
                        {/* Broken X overlay */}
                        {broken && (
                            <>
                                <text x={padding + headerW - 14} y={y + 12} fontSize={10} fill={brokenColor} fontWeight={700}>✕</text>
                            </>
                        )}
                    </g>
                )
            })}

            {/* BPMN Nodes per lane */}
            {lanes.map((_, i) => {
                const nodes = getNodes(i)
                const broken = isLaneBroken(i)
                const nodeColor = broken ? brokenColor : (type === 'func' ? okColor : '#4a5568')
                const nodeFill = broken ? 'rgba(214,48,49,0.08)' : (type === 'func' ? 'rgba(0,119,182,0.08)' : 'rgba(0,0,0,0.04)')

                return (
                    <g key={`nodes-${i}`} opacity={broken ? 0.5 : 1}>
                        {nodes.map((n, j) => {
                            if (n.type === 'start') {
                                return <circle key={j} cx={n.x} cy={n.y} r={7} fill={nodeFill} stroke={nodeColor} strokeWidth={1.5} />
                            }
                            if (n.type === 'end') {
                                return (
                                    <g key={j}>
                                        <circle cx={n.x} cy={n.y} r={7} fill="none" stroke={nodeColor} strokeWidth={1.5} />
                                        <circle cx={n.x} cy={n.y} r={4.5} fill={nodeColor} />
                                    </g>
                                )
                            }
                            if (n.type === 'gateway') {
                                const s = 9
                                return (
                                    <polygon key={j}
                                        points={`${n.x},${n.y - s} ${n.x + s},${n.y} ${n.x},${n.y + s} ${n.x - s},${n.y}`}
                                        fill={nodeFill} stroke={nodeColor} strokeWidth={1.2} />
                                )
                            }
                            if (n.type === 'task') {
                                return (
                                    <rect key={j} x={n.x - n.w / 2} y={n.y - n.h / 2}
                                        width={n.w} height={n.h} rx={3}
                                        fill={nodeFill} stroke={nodeColor} strokeWidth={1.2} />
                                )
                            }
                            return null
                        })}

                        {/* Arrows between nodes in this lane */}
                        {nodes.slice(0, -1).map((n, j) => {
                            const next = nodes[j + 1]
                            const x1 = n.type === 'start' ? n.x + 7 : n.type === 'task' ? n.x + n.w / 2 : n.type === 'gateway' ? n.x + 9 : n.x + 7
                            const x2 = next.type === 'end' ? next.x - 7 : next.type === 'task' ? next.x - next.w / 2 : next.type === 'gateway' ? next.x - 9 : next.x - 7
                            const arrowBroken = isBroken && brokenArrows.includes(j)
                            const markerUrl = arrowBroken ? `url(#arrow-${type}-broken)` : (type === 'func' ? `url(#arrow-${type}-stable)` : `url(#arrow-${type}-ok)`)

                            return (
                                <line key={`arr-${j}`}
                                    x1={x1} y1={n.y} x2={x2} y2={next.y}
                                    stroke={arrowBroken ? brokenColor : (type === 'func' ? stableGreen : okColor)}
                                    strokeWidth={1.2}
                                    strokeDasharray={arrowBroken ? '4,3' : 'none'}
                                    markerEnd={markerUrl}
                                    opacity={arrowBroken ? 0.5 : 0.8}
                                />
                            )
                        })}
                    </g>
                )
            })}

            {/* Cross-lane arrows (connecting between lanes) */}
            {lanes.length >= 2 && (() => {
                const connectors = []
                for (let i = 0; i < lanes.length - 1; i++) {
                    const fromNodes = getNodes(i)
                    const toNodes = getNodes(i + 1)
                    // Gateway of lane i → task1 of lane i+1
                    const from = fromNodes[2] // gateway
                    const to = toNodes[1] // task1
                    const arrowBroken = isBroken && (brokenLanes.includes(i) || brokenLanes.includes(i + 1))
                    const markerUrl = arrowBroken ? `url(#arrow-${type}-broken)` : (type === 'func' ? `url(#arrow-${type}-stable)` : `url(#arrow-${type}-ok)`)

                    connectors.push(
                        <line key={`cross-${i}`}
                            x1={from.x} y1={from.y + 9}
                            x2={to.x} y2={to.y - 12}
                            stroke={arrowBroken ? brokenColor : (type === 'func' ? stableGreen : okColor)}
                            strokeWidth={1}
                            strokeDasharray={arrowBroken ? '4,3' : 'none'}
                            markerEnd={markerUrl}
                            opacity={arrowBroken ? 0.4 : 0.5}
                        />
                    )
                }
                return connectors
            })()}
        </svg>
    )
}

/* ─── Circular Gauge Component ─── */
function StabilityGauge({ score, label, color }) {
    const r = 38
    const circumference = 2 * Math.PI * r
    const offset = circumference - (score / 100) * circumference

    return (
        <div style={{ textAlign: 'center' }}>
            <svg width={96} height={96} viewBox="0 0 100 100">
                <circle cx={50} cy={50} r={r} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth={7} />
                <circle cx={50} cy={50} r={r} fill="none" stroke={color} strokeWidth={7}
                    strokeDasharray={circumference} strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                    style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
                <text x={50} y={46} textAnchor="middle" dominantBaseline="middle"
                    fontSize={20} fontWeight={900} fill={color}
                    fontFamily="Inter, system-ui, sans-serif">{score}</text>
                <text x={50} y={62} textAnchor="middle" fontSize={7} fill="#999"
                    fontFamily="Inter, system-ui, sans-serif">/100</text>
            </svg>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#999', marginTop: 4 }}>
                {label}
            </div>
        </div>
    )
}

/* ─── Styles ─── */
const s = {
    controls: { display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 32 },
    ctrlBtn: (active) => ({
        padding: '10px 20px', borderRadius: 10,
        border: `1.5px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
        background: active ? 'rgba(0,119,182,0.08)' : 'var(--bg-card-solid)',
        color: active ? 'var(--accent)' : 'var(--text-dim)',
        fontWeight: active ? 700 : 500, fontSize: '0.8rem', cursor: 'pointer',
        fontFamily: 'inherit', transition: 'all 0.3s',
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2, minWidth: 140,
    }),
    ctrlDesc: { fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 400 },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, maxWidth: 960, margin: '0 auto' },
    panel: {
        padding: 20, background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)', overflow: 'hidden',
    },
    panelTitle: (color) => ({ fontSize: '0.78rem', fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4 }),
    panelSub: { fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 14 },
    statusBar: (ok) => ({
        marginTop: 14, padding: '10px 14px', borderRadius: 8,
        background: ok ? 'rgba(0,184,148,0.06)' : 'rgba(214,48,49,0.06)',
        border: `1px solid ${ok ? 'rgba(0,184,148,0.15)' : 'rgba(214,48,49,0.15)'}`,
        fontSize: '0.75rem', fontWeight: 600,
        color: ok ? '#00b894' : '#c0392b',
    }),
    stabilitySection: {
        display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 24, maxWidth: 800,
        margin: '32px auto 0', alignItems: 'start',
    },
    stabilityCard: {
        padding: 20, background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
    },
    stabilityTitle: {
        fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.2,
        marginBottom: 12, textAlign: 'center',
    },
    bulletItem: (color) => ({
        display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.78rem', fontWeight: 500,
        color, marginBottom: 6,
    }),
    bullet: (color) => ({
        width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0,
    }),
}

/* ─── Main Component ─── */
export default function BPMNSimulationDemo() {
    const { t } = useTranslation()
    const [active, setActive] = useState('original')
    const isOriginal = active === 'original'
    const cfg = posConfigs[active]

    return (
        <SectionWrapper id="bpmn-simulation" variant="product-alt">
            <div className="section-header">
                <span className="section-tag" style={{ background: 'rgba(0,119,182,0.08)', color: 'var(--accent)' }}>{t('bpmnSimulation.tag')}</span>
                <h2 className="section-title">
                    {t('bpmnSimulation.title1')}<span className="gradient-text">{t('bpmnSimulation.titleAccent')}</span>
                </h2>
                <p className="section-subtitle">{t('bpmnSimulation.subtitle')}</p>
            </div>

            {/* Scenario Buttons */}
            <div style={s.controls}>
                {scenarios(t).map(sc => (
                    <button key={sc.key} style={s.ctrlBtn(active === sc.key)} onClick={() => setActive(sc.key)}>
                        <span>{sc.icon} {sc.label}</span>
                        <span style={s.ctrlDesc}>{sc.desc}</span>
                    </button>
                ))}
            </div>

            {/* Simulating indicator */}
            <AnimatePresence>
                {!isOriginal && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        style={{ textAlign: 'center', marginBottom: 20, fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600 }}>
                        ⚡ {t('bpmnSimulation.simulating')}: {scenarios(t).find(sc => sc.key === active)?.label}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Two-panel BPMN Diagrams */}
            <div style={s.grid}>
                {/* Position-Based Panel */}
                <motion.div style={{ ...s.panel, borderColor: !isOriginal ? 'rgba(214,48,49,0.2)' : 'var(--border)' }}
                    key={`pos-${active}`}
                    initial={{ opacity: 0.6 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                    <div style={s.panelTitle(!isOriginal ? '#c0392b' : '#4a5568')}>
                        {t('bpmnSimulation.positionBased')}
                    </div>
                    <div style={s.panelSub}>{t('bpmnSimulation.positionSwimlane')}</div>

                    <BPMNDiagram
                        lanes={cfg.lanes}
                        brokenLanes={cfg.brokenLanes}
                        brokenArrows={cfg.brokenArrows}
                        isBroken={!isOriginal}
                        type="pos"
                    />

                    <div style={s.statusBar(isOriginal)}>
                        {isOriginal
                            ? t('bpmnSimulation.validPos')
                            : <><strong>{t('bpmnSimulation.broken')}</strong> — {t('bpmnSimulation.brokenMsg')}</>
                        }
                    </div>
                </motion.div>

                {/* Function-Based Panel */}
                <motion.div style={{ ...s.panel, borderColor: 'rgba(0,119,182,0.2)' }}
                    initial={{ opacity: 0.6 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                    <div style={s.panelTitle('var(--accent)')}>
                        {t('bpmnSimulation.functionBased')}
                    </div>
                    <div style={s.panelSub}>{t('bpmnSimulation.functionSwimlane')}</div>

                    <BPMNDiagram
                        lanes={funcLanes}
                        brokenLanes={[]}
                        brokenArrows={[]}
                        isBroken={false}
                        type="func"
                    />

                    <div style={s.statusBar(true)}>
                        {isOriginal
                            ? t('bpmnSimulation.validFunc')
                            : <><strong>{t('bpmnSimulation.stable')}</strong> — {t('bpmnSimulation.stableMsg')}</>
                        }
                    </div>
                </motion.div>
            </div>

            {/* ─── Process Stability Comparison ─── */}
            <div style={s.stabilitySection}>
                {/* Position-Based indicators */}
                <div style={s.stabilityCard}>
                    <div style={{ ...s.stabilityTitle, color: !isOriginal ? '#c0392b' : '#4a5568' }}>
                        {t('bpmnSimulation.positionBased')}
                    </div>
                    <div style={s.bulletItem(!isOriginal ? '#c0392b' : '#4a5568')}>
                        <span style={s.bullet(!isOriginal ? '#c0392b' : '#00b894')} />
                        {!isOriginal ? t('bpmnSimulation.breakRisk') : t('bpmnSimulation.resilient')}
                    </div>
                    <div style={s.bulletItem(!isOriginal ? '#c0392b' : '#4a5568')}>
                        <span style={{ ...s.bullet('#999'), borderRadius: 2, width: 8, height: 8, background: !isOriginal ? '#c0392b' : '#00b894' }} />
                        {!isOriginal ? t('bpmnSimulation.docRevision') : t('bpmnSimulation.noDocRewrite')}
                    </div>
                    <div style={s.bulletItem(!isOriginal ? '#c0392b' : '#4a5568')}>
                        <span style={{ ...s.bullet('#999'), width: 8, height: 8, background: !isOriginal ? '#e17055' : '#00b894', borderRadius: 2, transform: 'rotate(45deg)' }} />
                        {!isOriginal ? t('bpmnSimulation.roleDependency') : t('bpmnSimulation.roleIndependence')}
                    </div>
                </div>

                {/* Gauge Center */}
                <div style={{ padding: '8px 0' }}>
                    <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.2, color: '#999', textAlign: 'center', marginBottom: 16 }}>
                        {t('bpmnSimulation.processStability')}
                    </div>
                    <div style={{ display: 'flex', gap: 20, justifyContent: 'center' }}>
                        <StabilityGauge
                            score={isOriginal ? 85 : cfg.score}
                            label={t('bpmnSimulation.position')}
                            color={isOriginal ? '#0077b6' : '#c0392b'}
                        />
                        <StabilityGauge
                            score={85}
                            label={t('bpmnSimulation.function')}
                            color="#00b894"
                        />
                    </div>
                </div>

                {/* Function-Based indicators */}
                <div style={s.stabilityCard}>
                    <div style={{ ...s.stabilityTitle, color: '#00b894' }}>
                        {t('bpmnSimulation.functionBased')}
                    </div>
                    <div style={s.bulletItem('#00b894')}>
                        <span style={s.bullet('#00b894')} />
                        {t('bpmnSimulation.resilient')}
                    </div>
                    <div style={s.bulletItem('#00b894')}>
                        <span style={{ ...s.bullet('#00b894'), borderRadius: 2 }} />
                        {t('bpmnSimulation.noDocRewrite')}
                    </div>
                    <div style={s.bulletItem('#00b894')}>
                        <span style={{ ...s.bullet('#00b894'), borderRadius: 2, transform: 'rotate(45deg)' }} />
                        {t('bpmnSimulation.roleIndependence')}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}
