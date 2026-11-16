console.log("Portfolio Loaded");

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (event) {
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const contactForm = document.getElementById('contact-form');
    const alertEl = document.getElementById('form-alert');

    if (contactForm && location.protocol === 'file:') {
        const warningMessage = '<div class="alert alert-warning">Unable to submit the contact form from a local file. Please open the site through a web server (for example: <code>python -m http.server 8000</code> or VS Code Live Server).</div>';
        if (alertEl) {
            alertEl.innerHTML = warningMessage;
        }

        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            if (alertEl) {
                alertEl.innerHTML = warningMessage;
            }
        });
    }
});

