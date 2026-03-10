import { useState, useCallback, useRef, useEffect } from 'react'
import SectionWrapper from '../../layouts/SectionWrapper'

/* ═══════════════════════════════════════════
   DATA: Process nodes for "Employee Attendance Management"
   ═══════════════════════════════════════════ */

// Position-based swimlane labels (change on restructuring)
const positionLanes = {
    original: ['HR Manager', 'Admin Staff', 'Unit Supervisor'],
    renamed: ['HR Business Partner', 'Admin Staff', 'Unit Supervisor'],
    merged: ['HR Manager', 'Admin Staff', 'Department Head'],
    removed: ['HR Manager', '(removed)', 'Unit Supervisor'],
    added: ['HR Manager', 'Admin Staff', 'Unit Supervisor', 'Digital HR Lead'],
}

// Function-based swimlane labels (never change)
const functionLanes = ['HR Administration Function', 'Attendance Verification Function', 'Reporting Function']

// Process nodes (same for both diagrams)
const processNodes = [
    { id: 'start', type: 'event', label: '●', lane: 0, col: 0 },
    { id: 't1', type: 'task', label: 'Submit\nAttendance', lane: 0, col: 1 },
    { id: 't2', type: 'task', label: 'Verify\nData', lane: 1, col: 2 },
    { id: 'gw', type: 'gateway', label: '◇', lane: 1, col: 3 },
    { id: 't3', type: 'task', label: 'Approve\nRecord', lane: 0, col: 4 },
    { id: 't4', type: 'task', label: 'Generate\nReport', lane: 2, col: 4 },
    { id: 'end', type: 'event', label: '◉', lane: 2, col: 5 },
]

// Connections between nodes
const connections = [
    ['start', 't1'],
    ['t1', 't2'],
    ['t2', 'gw'],
    ['gw', 't3'],
    ['gw', 't4'],
    ['t4', 'end'],
]

// Scenario descriptions
const scenarios = [
    { key: 'original', label: 'Original Structure', desc: 'No changes applied' },
    { key: 'renamed', label: '🔄 Rename Role', desc: 'HR Manager → HR Business Partner' },
    { key: 'merged', label: '🔗 Merge Departments', desc: 'Supervisor merged into Department Head' },
    { key: 'removed', label: '❌ Remove Role', desc: 'Admin Staff position eliminated' },
    { key: 'added', label: '➕ Add New Role', desc: 'Digital HR Lead added' },
]

/* ═══════════════════════════════════════════
   SVG BPMN DIAGRAM COMPONENT
   ═══════════════════════════════════════════ */
const LANE_H = 80
const COL_W = 110
const PAD_LEFT = 180
const PAD_TOP = 20
const NODE_W = 72
const NODE_H = 36

function getNodePos(node, laneCount) {
    const x = PAD_LEFT + node.col * COL_W + COL_W / 2
    const y = PAD_TOP + node.lane * LANE_H + LANE_H / 2
    return { x, y }
}

