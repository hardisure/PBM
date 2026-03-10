import { useState, useCallback } from 'react'
import styles from './styles.module.css'
import { useTranslation } from '../../i18n/LanguageContext'

export default function GovernanceCostCalculator() {
    const { t } = useTranslation()
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
            <h3 className={styles['calc-title']}>{t('governanceCost.title')}</h3>
            <div className={styles.preset}>
                <button className="btn btn-outline btn-sm" onClick={applyPreset}>{t('governanceCost.preset')}</button>
            </div>
            <div className={styles.grid}>
                <div className={styles['input-group']}>
                    <label><span className={styles['input-label']}>{t('governanceCost.sopLabel')}</span></label>
                    <input type="range" min="10" max="500" step="10" value={sop} onChange={e => setSop(+e.target.value)} />
                    <div className={styles['range-display']}>
                        <span className={styles['range-value']}>{sop}</span>
                        <span className={styles['range-unit']}>{t('governanceCost.sopUnit')}</span>
                    </div>
                </div>
                <div className={styles['input-group']}>
                    <label><span className={styles['input-label']}>{t('governanceCost.catLabel')}</span></label>
                    <input type="range" min="3" max="30" step="1" value={units} onChange={e => setUnits(+e.target.value)} />
                    <div className={styles['range-display']}>
                        <span className={styles['range-value']}>{units}</span>
                        <span className={styles['range-unit']}>{t('governanceCost.catUnit')}</span>
                    </div>
                </div>
                <div className={styles['input-group']}>
                    <label><span className={styles['input-label']}>{t('governanceCost.freqLabel')}</span></label>
                    <input type="range" min="0" max="5" step="1" value={freq} onChange={e => setFreq(+e.target.value)} />
                    <div className={styles['range-display']}>
                        <span className={styles['range-value']}>{freq}</span>
                        <span className={styles['range-unit']}>{t('governanceCost.freqUnit')}</span>
                    </div>
                </div>
            </div>
            <div className={styles.result}>
                <div className={styles['result-label']}>{t('governanceCost.resultLabel')}</div>
                <div className={styles['result-value']}>{formatRp(cost())}</div>
                <div className={styles['result-sub']}>{t('governanceCost.resultSub')}</div>
            </div>
        </div>
    )
}
