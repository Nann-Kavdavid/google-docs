import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        // デフォルト言語
        fallbackLng: "en",
        
        ns: ["default"],
        defaultNS: "default",

        // サポート言語
        supportedLngs: ["en", "ja"],
        // デテクター設定
        detection: {
            order: ["path", "cookie", "htmlTag"],
            caches: ["cookie"],
        },
        backend: {
            loadPath: "/assets/locales/{{lng}}/translation.json"
        },   
    });