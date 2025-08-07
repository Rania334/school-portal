import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: "Welcome to Anyware",
        login: "Login",
        logout: "Logout",
        dashboard: "Dashboard",
        home: "Home",
        loginAsTeacher: "Login as a Teacher",
        loginAsStudent: "Login as a Student",
      },
    },
    ar: {
      translation: {
        welcome: "مرحبًا بك في Anywhere",
        login: "تسجيل الدخول",
        logout: "تسجيل الخروج",
        dashboard: "لوحة التحكم",
        home: "الصفحة الرئيسية",
        loginAsTeacher: "تسجيل الدخول كمعلم",
        loginAsStudent: "تسجيل الدخول كطالب",
      },
    },
  },
  lng: 'en', // default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
