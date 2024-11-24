//function initializeProjectSlider() {
//    const projectCards = document.querySelectorAll('.project-card');
//    const projectDetails = document.querySelectorAll('.project-details');
//    const projectsList = document.querySelector('.projects-list');

//    if (!projectCards.length || !projectDetails.length || !projectsList) {
//        return;
//    }

//    // Establecer el ancho total de la lista basado en el número de proyectos
//    projectsList.style.width = `${projectCards.length * 310}px`; // 250px del card + 60px del gap

//    projectCards.forEach((card, index) => {
//        card.addEventListener('click', () => {
//            // Activar/desactivar tarjetas
//            projectCards.forEach(c => c.classList.remove('active'));
//            card.classList.add('active');

//            // Activar/desactivar detalles
//            projectDetails.forEach(d => d.classList.remove('active'));
//            document.getElementById(`project-${index + 1}`).classList.add('active');

//            // Calcular la posición de desplazamiento
//            const offset = -index * 310; // Ancho del card + gap
//            projectsList.style.transform = `translateX(${offset}px)`;
//        });
//    });

//    // Asegurarse de que el primer proyecto esté visible al inicio
//    setTimeout(() => {
//        projectsList.style.transform = 'translateX(0)';
//        projectCards[0].classList.add('active');
//        projectDetails[0].classList.add('active');
//    }, 100);
//}

//// Inicializar cuando el DOM esté listo
//document.addEventListener('DOMContentLoaded', function () {
//    initializeProjectSlider();
//});

//// Reinicializar cuando cambie el contenido
//document.addEventListener('contentChanged', function () {
//    initializeProjectSlider();
//});

//// Manejar el redimensionamiento de la ventana
//window.addEventListener('resize', function () {
//    initializeProjectSlider();
//});

function initializeProjectSlider() {
    const projectCards = document.querySelectorAll('.project-card');
    const projectDetails = document.querySelectorAll('.project-details');
    const filterButtons = document.querySelectorAll('.filter-button');

    let currentIndex = 0;

    function updateCards(filterType = 'all') {
        let visibleCards = Array.from(projectCards).filter(card => {
            if (filterType === 'all') return true;
            return card.dataset.type === filterType;
        });

        visibleCards.forEach((card, index) => {
            if (index === currentIndex) {
                card.classList.add('active');
                card.classList.remove('prev', 'next', 'hide', 'new-next');
            } else if (index === currentIndex - 1) {
                card.classList.add('prev');
                card.classList.remove('active', 'next', 'hide', 'new-next');
            } else if (index === currentIndex + 1) {
                card.classList.add('next');
                card.classList.remove('active', 'prev', 'hide', 'new-next');
            } else if (index < currentIndex - 1) {
                card.classList.add('hide');
                card.classList.remove('active', 'prev', 'next', 'new-next');
            } else {
                card.classList.add('new-next');
                card.classList.remove('active', 'prev', 'next', 'hide');
            }
        });

        // Update project details
        projectDetails.forEach((detail, index) => {
            if (index === currentIndex) {
                detail.classList.add('active');
            } else {
                detail.classList.remove('active');
            }
        });
    }

    function nextSlide() {
        const currentFilter = document.querySelector('.filter-button.active').dataset.filter;
        const visibleCards = Array.from(projectCards).filter(card => {
            if (currentFilter === 'all') return true;
            return card.dataset.type === currentFilter;
        });

        if (currentIndex < visibleCards.length - 1) {
            currentIndex++;
            updateCards(currentFilter);
        }
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            const currentFilter = document.querySelector('.filter-button.active').dataset.filter;
            updateCards(currentFilter);
        }
    }

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterType = button.dataset.filter;

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            currentIndex = 0; // Reset index when filtering

            // Mostrar/ocultar tarjetas según el filtro
            projectCards.forEach(card => {
                if (filterType === 'all' || card.dataset.type === filterType) {
                    card.classList.remove('filtered-out');
                } else {
                    card.classList.add('filtered-out');
                }
            });

            updateCards(filterType);
        });
    });

    // Click handlers
    projectCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            if (card.classList.contains('prev')) {
                prevSlide();
            } else if (card.classList.contains('next')) {
                nextSlide();
            }
        });
    });

    // Touch handlers
    let touchstartX = 0;
    let touchendX = 0;

    document.addEventListener('touchstart', e => {
        touchstartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', e => {
        touchendX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchendX < touchstartX) nextSlide();
        if (touchendX > touchstartX) prevSlide();
    }

    // Initial setup
    updateCards();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeProjectSlider);

