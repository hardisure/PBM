import { useScrollReveal } from '../animations/useScrollReveal'
import styles from './SectionWrapper.module.css'

export default function SectionWrapper({ id, variant = 'dark', className = '', children }) {
    const ref = useScrollReveal(0.1)

    return (
        <section
            id={id}
            className={`section ${styles['section-wrapper']} ${styles[`section-${variant}`]} ${className}`}
        >
            <div className="container">
                <div ref={ref} className={`${styles['reveal-wrapper']}`}>
                    {children}
                </div>
            </div>
        </section>
    )
}
