const languageSelector = document.querySelector('.language-selector');
const textElements = document.querySelectorAll('[data-section][data-value]');

const DEFAULT_LANGUAGE = 'en';

const loadTranslations = async (language) => {
    try {
        const response = await fetch(`/languages/${language}.json`);
        if (!response.ok) throw new Error('Translation file not found');
        return await response.json();
    } catch (error) {
        console.error('Error loading translations:', error);
        return null;
    }
};

const updateContent = (translations) => {
    if (!translations) return;

    const elements = document.querySelectorAll('[data-section][data-value]');
    console.log(`Found ${elements.length} translatable elements`);

    elements.forEach(element => {
        const section = element.dataset.section;
        const value = element.dataset.value;

        if (translations[section]?.[value]) {
            element.textContent = translations[section][value];
        } else {
            console.warn(`Missing translation: ${section}.${value}`);
        }
    });
};

const updateActiveButton = (language) => {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === language);
    });
};

const changeLanguage = async (language) => {
    const translations = await loadTranslations(language);
    if (translations) {
        localStorage.setItem('preferredLanguage', language);
        document.documentElement.lang = language;
        updateContent(translations);
        updateActiveButton(language);
        console.log(`Language changed to: ${language}`);
    }
};

document.addEventListener('DOMContentLoaded', async () => {
    await changeLanguage(DEFAULT_LANGUAGE);
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            const language = btn.dataset.lang;
            console.log(`Button clicked: ${language}`);
            await changeLanguage(language);
        });
    });
});

function checkMissingTranslations(translations) {
    const elements = document.querySelectorAll('[data-section][data-value]');
    const missingTranslations = [];

    elements.forEach(element => {
        const section = element.dataset.section;
        const value = element.dataset.value;
        if (!translations[section]?.[value]) {
            missingTranslations.push(`${section}.${value}`);
        }
    });

    if (missingTranslations.length > 0) {
        console.group('Missing Translations');
        missingTranslations.forEach(missing => console.warn(missing));
        console.groupEnd();
    }
}