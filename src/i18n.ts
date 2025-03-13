import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// https://react.i18next.com/guides/quick-start

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  nl: {
    // If this one is used you don't need to pass a string to useTranslation first arg
    translation: {
      "title": "Project React NL"
    },
    common: {
      "title": "Welkom op Project React NL",
      "home": "Start",
      "about": "Over mij"
    }
  },
  gb: {
    translation: {
      "title": "Project React GB-EN"
    },
    common: {
      "title": "Welcome to Project React GB-EN",
      "home": "Home",
      "about": "About"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "nl", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;