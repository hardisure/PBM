import { useEffect, useRef, useState } from 'react'
import SectionWrapper from '../../layouts/SectionWrapper'
import styles from './styles.module.css'
import { useTranslation } from '../../i18n/LanguageContext'

function Counter({ target, suffix = '' }) {
    const [value, setValue] = useState(0)
    const ref = useRef(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const observer = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
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
    const { t } = useTranslation()
    const [visibleSteps, setVisibleSteps] = useState(0)
    const sectionRef = useRef(null)

    const cascadeSteps = [
        { icon: '🔄', label: t('failureCascade.step1'), className: '' },
        { icon: '💔', label: t('failureCascade.step2'), className: 'step-warn' },
        { icon: '📝', label: t('failureCascade.step3'), className: 'step-warn' },
        { icon: '⏱️', label: t('failureCascade.step4'), className: 'step-danger' },
        { icon: '🚨', label: t('failureCascade.step5'), className: 'step-critical' },
    ]

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
                <span className="section-tag">{t('failureCascade.tag')}</span>
                <h2 className="section-title">{t('failureCascade.title1')}<span className="gradient-text-hot">{t('failureCascade.titleAccent')}</span></h2>
                <p className="section-subtitle">{t('failureCascade.subtitle1')}<strong>{t('failureCascade.subtitleBold')}</strong>{t('failureCascade.subtitle2')}</p>
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
                    <div className={styles['stat-label']}>{t('failureCascade.stat1')}</div>
                </div>
                <div className={styles.stat}>
                    <div><span className={styles['stat-number']}><Counter target={70} /></span><span className={styles['stat-suffix']}>%</span></div>
                    <div className={styles['stat-label']}>{t('failureCascade.stat2')}</div>
                </div>
                <div className={styles.stat}>
                    <div><span className={styles['stat-number']}><Counter target={975} /></span><span className={styles['stat-suffix']}> Jt</span></div>
                    <div className={styles['stat-label']}>{t('failureCascade.stat3')}</div>
                </div>
            </div>
        </SectionWrapper>
    )
}
