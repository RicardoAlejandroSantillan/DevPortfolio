const languageSelector = document.querySelector('.language-selector');
const textElements = document.querySelectorAll('[data-section][data-value]');

// Establecer español como idioma predeterminado
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

    textElements.forEach(element => {
        const section = element.dataset.section;
        const value = element.dataset.value;

        if (translations[section]?.[value]) {
            element.textContent = translations[section][value];
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
    }
};

// Inicializar con español por defecto
document.addEventListener('DOMContentLoaded', async () => {
    await changeLanguage(DEFAULT_LANGUAGE);

    // Agregar eventos a los botones
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const language = btn.dataset.lang;
            changeLanguage(language);
        });
    });
});