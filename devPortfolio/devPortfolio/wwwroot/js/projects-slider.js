function initializeProjectSlider() {
    const projectCards = document.querySelectorAll('.project-card');
    const projectDetails = document.querySelectorAll('.project-details');
    const filterButtons = document.querySelectorAll('.filter-button');

    let currentIndex = 0;

    function updateCards(filterType = 'personal') {
        let visibleCards = Array.from(projectCards).filter(card => {
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

        const activeCard = visibleCards[currentIndex];
        if (activeCard) {
            const projectId = Array.from(projectCards).indexOf(activeCard) + 1;
            projectDetails.forEach((detail, index) => {
                detail.classList.toggle('active', index === projectId - 1);
            });
        }
    }

    function nextSlide() {
        const currentFilter = document.querySelector('.filter-button.active').dataset.filter;
        const visibleCards = Array.from(projectCards).filter(card => {
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

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterType = button.dataset.filter;
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentIndex = 0;

            projectCards.forEach(card => {
                if (card.dataset.type === filterType) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });

            updateCards(filterType);
        });
    });

    projectCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            if (card.classList.contains('prev')) {
                prevSlide();
            } else if (card.classList.contains('next')) {
                nextSlide();
            }
        });
    });

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

    projectCards.forEach(card => {
        if (card.dataset.type !== 'personal') {
            card.style.display = 'none';
        }
    });

    const personalButton = document.querySelector('[data-filter="personal"]');
    if (personalButton) {
        personalButton.classList.add('active');
    }
    updateCards('personal');
}

document.addEventListener('DOMContentLoaded', initializeProjectSlider);
document.addEventListener('contentChanged', initializeProjectSlider);
window.addEventListener('resize', initializeProjectSlider);