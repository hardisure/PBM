import { useState, useCallback } from 'react'
import SectionWrapper from '../../layouts/SectionWrapper'

const initialRoles = [
    { id: 1, position: 'Manager Akuntansi', func: 'Fungsi Akuntansi' },
    { id: 2, position: 'Asst. Manager Pajak', func: 'Fungsi Perpajakan' },
    { id: 3, position: 'Staff Pembukuan', func: 'Fungsi Pembukuan' },
]

const actions = [
    { label: '🔄 Rename Role', action: 'rename' },
    { label: '🔗 Merge Department', action: 'merge' },
    { label: '❌ Remove Role', action: 'remove' },
]

const panel = {
    padding: 28,
    background: 'var(--bg-card)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border)',
    flex: 1,
}

export default function BPMNSimulator() {
    const [roles, setRoles] = useState(initialRoles)
    const [changed, setChanged] = useState(false)
    const [stability, setStability] = useState(100)

    const simulate = useCallback((action) => {
        setChanged(true)
        if (action === 'rename') {
            setRoles(prev => prev.map((r, i) => i === 0 ? { ...r, position: 'Sr. Manager Finance' } : r))
            setStability(35)
        } else if (action === 'merge') {
            setRoles(prev => [
                { id: 1, position: 'Manager Finance & Tax', func: 'Fungsi Akuntansi' },
                { id: 3, position: 'Staff Pembukuan', func: 'Fungsi Pembukuan' },
            ])
            setStability(20)
        } else if (action === 'remove') {
            setRoles(prev => prev.filter(r => r.id !== 2))
            setStability(45)
        }
    }, [])

    const reset = () => {
        setRoles(initialRoles)
        setChanged(false)
        setStability(100)
    }

    const posStability = changed ? stability : 100
    const funcStability = 100

    return (
        <SectionWrapper id="simulator" variant="product-alt">
            <div className="section-header">
                <span className="section-tag">Interactive Demo</span>
                <h2 className="section-title">BPMN <span className="gradient-text">Simulator</span></h2>
                <p className="section-subtitle">Simulate organizational change and see the impact on both architectures.</p>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 32 }}>
                {actions.map((a, i) => (
                    <button key={i} className="btn btn-outline btn-sm" onClick={() => simulate(a.action)}>{a.label}</button>
                ))}
                <button className="btn btn-sm" style={{ background: 'rgba(0,60,120,0.04)', color: 'var(--text-dim)', border: '1px solid var(--border)' }} onClick={reset}>↺ Reset</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                {/* Position-Based */}
                <div style={panel}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: changed ? '#c0392b' : 'var(--text-dim)', marginBottom: 16 }}>
                        Position-Based BPMN
                    </div>
                    {roles.map(r => (
                        <div key={r.id} style={{
                            padding: '10px 16px',
                            marginBottom: 6,
                            borderRadius: 6,
                            background: changed ? 'rgba(214,48,49,0.06)' : 'rgba(0,60,120,0.02)',
                            border: `1px solid ${changed ? 'rgba(214,48,49,0.2)' : 'var(--border)'}`,
                            color: changed ? '#c0392b' : 'var(--text-secondary)',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            transition: 'all 0.4s',
                        }}>
                            {r.position} {changed && <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>⚠️ BROKEN</span>}
                        </div>
                    ))}
                    <div style={{ marginTop: 16, padding: 12, borderRadius: 8, background: posStability > 70 ? 'rgba(0,119,182,0.06)' : 'rgba(214,48,49,0.06)', textAlign: 'center' }}>
                        <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)' }}>Stability</span>
                        <div style={{ fontWeight: 900, fontSize: '1.5rem', color: posStability > 70 ? 'var(--accent)' : '#c0392b', fontFamily: 'var(--font-display)' }}>{posStability}%</div>
                    </div>
                </div>

                {/* Function-Based */}
                <div style={panel}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>
                        Function-Based BPMN
                    </div>
                    {initialRoles.map(r => (
                        <div key={r.id} style={{
                            padding: '10px 16px',
                            marginBottom: 6,
                            borderRadius: 6,
                            background: 'rgba(0,119,182,0.04)',
                            border: '1px solid rgba(0,119,182,0.15)',
                            color: 'var(--accent)',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                        }}>
                            {r.func} <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>✓ STABLE</span>
                        </div>
                    ))}
                    <div style={{ marginTop: 16, padding: 12, borderRadius: 8, background: 'rgba(0,119,182,0.06)', textAlign: 'center' }}>
                        <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)' }}>Stability</span>
                        <div style={{ fontWeight: 900, fontSize: '1.5rem', color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>{funcStability}%</div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}
