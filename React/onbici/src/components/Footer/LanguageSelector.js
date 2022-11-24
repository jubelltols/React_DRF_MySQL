import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function LanguageSelector () {
    const { t, i18n } = useTranslation("global");
    const [language, setLanguage] = useState("es");

    useEffect(() => {
        i18n.changeLanguage(language);
    }, [i18n, language]);

    return (
        <select className="select select-ghost select-xs w-full max-w-xs"  value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option disabled selected>{t("language")}</option>
            <option value={"es"}>{t("spanish")}</option>
            <option value={"en"}>{t("english")}</option>
            <option value={"va"}>{t("valencian")}</option>
        </select>
    )
}