function BPMNDiagram({ lanes, scenario, isPositionBased, broken }) {
    const laneCount = lanes.length
    const svgW = PAD_LEFT + 6 * COL_W + 40
    const svgH = PAD_TOP + laneCount * LANE_H + 10

    // Determine which nodes are "broken" on position-based side
    const brokenLanes = new Set()
    if (isPositionBased && broken) {
        if (scenario === 'renamed') brokenLanes.add(0)
        if (scenario === 'merged') brokenLanes.add(2)
        if (scenario === 'removed') brokenLanes.add(1)
    }

    const brokenNodes = processNodes.filter(n => brokenLanes.has(n.lane)).map(n => n.id)

    return (
        <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width: '100%', height: 'auto' }}>
            {/* Swimlane backgrounds */}
            {lanes.map((lane, i) => {
                const isBrokenLane = brokenLanes.has(i)
                const isRemoved = lane === '(removed)'
                return (
                    <g key={i}>
                        <rect
                            x={0} y={PAD_TOP + i * LANE_H}
                            width={svgW} height={LANE_H}
                            fill={isBrokenLane ? 'rgba(220,38,38,0.06)' : (i % 2 === 0 ? 'rgba(0,0,0,0.02)' : 'rgba(0,0,0,0.00)')}
                            stroke="rgba(0,0,0,0.08)"
                            strokeWidth={0.5}
                            rx={2}
                        />
                        {/* Lane separator line */}
                        <line x1={PAD_LEFT - 10} y1={PAD_TOP + i * LANE_H} x2={PAD_LEFT - 10} y2={PAD_TOP + (i + 1) * LANE_H} stroke="rgba(0,0,0,0.1)" strokeWidth={1} />
                        {/* Lane label */}
                        <text
                            x={8} y={PAD_TOP + i * LANE_H + LANE_H / 2}
                            dominantBaseline="central"
                            style={{
                                fontSize: 9,
                                fontWeight: 600,
                                fill: isRemoved ? '#dc2626' : (isBrokenLane ? '#dc2626' : '#334155'),
                                textDecoration: isRemoved ? 'line-through' : 'none',
                            }}
                        >
                            {lane.length > 22 ? (
                                <>
                                    <tspan x={8} dy={-6}>{lane.substring(0, 22)}</tspan>
                                    <tspan x={8} dy={13}>{lane.substring(22)}</tspan>
                                </>
                            ) : lane}
                        </text>
                        {/* Warning icon for broken lanes */}
                        {isBrokenLane && (
                            <text x={PAD_LEFT - 24} y={PAD_TOP + i * LANE_H + LANE_H / 2} dominantBaseline="central" style={{ fontSize: 14 }}>⚠️</text>
                        )}
                    </g>
                )
            })}

            {/* Connections */}
            {connections.map(([fromId, toId], ci) => {
                const fromNode = processNodes.find(n => n.id === fromId)
                const toNode = processNodes.find(n => n.id === toId)
                if (!fromNode || !toNode) return null
                if (toNode.lane >= laneCount || fromNode.lane >= laneCount) return null

                const from = getNodePos(fromNode, laneCount)
                const to = getNodePos(toNode, laneCount)
                const isBroken = isPositionBased && broken && (brokenNodes.includes(fromId) || brokenNodes.includes(toId))

                // Create path with right angles
                let pathD
                if (from.y === to.y) {
                    pathD = `M ${from.x + NODE_W / 2} ${from.y} L ${to.x - NODE_W / 2} ${to.y}`
                } else {
                    const midX = (from.x + NODE_W / 2 + to.x - NODE_W / 2) / 2
                    pathD = `M ${from.x + NODE_W / 2} ${from.y} L ${midX} ${from.y} L ${midX} ${to.y} L ${to.x - NODE_W / 2} ${to.y}`
                }

                return (
                    <g key={ci}>
                        <path
                            d={pathD}
                            fill="none"
                            stroke={isBroken ? '#dc2626' : (isPositionBased ? '#94a3b8' : '#0077b6')}
                            strokeWidth={isBroken ? 1 : 1.5}
                            strokeDasharray={isBroken ? '4 3' : 'none'}
                            markerEnd={`url(#arrow-${isPositionBased ? (isBroken ? 'broken' : 'pos') : 'func'})`}
                            style={{
                                opacity: isBroken ? 0.4 : 1,
                                transition: 'all 0.6s ease',
                            }}
                        />
                    </g>
                )
            })}

            {/* Process Nodes */}
            {processNodes.map(node => {
                if (node.lane >= laneCount) return null
                const pos = getNodePos(node, laneCount)
                const isBrokenNode = brokenNodes.includes(node.id)
                const isStable = !isPositionBased && broken && scenario !== 'original'

                if (node.type === 'event') {
                    return (
                        <g key={node.id}>
                            <circle
                                cx={pos.x} cy={pos.y} r={14}
                                fill={isBrokenNode ? 'rgba(220,38,38,0.1)' : (isStable ? 'rgba(0,119,182,0.1)' : '#fff')}
                                stroke={isBrokenNode ? '#dc2626' : (isStable ? '#0077b6' : '#64748b')}
                                strokeWidth={node.id === 'end' ? 3 : 2}
                                style={{ transition: 'all 0.6s ease' }}
                            />
                            {node.id === 'start' && <circle cx={pos.x} cy={pos.y} r={6} fill={isBrokenNode ? '#dc2626' : '#64748b'} style={{ transition: 'fill 0.6s' }} />}
                            {node.id === 'end' && <circle cx={pos.x} cy={pos.y} r={6} fill={isBrokenNode ? '#dc2626' : (isStable ? '#0077b6' : '#64748b')} style={{ transition: 'fill 0.6s' }} />}
                        </g>
                    )
                }

                if (node.type === 'gateway') {
                    const size = 18
                    return (
                        <g key={node.id}>
                            <rect
                                x={pos.x - size} y={pos.y - size}
                                width={size * 2} height={size * 2}
                                fill={isBrokenNode ? 'rgba(220,38,38,0.1)' : (isStable ? 'rgba(0,119,182,0.08)' : '#fff')}
                                stroke={isBrokenNode ? '#dc2626' : (isStable ? '#0077b6' : '#64748b')}
                                strokeWidth={1.5}
                                transform={`rotate(45 ${pos.x} ${pos.y})`}
                                style={{ transition: 'all 0.6s ease' }}
                            />
                            <text x={pos.x} y={pos.y + 1} textAnchor="middle" dominantBaseline="central" style={{ fontSize: 11, fontWeight: 700, fill: isBrokenNode ? '#dc2626' : '#334155' }}>✕</text>
                        </g>
                    )
                }

                // Task node
                const lines = node.label.split('\n')
                return (
                    <g key={node.id} style={{ transition: 'all 0.6s ease' }}>
                        {/* Glow for stable */}
                        {isStable && (
                            <rect
                                x={pos.x - NODE_W / 2 - 3} y={pos.y - NODE_H / 2 - 3}
                                width={NODE_W + 6} height={NODE_H + 6}
                                rx={8} fill="none"
                                stroke="rgba(0,119,182,0.25)"
                                strokeWidth={2}
                            >
                                <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                            </rect>
                        )}
                        <rect
                            x={pos.x - NODE_W / 2} y={pos.y - NODE_H / 2}
                            width={NODE_W} height={NODE_H}
                            rx={6}
                            fill={isBrokenNode ? 'rgba(220,38,38,0.08)' : (isStable ? 'rgba(0,119,182,0.06)' : '#fff')}
                            stroke={isBrokenNode ? '#dc2626' : (isStable ? '#0077b6' : '#94a3b8')}
                            strokeWidth={1.5}
                            style={{ transition: 'all 0.6s ease' }}
                        />
                        {/* Broken X overlay */}
                        {isBrokenNode && (
                            <>
                                <line x1={pos.x - NODE_W / 2 + 4} y1={pos.y - NODE_H / 2 + 4} x2={pos.x + NODE_W / 2 - 4} y2={pos.y + NODE_H / 2 - 4} stroke="#dc2626" strokeWidth={1.5} opacity={0.5} />
                                <line x1={pos.x + NODE_W / 2 - 4} y1={pos.y - NODE_H / 2 + 4} x2={pos.x - NODE_W / 2 + 4} y2={pos.y + NODE_H / 2 - 4} stroke="#dc2626" strokeWidth={1.5} opacity={0.5} />
                            </>
                        )}
                        {lines.map((line, li) => (
                            <text
                                key={li}
                                x={pos.x} y={pos.y + (li - (lines.length - 1) / 2) * 12}
                                textAnchor="middle" dominantBaseline="central"
                                style={{
                                    fontSize: 8.5, fontWeight: 600,
                                    fill: isBrokenNode ? '#dc2626' : '#334155',
                                    opacity: isBrokenNode ? 0.4 : 1,
                                    transition: 'all 0.6s ease',
                                }}
                            >
                                {line}
                            </text>
                        ))}
                    </g>
                )
            })}

            {/* Arrow markers */}
            <defs>
                <marker id="arrow-pos" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={6} markerHeight={6} orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 Z" fill="#94a3b8" />
                </marker>
                <marker id="arrow-func" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={6} markerHeight={6} orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 Z" fill="#0077b6" />
                </marker>
                <marker id="arrow-broken" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={6} markerHeight={6} orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 Z" fill="#dc2626" opacity={0.4} />
                </marker>
            </defs>
        </svg>
    )
}

