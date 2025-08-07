import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: "Welcome",
        login: "Login",
        logout: "Logout",
        dashboard: "Dashboard",
        home: "Home",
        loginAsTeacher: "Login as a Teacher",
        loginAsStudent: "Login as a Student",
        schedule: "Schedule",
        courses: "Courses",
        gradebook: "Gradebook",
        performance: "Performance",
        announcement: "Announcement",
        search: "Search",
        examsTime: "EXAMS TIME",
        examIntro: "Here we are, are you ready to fight? Don’t worry, we prepared some tips to help you get ready for your exams.",
        examQuote: "\"Nothing happens until something moves.\"",
        viewExamTips: "View Exam Tips",
        quiz: "Quiz",
        assignment: "Assignment",
        course: "Course",
        topic: "Topic",
        due: "Due",
        startQuiz: "Start Quiz",
        solveAssignment: "Solve Assignment",
        whats_due: "What's due",
        all: "All",
        recentAnnouncements: "Recent Announcements"

      },
    },
    ar: {
      translation: {
        welcome: "مرحبًا بك",
        login: "تسجيل الدخول",
        logout: "تسجيل الخروج",
        dashboard: "لوحة التحكم",
        home: "الصفحة الرئيسية",
        loginAsTeacher: "تسجيل الدخول كمعلم",
        loginAsStudent: "تسجيل الدخول كطالب",
        schedule: "الجدول",
        courses: "الدورات",
        gradebook: "سجل الدرجات",
        performance: "الأداء",
        announcement: "الإعلانات",
        search: "بحث",
        examsTime: "وقت الامتحانات",
        examIntro: "ها قد وصلنا، هل أنت مستعد للتحدي؟ لا تقلق، لقد أعددنا بعض النصائح لمساعدتك على الاستعداد للامتحانات.",
        examQuote: "لا شيء يحدث حتى يتحرك شيء ما.",
        viewExamTips: "عرض نصائح الامتحان",
        quiz: "اختبار",
        assignment: "واجب",
        course: "المقرر",
        topic: "الموضوع",
        due: "الموعد النهائي",
        startQuiz: "ابدأ الاختبار",
        solveAssignment: "حل الواجب",
        whats_due: "ما يجب تسليمه",
        all: "الكل",
        recentAnnouncements: "الإعلانات الأخيرة"


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
