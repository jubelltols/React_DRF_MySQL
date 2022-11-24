import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import languageDetector from "i18next-browser-languagedetector"

import es from "./es/global.json";
import en from "./en/global.json";
import va from "./va/global.json";

i18next
    .use(initReactI18next)
    .use(languageDetector)
    .init({
        interpolation: { escapeValue: false },
        fallbackLng: "es",
        lng: "es",
        resources: {
            es: {
                global: es
            },
            en: {
                global: en
            },
            va: {
                global: va
            }
        }
    })