/* ═══════════════════════════════════════════
   STABILITY GAUGE
   ═══════════════════════════════════════════ */
function StabilityGauge({ score, label, color }) {
    const radius = 36
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (score / 100) * circumference

    return (
        <div style={{ textAlign: 'center' }}>
            <svg width={90} height={90} viewBox="0 0 90 90">
                <circle cx={45} cy={45} r={radius} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth={6} />
                <circle
                    cx={45} cy={45} r={radius} fill="none"
                    stroke={color} strokeWidth={6}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform="rotate(-90 45 45)"
                    style={{ transition: 'stroke-dashoffset 1s ease' }}
                />
                <text x={45} y={42} textAnchor="middle" dominantBaseline="central" style={{ fontSize: 20, fontWeight: 900, fill: color }}>{score}</text>
                <text x={45} y={60} textAnchor="middle" style={{ fontSize: 7, fill: '#64748b', fontWeight: 500 }}>/ 100</text>
            </svg>
            <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#475569', marginTop: 4 }}>{label}</div>
        </div>
    )
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export default function BPMNSimulationDemo() {
    const [scenario, setScenario] = useState('original')
    const [animated, setAnimated] = useState(false)
    const timeoutRef = useRef(null)

    const handleScenario = useCallback((key) => {
        setAnimated(false)
        setScenario(key)
        if (key !== 'original') {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = setTimeout(() => setAnimated(true), 300)
        }
    }, [])

    useEffect(() => () => clearTimeout(timeoutRef.current), [])

    const broken = animated && scenario !== 'original'
    const currentLanes = positionLanes[scenario] || positionLanes.original
    const posScore = scenario === 'original' ? 85 : (scenario === 'removed' ? 25 : scenario === 'merged' ? 35 : 40)
    const funcScore = scenario === 'original' ? 85 : 92

    const currentDesc = scenarios.find(s => s.key === scenario)?.desc || ''

    return (
        <SectionWrapper id="bpmn-simulation" variant="product">
            <div className="section-header">
                <span className="section-tag">Live Simulation</span>
                <h2 className="section-title">Simulate Organizational Change <span className="gradient-text">Before It Happens</span></h2>
                <p className="section-subtitle">See how process architecture behaves when roles, departments, or structures change.</p>
            </div>

            {/* Scenario Controls */}
            <div style={{
                display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap',
                marginBottom: 32, maxWidth: 800, margin: '0 auto 32px',
            }}>
                {scenarios.map(s => (
                    <button
                        key={s.key}
                        onClick={() => handleScenario(s.key)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: 8,
                            border: scenario === s.key ? '2px solid var(--accent)' : '1px solid var(--border)',
                            background: scenario === s.key ? 'rgba(0,119,182,0.08)' : 'var(--bg-card)',
                            color: scenario === s.key ? 'var(--accent)' : 'var(--text-secondary)',
                            fontWeight: scenario === s.key ? 700 : 500,
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                            transition: 'all 0.2s',
                        }}
                    >
                        {s.label}
                    </button>
                ))}
            </div>

            {/* Scenario description */}
            {scenario !== 'original' && (
                <div style={{
                    textAlign: 'center', marginBottom: 24,
                    padding: '10px 20px',
                    background: 'rgba(245,158,11,0.08)',
                    border: '1px solid rgba(245,158,11,0.15)',
                    borderRadius: 8,
                    maxWidth: 500, margin: '0 auto 24px',
                    fontSize: '0.85rem', color: '#92400e', fontWeight: 600,
                }}>
                    ⚡ Simulating: {currentDesc}
                </div>
            )}

            {/* Split-screen panels */}
            <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20,
                maxWidth: 1100, margin: '0 auto',
            }}>
                {/* LEFT: Position-Based */}
                <div style={{
                    background: broken ? 'rgba(220,38,38,0.02)' : 'var(--bg-card)',
                    border: `1.5px solid ${broken ? 'rgba(220,38,38,0.3)' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    transition: 'all 0.6s ease',
                }}>
                    {/* Panel header */}
                    <div style={{
                        padding: '16px 20px',
                        background: broken ? 'rgba(220,38,38,0.06)' : 'rgba(0,0,0,0.02)',
                        borderBottom: `1px solid ${broken ? 'rgba(220,38,38,0.15)' : 'var(--border)'}`,
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        transition: 'all 0.6s ease',
                    }}>
                        <div>
                            <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: broken ? '#dc2626' : '#64748b', marginBottom: 2 }}>
                                Position-Based BPMN
                            </div>
                            <div style={{ fontSize: '0.75rem', color: broken ? '#dc2626' : '#94a3b8' }}>
                                Swimlanes = Job Titles
                            </div>
                        </div>
                        {broken && (
                            <div style={{
                                padding: '4px 10px', borderRadius: 12,
                                background: 'rgba(220,38,38,0.1)',
                                color: '#dc2626', fontSize: '0.65rem', fontWeight: 700,
                                animation: 'bpmn-pulse 2s infinite',
                            }}>
                                ⚠ BROKEN
                            </div>
                        )}
                    </div>
                    {/* Diagram */}
                    <div style={{ padding: '16px 12px' }}>
                        <BPMNDiagram
                            lanes={currentLanes}
                            scenario={scenario}
                            isPositionBased={true}
                            broken={broken}
                        />
                    </div>
                    {/* Status message */}
                    <div style={{
                        padding: '12px 20px',
                        borderTop: `1px solid ${broken ? 'rgba(220,38,38,0.15)' : 'var(--border)'}`,
                        fontSize: '0.75rem',
                        color: broken ? '#dc2626' : '#64748b',
                        fontWeight: broken ? 600 : 400,
                        textAlign: 'center',
                        minHeight: 40,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.6s ease',
                    }}>
                        {broken
                            ? '⚠️ Process dependency detected: role no longer exists. Rework required.'
                            : '✓ Process diagram valid — all roles assigned.'
                        }
                    </div>
                </div>

                {/* RIGHT: Function-Based */}
                <div style={{
                    background: broken ? 'rgba(0,119,182,0.02)' : 'var(--bg-card)',
                    border: `1.5px solid ${broken ? 'rgba(0,119,182,0.25)' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    transition: 'all 0.6s ease',
                }}>
                    {/* Panel header */}
                    <div style={{
                        padding: '16px 20px',
                        background: broken ? 'rgba(0,119,182,0.04)' : 'rgba(0,0,0,0.02)',
                        borderBottom: `1px solid ${broken ? 'rgba(0,119,182,0.12)' : 'var(--border)'}`,
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        transition: 'all 0.6s ease',
                    }}>
                        <div>
                            <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: broken ? '#0077b6' : '#64748b', marginBottom: 2 }}>
                                Function-Based BPMN
                            </div>
                            <div style={{ fontSize: '0.75rem', color: broken ? '#0077b6' : '#94a3b8' }}>
                                Swimlanes = Business Functions
                            </div>
                        </div>
                        {broken && (
                            <div style={{
                                padding: '4px 10px', borderRadius: 12,
                                background: 'rgba(16,185,129,0.1)',
                                color: '#059669', fontSize: '0.65rem', fontWeight: 700,
                            }}>
                                ✓ STABLE
                            </div>
                        )}
                    </div>
                    {/* Diagram */}
                    <div style={{ padding: '16px 12px' }}>
                        <BPMNDiagram
                            lanes={functionLanes}
                            scenario={scenario}
                            isPositionBased={false}
                            broken={broken}
                        />
                    </div>
                    {/* Status message */}
                    <div style={{
                        padding: '12px 20px',
                        borderTop: `1px solid ${broken ? 'rgba(0,119,182,0.12)' : 'var(--border)'}`,
                        fontSize: '0.75rem',
                        color: broken ? '#059669' : '#64748b',
                        fontWeight: broken ? 600 : 400,
                        textAlign: 'center',
                        minHeight: 40,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.6s ease',
                    }}>
                        {broken
                            ? '✅ Process remains valid — function layer preserved. No rework needed.'
                            : '✓ Process diagram valid — all functions assigned.'
                        }
                    </div>
                </div>
            </div>

            {/* Impact Summary + Gauges */}
            <div style={{
                display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 32,
                maxWidth: 900, margin: '40px auto 0',
                alignItems: 'center',
            }}>
                {/* Position-based summary */}
                <div style={{
                    padding: 24, borderRadius: 'var(--radius-lg)',
                    background: broken ? 'rgba(220,38,38,0.03)' : 'var(--bg-card)',
                    border: `1px solid ${broken ? 'rgba(220,38,38,0.15)' : 'var(--border)'}`,
                    transition: 'all 0.6s ease',
                }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: broken ? '#dc2626' : '#64748b', marginBottom: 12 }}>
                        Position-Based
                    </div>
                    {[
                        { icon: '🔴', text: 'Process break risk', active: broken },
                        { icon: '📄', text: 'High document revision', active: broken },
                        { icon: '🔗', text: 'Role dependency detected', active: broken },
                    ].map((item, i) => (
                        <div key={i} style={{
                            display: 'flex', gap: 8, alignItems: 'center',
                            padding: '6px 0', fontSize: '0.8rem',
                            color: item.active ? '#dc2626' : 'var(--text-dim)',
                            fontWeight: item.active ? 600 : 400,
                            transition: 'all 0.4s ease',
                        }}>
                            <span>{item.icon}</span> {item.text}
                        </div>
                    ))}
                </div>

                {/* Gauges */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
                    <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: '#64748b', textAlign: 'center' }}>
                        Process Stability
                    </div>
                    <div style={{ display: 'flex', gap: 24 }}>
                        <StabilityGauge score={posScore} label="Position" color={posScore > 60 ? '#64748b' : '#dc2626'} />
                        <StabilityGauge score={funcScore} label="Function" color="#0077b6" />
                    </div>
                </div>

                {/* Function-based summary */}
                <div style={{
                    padding: 24, borderRadius: 'var(--radius-lg)',
                    background: broken ? 'rgba(0,119,182,0.03)' : 'var(--bg-card)',
                    border: `1px solid ${broken ? 'rgba(0,119,182,0.12)' : 'var(--border)'}`,
                    transition: 'all 0.6s ease',
                }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: broken ? '#059669' : '#64748b', marginBottom: 12 }}>
                        Function-Based
                    </div>
                    {[
                        { icon: '🟢', text: 'Process resilient', active: broken },
                        { icon: '📋', text: 'No documentation rewrite', active: broken },
                        { icon: '🔓', text: 'Role independence', active: broken },
                    ].map((item, i) => (
                        <div key={i} style={{
                            display: 'flex', gap: 8, alignItems: 'center',
                            padding: '6px 0', fontSize: '0.8rem',
                            color: item.active ? '#059669' : 'var(--text-dim)',
                            fontWeight: item.active ? 600 : 400,
                            transition: 'all 0.4s ease',
                        }}>
                            <span>{item.icon}</span> {item.text}
                        </div>
                    ))}
                </div>
            </div>

            {/* Pulse animation */}
            <style>{`
                @keyframes bpmn-pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
            `}</style>
        </SectionWrapper>
    )
}
