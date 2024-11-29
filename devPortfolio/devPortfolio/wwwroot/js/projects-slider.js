document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.projects-filter .filter-button');
    const projectCards = document.querySelectorAll('.project-card');
    const projectDetails = document.querySelectorAll('.project-details');
    let currentIndex = 0;
    let visibleCards = [];

    const personalProjects = ['card-devPortfolio', 'card-bookshelf', 'card-prosalud'];
    const professionalProjects = ['card-daikin'];

    const navigation = document.createElement('div');
    navigation.className = 'carousel-navigation';
    navigation.innerHTML = `
        <button class="nav-btn prev-btn">◀</button>
        <button class="nav-btn next-btn">▶</button>
    `;
    document.querySelector('.slider--projects').appendChild(navigation);

    function getVisibleCards(type) {
        if (type === 'personal') {
            return Array.from(projectCards).filter(card =>
                personalProjects.includes(card.id));
        } else if (type === 'professional') {
            return Array.from(projectCards).filter(card =>
                professionalProjects.includes(card.id));
        }
        return [];
    }

    updateCardStyles();
    function updateCardStyles() {
        projectCards.forEach(card => {
            card.style.display = 'none';
        });

        if (visibleCards.length === 0) return;

        const prevIndex = (currentIndex - 1 + visibleCards.length) % visibleCards.length;
        const nextIndex = (currentIndex + 1) % visibleCards.length;

        [prevIndex, currentIndex, nextIndex].forEach((index, i) => {
            const card = visibleCards[index];
            if (!card) return;

            card.style.display = 'block';
            card.style.opacity = i === 1 ? '1' : '0.4';
            card.style.zIndex = i === 1 ? '2' : '1';
            card.style.left = '50%';

            const xPos = i === 0 ? -120 : i === 1 ? -50 : 20;
            const scale = i === 1 ? 1 : 0.8;
            card.style.transform = `translateX(${xPos}%) scale(${scale})`;
            card.style.transition = 'all 0.4s ease-in-out';
        });

        const activeCard = visibleCards[currentIndex];
        const cardIndex = Array.from(projectCards).indexOf(activeCard);
        projectDetails.forEach((detail, i) => {
            detail.classList.toggle('active', i === cardIndex);
        });
    }

    function nextSlide() {
        if (visibleCards.length <= 1) return;
        currentIndex = (currentIndex + 1) % visibleCards.length;
        updateCardStyles();
    }

    function prevSlide() {
        if (visibleCards.length <= 1) return;
        currentIndex = (currentIndex - 1 + visibleCards.length) % visibleCards.length;
        updateCardStyles();
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const type = this.getAttribute('data-value');
            currentIndex = 0;
            visibleCards = getVisibleCards(type);
            updateCardStyles(true);
        });
    });

    document.querySelector('.next-btn').addEventListener('click', nextSlide);
    document.querySelector('.prev-btn').addEventListener('click', prevSlide);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });

    visibleCards = getVisibleCards('personal');
    updateCardStyles();
});