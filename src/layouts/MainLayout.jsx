import { useState, useEffect, useCallback } from 'react'
import styles from './MainLayout.module.css'
import ProductInsightPanel from '../components/ProductInsightPanel'
import { useTranslation } from '../i18n/LanguageContext'

export default function MainLayout({ children, page, navigateTo }) {
    const [scrolled, setScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState('')
    const [tocVisible, setTocVisible] = useState(false)
    const { language, setLanguage, t } = useTranslation()

    const isInnovation = page === 'innovation'
    const isProduct = page === 'product'

    const tocA = [
        { id: 'problem', label: t('tocA.problem') },
        { id: 'rootcause', label: t('tocA.rootCause') },
        { id: 'methodology', label: t('tocA.methodology') },
        { id: 'innovation', label: t('tocA.innovation') },
        { id: 'architecture', label: t('tocA.architecture') },
        { id: 'resilience', label: t('tocA.resilience') },
        { id: 'evidence', label: t('tocA.evidence') },
        { id: 'financial', label: t('tocA.financial') },
        { id: 'market', label: t('tocA.market') },
        { id: 'risk', label: t('tocA.risk') },
    ]
    const tocB = [
        { id: 'problem-reminder', label: t('tocB.challenge') },
        { id: 'solution', label: t('tocB.platform') },
        { id: 'bpmn-simulation', label: t('tocB.simulation') },
        { id: 'implementation', label: t('tocB.implementation') },
        { id: 'roi', label: t('tocB.roi') },
        { id: 'who', label: t('tocB.who') },
        { id: 'pricing', label: t('tocB.pricing') },
        { id: 'toolkit', label: t('tocB.toolkit') },
    ]

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
                    <button className={styles['nav-link']} onClick={() => { navigateTo('innovation'); }}>{t('nav.home')}</button>
                    <div className={styles['nav-separator']} />
                    <button
                        className={`${styles['nav-tab']} ${styles['nav-tab-a']} ${isInnovation ? styles.active : ''}`}
                        onClick={() => navigateTo('innovation')}
                    >
                        <span className={styles['nav-tab-label']}>A</span> {t('nav.innovationStory')}
                    </button>
                    <button
                        className={`${styles['nav-tab']} ${styles['nav-tab-b']} ${isProduct ? styles.active : ''}`}
                        onClick={() => navigateTo('product')}
                    >
                        <span className={styles['nav-tab-label']}>B</span> {t('nav.productStory')}
                    </button>
                    <div className={styles['nav-separator']} />

                    {/* Language Toggle */}
                    <div style={{
                        display: 'flex',
                        background: 'rgba(0,0,0,0.06)',
                        borderRadius: 8,
                        padding: 2,
                        gap: 1,
                    }}>
                        <button
                            onClick={() => setLanguage('en')}
                            style={{
                                padding: '5px 10px',
                                borderRadius: 6,
                                border: 'none',
                                background: language === 'en' ? 'rgba(0,119,182,0.15)' : 'transparent',
                                color: language === 'en' ? '#0077b6' : '#8b95a5',
                                fontWeight: language === 'en' ? 700 : 500,
                                fontSize: '0.72rem',
                                cursor: 'pointer',
                                fontFamily: 'inherit',
                                transition: 'all 0.2s',
                                letterSpacing: 0.5,
                            }}
                        >
                            EN
                        </button>
                        <button
                            onClick={() => setLanguage('id')}
                            style={{
                                padding: '5px 10px',
                                borderRadius: 6,
                                border: 'none',
                                background: language === 'id' ? 'rgba(0,119,182,0.15)' : 'transparent',
                                color: language === 'id' ? '#0077b6' : '#8b95a5',
                                fontWeight: language === 'id' ? 700 : 500,
                                fontSize: '0.72rem',
                                cursor: 'pointer',
                                fontFamily: 'inherit',
                                transition: 'all 0.2s',
                                letterSpacing: 0.5,
                            }}
                        >
                            ID
                        </button>
                    </div>

                    <button className={styles['nav-cta']} onClick={() => {
                        if (isProduct) scrollTo('contact')
                        else navigateTo('product')
                    }}>{t('nav.getStarted')}</button>
                </div>
            </nav>

            {/* Sidebar TOC — shows only relevant page's TOC */}
            <aside className={`${styles['sidebar-toc']} ${tocVisible ? styles.visible : ''}`}>
                <div className={`${styles['toc-section']} ${styles.active}`}>
                    <div className={styles['toc-group-title']}>
                        {isInnovation ? t('tocA.title') : t('tocB.title')}
                    </div>
                    {isProduct && (
                        <div className={styles['toc-subtitle']}>
                            {t('tocB.subtitle')}
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
