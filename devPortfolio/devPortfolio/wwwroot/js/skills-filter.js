document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.projects-filter .filter-button');
    const projectCards = document.querySelectorAll('.project-card');
    const projectDetails = document.querySelectorAll('.project-details');

    // Función para mostrar proyectos según el tipo
    function filterProjects(type) {
        projectCards.forEach(card => {
            if (type === 'all' || card.getAttribute('data-type') === type) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Función para actualizar el proyecto activo
    function updateActiveProject(index) {
        projectCards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });

        projectDetails.forEach((detail, i) => {
            detail.classList.toggle('active', i === index);
        });
    }

    // Event listeners para los botones de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const type = this.getAttribute('data-section');

            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            filterProjects(type === 'personal' ? 'personal' : 'professional');
        });
    });

    // Event listeners para las tarjetas de proyecto
    projectCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            updateActiveProject(index);
        });
    });

    // Inicializar con el primer proyecto activo
    updateActiveProject(0);
    filterProjects('personal');
});