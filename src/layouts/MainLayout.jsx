import { useState, useEffect, useCallback } from 'react'
import styles from './MainLayout.module.css'
import ProductInsightPanel from '../components/ProductInsightPanel'

const tocA = [
    { id: 'problem', label: 'The Problem' },
    { id: 'rootcause', label: 'Root Cause' },
    { id: 'methodology', label: 'Methodology' },
    { id: 'innovation', label: 'The Innovation' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'resilience', label: 'Resilience' },
    { id: 'evidence', label: 'Evidence' },
    { id: 'financial', label: 'Financial' },
    { id: 'market', label: 'Market Map' },
    { id: 'risk', label: 'Risk Matrix' },
]
const tocB = [
    { id: 'problem-reminder', label: 'The Challenge' },
    { id: 'solution', label: 'Platform' },
    { id: 'bpmn-simulation', label: 'Simulation' },
    { id: 'implementation', label: 'Implementation' },
    { id: 'roi', label: 'ROI Diagnostic' },
    { id: 'who', label: 'Who Is This For' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'toolkit', label: 'Toolkit' },
]

export default function MainLayout({ children, page, navigateTo }) {
    const [scrolled, setScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState('')
    const [tocVisible, setTocVisible] = useState(false)

    const isInnovation = page === 'innovation'
    const isProduct = page === 'product'
    const currentToc = isInnovation ? tocA : tocB

    const handleScroll = useCallback(() => {
        const y = window.scrollY
        setScrolled(y > 50)
        setTocVisible(y > 300)

        // Find current section
        const sections = document.querySelectorAll('section[id]')
        let current = ''
        sections.forEach(sec => {
            const top = sec.offsetTop
            const height = sec.offsetHeight
            if (y + 200 >= top && y + 200 < top + height) {
                current = sec.id
            }
        })
        setActiveSection(current)
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [handleScroll])

    const scrollTo = (id) => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return (
        <>
            <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
                <div className={styles['nav-brand']}>
                    <img src={`${import.meta.env.BASE_URL}logo.png`} alt="MKP" className={styles['nav-logo']} />
                    <span className={styles['nav-title']}>
                        Governance<span>Architecture</span>
                    </span>
                </div>
                <div className={styles['nav-links']}>
                    <button className={styles['nav-link']} onClick={() => { navigateTo('innovation'); }}>Home</button>
                    <div className={styles['nav-separator']} />
                    <button
                        className={`${styles['nav-tab']} ${styles['nav-tab-a']} ${isInnovation ? styles.active : ''}`}
                        onClick={() => navigateTo('innovation')}
                    >
                        <span className={styles['nav-tab-label']}>A</span> Innovation Story
                    </button>
                    <button
                        className={`${styles['nav-tab']} ${styles['nav-tab-b']} ${isProduct ? styles.active : ''}`}
                        onClick={() => navigateTo('product')}
                    >
                        <span className={styles['nav-tab-label']}>B</span> Product Story
                    </button>
                    <div className={styles['nav-separator']} />
                    <button className={styles['nav-cta']} onClick={() => {
                        if (isProduct) scrollTo('contact')
                        else navigateTo('product')
                    }}>Get Started</button>
                </div>
            </nav>

            {/* Sidebar TOC — shows only relevant page's TOC */}
            <aside className={`${styles['sidebar-toc']} ${tocVisible ? styles.visible : ''}`}>
                <div className={`${styles['toc-section']} ${styles.active}`}>
                    <div className={styles['toc-group-title']}>
                        {isInnovation ? 'Innovation Story' : 'Explore the Product'}
                    </div>
                    {isProduct && (
                        <div className={styles['toc-subtitle']}>
                            Navigate key components
                        </div>
                    )}
                    {currentToc.map(item => (
                        <button
                            key={item.id}
                            className={`${styles['toc-link']} ${activeSection === item.id ? styles.active : ''}`}
                            onClick={() => scrollTo(item.id)}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </aside>

            <main className={styles['main-content']}>
                <div className={isProduct ? styles['content-with-panel'] : undefined}>
                    <div className={isProduct ? styles['content-area'] : undefined}>
                        {children}
                    </div>
                    {isProduct && (
                        <div className={`${styles['insight-panel-wrapper']} ${tocVisible ? styles.visible : ''}`}>
                            <ProductInsightPanel />
                        </div>
                    )}
                </div>
            </main>
        </>
    )
}
