import { useEffect, useRef, useMemo } from 'react'
import styles from './styles.module.css'

function Particles() {
    const particles = useMemo(() =>
        Array.from({ length: 20 }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            delay: `${Math.random() * 6}s`,
            size: `${2 + Math.random() * 3}px`,
        })), [])

    return (
        <div className={styles['hero-particles']}>
            {particles.map(p => (
                <div
                    key={p.id}
                    className={styles.particle}
                    style={{
                        left: p.left,
                        top: p.top,
                        animationDelay: p.delay,
                        width: p.size,
                        height: p.size,
                    }}
                />
            ))}
        </div>
    )
}

function NetworkCanvas() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let animId

        const resize = () => {
            canvas.width = canvas.offsetWidth * 2
            canvas.height = canvas.offsetHeight * 2
            ctx.scale(2, 2)
        }
        resize()
        window.addEventListener('resize', resize)

        const nodes = Array.from({ length: 30 }, () => ({
            x: Math.random() * canvas.offsetWidth,
            y: Math.random() * canvas.offsetHeight,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            r: 2 + Math.random() * 3,
        }))

        function draw() {
            ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

            // Draw connections
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x
                    const dy = nodes[i].y - nodes[j].y
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < 120) {
                        ctx.beginPath()
                        ctx.moveTo(nodes[i].x, nodes[i].y)
                        ctx.lineTo(nodes[j].x, nodes[j].y)
                        ctx.strokeStyle = `rgba(0, 119, 182, ${0.2 * (1 - dist / 120)})`
                        ctx.lineWidth = 0.5
                        ctx.stroke()
                    }
                }
            }

            // Draw & move nodes
            nodes.forEach(n => {
                ctx.beginPath()
                ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
                ctx.fillStyle = 'rgba(0, 119, 182, 0.4)'
                ctx.fill()
                n.x += n.vx
                n.y += n.vy
                if (n.x < 0 || n.x > canvas.offsetWidth) n.vx *= -1
                if (n.y < 0 || n.y > canvas.offsetHeight) n.vy *= -1
            })

            animId = requestAnimationFrame(draw)
        }
        draw()

        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener('resize', resize)
        }
    }, [])

    return <canvas ref={canvasRef} className={styles['network-canvas']} />
}

export default function HeroAnimation() {
    return (
        <section id="hero" className={styles.hero}>
            <div className={styles['hero-bg']}>
                <NetworkCanvas />
            </div>
            <Particles />

            <div className={styles['hero-content']}>
                <div className={styles['hero-tag']}>PT Mitra Karya Prima · PLN Group</div>
                <h1 className={styles['hero-title']}>
                    Governance<br />
                    <span className="gradient-text">Architecture</span>{' '}
                    Framework
                </h1>
                <p className={styles['hero-subtitle']}>
                    Building Business Process Architecture That Survives Organizational Restructuring
                </p>
                <p className={styles['hero-context']}>
                    A Function-Based BPMN approach that decouples business processes from organizational structure.
                </p>

                <div className={styles['hero-diagram']}>
                    <div className={styles['diagram-flow']}>
                        <div className={`${styles['diagram-node']} ${styles['node-danger']}`}>
                            <span>📋</span> <span>Position-Based<br />Process</span>
                        </div>
                        <div className={styles['diagram-arrow']}>→</div>
                        <div className={`${styles['diagram-node']} ${styles['node-warning']}`}>
                            <span>🔄</span> <span>Restructuring<br />Occurs</span>
                        </div>
                        <div className={styles['diagram-arrow']}>→</div>
                        <div className={`${styles['diagram-node']} ${styles['node-danger']}`}>
                            <span>💥</span> <span>Process<br />Collapse</span>
                        </div>
                        <div className={`${styles['diagram-arrow']} ${styles['diagram-arrow-transform']}`}>⚡</div>
                        <div className={`${styles['diagram-node']} ${styles['node-success']}`}>
                            <span>🛡️</span> <span>Function-Based<br />Architecture</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles['hero-scroll']}>
                <div className={styles['scroll-line']} />
                <span>Scroll to discover</span>
            </div>
        </section>
    )
}
