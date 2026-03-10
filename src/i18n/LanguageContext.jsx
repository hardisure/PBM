import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import en from './en.json'
import id from './id.json'

const translations = { en, id }

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        try { return localStorage.getItem('lang') || 'en' }
        catch { return 'en' }
    })

    useEffect(() => {
        try { localStorage.setItem('lang', language) } catch { }
    }, [language])

    const t = useCallback((key) => {
        const keys = key.split('.')
        let val = translations[language]
        for (const k of keys) {
            val = val?.[k]
        }
        // Fallback to English
        if (val === undefined) {
            val = translations.en
            for (const k of keys) {
                val = val?.[k]
            }
        }
        return val ?? key
    }, [language])

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useTranslation() {
    const ctx = useContext(LanguageContext)
    if (!ctx) throw new Error('useTranslation must be inside LanguageProvider')
    return ctx
}

export default LanguageContext
