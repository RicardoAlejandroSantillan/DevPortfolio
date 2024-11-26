document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.testimonials-filter .filter-button');
    const sections = document.querySelectorAll('.testimonial-section');
    const testimonialForm = document.getElementById('testimonialForm');
    const testimonialsContainer = document.querySelector('.testimonials-container');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const sectionType = this.getAttribute('data-section');

            filterButtons.forEach(btn => btn.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));

            this.classList.add('active');
            document.getElementById(`${sectionType}-testimonial${sectionType === 's' ? 's' : ''}`).classList.add('active');
        });
    });
    testimonialForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const testimonial = {
            email: document.getElementById('email').value,
            name: document.getElementById('name').value,
            company: document.getElementById('company').value,
            rating: document.querySelector('input[name="rating"]:checked').value,
            description: document.getElementById('description').value,
            date: new Date().toLocaleDateString()
        };

        const testimonials = JSON.parse(localStorage.getItem('testimonials') || '[]');
        testimonials.push(testimonial);
        localStorage.setItem('testimonials', JSON.stringify(testimonials));

        testimonialForm.reset();

        const successMessage = document.querySelector('.success-message');
        successMessage.classList.add('show');
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 1000);

        displayTestimonials();
    });

    function displayTestimonials() {
        const testimonials = JSON.parse(localStorage.getItem('testimonials') || '[]');
        testimonialsContainer.innerHTML = '';

        testimonials.forEach(testimonial => {
            const stars = '★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating);

            const testimonialCard = `
                <div class="testimonial-card">
                    <div class="testimonial-header">
                        <h3>${testimonial.name}</h3>
                        <div class="testimonial-rating">${stars}</div>
                    </div>
                    <div class="testimonial-info">
                        <p>${testimonial.company}</p>
                        <p>${testimonial.email}</p>
                    </div>
                    <p class="testimonial-text">${testimonial.description}</p>
                    <p class="testimonial-date">${testimonial.date}</p>
                </div>
            `;

            testimonialsContainer.innerHTML += testimonialCard;
        });
    }
    displayTestimonials();
});