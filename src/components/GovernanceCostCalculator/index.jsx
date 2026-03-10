import { useState, useCallback } from 'react'
import styles from './styles.module.css'

export default function GovernanceCostCalculator() {
    const [sop, setSop] = useState(100)
    const [units, setUnits] = useState(13)
    const [freq, setFreq] = useState(2)

    const cost = useCallback(() => {
        const baseCost = sop * 0.5 + units * 15
        const total = baseCost * freq * 3.25
        return Math.round(total)
    }, [sop, units, freq])

    const applyPreset = () => { setSop(100); setUnits(13); setFreq(2) }

    const formatRp = (v) => `Rp ${v.toLocaleString('id-ID')} Juta`

    return (
        <div className={styles.calculator}>
            <h3 className={styles['calc-title']}>💰 Governance Rework Cost Calculator</h3>
            <div className={styles.preset}>
                <button className="btn btn-outline btn-sm" onClick={applyPreset}>📋 Typical BUMN Scenario</button>
            </div>
            <div className={styles.grid}>
                <div className={styles['input-group']}>
                    <label><span className={styles['input-label']}>Jumlah SOP</span></label>
                    <input type="range" min="10" max="500" step="10" value={sop} onChange={e => setSop(+e.target.value)} />
                    <div className={styles['range-display']}>
                        <span className={styles['range-value']}>{sop}</span>
                        <span className={styles['range-unit']}>documents</span>
                    </div>
                </div>
                <div className={styles['input-group']}>
                    <label><span className={styles['input-label']}>Process Categories</span></label>
                    <input type="range" min="3" max="30" step="1" value={units} onChange={e => setUnits(+e.target.value)} />
                    <div className={styles['range-display']}>
                        <span className={styles['range-value']}>{units}</span>
                        <span className={styles['range-unit']}>categories</span>
                    </div>
                </div>
                <div className={styles['input-group']}>
                    <label><span className={styles['input-label']}>Restructuring Freq (per 3yr)</span></label>
                    <input type="range" min="0" max="5" step="1" value={freq} onChange={e => setFreq(+e.target.value)} />
                    <div className={styles['range-display']}>
                        <span className={styles['range-value']}>{freq}</span>
                        <span className={styles['range-unit']}>events</span>
                    </div>
                </div>
            </div>
            <div className={styles.result}>
                <div className={styles['result-label']}>Estimated Governance Rework Cost</div>
                <div className={styles['result-value']}>{formatRp(cost())}</div>
                <div className={styles['result-sub']}>per restructuring cycle</div>
            </div>
        </div>
    )
}
