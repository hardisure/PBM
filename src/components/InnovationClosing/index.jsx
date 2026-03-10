import { useEffect, useRef } from 'react'
import { useTranslation } from '../../i18n/LanguageContext'

const revealObserver = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('closing-visible')
        }
    })
}

export default function InnovationClosing({ onNavigateProduct }) {
    const { t } = useTranslation()
    const containerRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(revealObserver, {
            threshold: 0.15,
            rootMargin: '0px 0px -60px 0px',
        })
        const items = containerRef.current?.querySelectorAll('.closing-reveal')
        items?.forEach(el => observer.observe(el))
        return () => observer.disconnect()
    }, [])

    return (
        <section ref={containerRef} style={{
            background: 'linear-gradient(180deg, var(--bg-primary) 0%, #f0f4f8 30%, #e8eef5 60%, #1a2332 60%, #0d1117 100%)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* ════════════════════════════════
                PART 1 – Philosophical Hook (light bg)
               ════════════════════════════════ */}
            <div style={{ padding: '120px 24px 80px', textAlign: 'center' }}>
                <div className="closing-reveal" style={{
                    maxWidth: 800, margin: '0 auto',
                    opacity: 0, transform: 'translateY(40px)',
                    transition: 'opacity 0.9s ease, transform 0.9s ease',
                }}>
                    <h2 style={{
                        fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                        fontWeight: 900,
                        color: '#1a2332',
                        lineHeight: 1.15,
                        letterSpacing: '-0.02em',
                    }}>
                        {t('innovationClosing.hook1')}
                    </h2>
                </div>

                <div className="closing-reveal" style={{
                    maxWidth: 800, margin: '20px auto 0',
                    opacity: 0, transform: 'translateY(40px)',
                    transition: 'opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s',
                }}>
                    <h2 style={{
                        fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                        fontWeight: 900,
                        lineHeight: 1.15,
                        letterSpacing: '-0.02em',
                        background: 'linear-gradient(135deg, #0077b6, #00b4d8)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>
                        {t('innovationClosing.hook2')}
                    </h2>
                </div>
            </div>

            {/* ════════════════════════════════
                PART 2 – Narrative (light bg)
               ════════════════════════════════ */}
            <div style={{ padding: '0 24px 100px' }}>
                <div className="closing-reveal" style={{
                    maxWidth: 640, margin: '0 auto',
                    opacity: 0, transform: 'translateY(30px)',
                    transition: 'opacity 1s ease 0.2s, transform 1s ease 0.2s',
                }}>
                    <p style={{
                        fontSize: '1.05rem', lineHeight: 1.85,
                        color: '#4a5568', textAlign: 'center',
                    }}>
                        {t('innovationClosing.narrative1')}
                    </p>
                </div>

                <div className="closing-reveal" style={{
                    maxWidth: 640, margin: '40px auto 0',
                    opacity: 0, transform: 'translateY(30px)',
                    transition: 'opacity 1s ease 0.4s, transform 1s ease 0.4s',
                }}>
                    <p style={{
                        fontSize: '1.2rem', lineHeight: 1.7,
                        color: '#1a2332', textAlign: 'center',
                        fontWeight: 600, fontStyle: 'italic',
                    }}>
                        {t('innovationClosing.narrative2')}
                    </p>
                </div>

                <div className="closing-reveal" style={{
                    maxWidth: 640, margin: '40px auto 0',
                    opacity: 0, transform: 'translateY(30px)',
                    transition: 'opacity 1s ease 0.2s, transform 1s ease 0.2s',
                }}>
                    <p style={{
                        fontSize: '1.05rem', lineHeight: 1.85,
                        color: '#4a5568', textAlign: 'center',
                    }}>
                        {t('innovationClosing.narrative3a')}<strong style={{ color: '#0077b6' }}>{t('innovationClosing.narrative3accent')}</strong>{t('innovationClosing.narrative3b')}
                    </p>
                </div>
            </div>

            {/* ════════════════════════════════
                PART 3 – Commercial Readiness (dark bg)
               ════════════════════════════════ */}
            <div style={{
                padding: '100px 24px 60px',
                background: 'linear-gradient(180deg, #1a2332, #0d1117)',
            }}>
                <div className="closing-reveal" style={{
                    maxWidth: 640, margin: '0 auto',
                    opacity: 0, transform: 'translateY(30px)',
                    transition: 'opacity 1s ease 0.2s, transform 1s ease 0.2s',
                }}>
                    <p style={{
                        fontSize: '1.05rem', lineHeight: 1.85,
                        color: 'rgba(255,255,255,0.6)', textAlign: 'center',
                    }}>
                        {t('innovationClosing.commercial1')}
                    </p>
                </div>

                <div className="closing-reveal" style={{
                    maxWidth: 660, margin: '32px auto 0',
                    opacity: 0, transform: 'translateY(30px)',
                    transition: 'opacity 1s ease 0.3s, transform 1s ease 0.3s',
                }}>
                    <p style={{
                        fontSize: '1.1rem', lineHeight: 1.8,
                        color: 'rgba(255,255,255,0.85)', textAlign: 'center',
                    }}>
                        {t('innovationClosing.commercial2a')}<strong style={{ color: '#00b4d8' }}>{t('innovationClosing.commercial2accent')}</strong>{t('innovationClosing.commercial2b')}
                    </p>
                </div>

                <div className="closing-reveal" style={{
                    maxWidth: 500, margin: '48px auto 0',
                    opacity: 0, transform: 'translateY(20px)',
                    transition: 'opacity 1s ease 0.4s, transform 1s ease 0.4s',
                }}>
                    <p style={{
                        fontSize: '1rem', lineHeight: 1.7,
                        color: 'rgba(255,255,255,0.45)', textAlign: 'center',
                    }}>
                        {t('innovationClosing.commercial3a')}
                    </p>
                    <p style={{
                        fontSize: '1.3rem', lineHeight: 1.5,
                        color: '#fff', textAlign: 'center',
                        fontWeight: 700, marginTop: 8,
                    }}>
                        {t('innovationClosing.commercial3b')}
                    </p>
                </div>
            </div>

            {/* ════════════════════════════════
                PART 4 – Vision Statement (dark bg)
               ════════════════════════════════ */}
            <div style={{
                padding: '60px 24px 80px',
                background: '#0d1117',
            }}>
                <div className="closing-reveal" style={{
                    maxWidth: 600, margin: '0 auto',
                    opacity: 0, transform: 'translateY(30px)',
                    transition: 'opacity 1s ease 0.2s, transform 1s ease 0.2s',
                    padding: '32px',
                    borderLeft: '3px solid rgba(0,180,216,0.3)',
                }}>
                    <p style={{
                        fontSize: '1rem', lineHeight: 1.85,
                        color: 'rgba(255,255,255,0.55)', textAlign: 'left',
                        fontStyle: 'italic',
                    }}>
                        {t('innovationClosing.vision')}
                    </p>
                </div>

                <div className="closing-reveal" style={{
                    maxWidth: 640, margin: '60px auto 0',
                    opacity: 0, transform: 'translateY(30px)',
                    transition: 'opacity 1s ease 0.3s, transform 1s ease 0.3s',
                }}>
                    <p style={{
                        fontSize: '0.85rem', lineHeight: 1.8,
                        color: 'rgba(255,255,255,0.35)', textAlign: 'center',
                        maxWidth: 500, margin: '0 auto',
                    }}>
                        {t('innovationClosing.visionFinal')}
                    </p>
                </div>
            </div>

            {/* ════════════════════════════════
                PART 5 – Final Statement (dark bg, large text)
               ════════════════════════════════ */}
            <div style={{
                padding: '80px 24px 60px',
                background: '#0d1117',
                textAlign: 'center',
            }}>
                <div className="closing-reveal" style={{
                    opacity: 0, transform: 'translateY(40px) scale(0.95)',
                    transition: 'opacity 1.2s ease 0.2s, transform 1.2s ease 0.2s',
                }}>
                    <p style={{
                        fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                        color: 'rgba(255,255,255,0.3)',
                        textTransform: 'uppercase',
                        letterSpacing: 4,
                        fontWeight: 600,
                        marginBottom: 24,
                    }}>
                        {t('innovationClosing.journeyLabel')}
                    </p>
                    <h2 style={{
                        fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                        fontWeight: 900,
                        color: '#fff',
                        lineHeight: 1.15,
                        letterSpacing: '-0.02em',
                    }}>
                        {t('innovationClosing.journeyFrom')}
                    </h2>
                    <h2 style={{
                        fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                        fontWeight: 900,
                        lineHeight: 1.15,
                        letterSpacing: '-0.02em',
                        marginTop: 8,
                        background: 'linear-gradient(135deg, #0077b6, #00b4d8, #48cae4)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>
                        {t('innovationClosing.journeyTo')}
                    </h2>
                </div>
            </div>

            {/* ════════════════════════════════
                PART 6 – CTA Buttons (dark bg)
               ════════════════════════════════ */}
            <div style={{
                padding: '40px 24px 120px',
                background: '#0d1117',
                textAlign: 'center',
            }}>
                <div className="closing-reveal" style={{
                    opacity: 0, transform: 'translateY(30px)',
                    transition: 'opacity 1s ease 0.4s, transform 1s ease 0.4s',
                }}>
                    <div style={{
                        display: 'flex', gap: 16, justifyContent: 'center',
                        flexWrap: 'wrap',
                    }}>
                        <button
                            onClick={() => onNavigateProduct?.()}
                            style={{
                                padding: '16px 36px',
                                background: 'linear-gradient(135deg, #0077b6, #00b4d8)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 12,
                                fontSize: '1rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                fontFamily: 'inherit',
                                letterSpacing: 0.5,
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                boxShadow: '0 4px 24px rgba(0,119,182,0.3)',
                            }}
                            onMouseEnter={e => {
                                e.target.style.transform = 'translateY(-2px)'
                                e.target.style.boxShadow = '0 8px 32px rgba(0,119,182,0.5)'
                            }}
                            onMouseLeave={e => {
                                e.target.style.transform = 'translateY(0)'
                                e.target.style.boxShadow = '0 4px 24px rgba(0,119,182,0.3)'
                            }}
                        >
                            {t('innovationClosing.ctaProduct')}
                        </button>

                        <button
                            onClick={() => {
                                onNavigateProduct?.()
                                setTimeout(() => {
                                    document.getElementById('roi')?.scrollIntoView({ behavior: 'smooth' })
                                }, 300)
                            }}
                            style={{
                                padding: '16px 36px',
                                background: 'transparent',
                                color: 'rgba(255,255,255,0.7)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                borderRadius: 12,
                                fontSize: '1rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                fontFamily: 'inherit',
                                letterSpacing: 0.5,
                                transition: 'all 0.3s',
                            }}
                            onMouseEnter={e => {
                                e.target.style.borderColor = 'rgba(0,180,216,0.5)'
                                e.target.style.color = '#fff'
                            }}
                            onMouseLeave={e => {
                                e.target.style.borderColor = 'rgba(255,255,255,0.2)'
                                e.target.style.color = 'rgba(255,255,255,0.7)'
                            }}
                        >
                            {t('innovationClosing.ctaROI')}
                        </button>
                    </div>

                    <p style={{
                        marginTop: 40,
                        fontSize: '0.75rem',
                        color: 'rgba(255,255,255,0.2)',
                        letterSpacing: 1,
                    }}>
                        {t('innovationClosing.copyright')}
                    </p>
                </div>
            </div>

            {/* Global CSS for reveal animation */}
            <style>{`
                .closing-reveal {
                    opacity: 0;
                    transform: translateY(40px);
                }
                .closing-reveal.closing-visible {
                    opacity: 1 !important;
                    transform: translateY(0) scale(1) !important;
                }
            `}</style>
        </section>
    )
}
