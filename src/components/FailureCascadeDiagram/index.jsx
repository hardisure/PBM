import { useEffect, useRef, useState } from 'react'
import SectionWrapper from '../../layouts/SectionWrapper'
import styles from './styles.module.css'

const cascadeSteps = [
    { icon: '🔄', label: 'Restructuring', className: '' },
    { icon: '💔', label: 'Process Break', className: 'step-warn' },
    { icon: '📝', label: 'Document Rework', className: 'step-warn' },
    { icon: '⏱️', label: 'Operational Delay', className: 'step-danger' },
    { icon: '🚨', label: 'Audit Findings', className: 'step-critical' },
]

function Counter({ target, suffix = '' }) {
    const [value, setValue] = useState(0)
    const ref = useRef(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const observer = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                let start = 0
                const duration = 2000
                const startTime = performance.now()
                function tick(now) {
                    const elapsed = now - startTime
                    const progress = Math.min(elapsed / duration, 1)
                    setValue(Math.round(target * progress))
                    if (progress < 1) requestAnimationFrame(tick)
                }
                requestAnimationFrame(tick)
                observer.unobserve(el)
            }
        }, { threshold: 0.5 })
        observer.observe(el)
        return () => observer.disconnect()
    }, [target])

    return <span ref={ref}>{value}</span>
}

export default function FailureCascadeDiagram() {
    const [visibleSteps, setVisibleSteps] = useState(0)
    const sectionRef = useRef(null)

    useEffect(() => {
        const el = sectionRef.current
        if (!el) return
        const observer = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                let i = 0
                const interval = setInterval(() => {
                    i++
                    setVisibleSteps(i)
                    if (i >= cascadeSteps.length) clearInterval(interval)
                }, 300)
                observer.unobserve(el)
            }
        }, { threshold: 0.2 })
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return (
        <SectionWrapper id="problem" variant="dark">
            <div className="section-header">
                <span className="section-tag">The Real Problem</span>
                <h2 className="section-title">Governance <span className="gradient-text-hot">Rework Crisis</span></h2>
                <p className="section-subtitle">Every organizational restructuring triggers a cascade of governance failure — costing up to <strong>Rp975 Juta per cycle</strong>.</p>
            </div>

            <div ref={sectionRef} className={styles.cascade}>
                <div className={styles['cascade-row']}>
                    {cascadeSteps.map((step, i) => (
                        <span key={i} style={{ display: 'contents' }}>
                            {i > 0 && (
                                <>
                                    <div className={`${styles['glow-line']} ${visibleSteps > i ? styles.visible : ''}`} />
                                    <div className={`${styles.arrow} ${visibleSteps > i ? styles.visible : ''}`}>→</div>
                                    <div className={`${styles['glow-line']} ${visibleSteps > i ? styles.visible : ''}`} />
                                </>
                            )}
                            <div className={`${styles.step} ${styles[step.className] || ''} ${visibleSteps > i ? styles.visible : ''}`}>
                                <span className={styles['step-icon']}>{step.icon}</span>
                                <span className={styles['step-label']}>{step.label}</span>
                            </div>
                        </span>
                    ))}
                </div>
            </div>

            <div className={styles.stats}>
                <div className={styles.stat}>
                    <div><span className={styles['stat-number']}><Counter target={80} /></span><span className={styles['stat-suffix']}>%</span></div>
                    <div className={styles['stat-label']}>SOPs don't reflect actual operations</div>
                </div>
                <div className={styles.stat}>
                    <div><span className={styles['stat-number']}><Counter target={70} /></span><span className={styles['stat-suffix']}>%</span></div>
                    <div className={styles['stat-label']}>Organizations redesign processes after restructuring</div>
                </div>
                <div className={styles.stat}>
                    <div><span className={styles['stat-number']}><Counter target={975} /></span><span className={styles['stat-suffix']}> Jt</span></div>
                    <div className={styles['stat-label']}>Governance rework cost per cycle</div>
                </div>
            </div>
        </SectionWrapper>
    )
}
