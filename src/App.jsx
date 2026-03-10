import { useState, useEffect, useCallback } from 'react'
import MainLayout from './layouts/MainLayout'
import HeroAnimation from './components/HeroAnimation'
import InnovationStory from './sections/InnovationStory'
import InnovationClosing from './components/InnovationClosing'
import ProductStory from './sections/ProductStory'

// Simple hash-based page routing: #innovation (default) vs #product
function getPageFromHash() {
    const hash = window.location.hash.replace('#', '')
    if (hash === 'product') return 'product'
    return 'innovation'
}

export default function App() {
    const [page, setPage] = useState(getPageFromHash)

    const handleHashChange = useCallback(() => {
        setPage(getPageFromHash())
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        window.addEventListener('hashchange', handleHashChange)
        return () => window.removeEventListener('hashchange', handleHashChange)
    }, [handleHashChange])

    const navigateTo = useCallback((p) => {
        window.location.hash = p
    }, [])

    return (
        <MainLayout page={page} navigateTo={navigateTo}>
            {page === 'innovation' && (
                <>
                    <HeroAnimation />
                    <InnovationStory />
                    <InnovationClosing onNavigateProduct={() => navigateTo('product')} />
                </>
            )}

            {page === 'product' && (
                <>
                    {/* Product Story Hero */}
                    <section style={{
                        padding: '0',
                        background: 'linear-gradient(180deg, #f0f4f8 0%, #e2e8f0 50%, #f7f8fa 100%)',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        minHeight: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100vw',
                        marginLeft: 'calc(-50vw + 50%)',
                    }}>
                        {/* Subtle decorative background */}
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: 'radial-gradient(circle at 20% 50%, rgba(0,119,182,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0,180,216,0.05) 0%, transparent 50%)',
                        }} />
                        {/* Grid pattern overlay */}
                        <div style={{
                            position: 'absolute', inset: 0,
                            backgroundImage: 'linear-gradient(rgba(0,119,182,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,119,182,0.03) 1px, transparent 1px)',
                            backgroundSize: '60px 60px',
                        }} />
                        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                            <div style={{
                                display: 'inline-block',
                                padding: '6px 20px',
                                background: 'rgba(0,119,182,0.08)',
                                border: '1px solid rgba(0,119,182,0.15)',
                                borderRadius: 24,
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: 3,
                                color: '#0077b6',
                                marginBottom: 24,
                            }}>
                                Section B — Product Story
                            </div>
                            <h1 style={{
                                fontSize: 'clamp(3rem, 6vw, 5rem)',
                                fontWeight: 900,
                                color: '#1a202c',
                                marginBottom: 28,
                                lineHeight: 1.1,
                                letterSpacing: '-0.03em',
                            }}>
                                Product <span style={{
                                    background: 'linear-gradient(135deg, #0077b6, #00b4d8)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}>Story</span>
                            </h1>
                            <p style={{
                                fontSize: '1.3rem',
                                color: '#2d3748',
                                maxWidth: 620,
                                margin: '0 auto 12px',
                                lineHeight: 1.7,
                                fontWeight: 500,
                            }}>
                                This innovation is no longer just a concept.
                            </p>
                            <p style={{
                                fontSize: '1.15rem',
                                color: '#4a5568',
                                maxWidth: 620,
                                margin: '0 auto 44px',
                                lineHeight: 1.7,
                            }}>
                                It has evolved into a <strong style={{ color: '#0077b6' }}>governance solution toolkit</strong> designed to stabilize business processes and reduce restructuring cost.
                            </p>
                            <p style={{
                                fontSize: '0.95rem',
                                color: '#a0aec0',
                                letterSpacing: 1.5,
                                marginBottom: 36,
                            }}>
                                Scroll down to see what your organization actually gets.
                            </p>

                            {/* Scroll indicator */}
                            <div
                                onClick={() => document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' })}
                                style={{
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 8,
                                }}
                            >
                                <div style={{
                                    width: 40, height: 40,
                                    borderRadius: '50%',
                                    border: '2px solid rgba(0,119,182,0.25)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    animation: 'productHeroBounce 2s ease-in-out infinite',
                                }}>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M4 6L8 10L12 6" stroke="#0077b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <span style={{
                                    fontSize: '0.7rem',
                                    fontWeight: 600,
                                    color: 'rgba(0,119,182,0.5)',
                                    textTransform: 'uppercase',
                                    letterSpacing: 2,
                                }}>
                                    Explore the Solution
                                </span>
                            </div>
                        </div>

                        <style>{`
                            @keyframes productHeroBounce {
                                0%, 100% { transform: translateY(0); opacity: 0.6; }
                                50% { transform: translateY(8px); opacity: 1; }
                            }
                        `}</style>
                    </section>

                    <ProductStory />

                    {/* Contact / CTA */}
                    <section id="contact" style={{
                        padding: '80px 0',
                        background: 'var(--bg-secondary)',
                        textAlign: 'center',
                    }}>
                        <div className="container">
                            {/* Dramatic narrative hook */}
                            <p style={{
                                fontSize: '1.3rem', fontWeight: 300, color: 'var(--text-dim)',
                                maxWidth: 520, margin: '0 auto 8px', lineHeight: 1.6,
                                fontStyle: 'italic',
                            }}>
                                Organizations will always change.
                            </p>
                            <p style={{
                                fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)',
                                maxWidth: 520, margin: '0 auto 24px', lineHeight: 1.6,
                            }}>
                                Your processes do not have to break.
                            </p>
                            <p style={{
                                fontSize: '0.9rem', color: 'var(--text-dim)', maxWidth: 500,
                                margin: '0 auto 40px', lineHeight: 1.7,
                            }}>
                                Function-Based BPMN protects business process architecture from organizational restructuring.
                            </p>

                            <div style={{
                                width: 40, height: 1,
                                background: 'var(--border)', margin: '0 auto 40px',
                            }} />

                            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: 16 }}>
                                Ready to <span className="gradient-text">Transform</span> Your Governance?
                            </h2>
                            <p style={{ color: 'var(--text-dim)', maxWidth: 500, margin: '0 auto 32px', fontSize: '1rem' }}>
                                Let's discuss how Function-Based BPMN can protect your organization from restructuring chaos.
                            </p>
                            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                                <button className="btn btn-primary btn-lg">📧 Contact Us</button>
                                <button className="btn btn-outline btn-lg">📄 Download Whitepaper</button>
                            </div>
                            <div style={{ marginTop: 24 }}>
                                <button
                                    onClick={() => navigateTo('innovation')}
                                    style={{
                                        background: 'none', border: 'none', color: 'var(--accent)',
                                        cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
                                        fontFamily: 'inherit',
                                    }}
                                >
                                    ← Kembali ke Innovation Story
                                </button>
                            </div>
                            <div style={{ marginTop: 40, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                © 2024 PT Mitra Karya Prima (PLN Group) · Governance Architecture Framework
                            </div>
                        </div>
                    </section>
                </>
            )}
        </MainLayout>
    )
}