// Reinitialize when content changes
document.addEventListener('contentChanged', initializeProjectSlider);

// Handle window resize
window.addEventListener('resize', initializeProjectSlider);


//function initializeProjectSlider() {
//    const projectCards = document.querySelectorAll('.project-card');
//    const projectDetails = document.querySelectorAll('.project-details');
//    const filterButtons = document.querySelectorAll('.filter-button');

//    let currentIndex = 0;

//    function updateCards() {
//        projectCards.forEach((card, index) => {
//            if (index === currentIndex) {
//                card.classList.add('active');
//                card.classList.remove('prev', 'next', 'hide', 'new-next');
//            } else if (index === currentIndex - 1) {
//                card.classList.add('prev');
//                card.classList.remove('active', 'next', 'hide', 'new-next');
//            } else if (index === currentIndex + 1) {
//                card.classList.add('next');
//                card.classList.remove('active', 'prev', 'hide', 'new-next');
//            } else if (index < currentIndex - 1) {
//                card.classList.add('hide');
//                card.classList.remove('active', 'prev', 'next', 'new-next');
//            } else {
//                card.classList.add('new-next');
//                card.classList.remove('active', 'prev', 'next', 'hide');
//            }
//        });

//        // Update project details
//        projectDetails.forEach((detail, index) => {
//            if (index === currentIndex) {
//                detail.classList.add('active');
//            } else {
//                detail.classList.remove('active');
//            }
//        });
//    }

//    function nextSlide() {
//        if (currentIndex < projectCards.length - 1) {
//            currentIndex++;
//            updateCards();
//        }
//    }

//    function prevSlide() {
//        if (currentIndex > 0) {
//            currentIndex--;
//            updateCards();
//        }
//    }

//    // Filter functionality
//    filterButtons.forEach(button => {
//        button.addEventListener('click', () => {
//            const filterType = button.dataset.filter;

//            filterButtons.forEach(btn => btn.classList.remove('active'));
//            button.classList.add('active');

//            projectCards.forEach(card => {
//                if (filterType === 'all' || card.dataset.type === filterType) {
//                    card.classList.remove('filtered-out');
//                } else {
//                    card.classList.add('filtered-out');
//                }
//            });

//            // Reset to first visible card
//            currentIndex = 0;
//            updateCards();
//        });
//    });

//    // Click handlers
//    projectCards.forEach((card, index) => {
//        card.addEventListener('click', () => {
//            if (card.classList.contains('prev')) {
//                prevSlide();
//            } else if (card.classList.contains('next')) {
//                nextSlide();
//            }
//        });
//    });

//    // Touch handlers
//    let touchstartX = 0;
//    let touchendX = 0;

//    document.addEventListener('touchstart', e => {
//        touchstartX = e.changedTouches[0].screenX;
//    });

//    document.addEventListener('touchend', e => {
//        touchendX = e.changedTouches[0].screenX;
//        handleSwipe();
//    });

//    function handleSwipe() {
//        if (touchendX < touchstartX) nextSlide();
//        if (touchendX > touchstartX) prevSlide();
//    }

//    // Initial setup
//    updateCards();
//}

//// Initialize when DOM is ready
//document.addEventListener('DOMContentLoaded', initializeProjectSlider);

//// Reinitialize when content changes
//document.addEventListener('contentChanged', initializeProjectSlider);

//// Handle window resize
//window.addEventListener('resize', initializeProjectSlider);