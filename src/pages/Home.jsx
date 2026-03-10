import HeroAnimation from '../components/HeroAnimation'
import InnovationStory from '../sections/InnovationStory'
import ProductStory from '../sections/ProductStory'

const dividerStyle = {
    padding: '60px 0',
    background: 'linear-gradient(180deg, var(--bg-primary), var(--bg-product))',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
}

export default function Home() {
    return (
        <>
            <HeroAnimation />
            <InnovationStory />

            {/* Section Divider */}
            <div id="product" style={dividerStyle}>
                <div style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{
                        display: 'inline-block',
                        padding: '6px 20px',
                        background: 'rgba(0,119,182,0.08)',
                        border: '1px solid rgba(0,119,182,0.15)',
                        borderRadius: 24,
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: 2,
                        color: 'var(--accent)',
                        marginBottom: 16,
                    }}>
                        Section B
                    </div>
                    <h2 style={{
                        fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                        fontWeight: 900,
                        color: 'var(--text-primary)',
                        marginBottom: 12,
                    }}>
                        Product <span className="gradient-text">Story</span>
                    </h2>
                    <p style={{ fontSize: '1rem', color: 'var(--text-dim)', maxWidth: 500, margin: '0 auto' }}>
                        From innovation concept to market-ready solution.
                    </p>
                </div>
            </div>

            <ProductStory />

            {/* Contact / CTA */}
            <section id="contact" style={{
                padding: '80px 0',
                background: 'var(--bg-secondary)',
                textAlign: 'center',
            }}>
                <div className="container">
                    <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: 16 }}>
                        Ready to <span className="gradient-text">Transform</span> Your Governance?
                    </h2>
                    <p style={{ color: 'var(--text-dim)', maxWidth: 500, margin: '0 auto 32px', fontSize: '1rem' }}>
                        Let's discuss how Function-Based BPMN can protect your organization from restructuring chaos.
                    </p>
                    <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                        <button className="btn btn-primary btn-lg">📧 Contact Us</button>
                        <button className="btn btn-outline btn-lg">📄 Download Whitepaper</button>
                    </div>
                    <div style={{ marginTop: 40, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        © 2024 PT Mitra Karya Prima (PLN Group) · Governance Architecture Framework
                    </div>
                </div>
            </section>
        </>
    )
}
