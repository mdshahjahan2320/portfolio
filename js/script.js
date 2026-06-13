console.log("Portfolio Loaded");

document.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

anchor.addEventListener("click", function(e){

e.preventDefault();

document.querySelector(
this.getAttribute("href")
).scrollIntoView({

behavior:"smooth"

});

// Contact form handling for Formsubmit/Formspree
const contactForm = document.getElementById('contact-form');
if (contactForm) {
	const alertEl = document.getElementById('form-alert');
	const submitBtn = contactForm.querySelector('button[type="submit"]');

	// If the page is opened via file:// the form backend (Formsubmit) will refuse
	// submissions. Provide a helpful message and disable the submit button.
	if (location.protocol === 'file:') {
		const msg = '<div class="alert alert-warning">Unable to submit form from local file.\nPlease serve the site over HTTP (run a local server or deploy to GitHub Pages).<br><br>Run locally:<br><code>python -m http.server 8000</code> or use VS Code Live Server.</div>';
		if (alertEl) alertEl.innerHTML = msg;
		if (submitBtn) submitBtn.disabled = true;
		contactForm.addEventListener('submit', function (e) {
			e.preventDefault();
			if (alertEl) alertEl.innerHTML = msg;
		});
	} else {
		contactForm.addEventListener('submit', function (e) {
			e.preventDefault();

			const formData = new FormData(contactForm);
			const endpoint = contactForm.action;

			fetch(endpoint, {
				method: 'POST',
				body: formData,
				headers: {
					'Accept': 'application/json'
				}
			})
			.then(response => {
				if (response.ok) {
					if (alertEl) alertEl.innerHTML = '<div class="alert alert-success">Message sent — thank you!</div>';
					contactForm.reset();
				} else {
					return response.json().then(err => Promise.reject(err));
				}
			})
			.catch(() => {
				if (alertEl) alertEl.innerHTML = '<div class="alert alert-danger">Sorry, there was an error sending your message. Please try again later.</div>';
			});
		});
	}
}

});

});
