document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.skills-filter .filter-button');
    const skillsSections = document.querySelectorAll('.skills-section');

    const defaultSection = document.querySelector('.skills-section[data-type="hard"]');
    if (defaultSection) {
        defaultSection.classList.add('active');
    }
    
    function showSkillsSection(filterType) {
        skillsSections.forEach(section => {
            section.classList.remove('active');
        });

        filterButtons.forEach(button => {
            button.classList.remove('active');
        });

        const selectedSection = document.querySelector(`.skills-section[data-type="${filterType}"]`);
        const selectedButton = document.querySelector(`.filter-button[data-filter="${filterType}"]`);

        if (selectedSection && selectedButton) {
            selectedSection.classList.add('active');
            selectedButton.classList.add('active');
        }
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filterType = this.getAttribute('data-filter');
            showSkillsSection(filterType);
        });
    });
});